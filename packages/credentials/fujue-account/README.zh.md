---
description: "FuJue 账户提供者用 FuJue 网站的 device code 登录桌面端与 Web 端，然后把账户的网关 API 地址、模型目录和默认模型应用到当前安装。"
kind: "package-reference"
---

# @deepseek-ai/dsh-fujue-account

[English](README.md) | 中文

## Summary

`@deepseek-ai/dsh-fujue-account` 用 FuJue 网站实现 `ctx.deepseekAccount` 服务，现有账户界面、`account` Remote 命名空间和模型适配器无需修改即可使用。登录时显示 device 链接，用户在网站上批准该代码，签发的 API key 成为每个模型请求解析的凭据。登录成功后还会应用该账户在服务端持有的配置，因此网关 API 地址、带显示名称的模型目录和选择器中的默认模型都跟随网站发布的内容。

## Table of Contents

- [Use this package](#use-this-package)
- [Model Experience](#model-experience)
- [Known Limitations and Deferred Work](#known-limitations-and-deferred-work)

## Use this package

基础 bundle 在 `deepseek-account` 行挂载本包。配置项：

- `webBaseUrl` — 签发 device code 并提供 harness 配置的网站。基础 bundle 读取 `FUJUE_WEB_URL`，默认 `https://harness.nguyenphuquyet.online`。
- `apiKeyEnv` — 接收签发 key 的凭据引用，默认 `FUJUE_API_KEY`。
- `providerKey` — pi-ai 路由键，同时是默认模型的 provider，默认 `fujue`。
- `piAiNamespace` — pi-ai 适配器条目的 settings 命名空间，默认 `llm-pi-ai`。
- `deviceLabel` — device 页面显示的名称；为空则不发送。
- `requestTimeoutMs` / `attemptTimeoutMs` — 单次请求与整个批准流程的超时。

提供者访问三个网站端点：`POST /api/v1/device/start` 取代码，`POST /api/v1/device/token` 查询批准并在待批准时返回 428，以及携带签发 key 的 `GET /api/v1/harness/config` 读取 API 地址、目录和默认模型。每个目录条目包含 id、显示名称、上下文窗口和输出上限，因此选择器显示账户自己的名称而不是原始 id。

key 也可以不经 device 流程到达：桌面欢迎页和 Models 页通过凭据服务写入 key。本站签发的 key 以 `fj_live_` 前缀区分，提供者会把它复制到 `apiKeyEnv` 并重新读取目录，无需重启即可填充选择器。

退出登录删除已保存的 key 并清空该路由的模型列表，因此不会残留可选模型。请求失败被拒绝的 token 只在仍与已保存 key 一致时删除，随后发出 `deepseek-account/session-expired`。

## Understand the implementation

token 交换成功后，提供者先写 pi-ai settings 段、再写凭据，因此 key 不会在消费它的路由存在之前被模型请求看到。每次应用都会重写每个模型的 id、显示名称、上下文窗口和输出上限，因此目录变更会到达下一个请求。默认模型通过 `ctx.agentDefaultModel.saveSelection` 设置，与模型选择器同一路径，并且只在当前选择不属于该账户模型时写入。已保存的 key 在启动时重新应用一次配置，其他提供者写入的 key 则在凭据通知时重新读取。

资料与余额读取来自 harness 配置端点，因此账户设置页显示网站账户的名称与地址，无需第二个凭据。余额报告为空钱包列表；该部署不保留钱包。

## Model Experience

None, as the provider registers no prompt section, tool schema, or result text; it writes the model route and the credential that HTTP requests resolve.

#### KV Cache effect

No model request prefix changes. Prompts, tool schemas, and Session events are unaffected.

## Known Limitations and Deferred Work

- 没有刷新或过期流程。被拒绝的 key 通过 `deepseek-account/session-expired` 暴露，需要重新登录。
- 账户充值、赠送、嵌入式 Platform 页面与设备标识持久化未实现：`getPlatformSession` 返回 null，赠送相关操作为空。
- 每次启动都会重写模型路由。账户目录内的用户选择会保留，因为只有当前选择不被账户提供时才重新指定默认模型。
