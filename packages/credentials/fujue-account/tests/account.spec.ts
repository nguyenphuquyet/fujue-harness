/** FuJue device sign-in: website contract, applied configuration, and credential lifecycle. */
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http'
import type { AddressInfo } from 'node:net'
import { afterEach, expect, it } from 'vitest'
import { Context, Service } from '@deepseek-ai/cordis'
import AuthorizationService from '@deepseek-ai/dsh-authorization'
import type { DeepSeekAccount } from '@deepseek-ai/dsh-deepseek-account'
import type { AccountClientMetadata, AccountView } from '@deepseek-ai/dsh-deepseek-account/types'
import {
  CredentialProvider, type CredentialInfo, type CredentialKey, type CredentialRecord, type CredentialRecordEntry,
  type CredentialRecordInfo, type CredentialRef, type ResolvedCredential,
} from '@deepseek-ai/dsh-credentials'
import { FujueAccount } from '../src/index.ts'

const cleanups: Array<() => Promise<unknown>> = []
afterEach(async () => {
  while (cleanups.length) await cleanups.pop()!()
})

const client = (): AccountClientMetadata => ({ version: '0.0.0-test', locale: 'vi', timezoneOffsetSeconds: 25_200 })

/** Credential seam stand-in: the provider-managed store only. */
class FakeCredentials extends CredentialProvider {
  readonly values = new Map<string, string>()

  override async resolve(ref: CredentialRef): Promise<ResolvedCredential | undefined> {
    const value = this.values.get(ref)
    return value === undefined ? undefined : { value, source: 'test' }
  }

  override async describe(ref: CredentialRef): Promise<CredentialInfo> {
    return { configured: this.values.has(ref), writable: true }
  }

  override async set(ref: CredentialRef, value: string): Promise<void> {
    this.values.set(ref, value)
    this.ctx.emit('credentials/reference-updated', ref)
  }

  override async unset(ref: CredentialRef): Promise<void> {
    this.values.delete(ref)
    this.ctx.emit('credentials/reference-updated', ref)
  }

  /** Commit a value the way another provider would, without going through this one's seam. */
  async write(ref: string, value: string): Promise<void> {
    this.values.set(ref, value)
    this.ctx.emit('credentials/reference-updated', ref as CredentialRef)
  }

  override async readRecord(_key: CredentialKey): Promise<CredentialRecord | undefined> { return undefined }

  override async describeRecord(_key: CredentialKey): Promise<CredentialRecordInfo> {
    return { configured: false, writable: true }
  }

  override async listRecords(): Promise<readonly CredentialRecordEntry[]> { return [] }

  override async modifyRecord(
    _key: CredentialKey, _mutate: (current: CredentialRecord | undefined) => Promise<CredentialRecord | undefined>,
  ): Promise<CredentialRecord | undefined> { return undefined }

  override async deleteRecord(_key: CredentialKey): Promise<void> {}
}

/** Settings seam stand-in recording every applied section. */
class FakeSettings extends Service {
  readonly writes: Array<{ ns: string; patch: unknown }> = []

  constructor(ctx: Context) { super(ctx, 'settings') }

  async update(ns: string, patch: object): Promise<void> {
    this.writes.push({ ns, patch })
  }
}

/** Default-model seam stand-in: a deployment default that this provider may replace. */
class FakeDefaultModel extends Service {
  selection = { provider: 'deepseek-official', model: 'deepseek-flash' }
  readonly saved: Array<{ provider: string; model: string }> = []

  constructor(ctx: Context) { super(ctx, 'agentDefaultModel') }

  currentSelection(): { provider: string; model: string } { return this.selection }

  async saveSelection(next: { provider: string; model: string }): Promise<void> {
    this.saved.push(next)
    this.selection = next
  }
}

/** Model the website marks as the deployment default. */
const DEFAULT_MODEL = 'fujue-pro'

/** The gateway base URL the website publishes for every model. */
const GATEWAY = 'https://gateway.fujue.example/v1'

/** One scripted website. */
interface Site {
  readonly origin: string
  readonly started: Array<{ label?: string }>
}

/**
 * Serve the three FuJue endpoints the provider calls.
 * @param polls - status per token poll; `200` issues the key and the last status repeats.
 * @returns the running site and the recorded device starts.
 */
