---
kind: upgrade-guide
description: "The `agent-instructions` row no longer accepts `quyetHome`; instruction loading always resolves the harness home from `$QUYET_HOME` or `~/.quyet`."
---

# Instruction loading resolves one harness home

English | [中文](guide.zh.md)

## Change

`@quyet/agent-instructions` removed its `quyetHome` config field. The plugin resolves the harness home through `resolveQuyetHome()` from `@quyet/home-paths`, like every other harness consumer: the home is `$QUYET_HOME` when it is set and non-blank, otherwise `~/.quyet`, with tilde expansion.

A `cordis.yml`, profile patch, or `--patch` overlay that still sets `quyetHome` on the `agent-instructions` row has no effect: the row keeps the stray key and the plugin ignores it, so instruction loading follows the process home. Other providers, such as `quyet-skill-filesystem` and `quyet-shell-env`, keep their own home fields; this removal covers the instruction loader only.

## Migration

1. Delete `quyetHome` from the `agent-instructions` row in `cordis.yml`, `$QUYET_HOME/cordis.patch.yml`, `$QUYET_HOME/profiles/<profile>/cordis.patch.yml`, and any `--patch` overlay.
2. Where the override pointed at a non-default home, export `QUYET_HOME` for the process instead, so every harness consumer reads that home.
3. Confirm with `quyet --profile <profile> --dump-config` that the `agent-instructions` row lists only its remaining fields, and that a new session's first request shows `Instructions from: $QUYET_HOME/AGENTS.md` (or `~/.quyet/AGENTS.md`) when that file exists.
