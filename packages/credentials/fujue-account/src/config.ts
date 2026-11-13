/** Deployment choices for the FuJue account provider. */
import Schema from '@deepseek-ai/schemastery'

/** Website and settings targets this provider owns. */
export interface Config {
  /** Base URL of the FuJue website that issues device codes and serves the harness configuration. */
  webBaseUrl?: string
  /** Credential reference that receives the issued API key. */
  apiKeyEnv?: string
  /** Provider route key written into the pi-ai settings and used as the default model's provider. */
  providerKey?: string
  /** Settings namespace of the pi-ai adapter entry. */
  piAiNamespace?: string
  /** Label the website shows on its device-approval page; empty omits the label. */
  deviceLabel?: string
  /** Deadline for one website request. */
  requestTimeoutMs?: number
  /** Upper bound on the whole waiting-for-approval phase; the website's own device TTL still applies. */
  attemptTimeoutMs?: number
}

/** Validated deployment choices. */
export const Config = Schema.object({
  webBaseUrl: Schema.string().default('https://harness.nguyenphuquyet.online'),
  apiKeyEnv: Schema.string().default('FUJUE_API_KEY'),
  providerKey: Schema.string().default('fujue'),
  piAiNamespace: Schema.string().default('llm-pi-ai'),
  deviceLabel: Schema.string().default(''),
  requestTimeoutMs: Schema.number().min(1).max(120_000).default(15_000),
  attemptTimeoutMs: Schema.number().min(1).max(3_600_000).default(600_000),
})

/** Deployment choices after validation, with the website URL normalized. */
export interface ResolvedConfig {
  /** Website origin without a trailing slash. */
  readonly webBaseUrl: string
  /** Validated credential reference name. */
  readonly apiKeyEnv: string
  /** Validated pi-ai route key. */
  readonly providerKey: string
  /** Settings namespace of the pi-ai adapter entry. */
  readonly piAiNamespace: string
  /** Device label, or an empty string. */
  readonly deviceLabel: string
  /** Per-request deadline in milliseconds. */
  readonly requestTimeoutMs: number
  /** Whole-attempt deadline in milliseconds. */
  readonly attemptTimeoutMs: number
}

/** Credential references and provider route keys this provider accepts. */
const IDENTIFIER = /^[A-Za-z_][A-Za-z0-9_]*$/
/** Pi-ai route keys are lowercase hyphenated identifiers. */
const ROUTE_KEY = /^[a-z][a-z0-9-]*$/

/**
 * Validate the deployment choices this provider sends to the website and writes into settings.
 * @param config - Loader-supplied configuration.
 * @returns the resolved configuration.
 * @throws Error naming the first invalid field.
 */
export function resolveConfig(config: Config = {}): ResolvedConfig {
  const resolved = Config(config) as Required<Config>
  let url: URL
  try {
    url = new URL(resolved.webBaseUrl)
  } catch {
    throw new Error(`fujue-account: webBaseUrl "${resolved.webBaseUrl}" is not a URL`)
  }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash) {
    throw new Error('fujue-account: webBaseUrl must be an HTTP(S) origin without credentials, query, or fragment')
  }
  if (!IDENTIFIER.test(resolved.apiKeyEnv)) {
    throw new Error(`fujue-account: apiKeyEnv "${resolved.apiKeyEnv}" is not a credential reference name`)
  }
  if (!ROUTE_KEY.test(resolved.providerKey)) {
    throw new Error(`fujue-account: providerKey "${resolved.providerKey}" must be a lowercase hyphenated route key`)
  }
  return {
    webBaseUrl: `${url.origin}${url.pathname.replace(/\/+$/, '')}`,
    apiKeyEnv: resolved.apiKeyEnv,
    providerKey: resolved.providerKey,
    piAiNamespace: resolved.piAiNamespace,
    deviceLabel: resolved.deviceLabel,
    requestTimeoutMs: resolved.requestTimeoutMs,
    attemptTimeoutMs: resolved.attemptTimeoutMs,
  }
}
