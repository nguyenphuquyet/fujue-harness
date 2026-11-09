---
kind: upgrade-guide
description: "The built-in Vietnamese locale conflicts with third-party language packs that already use the `vi` id."
---

# Built-in Vietnamese replaces duplicate `vi` language packs

English | [中文](guide.zh.md)

## Change

The locale plugin registers `vi` with dictionaries for `common`, `settings.locale`, the desktop shell, and the built-in UI plugins. Third-party language packs using `vi` now fail with an already-registered language or dictionary error.

## Migration

1. In the language pack's client entry, remove `ctx.locale.addLanguage(...)` for `vi` and dictionary registrations in namespaces supplied by built-in plugins. Keep translations for namespaces owned by your own plugins.
2. If the pack represents a distinct language variant, register a separate BCP 47-style id, such as `vi-VN`, for both the definition and its dictionaries instead of the built-in id.
3. Reload the application with the pack enabled. Confirm it starts without duplicate-registration errors and that selecting Vietnamese displays the built-in translations.
