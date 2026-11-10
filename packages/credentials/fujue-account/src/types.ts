/** Website wire payloads read by the FuJue account provider. */
import type { SignInErrorCode } from '@deepseek-ai/dsh-deepseek-account'

/** Response of `POST /api/v1/device/start`. */
export interface DeviceStartResponse {
  readonly device_code: string
  readonly user_code: string
  readonly verification_uri: string
  readonly expires_in: number
  readonly interval: number
}

/** User fields returned with an issued API key. */
export interface DeviceUser {
  readonly email: string
  readonly name: string | null
}

/** One model of the account's harness configuration. */
export interface HarnessModel {
  /** Id sent to the gateway as the model name. */
  readonly id: string
  /** Optional display name; absent keeps the id. */
  readonly name?: string
  /** Combined request and response context in tokens. */
  readonly contextWindow?: number
  /** Maximum output tokens. */
  readonly maxTokens?: number
}

/** Response of `GET /api/v1/harness/config`. */
export interface HarnessConfigResponse {
  /** Gateway base URL every model of this account is served from. */
  readonly baseUrl: string
  /** Display identity of the account that owns the key. */
  readonly account: DeviceUser & { readonly plan: string }
  /** Model the website marks as default, or null for an empty catalog. */
  readonly defaultModel: string | null
  /** Complete catalog, every entry bound to {@link baseUrl}. */
  readonly models: readonly HarnessModel[]
}

/** Outcome of one device-token poll. */
export type DeviceTokenOutcome =
  | { readonly status: 'pending' }
  | { readonly status: 'expired' }
  | { readonly status: 'issued'; readonly apiKey: string; readonly user: DeviceUser }

/**
 * Rejection raised while talking to the website.
 * Its code is the client-safe sign-in code the account UI already renders.
 */
export class FujueRequestError extends Error {
  /**
   * @param code - client-safe failure code.
   * @param message - maintainer diagnostic; never rendered.
   */
  constructor(readonly code: SignInErrorCode, message: string) {
    super(message)
    this.name = 'FujueRequestError'
  }
}
