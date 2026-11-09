/**
 * Registry tests for `@quyet/shell-env`: built-in facts, contributor
 * ownership and validation, collection ordering, effect-scoped disposal, and
 * the explicit disposer contract.
 */

import { homedir } from 'node:os'
import { join, resolve } from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Context } from '@quyet/cordis'
import { ToolCallId } from '@quyet/llm'
import type { Agent } from '@quyet/agent'
import { SESSION_FORMAT_VERSION } from '@quyet/session'
import type { ToolExecution } from '@quyet/tools'
import { ShellEnvRegistry } from '@quyet/shell-env'
import * as BashEnvPlugin from '@quyet/shell-env'

const testToolSignal = new AbortController().signal

afterEach(() => vi.unstubAllEnvs())

function execution(sessionId?: string): ToolExecution {
  return {
    signal: testToolSignal,
    token: Symbol('bash-env-test') as ToolExecution['token'],
    callId: ToolCallId('bash-env-call'),
    rootCallId: ToolCallId('bash-env-call'),
    name: 'bash',
    arguments: { command: 'true' },
    ...(sessionId === undefined
      ? {}
      : {
        agent: {
          session: {
            header: { version: SESSION_FORMAT_VERSION, id: sessionId, createdAt: 0, isSeeded: false },
          },
        } as unknown as Agent,
      }),
  }
}

