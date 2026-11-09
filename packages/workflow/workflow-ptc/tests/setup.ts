import { externalTestParent } from '../../../subagent/subagent/tests/external-activation-helpers.ts'
import { mkdtemp, mkdir, rm } from 'node:fs/promises'
import { homedir } from 'node:os'
import { join } from 'node:path'
import type { Context } from '@quyet/cordis'
import type { Agent } from '@quyet/agent'
import AgentRegistry from '@quyet/agent'
import SessionStore from '@quyet/session'
import SessionProjections from '@quyet/session-projection'
import * as JsonlSessionPersistence from '@quyet/session-persistence-jsonl'
import FileSystem from '@quyet/fs-local'
import Subprocess from '@quyet/subprocess-local'
import Sandbox from '@quyet/sandbox-local'
import SandboxPolicy from '@quyet/sandbox-policy'
import type { SandboxMode } from '@quyet/sandbox'
import NodePtcRuntime from '@quyet/ptc-runtime-node'
import type { Config as NodeRuntimeConfig } from '@quyet/ptc-runtime-node'
import { onTestFinished } from 'vitest'

/** Mount real Node execution services with a private working directory and awaited cleanup. */
export async function mountPtcRuntime(ctx: Context, mode: SandboxMode = 'danger-full-access', executionMode: NodeRuntimeConfig['executionMode'] = 'per-call') {
  const root = await mkdtemp(join(homedir(), '.quyet-workflow-test-'))
  onTestFinished(async () => {
    await ctx.fiber.dispose()
    await rm(root, { recursive: true, force: true })
  })
  const cwd = join(root, 'workspace')
  await mkdir(cwd)
  await mountWorkflowRuntime(ctx, { cwd, mode, runtimeConfig: { graceMs: 50, executionMode } })
  await ctx.plugin(JsonlSessionPersistence, { root: join(root, 'sessions') })
  return { root, cwd }
}

/** Mount the real execution services in a caller-owned context and directory. */
export async function mountWorkflowRuntime(
  ctx: Context,
  options: { cwd?: string; mode?: SandboxMode; runtimeConfig?: NodeRuntimeConfig } = {},
): Promise<NodePtcRuntime> {
  if (!ctx.get('sessions')) await ctx.plugin(SessionStore)
  if (!ctx.get('sessionProjections')) await ctx.plugin(SessionProjections)
  if (!ctx.get('agents')) await ctx.plugin(AgentRegistry)
  if (!ctx.get('fs')) await ctx.plugin(FileSystem)
  if (!ctx.get('subprocess')) await ctx.plugin(Subprocess)
  if (!ctx.get('sandbox')) await ctx.plugin(Sandbox)
  if (!ctx.get('sandboxPolicy')) await ctx.plugin(SandboxPolicy, {
    mode: options.mode ?? 'danger-full-access',
    ...options.cwd === undefined ? {} : { workspaceRoot: options.cwd },
  })
  if (!ctx.get('ptcRuntime')) await ctx.plugin(NodePtcRuntime, options.runtimeConfig ?? {})
  return ctx.ptcRuntime as NodePtcRuntime
}

/** Give a stub subagent provider a parent with a real Session and immutable cwd. */
export async function fakeParent(ctx: Context): Promise<Agent> {
  return externalTestParent(ctx, ctx.sandboxPolicy.workspaceRoot)
}
