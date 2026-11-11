/** HTTP calls to the FuJue website: device authorization, token exchange, and the account harness configuration. */
import type { ResolvedConfig } from './config.ts'
import {
  FujueRequestError, type DeviceStartResponse, type DeviceTokenOutcome, type DeviceUser, type HarnessConfigResponse, type HarnessModel,
} from './types.ts'

/** How long one redirect or JSON body may take to arrive after the response headers. */
const REQUEST_DEADLINE = (config: ResolvedConfig): AbortSignal => AbortSignal.timeout(config.requestTimeoutMs)

/** One decoded website response. */
interface WireResponse {
  readonly status: number
  readonly body: unknown
}

/**
 * Send one request and decode its JSON body, translating transport failures into client-safe codes.
 * @param config - deployment choices supplying the deadline.
 * @param url - absolute request URL.
 * @param init - method, headers, and body.
 * @param signal - attempt lifetime; aborting it rejects with the abort reason.
 * @returns the status and decoded body.
 */
async function requestJson(
  config: ResolvedConfig, url: string, init: RequestInit, signal: AbortSignal,
): Promise<WireResponse> {
  const lifetime = AbortSignal.any([signal, REQUEST_DEADLINE(config)])
  let response: Response
  try {
    response = await fetch(url, { ...init, signal: lifetime })
  } catch (error) {
    if (signal.aborted) throw error
    throw new FujueRequestError('no-response', `fujue-account: ${init.method ?? 'GET'} ${url} returned no response`)
  }
  let body: unknown
  try {
    body = await response.json()
  } catch (error) {
    if (signal.aborted) throw error
    throw new FujueRequestError('protocol', `fujue-account: ${init.method ?? 'GET'} ${url} did not return JSON`)
  }
  return { status: response.status, body }
}

/** Read one string member of a decoded object, or undefined when the container or member is absent. */
function field(node: unknown, key: string): unknown {
  if (typeof node !== 'object' || node === null) return undefined
  return (node as Record<string, unknown>)[key]
}

/** Read one finite number member, or undefined. */
function numberField(node: unknown, key: string): number | undefined {
  const value = field(node, key)
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined
}

/**
 * Start one device authorization.
 * @param config - deployment choices supplying the website URL and the device label.
 * @param signal - attempt lifetime.
 * @returns the device code, the user code, and the site's polling interval.
 */
export async function startDevice(config: ResolvedConfig, signal: AbortSignal): Promise<DeviceStartResponse> {
  const url = `${config.webBaseUrl}/api/v1/device/start`
  const { status, body } = await requestJson(config, url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify(config.deviceLabel === '' ? {} : { label: config.deviceLabel }),
  }, signal)
  const deviceCode = field(body, 'device_code')
  const userCode = field(body, 'user_code')
  const verificationUri = field(body, 'verification_uri')
  const expiresIn = numberField(body, 'expires_in')
  const interval = numberField(body, 'interval')
  if (status !== 201 || typeof deviceCode !== 'string' || typeof userCode !== 'string'
    || typeof verificationUri !== 'string' || expiresIn === undefined || interval === undefined) {
    throw new FujueRequestError('protocol', `fujue-account: device start answered ${String(status)} without a device code`)
  }
  return { device_code: deviceCode, user_code: userCode, verification_uri: verificationUri, expires_in: expiresIn, interval }
}

/**
 * Poll one device code for approval, exchanging it for an API key once the user approved it.
 * @param config - deployment choices supplying the website URL.
 * @param deviceCode - code issued by {@link startDevice}.
 * @param signal - attempt lifetime.
 * @returns pending, expired, or the issued key with its user.
 */
export async function pollDeviceToken(
  config: ResolvedConfig, deviceCode: string, signal: AbortSignal,
): Promise<DeviceTokenOutcome> {
  const url = `${config.webBaseUrl}/api/v1/device/token`
  const { status, body } = await requestJson(config, url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({ device_code: deviceCode }),
  }, signal)
  if (status === 428) return { status: 'pending' }
  if (status === 400 || status === 409) return { status: 'expired' }
  if (status !== 200) {
    throw new FujueRequestError('network', `fujue-account: device token answered ${String(status)}`)
  }
  const apiKey = field(body, 'api_key')
  const user = field(body, 'user')
  const email = field(user, 'email')
  const name = field(user, 'name')
  if (typeof apiKey !== 'string' || apiKey === '' || typeof email !== 'string') {
    throw new FujueRequestError('protocol', 'fujue-account: issued device token carried no API key')
  }
  const parsedUser: DeviceUser = { email, name: typeof name === 'string' ? name : null }
  return { status: 'issued', apiKey, user: parsedUser }
}

/**
 * Read the account's harness configuration: gateway URL, default model, and the complete catalog.
 * @param config - deployment choices supplying the website URL.
 * @param apiKey - key issued for this account.
 * @param signal - request lifetime.
 * @returns the parsed configuration.
 */
export async function fetchHarnessConfig(
  config: ResolvedConfig, apiKey: string, signal: AbortSignal,
): Promise<HarnessConfigResponse> {
  const url = `${config.webBaseUrl}/api/v1/harness/config`
  const { status, body } = await requestJson(config, url, {
    method: 'GET',
    headers: { authorization: `Bearer ${apiKey}`, accept: 'application/json' },
  }, signal)
  if (status === 401) throw new FujueRequestError('expired', 'fujue-account: the website rejected the issued API key')
  if (status !== 200) throw new FujueRequestError('network', `fujue-account: harness config answered ${String(status)}`)
  const baseUrl = field(field(body, 'api'), 'base_url')
  const account = field(body, 'account')
  const email = field(account, 'email')
  const name = field(account, 'name')
  const plan = field(account, 'plan')
  const rawModels = field(body, 'models')
  const defaultModel = field(body, 'default_model')
  if (typeof baseUrl !== 'string' || baseUrl === '' || typeof email !== 'string' || !Array.isArray(rawModels)) {
    throw new FujueRequestError('protocol', 'fujue-account: harness config is missing the API base URL or the model catalog')
  }
  const models = rawModels.flatMap((entry): HarnessModel[] => {
    const id = field(entry, 'id')
    if (typeof id !== 'string' || id === '') return []
    const name = field(entry, 'name')
    const contextWindow = numberField(entry, 'context_window')
    const maxTokens = numberField(entry, 'max_output_tokens')
    return [{
      id,
      ...typeof name !== 'string' || name === '' ? {} : { name },
      ...contextWindow === undefined ? {} : { contextWindow },
      ...maxTokens === undefined ? {} : { maxTokens },
    }]
  })
  if (models.length === 0) {
    throw new FujueRequestError('protocol', 'fujue-account: the account catalog serves no usable model')
  }
  return {
    baseUrl,
    account: { email, name: typeof name === 'string' ? name : null, plan: typeof plan === 'string' ? plan : 'free' },
    defaultModel: typeof defaultModel === 'string' && defaultModel !== '' && models.some(model => model.id === defaultModel)
      ? defaultModel
      : null,
    models,
  }
}
