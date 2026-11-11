/**
 * FuJue account provider: device-code sign-in against the FuJue website, then the account's harness
 * configuration — API base, catalog, and default model — applied to this installation.
 *
 * The existing account UI and `account` Remote namespace drive this provider unchanged: the device
 * page takes the user code, and the issued API key becomes the credential every model request uses.
 * @module @deepseek-ai/dsh-fujue-account
 */
import { randomUUID } from 'node:crypto'
import { arch, platform, release } from 'node:os'
import { Context } from '@deepseek-ai/cordis'
import { brandString } from '@deepseek-ai/dsh-brand'
import {
  DeepSeekAccount, type AccountBonusBatch, type AccountBonusOrderId, type AccountClientMetadata, type AccountDetails,
  type AccountUserId, type AccountView, type PlatformSession, type SignInAttemptId, type SignInAttemptView,
} from '@deepseek-ai/dsh-deepseek-account'
import { credentialRef, type CredentialRef } from '@deepseek-ai/dsh-credentials'
import type {} from '@deepseek-ai/dsh-settings'
import type {} from '@deepseek-ai/dsh-agent-default-model'
import { Config, resolveConfig, type ResolvedConfig } from './config.ts'
import { fetchHarnessConfig, pollDeviceToken, startDevice } from './client.ts'
import { FujueRequestError, type HarnessConfigResponse } from './types.ts'

export { Config } from './config.ts'
export { FujueRequestError } from './types.ts'

/** Sign-in phases during which another request joins the running attempt. */
const RUNNING_PHASES: ReadonlySet<SignInAttemptView['phase']> = new Set([
  'initializing', 'waiting-browser', 'exchanging', 'committing',
])

/** One local device-code attempt and its settlement. */
interface Attempt {
  readonly id: SignInAttemptId
  view: SignInAttemptView
  readonly controller: AbortController
  done: Promise<void>
}

/** A catalog read bound to the key that produced it. */
interface CachedConfig {
  readonly key: string
  readonly config: HarnessConfigResponse
}

/**
 * Wait without leaking a timer when the attempt ends first.
 * @param ms - delay in milliseconds.
 * @param signal - attempt lifetime.
 * @returns fulfillment after the delay or as soon as the signal aborts.
 */
async function sleep(ms: number, signal: AbortSignal): Promise<void> {
  await new Promise<void>((resolve) => {
    if (signal.aborted) {
      resolve()
      return
    }
    const finish = (): void => {
      clearTimeout(timer)
      signal.removeEventListener('abort', finish)
      resolve()
    }
    const timer = setTimeout(finish, ms)
    signal.addEventListener('abort', finish, { once: true })
  })
}

/**
 * Account provider for FuJue deployments.
 *
 * Sign-in exchanges a website device code for an API key, then writes that account's pi-ai route,
 * credential reference, and default model before the key becomes visible to model requests.
 */
export class FujueAccount extends DeepSeekAccount {
  static inject = ['credentials']

  private readonly config: ResolvedConfig
  private readonly ref: CredentialRef
  private readonly lifetime = new AbortController()
  private readonly listeners = new Set<(identityOnly: boolean) => void>()
  private attempt: Attempt | undefined
  private cached: CachedConfig | undefined
  private closed = false
  private removing: Promise<AccountView> | undefined
  private refreshTask: Promise<void> | undefined
  private refreshAgain = false

  /** @param ctx - Host with the credentials service. @param config - website and settings targets. */
  constructor(ctx: Context, config: Config = {}) {
    super(ctx)
    this.config = resolveConfig(config)
    this.ref = credentialRef(this.config.apiKeyEnv)
    ctx.effect(() => () => {
      this.closed = true
      this.lifetime.abort()
      this.attempt?.controller.abort()
      this.changed()
    }, 'fujue-account: attempt and request lifetime')
    // Applying a stored account needs the settings seams, which may activate after this provider.
    ctx.inject(['settings', 'agentDefaultModel'], (child) => {
      child.effect(() => {
        this.requestRefresh()
        return () => {}
      }, 'fujue-account: stored account configuration')
    })
    // A key can arrive without the device flow: pasted into the desktop welcome screen or the
    // Models page. Reload the account catalog for our own reference, and adopt a FuJue key that a
    // provider wrote under a different one.
    ctx.on('credentials/reference-updated', (ref) => {
      if (String(ref) !== this.config.apiKeyEnv) {
        this.adoptManualKey(ref)
        return
      }
      // The device sign-in applies the configuration before it commits the key.
      if (this.attempt?.view.phase === 'committing' || this.attempt?.view.phase === 'succeeded') return
      this.requestRefresh()
    })
  }