async function serveSite(polls: Array<number> = [428, 200]): Promise<Site> {
  const started: Array<{ label?: string }> = []
  let poll = 0
  const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    const send = (status: number, body: unknown): void => {
      response.writeHead(status, { 'content-type': 'application/json' })
      response.end(JSON.stringify(body))
    }
    if (request.method === 'POST' && request.url === '/api/v1/device/start') {
      let body = ''
      request.setEncoding('utf8')
      request.on('data', (chunk: string) => { body += chunk })
      request.on('end', () => {
        started.push(JSON.parse(body) as { label?: string })
        send(201, {
          device_code: 'device-code', user_code: 'ABCD-2345', verification_uri: '/device', expires_in: 600, interval: 0,
        })
      })
      return
    }
    if (request.method === 'POST' && request.url === '/api/v1/device/token') {
      const status = polls[Math.min(poll, polls.length - 1)]
      poll += 1
      if (status === 200) {
        send(200, { api_key: 'fj_live_test', user: { id: 'user-1', email: 'linh@fujue.dev', name: 'Linh' } })
      } else send(status ?? 428, { error: 'pending' })
      return
    }
    if (request.method === 'GET' && request.url === '/api/v1/harness/config') {
      if (request.headers.authorization !== 'Bearer fj_live_test') {
        send(401, { error: 'invalid key' })
        return
      }
      send(200, {
        object: 'harness.config',
        version: 1,
        api: { base_url: GATEWAY },
        account: { email: 'linh@fujue.dev', name: 'Linh', plan: 'pro' },
        default_model: DEFAULT_MODEL,
        models: [
          {
            id: DEFAULT_MODEL, name: 'FuJue Pro', object: 'model', context_window: 128_000, max_output_tokens: 8_192, default: true,
            input_types: ['text', 'image'],
            reasoning_efforts: { off: null, low: 'low', medium: 'medium', high: 'high' },
          },
          {
            id: 'fujue-flash', name: 'FuJue Flash', object: 'model', context_window: 65_536, max_output_tokens: 4_096, default: false,
            input_types: ['text'],
            reasoning_efforts: null,
          },
        ],
      })
      return
    }
    send(404, { error: 'unknown' })
  })
  await new Promise<void>((resolve) => { server.listen(0, '127.0.0.1', resolve) })
  const { port } = server.address() as AddressInfo
  cleanups.push(() => new Promise<void>((resolve) => { server.close(() => { resolve() }) }))
  return { origin: `http://127.0.0.1:${String(port)}`, started }
}

/**
 * Mount the provider over the stand-in seams.
 * @param webBaseUrl - site the provider talks to.
 * @returns the composed context and its stand-in seams.
 */
async function compose(webBaseUrl: string) {
  const ctx = new Context()
  cleanups.push(() => ctx.fiber.dispose())
  await ctx.plugin(FakeCredentials)
  await ctx.plugin(FakeSettings)
  await ctx.plugin(FakeDefaultModel)
  await ctx.plugin(AuthorizationService)
  await ctx.plugin(FujueAccount, { webBaseUrl })
  return {
    ctx,
    credentials: ctx.credentials as FakeCredentials,
    settings: ctx.get('settings') as unknown as FakeSettings,
    defaults: ctx.get('agentDefaultModel') as unknown as FakeDefaultModel,
  }
}

/**
 * Wait for a state the provider reaches in the background.
 * @param account - mounted provider.
 * @param accept - predicate over the current snapshot.
 * @returns the first accepted snapshot.
 */
async function waitForState(
  account: DeepSeekAccount, accept: (state: AccountView) => boolean,
): Promise<AccountView> {
  for (let attempt = 0; attempt < 300; attempt += 1) {
    const state = await account.getState()
    if (accept(state)) return state
    await new Promise(resolve => setTimeout(resolve, 10))
  }
  throw new Error('fujue-account: state did not settle')
}

