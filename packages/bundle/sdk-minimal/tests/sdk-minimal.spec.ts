/** The standalone SDK-minimal bundle's complete declared Cordis tree. */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as yaml from 'js-yaml'
import { describe, expect, it } from 'vitest'
import { entryListSchema } from '@quyet/cordis-plugin-include'

function packageName(specifier: string): string {
  return specifier.startsWith('@') ? specifier.split('/').slice(0, 2).join('/') : specifier.split('/')[0]!
}

describe('quyet-sdk-minimal bundle', () => {
  it('declares one standalone allowlisted tree with every row dependency', () => {
    const root = fileURLToPath(new URL('..', import.meta.url))
    const manifest = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')) as {
      dependencies?: Record<string, string>
      quyet?: { bundle?: { patch?: string } }
    }
    expect(manifest.quyet?.bundle?.patch).toBe('./cordis.patch.yml')
    const patches = yaml.load(
      readFileSync(resolve(root, manifest.quyet!.bundle!.patch!), 'utf8'),
      { schema: entryListSchema },
    ) as Array<{ insert?: Array<{ id?: string; inject?: string[]; name?: string; config?: Record<string, unknown>; disabled?: unknown }> }>
    expect(patches).toHaveLength(1)
    const rows = patches[0]?.insert ?? []
    expect(rows.map(row => [row.id, row.name])).toEqual([
      ['sdk-app-startup', '@quyet/sdk-app'],
      ['sdk-jsonrpc-server', '@quyet/sdk-jsonrpc-server'],
      ['deepseek-llm-api-extensions', '@quyet/deepseek-llm-api-extensions'],
      ['session-log-deepseek', '@quyet/session-log-deepseek'],
      ['plugin-package-inventory-deepseek', '@quyet/plugin-package-inventory-deepseek'],
      ['llm-deepseek', '@quyet/llm-deepseek-api-key'],
      ['sandbox', '@quyet/sandbox-local'],
      ['filesystem', '@quyet/fs-local'],
      ['attachment-local', '@quyet/attachment-local'],
      ['tool-fs', '@quyet/tool-fs'],
      ['working-directory', '@quyet/working-directory'],
      ['tool-working-directory', '@quyet/tool-working-directory'],
      ['session-projection', '@quyet/session-projection'],
      ['token-meter', '@quyet/token-meter'],
      ['compaction-basic', '@quyet/compaction-basic'],
      ['image-offload', '@quyet/compaction-image-offload'],
      ['sandbox-policy', '@quyet/sandbox-policy'],
      ['subprocess', '@quyet/subprocess-local'],
      ['pty', '@quyet/terminal'],
      ['terminal-bash', '@quyet/terminal-bash'],
      ['terminal-pwsh', '@quyet/terminal-bash'],
      ['timer', '@quyet/cordis-plugin-timer'],
      ['llm', '@quyet/llm'],
      ['session', '@quyet/session'],
      ['session-title', '@quyet/session-title'],
      ['system-prompt', '@quyet/system-prompt'],
      ['tools', '@quyet/tools'],
      ['tool-executor-native', '@quyet/tool-executor-native'],
      ['mcp-resources', '@quyet/mcp-resources'],
      ['agent', '@quyet/agent'],
      ['llm-retry', '@quyet/llm-retry'],
      ['jobs', '@quyet/jobs-local'],
      ['agent-loop', '@quyet/agent-loop'],
      ['persistent-bash', '@quyet/tool-bash-persistent'],
      ['persistent-pwsh', '@quyet/tool-pwsh-persistent'],
      ['sessions', '@quyet/session-persistence-jsonl'],
      ['session-checkpoint-policy', '@quyet/session-checkpoint-policy'],
    ])
    expect(rows.find(row => row.id === 'sdk-app-startup')?.config).toEqual({ profile: 'sdk-minimal' })
    expect(rows.find(row => row.id === 'sdk-jsonrpc-server')).toMatchObject({
      inject: ['sdkAppStartup', 'loader'],
      config: { maxTokensAsSuccess: false },
    })
    expect(rows.find(row => row.id === 'llm-deepseek')?.config).toEqual({
      apiKeyEnv: 'DEEPSEEK_API_KEY',
      defaultContextWindow: { __jsExpr: 'Number(process.env.QUYET_CONTEXT_WINDOW ?? 1000000)' },
      streamIdleTimeoutMs: 172800000,
    })
    expect(rows.find(row => row.id === 'system-prompt')?.config).toEqual({
      includeHarnessIdentity: false,
      includeRuntimeContext: false,
      personaPrefix: { __jsExpr: "process.env.QUYET_SYSTEM_PROMPT ?? 'You are a helpful software engineer assistant.'" },
    })
    expect(rows.find(row => row.id === 'agent-loop')?.config).toEqual({ agents: [] })
    expect(rows.find(row => row.id === 'tool-fs')?.config).toEqual({ read: false, readImage: true, write: false, edit: false })
    expect(rows.find(row => row.id === 'compaction-basic')?.config).toBeUndefined()
    expect(rows.find(row => row.id === 'terminal-bash')).toMatchObject({
      disabled: { __jsExpr: "process.platform === 'win32'" },
    })
    expect(rows.find(row => row.id === 'terminal-pwsh')).toMatchObject({
      disabled: { __jsExpr: "process.platform !== 'win32'" },
      config: { shellDialect: 'pwsh', timeoutMs: 300000 },
    })
    expect(Object.keys(manifest.dependencies ?? {}).sort()).toEqual(
      [...new Set(rows.map(row => row.name).filter((name): name is string => name !== undefined).map(packageName))].sort(),
    )
  })
})