  override async getState(): Promise<AccountView> {
    const stored = await this.storedKey()
    const attempt = this.attempt?.view ?? null
    return {
      status: stored === undefined ? 'signed-out' : 'credential-stored',
      // Credential removal notifies watchers before sign-out clears the attempt.
      attempt: stored === undefined && attempt?.phase === 'succeeded' ? null : attempt,
      links: {
        usageUrl: `${this.config.webBaseUrl}/dashboard`,
        topUpUrl: `${this.config.webBaseUrl}/pricing`,
      },
    }
  }

  override async getProfile(_client: AccountClientMetadata): Promise<AccountDetails['profile'] | null> {
    const key = await this.storedKey()
    if (key === undefined) return null
    const config = await this.loadConfig(key)
    if (config === null) return null
    return {
      status: 'ready',
      value: {
        id: brandString<AccountUserId>(config.account.email),
        name: config.account.name,
        contact: config.account.email,
        avatarUrl: null,
      },
    }
  }

  override async getBalance(_client: AccountClientMetadata): Promise<AccountDetails['balance'] | null> {
    const key = await this.storedKey()
    if (key === undefined) return null
    return { status: 'ready', value: [], bonusWallets: [] }
  }

  override async getUnnotifiedBonuses(_client: AccountClientMetadata): Promise<AccountBonusBatch | null> {
    return null
  }

  override async ackBonusNotified(
    _accountId: AccountUserId, _orderId: AccountBonusOrderId, _client: AccountClientMetadata,
  ): Promise<boolean> {
    return false
  }

  override async startSignIn(
    _client: AccountClientMetadata, _callbackOrigin: string, _loginSource: 'web' | 'desktop',
  ): Promise<AccountView> {
    if (this.closed) throw new FujueRequestError('protocol', 'fujue-account: the provider is closed')
    const active = this.attempt
    if (active !== undefined && RUNNING_PHASES.has(active.view.phase)) return this.getState()
    if (active !== undefined) await active.done
    const id = randomUUID() as SignInAttemptId
    const attempt: Attempt = {
      id,
      view: { id, phase: 'initializing' },
      controller: new AbortController(),
      done: Promise.resolve(),
    }
    this.attempt = attempt
    attempt.done = this.run(attempt)
    this.changed()
    return this.getState()
  }

  override async cancelSignIn(id: SignInAttemptId): Promise<AccountView> {
    const attempt = this.attempt
    if (attempt?.id === id) {
      if (attempt.view.phase !== 'committing') attempt.controller.abort()
      await attempt.done
    }
    return this.getState()
  }

  override signOut(_client: AccountClientMetadata): Promise<AccountView> {
    this.removing ??= (async () => {
      if (this.closed) throw new FujueRequestError('protocol', 'fujue-account: the provider is closed')
      await this.ctx.credentials.unset(this.ref)
      this.cached = undefined
      this.attempt = undefined
      const settings = this.ctx.get('settings')
      if (settings !== undefined) {
        // An empty catalog keeps the route addressable for the next sign-in while serving no model.
        // The key is already gone, so a failed write must not report the sign-out as failed.
        await settings.update(this.config.piAiNamespace, {
          providers: { [this.config.providerKey]: { models: [] } },
        }).catch((error: unknown) => {
          this.ctx.logger.warn('fujue-account: could not empty the signed-out model route')
          this.ctx.logger.warn(error)
        })
      }
      this.ctx.emit('deepseek-account/signed-out')
      this.changed()
      return this.getState()
    })().finally(() => { this.removing = undefined })
    return this.removing
  }

