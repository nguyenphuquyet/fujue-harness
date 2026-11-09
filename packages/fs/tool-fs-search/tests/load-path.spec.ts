/**
 * Real-load-path guard for @quyet/tool-fs-search. `tool-fs-search` is
 * a NAMESPACE plugin with `inject` — so a stray `export default apply` would
 * make the cordis Loader's `unwrapExports` (`exports.default ?? exports`)
 * collapse the module to the bare `apply` function, DROPPING `inject`. The
 * plugin would then read `ctx.subprocess` without having injected it and throw
 * `cannot get property … without inject` the moment it loads (postmortem 0001).
 *
 * A hand-built `ctx.plugin({ apply, inject })` mount CANNOT catch that — it
 * bypasses `unwrapExports`. So this test unwraps the module through the REAL
 * `Loader.prototype.unwrapExports` and mounts the result over the real local
 * subprocess service, exercising the exact path the Loader uses. Prove the
 * guard bites: add `export default apply` to `src/index.ts`, watch this go
 * red, revert.
 */

import * as NativeToolExecutor from '@quyet/tool-executor-native'
import { provideWorkingDirectoryFixture } from '@quyet/agent-loop-testkit'
import { describe, expect, it } from 'vitest'
import { Context } from '@quyet/cordis'
import Loader from '@quyet/cordis-plugin-loader'
import SystemPrompt from '@quyet/system-prompt'
import ToolRuntime from '@quyet/tools'
import LocalSubprocessRuntime from '@quyet/subprocess-local'
import * as toolFsSearch from '@quyet/tool-fs-search'

describe('quyet-tool-fs-search real-load-path guard', () => {
  it('has no default export and keeps name/inject/Config through unwrapExports', () => {
    expect('default' in toolFsSearch).toBe(false)

    const loader = Object.create(Loader.prototype) as Loader
    const unwrapped = loader.unwrapExports(toolFsSearch) as Record<string, unknown>
    expect(unwrapped).toBe(toolFsSearch)
    expect(unwrapped.name).toBe('tool-fs-search')
    expect(unwrapped.inject).toEqual(['tools', 'systemPrompt', 'subprocess', 'workingDirectory'])
    expect(typeof unwrapped.Config).toBe('function')
    expect(typeof unwrapped.apply).toBe('function')
  })

  it('boots over ctx.subprocess through the unwrapped module without an inject error', async () => {
    const ctx = new Context()
    provideWorkingDirectoryFixture(ctx)
    await ctx.plugin(SystemPrompt)
    await ctx.plugin(ToolRuntime)
    await ctx.plugin(NativeToolExecutor)
    await ctx.plugin(LocalSubprocessRuntime)

    const loader = Object.create(Loader.prototype) as Loader
    const unwrapped = loader.unwrapExports(toolFsSearch) as Parameters<Context['plugin']>[0]
    // A collapsed export shape (dropped inject) would throw "without inject" here.
    const fiber = await ctx.plugin(unwrapped, { sampleOverCapGlobResults: true })
    expect(ctx.tools.schemas().map(s => s.name)).toEqual(expect.arrayContaining(['glob', 'grep']))
    await fiber.dispose()
  })
})
