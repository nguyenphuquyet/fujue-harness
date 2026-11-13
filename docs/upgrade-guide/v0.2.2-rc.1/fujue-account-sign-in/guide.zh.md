---
kind: upgrade-guide
description: "基础 bundle 的 `deepseek-account` 行改为通过 FuJue 网站登录，不再使用 DeepSeek Platform。"
---

# 基础 bundle 的登录改用 FuJue 账户提供者

[English](guide.md) | 中文

## 变更

基础 bundle 的 `deepseek-account` 行挂载 `@deepseek-ai/dsh-fujue-account`，取代 `@deepseek-ai/dsh-deepseek-account-platform`。登录会在 FuJue 网站上开启 device code，账户的网关 API 地址、模型目录与默认模型会在每次登录以及每次启动时写入当前 profile 的 `llm-pi-ai` 和 `agent-default-model` 段。

有两处可见影响：

- 登录对话框、账户菜单与 `account` Remote 命名空间保持不变，但它们打开的浏览器页面是 FuJue 网站的 device 页面。
- 早期版本保存的 DeepSeek Platform 账户不再被读取。Platform 提供者不再挂载，因此其凭据与资料都不会被解析或刷新。

## 迁移

1. 通过导出 `FUJUE_WEB_URL` 或在 `deepseek-account` 行设置 `webBaseUrl`，让部署指向对应网站。默认值为 `https://harness.nguyenphuquyet.online`。
2. 启动应用并从账户菜单登录。device 页面会显示代码，批准后会把该账户的路由与默认模型写入当前 profile 的 `cordis.patch.yml`。
3. 若仍需保留 Platform 提供者，新增一行挂载 `@deepseek-ai/dsh-deepseek-account-platform`，禁用被替换的 `deepseek-account` 行，然后重新登录 Platform。两个提供者实现同一个服务，只能挂载其中一个。
