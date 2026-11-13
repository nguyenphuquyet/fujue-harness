---
kind: upgrade-guide
description: "The base bundle's `deepseek-account` row now signs in through the FuJue website instead of the DeepSeek Platform."
---

# Base-bundle sign-in moves to the FuJue account provider

English | [中文](guide.zh.md)

## Change

The base bundle's `deepseek-account` row mounts `@deepseek-ai/dsh-fujue-account` instead of `@deepseek-ai/dsh-deepseek-account-platform`. Signing in starts a device code on the FuJue website, and the account's gateway API base, model catalog, and default model are written into the active profile's `llm-pi-ai` and `agent-default-model` sections on every sign-in and at startup.

Two consequences are visible:

- The sign-in dialog, the account menu, and the `account` Remote namespace are unchanged, but the browser page they open is the FuJue website's device page.
- A DeepSeek Platform account stored by an earlier launch is no longer read. The Platform provider is not mounted, so nothing resolves its credential or refreshes its profile.

## Migration

1. Point the deployment at its website by exporting `FUJUE_WEB_URL` or by setting `webBaseUrl` on the `deepseek-account` row. The default is `https://harness.nguyenphuquyet.online`.
2. Launch the application and sign in from the account menu. The device page shows a code; approving it writes the account's route and default model into the active profile's `cordis.patch.yml`.
3. To keep the Platform provider, add a row that mounts `@deepseek-ai/dsh-deepseek-account-platform`, disable the replaced `deepseek-account` row, and sign in to Platform again. Both providers implement the same service, so only one may be mounted.
