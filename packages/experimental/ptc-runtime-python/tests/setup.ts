import { Context } from '@quyet/cordis'
import Sandbox from '@quyet/sandbox-local'
import SandboxPolicy from '@quyet/sandbox-policy'
import SessionProjections from '@quyet/session-projection'
import { onTestFinished } from 'vitest'
import type { SandboxMode } from '@quyet/sandbox'

/** Mount the Python runtime's policy and confinement providers with owned teardown. */
export async function createRuntimeContext(policy: { mode?: SandboxMode; workspaceRoot?: string } = {}): Promise<Context> {
  const ctx = new Context()
  onTestFinished(async () => { await ctx.fiber.dispose() })
  await ctx.plugin(Sandbox, {})
  await ctx.plugin(SessionProjections)
  await ctx.plugin(SandboxPolicy, { mode: 'danger-full-access', ...policy })
  return ctx
}
