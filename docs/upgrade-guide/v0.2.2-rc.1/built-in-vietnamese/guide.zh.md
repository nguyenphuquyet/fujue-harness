---
kind: upgrade-guide
description: "内置越南语 locale 与已经使用 `vi` id 的第三方语言包冲突。"
---

# 内置越南语取代重复的 `vi` 语言包

[English](guide.md) | 中文

## 变更

locale 插件现在注册 `vi`，并为 `common`、`settings.locale`、桌面外壳和内置 UI 插件提供字典。已经使用 `vi` 的第三方语言包现在会因语言或字典已注册而失败。

## 迁移

1. 在语言包的 client 入口中，移除 `vi` 的 `ctx.locale.addLanguage(...)`，以及由内置插件提供的命名空间字典注册。保留你自己插件拥有的命名空间翻译。
2. 如果该语言包代表不同的语言变体，请为定义和字典注册一个独立的 BCP 47 风格 id（例如 `vi-VN`），而不是内置 id。
3. 启用语言包后重新加载应用。确认启动时没有重复注册错误，并且选择越南语时显示内置翻译。