describe('ShellEnvRegistry', () => {
  it('collects unconditional shell facts and the current agent session id', () => {
    const ctx = new Context()
    const registry = new ShellEnvRegistry(ctx, { quyetHome: './test-quyet-home' })

    expect(registry.collect(execution())).toEqual({
      QUYET_HOME: resolve('./test-quyet-home'),
      QUYET_SHELL: '1',
    })
    expect(registry.collect(execution('session-a'))).toEqual({
      QUYET_HOME: resolve('./test-quyet-home'),
      QUYET_SESSION_ID: 'session-a',
      QUYET_SHELL: '1',
    })
  })

  it('collects the launcher-provided profile name and directory when a profile context exists', () => {
    const ctx = new Context()
    ctx.provide('profileContext', {
      name: 'web', dir: '/profiles/web', patchPath: '/profiles/web/cordis.patch.yml', installAnchor: '/quyet/package.json',
      cwd: '/work', home: '/home', startedBundles: [], overlays: [], telemetryDisabledEnv: undefined,
    })
    const registry = new ShellEnvRegistry(ctx, { quyetHome: './test-quyet-home' })
    expect(registry.collect(execution())).toMatchObject({ QUYET_PROFILE: 'web', QUYET_PROFILE_DIR: '/profiles/web' })
    expect(() => registry.register({
      name: 'profile-claimer',
      variables: { QUYET_PROFILE: { description: 'Reserved key.' } },
      resolve: () => ({}),
    })).toThrow(/reserved key "QUYET_PROFILE"/)
  })

  it('resolves QUYET_HOME from the ambient override or the user-home default', () => {
    vi.stubEnv('QUYET_HOME', './ambient-quyet-home')
    const fromEnvironment = new ShellEnvRegistry(new Context())
    expect(fromEnvironment.collect(execution()).QUYET_HOME).toBe(resolve('./ambient-quyet-home'))

    vi.stubEnv('QUYET_HOME', undefined)
    const fromDefault = new ShellEnvRegistry(new Context())
    expect(fromDefault.collect(execution()).QUYET_HOME).toBe(join(homedir(), '.quyet'))
  })

  it('collects declared contributor variables and omits unavailable values', () => {
    const ctx = new Context()
    const registry = new ShellEnvRegistry(ctx, { quyetHome: './test-quyet-home' })
    registry.register({
      name: 'optional-session-fact',
      variables: {
        QUYET_SESSION_OPTIONAL: { description: 'Optional session-scoped test fact.' },
      },
      resolve: exec => exec.agent === undefined ? {} : { QUYET_SESSION_OPTIONAL: exec.agent.session.header.id },
    })
    registry.register({
      name: 'always-available-fact',
      variables: {
        QUYET_ALWAYS_AVAILABLE: { description: 'Always-available test fact.' },
      },
      resolve: () => ({ QUYET_ALWAYS_AVAILABLE: 'yes' }),
    })

    expect(registry.collect(execution())).not.toHaveProperty('QUYET_SESSION_OPTIONAL')
    expect(registry.collect(execution()).QUYET_ALWAYS_AVAILABLE).toBe('yes')
    expect(registry.collect(execution('session-b')).QUYET_SESSION_OPTIONAL).toBe('session-b')
    expect(registry.list()).toEqual([
      {
        contributor: 'always-available-fact',
        description: 'Always-available test fact.',
        key: 'QUYET_ALWAYS_AVAILABLE',
      },
      {
        contributor: 'optional-session-fact',
        description: 'Optional session-scoped test fact.',
        key: 'QUYET_SESSION_OPTIONAL',
      },
    ])
  })

  it('rejects duplicate variable ownership at registration time', () => {
    const ctx = new Context()
    const registry = new ShellEnvRegistry(ctx, { quyetHome: './test-quyet-home' })
    registry.register({
      name: 'first',
      variables: { QUYET_SHARED: { description: 'First owner.' } },
      resolve: () => ({ QUYET_SHARED: 'first' }),
    })

    expect(() => registry.register({
      name: 'second',
      variables: { QUYET_SHARED: { description: 'Second owner.' } },
      resolve: () => ({ QUYET_SHARED: 'second' }),
    })).toThrow(/QUYET_SHARED.*first.*second|QUYET_SHARED.*second.*first/)
  })

  it('rejects duplicate contributor names and malformed declarations', () => {
    const registry = new ShellEnvRegistry(new Context(), { quyetHome: './test-quyet-home' })
    registry.register({
      name: 'declared',
      variables: { QUYET_DECLARED: { description: 'Declared fact.' } },
      resolve: () => ({}),
    })

    expect(() => registry.register({
      name: 'declared',
      variables: { QUYET_ANOTHER: { description: 'Another fact.' } },
      resolve: () => ({}),
    })).toThrow(/already registered/)
    expect(() => registry.register({
      name: ' ',
      variables: { QUYET_BLANK_NAME: { description: 'Blank owner.' } },
      resolve: () => ({}),
    })).toThrow(/name must be non-empty/)
    expect(() => registry.register({
      name: 'invalid-key',
      variables: { quyet_invalid: { description: 'Invalid key.' } } as unknown as Record<'QUYET_INVALID', { description: string }>,
      resolve: () => ({}),
    })).toThrow(/invalid key/)
    expect(() => registry.register({
      name: 'reserved-key',
      variables: { QUYET_HOME: { description: 'Reserved key.' } },
      resolve: () => ({}),
    })).toThrow(/reserved key/)
    expect(() => registry.register({
      name: 'blank-description',
      variables: { QUYET_BLANK_DESCRIPTION: { description: ' ' } },
      resolve: () => ({}),
    })).toThrow(/must describe/)
  })

  it('rejects undeclared variables returned by a contributor', () => {
    const ctx = new Context()
    const registry = new ShellEnvRegistry(ctx, { quyetHome: './test-quyet-home' })
    registry.register({
      name: 'drifted-provider',
      variables: { QUYET_DECLARED: { description: 'Declared fact.' } },
      resolve: () => ({ QUYET_UNDECLARED: 'bad' }),
    })

    expect(() => registry.collect(execution())).toThrow(/drifted-provider.*QUYET_UNDECLARED/)
  })

  it('rejects non-string values returned by a contributor', () => {
    const registry = new ShellEnvRegistry(new Context(), { quyetHome: './test-quyet-home' })
    registry.register({
      name: 'wrong-value-type',
      variables: { QUYET_STRING: { description: 'String fact.' } },
      resolve: () => ({ QUYET_STRING: 42 }) as unknown as Record<'QUYET_STRING', string>,
    })

    expect(() => registry.collect(execution())).toThrow(/wrong-value-type.*non-string.*QUYET_STRING/)
  })

  it('removes an effect-scoped contributor when its plugin is disposed', async () => {
    const ctx = new Context()
    const registry = new ShellEnvRegistry(ctx, { quyetHome: './test-quyet-home' })
    const fiber = await ctx.plugin({
      inject: ['shellEnv'],
      apply(inner: Context) {
        inner.shellEnv.register({
          name: 'temporary',
          variables: { QUYET_TEMPORARY: { description: 'Temporary fact.' } },
          resolve: () => ({ QUYET_TEMPORARY: 'present' }),
        })
      },
    })

    expect(registry.collect(execution()).QUYET_TEMPORARY).toBe('present')
    await fiber.dispose()
    expect(registry.collect(execution())).not.toHaveProperty('QUYET_TEMPORARY')
  })

  it('returns an explicit contributor disposer', () => {
    const registry = new ShellEnvRegistry(new Context(), { quyetHome: './test-quyet-home' })
    const dispose = registry.register({
      name: 'explicit-disposal',
      variables: { QUYET_EXPLICIT_DISPOSAL: { description: 'Explicitly disposed fact.' } },
      resolve: () => ({ QUYET_EXPLICIT_DISPOSAL: 'present' }),
    })

    expect(registry.collect(execution()).QUYET_EXPLICIT_DISPOSAL).toBe('present')
    dispose()
    expect(registry.collect(execution())).not.toHaveProperty('QUYET_EXPLICIT_DISPOSAL')
  })

  it('the plugin registers the service with no contributors on load', async () => {
    const ctx = new Context()
    await ctx.plugin(BashEnvPlugin)
    expect(ctx.shellEnv).toBeInstanceOf(ShellEnvRegistry)
    expect(ctx.shellEnv.list()).toEqual([])
  })
})