it('exchanges a device code for the account catalog, the default model, and the key', async () => {
  const site = await serveSite()
  const { ctx, credentials, settings, defaults } = await compose(site.origin)
  const account = ctx.deepseekAccount

  await account.startSignIn(client(), 'http://127.0.0.1:9', 'desktop')
  const waiting = await waitForState(account, state => state.attempt?.phase === 'waiting-browser')
  expect(waiting.attempt?.authorizeUrl).toBe(`${site.origin}/device?code=ABCD-2345`)

  const settled = await waitForState(account, state => state.status === 'credential-stored')
  expect(settled.attempt?.phase).toBe('succeeded')

  expect(site.started).toEqual([{}])
  expect(settings.writes).toEqual([{
    ns: 'llm-pi-ai',
    patch: {
      providers: {
        fujue: {
          displayName: 'FuJue',
          api: 'openai-completions',
          baseURL: GATEWAY,
          apiKeyEnv: 'FUJUE_API_KEY',
          models: [
            {
              id: DEFAULT_MODEL, name: 'FuJue Pro', contextWindow: 128_000, maxTokens: 8_192,
              input: ['text', 'image'],
              reasoningEfforts: { off: null, low: 'low', medium: 'medium', high: 'high' },
            },
            { id: 'fujue-flash', name: 'FuJue Flash', contextWindow: 65_536, maxTokens: 4_096, input: ['text'] },
          ],
        },
      },
    },
  }])
  expect(defaults.saved).toEqual([{ provider: 'fujue', model: DEFAULT_MODEL }])
  expect(credentials.values.get('FUJUE_API_KEY')).toBe('fj_live_test')

  expect(await account.resolveToken(`${GATEWAY}/chat/completions`)).toBe('fj_live_test')
  expect(await account.resolveToken('https://api.deepseek.com/v1/chat/completions')).toBeUndefined()
  expect(await account.resolveToken('not-a-url')).toBeUndefined()

  const profile = await account.getProfile(client())
  expect(profile).toMatchObject({ status: 'ready', value: { name: 'Linh', contact: 'linh@fujue.dev' } })
  expect(await account.getBalance(client())).toEqual({ status: 'ready', value: [], bonusWallets: [] })
  expect(await account.getPlatformSession()).toBeNull()
})

it('loads the catalog and names when a FuJue key arrives from another credential', async () => {
  const site = await serveSite([200])
  const { credentials, settings, defaults } = await compose(site.origin)

  await credentials.write('DEEPSEEK_API_KEY', 'fj_live_test')
  for (let attempt = 0; attempt < 300 && settings.writes.length === 0; attempt += 1) {
    await new Promise(resolve => setTimeout(resolve, 10))
  }

  expect(credentials.values.get('FUJUE_API_KEY')).toBe('fj_live_test')
  expect(settings.writes).toHaveLength(1)
  expect(settings.writes[0]).toMatchObject({
    ns: 'llm-pi-ai',
    patch: {
      providers: {
        fujue: {
          apiKeyEnv: 'FUJUE_API_KEY',
          models: [
            { id: DEFAULT_MODEL, name: 'FuJue Pro' },
            { id: 'fujue-flash', name: 'FuJue Flash' },
          ],
        },
      },
    },
  })
  expect(defaults.saved).toEqual([{ provider: 'fujue', model: DEFAULT_MODEL }])
})

it('keeps a model selection the account already serves', async () => {
  const site = await serveSite([200])
  const { ctx, defaults } = await compose(site.origin)
  defaults.selection = { provider: 'fujue', model: 'fujue-flash' }

  await ctx.deepseekAccount.startSignIn(client(), 'http://127.0.0.1:9', 'desktop')
  await waitForState(ctx.deepseekAccount, state => state.status === 'credential-stored')

  expect(defaults.saved).toEqual([])
  expect(defaults.selection).toEqual({ provider: 'fujue', model: 'fujue-flash' })
})

it('reports an exhausted device code as expired without storing a key', async () => {
  const site = await serveSite([409])
  const { ctx, credentials } = await compose(site.origin)

  await ctx.deepseekAccount.startSignIn(client(), 'http://127.0.0.1:9', 'desktop')
  const settled = await waitForState(ctx.deepseekAccount, state => state.attempt?.phase === 'expired')

  expect(settled.status).toBe('signed-out')
  expect(settled.attempt?.phase).toBe('expired')
  expect(credentials.values.size).toBe(0)
})

it('removes only the key that a rejected request carried', async () => {
  const site = await serveSite([200])
  const { ctx, credentials } = await compose(site.origin)
  const account = ctx.deepseekAccount
  await account.startSignIn(client(), 'http://127.0.0.1:9', 'desktop')
  await waitForState(account, state => state.status === 'credential-stored')

  await account.rejectToken('fj_live_other')
  expect(credentials.values.get('FUJUE_API_KEY')).toBe('fj_live_test')

  await account.rejectToken('fj_live_test')
  expect(credentials.values.has('FUJUE_API_KEY')).toBe(false)
  expect((await account.getState()).status).toBe('signed-out')
})

it('rejects a website URL that cannot be a request origin', async () => {
  const ctx = new Context()
  cleanups.push(() => ctx.fiber.dispose())
  await ctx.plugin(FakeCredentials)
  await ctx.plugin(AuthorizationService)
  const failure: unknown = await ctx.plugin(FujueAccount, { webBaseUrl: 'not-a-url' })
    .then(() => undefined, (error: unknown) => error)
  expect(failure).toBeInstanceOf(Error)
  expect((failure as Error).message).toContain('webBaseUrl')
})