  override async *watch(signal: AbortSignal, includeIdentityChanges = false): AsyncIterable<AccountView> {
    let dirty = true
    let wake: (() => void) | undefined
    const wakeUp = (): void => {
      dirty = true
      wake?.()
    }
    const changed = (identityOnly: boolean): void => { if (!identityOnly || includeIdentityChanges) wakeUp() }
    this.listeners.add(changed)
    signal.addEventListener('abort', wakeUp, { once: true })
    try {
      while (!this.closed && !signal.aborted) {
        if (dirty) {
          dirty = false
          yield await this.getState()
          continue
        }
        await new Promise<void>((resolve) => { wake = resolve })
      }
    } finally {
      this.listeners.delete(changed)
      signal.removeEventListener('abort', wakeUp)
    }
  }

  override async resolveToken(url: string): Promise<string | undefined> {
    const base = this.cached?.config.baseUrl
    if (base === undefined) return undefined
    try {
      if (new URL(url).origin !== new URL(base).origin) return undefined
    } catch {
      // A non-absolute request URL cannot name the configured gateway origin.
      return undefined
    }
    return this.storedKey()
  }

  override async rejectToken(token: string): Promise<void> {
    const stored = await this.storedKey()
    if (stored === undefined || stored !== token) return
    await this.ctx.credentials.unset(this.ref)
    this.cached = undefined
    this.changed()
    this.ctx.emit('deepseek-account/session-expired')
  }

  override async getPlatformSession(): Promise<PlatformSession | null> {
    return null
  }

  override async getDeviceIdentity(): Promise<{ deviceId?: string; userId?: AccountUserId; osVersion: string }> {
    const key = await this.storedKey()
    const config = key === undefined ? undefined : this.cached?.config
    return {
      ...config === undefined ? {} : { userId: brandString<AccountUserId>(config.account.email) },
      osVersion: `${platform()} ${release()} ${arch()}`,
    }
  }

  /** Resolve the stored key; ambient environment layers count as a configured account. */
  private async storedKey(): Promise<string | undefined> {
    const resolved = await this.ctx.credentials.resolve(this.ref)
    return resolved?.value
  }

  /** Reapply the account configuration for an existing key without blocking boot. */
  private async refreshStoredConfiguration(): Promise<void> {
    const key = await this.storedKey()
    if (key === undefined || this.closed) {
      // A removed key must not keep serving the catalog it was read for.
      this.cached = undefined
      return
    }
    // The catalog reflects the key it was read for; a refresh of the same key has nothing new.
    if (this.cached?.key === key) return
    const config = await fetchHarnessConfig(this.config, key, this.lifetime.signal)
    this.cached = { key, config }
    await this.applyConfiguration(config)
  }

  /** Reload the stored configuration in the background, at most one read at a time. */
  private requestRefresh(): void {
    if (this.closed) return
    if (this.refreshTask !== undefined) {
      this.refreshAgain = true
      return
    }
    this.refreshTask = this.refreshStoredConfiguration()
      .catch((error: unknown) => {
        this.ctx.logger.warn('fujue-account: could not apply the stored account configuration')
        this.ctx.logger.warn(error)
      })
      .finally(() => {
        this.refreshTask = undefined
        if (this.refreshAgain) {
          this.refreshAgain = false
          this.requestRefresh()
        }
      })
  }

  /**
   * Adopt a FuJue API key stored under another credential reference.
   *
   * The desktop welcome flow and the Models page write each provider's own reference, and the
   * welcome screen writes the official provider's one. A key this website issued is recognisable
   * by its `fj_live_` prefix, so copying it to this provider's reference makes the account route
   * serve it; the resulting change notification reloads the catalog and applies it.
   * @param ref - reference whose stored value changed.
   */
  private adoptManualKey(ref: CredentialRef): void {
    if (this.closed) return
    void (async () => {
      const resolved = await this.ctx.credentials.resolve(ref)
      const key = resolved?.value
      if (key === undefined || !key.startsWith('fj_live_') || this.closed) return
      await this.ctx.credentials.set(this.ref, key)
    })().catch((error: unknown) => {
      this.ctx.logger.warn('fujue-account: could not adopt a manually entered API key')
      this.ctx.logger.warn(error)
    })
  }

  /** Read the catalog for a key, reusing the last read that the same key produced. */
  private async loadConfig(key: string): Promise<HarnessConfigResponse | null> {
    if (this.cached?.key === key) return this.cached.config
    try {
      const config = await fetchHarnessConfig(this.config, key, this.lifetime.signal)
      this.cached = { key, config }
      return config
    } catch (error) {
      if (!(error instanceof FujueRequestError)) this.ctx.logger.warn(error)
      return null
    }
  }

