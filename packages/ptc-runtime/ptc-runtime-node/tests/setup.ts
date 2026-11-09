import { Context } from '@quyet/cordis'
import { onTestFinished } from 'vitest'
import SessionStore from '@quyet/session'
import FileSystem from '@quyet/fs-local'
import Subprocess from '@quyet/subprocess-local'
import Sandbox from '@quyet/sandbox-local'
import SandboxPolicy from '@quyet/sandbox-policy'
import SessionProjections from '@quyet/session-projection'
import type { SandboxMode } from '@quyet/sandbox'
import NodeRuntime from '../src/index.ts'
import type { Config } from '../src/index.ts'

export async function mountRuntime(ctx: Context, config: Config = {}, policy: { mode?: SandboxMode; workspaceRoot?: string } = {}) {
  onTestFinished(async () => { await ctx.fiber.dispose() })
  if (!ctx.get('sessions')) await ctx.plugin(SessionStore)
  if (!ctx.get('fs')) await ctx.plugin(FileSystem)
  if (!ctx.get('subprocess')) await ctx.plugin(Subprocess)
  if (!ctx.get('sandbox')) await ctx.plugin(Sandbox, {})
  if (!ctx.get('sessionProjections')) await ctx.plugin(SessionProjections)
  if (!ctx.get('sandboxPolicy')) await ctx.plugin(SandboxPolicy, { mode: 'danger-full-access', ...policy })
  const fiber = await ctx.plugin(NodeRuntime, config)
  return { runtime: ctx.ptcRuntime as NodeRuntime, fiber }
}
