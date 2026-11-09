---
kind: upgrade-guide
description: "Plugin compatibility checks read engines.quyet before Quyết peerDependencies, and refusals report requirements instead of peers."
---

# Plugin compatibility reads `engines.quyet` first

English | [中文](guide.zh.md)

## Change

In v0.2.1-alpha.3, installation and profile startup judged a plugin or bundle only by its `peerDependencies` on `@quyet/harness` and `@quyet/*`, and ignored `engines.quyet`. In the next release, an own `engines.quyet` range decides alone and those peers are ignored; the peer rule applies only when `engines.quyet` is absent. `workspace:` values are valid only in peers; in `engines.quyet` they are incompatible. A non-object `engines` or a non-string `engines.quyet` makes the manifest unreadable for compatibility, which refuses the package. Plugin authors whose package declares `engines.quyet`, or declares `engines` as something other than an object, are affected.

The `incompatible-version` refusal record that the plugin manager returns to clients, `IncompatiblePlugin`, and the app-boot `PluginCompatibility` result rename `peers` to `requirements`. Keys are `engines.quyet` for the engines rule or the peer package name for the fallback. Code that reads these records is affected.

## Migration

1. If your package declares `engines.quyet`, make that range cover every Quyết release the package supports, because Quyết peer ranges no longer widen or narrow it. Remove `engines.quyet` to keep peer-based checking.
2. Replace `workspace:` values in `engines.quyet` with a semantic version range.
3. Read `requirements` instead of `peers` from `IncompatiblePlugin` and `PluginCompatibility`.
4. Confirm by installing the package with `quyet plugin --profile <profile> add <package@version>` or the plugin manager: a mismatch names `engines.quyet` or the peer package in the refusal.