  /**
   * Write the account's pi-ai route and default model.
   *
   * The route is restated on every apply so a changed catalog, base URL, or credential reference
   * reaches the next request; the default model is set only when the current selection is not one
   * of the account's own models, so a choice made in the picker survives a refresh.
   * @param config - account configuration read from the website.
   */
  private async applyConfiguration(config: HarnessConfigResponse): Promise<void> {
    const settings = this.ctx.get('settings')
    if (settings === undefined) {
      throw new FujueRequestError('protocol', 'fujue-account: the settings service is not mounted')
    }
    await settings.update(this.config.piAiNamespace, {
      providers: {
        [this.config.providerKey]: {
          displayName: 'FuJue',
          api: 'openai-completions',
          baseURL: config.baseUrl,
          apiKeyEnv: this.config.apiKeyEnv,
          models: config.models.map(model => ({
            id: model.id,
            ...model.name === undefined ? {} : { name: model.name },
            ...model.contextWindow === undefined ? {} : { contextWindow: model.contextWindow },
            ...model.maxTokens === undefined ? {} : { maxTokens: model.maxTokens },
            ...model.inputTypes === undefined ? {} : { input: [...model.inputTypes] },
            ...model.reasoningEfforts === undefined ? {} : { reasoningEfforts: { ...model.reasoningEfforts } },
          })),
        },
      },
    })
    const defaults = this.ctx.get('agentDefaultModel')
    if (defaults === undefined) return
    const target = config.defaultModel ?? config.models[0]?.id
    if (target === undefined) return
    const current = defaults.currentSelection()
    const serving = current.provider === this.config.providerKey
      && config.models.some(model => model.id === current.model)
    if (serving) return
    await defaults.saveSelection({ provider: this.config.providerKey, model: target })
  }

  /** Wait for approval, then exchange, apply, and commit the credential. */
  private async run(attempt: Attempt): Promise<void> {
    try {
      const start = await startDevice(this.config, attempt.controller.signal)
      if (attempt.controller.signal.aborted) {
        this.update(attempt, { phase: 'cancelled' })
        return
      }
      const deadline = Math.min(
        Date.now() + start.expires_in * 1000,
        Date.now() + this.config.attemptTimeoutMs,
      )
      this.update(attempt, {
        phase: 'waiting-browser',
        authorizeUrl: `${this.config.webBaseUrl}${start.verification_uri}?code=${encodeURIComponent(start.user_code)}`,
        expiresAt: deadline,
      })
      while (!attempt.controller.signal.aborted) {
        if (Date.now() >= deadline) {
          this.update(attempt, { phase: 'expired' })
          return
        }
        await sleep(start.interval * 1000, attempt.controller.signal)
        if (attempt.controller.signal.aborted) return
        const outcome = await pollDeviceToken(this.config, start.device_code, attempt.controller.signal)
        if (outcome.status === 'pending') continue
        if (outcome.status === 'expired') {
          this.update(attempt, { phase: 'expired' })
          return
        }
        this.update(attempt, { phase: 'exchanging' })
        const config = await fetchHarnessConfig(this.config, outcome.apiKey, attempt.controller.signal)
        this.update(attempt, { phase: 'committing' })
        await this.applyConfiguration(config)
        await this.ctx.credentials.set(this.ref, outcome.apiKey)
        this.cached = { key: outcome.apiKey, config }
        this.update(attempt, { phase: 'succeeded' })
        return
      }
    } catch (error) {
      if (attempt.controller.signal.aborted) {
        this.update(attempt, { phase: 'cancelled' })
        return
      }
      const code = error instanceof FujueRequestError ? error.code : 'protocol'
      this.ctx.logger.warn('fujue-account: sign-in failed with %s', code)
      this.update(attempt, { phase: code === 'expired' ? 'expired' : 'failed', errorCode: code })
    }
  }

  /** Publish one attempt change to every watcher. */
  private update(attempt: Attempt, patch: Partial<SignInAttemptView>): void {
    attempt.view = { ...attempt.view, ...patch }
    this.changed()
  }

  /** Notify watchers; identity-only notifications are filtered by each subscriber. */
  private changed(identityOnly = false): void {
    for (const listener of this.listeners) listener(identityOnly)
  }
}

export default FujueAccount
