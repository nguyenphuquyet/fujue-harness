---
description: "The FuJue account provider signs the desktop and web surfaces in with a device code from the FuJue website, then applies the account's gateway API base, model catalog, and default model to this installation."
kind: "package-reference"
---

# @deepseek-ai/dsh-fujue-account

English | [中文](README.zh.md)

## Summary

`@deepseek-ai/dsh-fujue-account` implements the `ctx.deepseekAccount` seam against a FuJue website, so the existing account UI, the `account` Remote namespace, and the model adapters drive it unchanged. Signing in shows a device link, the user approves the code on the website, and the issued API key becomes the credential every model request resolves. A successful sign-in also applies the account's server-owned configuration, so the gateway API base, the model catalog with its display names, and the default model in the picker follow what the website publishes.

## Table of Contents

- [Use this package](#use-this-package)
- [Model Experience](#model-experience)
- [Known Limitations and Deferred Work](#known-limitations-and-deferred-work)

## Use this package

The base bundle mounts this package under the `deepseek-account` row. Its configuration fields:

- `webBaseUrl` - website that issues device codes and serves the harness configuration. The base bundle reads `FUJUE_WEB_URL` and otherwise defaults to `https://harness.nguyenphuquyet.online`.
- `apiKeyEnv` — credential reference receiving the issued key. Defaults to `FUJUE_API_KEY`.
- `providerKey` — pi-ai route key and the provider of the default model. Defaults to `fujue`.
- `piAiNamespace` — settings namespace of the pi-ai adapter entry. Defaults to `llm-pi-ai`.
- `deviceLabel` — label the device page shows; empty sends none.
- `requestTimeoutMs` / `attemptTimeoutMs` — per-request and whole-approval deadlines.

The provider calls three website endpoints: `POST /api/v1/device/start` for the code, `POST /api/v1/device/token` for approval, which answers 428 while the code is pending, and `GET /api/v1/harness/config` with the issued key for the API base, catalog, and default model. Each catalog entry carries its id, display name, context window, and output limit, so the picker shows the account's own names rather than raw ids.

A key can also arrive without the device flow: the desktop welcome screen and the Models page write keys through the credential seam. A key this website issued is recognisable by its `fj_live_` prefix, so the provider copies it to `apiKeyEnv` and reloads the catalog, filling the picker without a restart.

Signing out removes the stored key and empties the route's model list, so no stale model stays selectable. Rejecting a token from a failed request removes it only while it still matches the stored key, then emits `deepseek-account/session-expired`.

## Understand the implementation

After a successful token exchange the provider writes the pi-ai settings section first and the credential second, so a key never becomes visible to a model request before the route that consumes it exists. The route restates each model's id, display name, context window, and output limit on every apply, so a catalog change reaches the next request. The default model is set through `ctx.agentDefaultModel.saveSelection`, the same path the model picker uses, and only when the current selection is not one of the account's models. A stored key reapplies the configuration once at startup, and a key written by another provider re-reads it on the credential notification.

Profile and balance reads come from the harness configuration endpoint, so the account settings page shows the website's account name and address without a second credential. Balance is reported as an empty wallet list; this deployment keeps no wallet.

## Model Experience

None, as the provider registers no prompt section, tool schema, or result text; it writes the model route and the credential that HTTP requests resolve.

#### KV Cache effect

No model request prefix changes. Prompts, tool schemas, and Session events are unaffected.

## Known Limitations and Deferred Work

- The provider has no refresh or expiry flow. A rejected key surfaces through `deepseek-account/session-expired` and requires signing in again.
- Account-wide wins and bonuses, embedded Platform pages, and device identity persistence are not implemented: `getPlatformSession` returns null and the bonus operations are empty.
- Each launch rewrites the model route. A user choice inside the account catalog survives, because the default model is reassigned only when the current selection is not served by the account.
