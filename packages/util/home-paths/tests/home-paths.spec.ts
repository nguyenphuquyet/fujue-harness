import { mkdir, mkdtemp, realpath, rm, symlink, writeFile } from 'node:fs/promises'
import { homedir, tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  AGENTS_HOME_DIR_NAME,
  DEFAULT_AGENTS_HOME_DISPLAY,
  DEFAULT_QUYET_HOME_DISPLAY,
  QUYET_HOME_DIR_NAME,
  agentsHomeDisplay,
  canonicalizeWatchPath,
  defaultAgentsHome,
  defaultQuyetHome,
  quyetCachePath,
  quyetHomeDisplay,
  quyetHomePath,
  expandHomePath,
  resolveAgentsHome,
  resolveQuyetHome,
} from '@quyet/home-paths'

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('quyet path helpers', () => {
  it('owns the shared default Quyết home directory name', () => {
    expect(QUYET_HOME_DIR_NAME).toBe('.quyet')
    expect(DEFAULT_QUYET_HOME_DISPLAY).toBe('~/.quyet')
    expect(defaultQuyetHome()).toBe(join(homedir(), '.quyet'))
  })

  it('expands tilde paths without changing non-tilde paths', () => {
    expect(expandHomePath('~')).toBe(homedir())
    expect(expandHomePath('~/.quyet')).toBe(join(homedir(), '.quyet'))
    expect(expandHomePath('~\\.quyet')).toBe(join(homedir(), '.quyet'))
    expect(expandHomePath('/tmp/.quyet')).toBe('/tmp/.quyet')
    expect(expandHomePath('~other/.quyet')).toBe('~other/.quyet')
  })

  it('resolves explicit path before QUYET_HOME and the default', () => {
    const envHome = join(homedir(), 'env-quyet')

    expect(resolveQuyetHome('/tmp/explicit-quyet', { QUYET_HOME: '~/env-quyet' })).toBe(resolve('/tmp/explicit-quyet'))
    expect(resolveQuyetHome(undefined, { QUYET_HOME: '~/env-quyet' })).toBe(envHome)
    expect(resolveQuyetHome(undefined, {})).toBe(defaultQuyetHome())
  })

  it('treats an empty or whitespace-only QUYET_HOME as unset', () => {
    expect(resolveQuyetHome(undefined, { QUYET_HOME: '' })).toBe(defaultQuyetHome())
    expect(resolveQuyetHome(undefined, { QUYET_HOME: '   ' })).toBe(defaultQuyetHome())
  })

  it('joins child segments onto the resolved QUYET_HOME', () => {
    vi.stubEnv('QUYET_HOME', '~/env-quyet')
    expect(quyetHomePath()).toBe(join(homedir(), 'env-quyet'))
    expect(quyetHomePath('storages', 'cache')).toBe(join(homedir(), 'env-quyet', 'storages', 'cache'))
  })

  it('labels a resolved home by whether it is the default root', () => {
    expect(quyetHomeDisplay(resolve(defaultQuyetHome()))).toBe('~/.quyet')
    expect(quyetHomeDisplay('/some/other/root')).toBe('$QUYET_HOME')
  })

  it('owns the shared default agents home directory name', () => {
    expect(AGENTS_HOME_DIR_NAME).toBe('.agents')
    expect(DEFAULT_AGENTS_HOME_DISPLAY).toBe('~/.agents')
    expect(defaultAgentsHome()).toBe(join(homedir(), '.agents'))
  })

  it('resolves an explicit agents home before QUYET_AGENTS_HOME and the default', () => {
    const envHome = join(homedir(), 'env-agents')

    expect(resolveAgentsHome('/tmp/explicit-agents', { QUYET_AGENTS_HOME: '~/env-agents' })).toBe(resolve('/tmp/explicit-agents'))
    expect(resolveAgentsHome(undefined, { QUYET_AGENTS_HOME: '~/env-agents' })).toBe(envHome)
    expect(resolveAgentsHome(undefined, {})).toBe(defaultAgentsHome())
  })

  it('treats an empty or whitespace-only QUYET_AGENTS_HOME as unset', () => {
    expect(resolveAgentsHome(undefined, { QUYET_AGENTS_HOME: '' })).toBe(defaultAgentsHome())
    expect(resolveAgentsHome(undefined, { QUYET_AGENTS_HOME: '   ' })).toBe(defaultAgentsHome())
  })

  it('labels a resolved agents home by whether it is the default root', () => {
    expect(agentsHomeDisplay(resolve(defaultAgentsHome()))).toBe('~/.agents')
    expect(agentsHomeDisplay('/some/other/root')).toBe('$QUYET_AGENTS_HOME')
  })

  it.each([
    [undefined, join(homedir(), '.quyet')],
    ['', join(homedir(), '.quyet')],
    ['   ', join(homedir(), '.quyet')],
    ['~/env-quyet', join(homedir(), 'env-quyet')],
    ['./relative-quyet', resolve('./relative-quyet')],
  ] as const)('resolves cache paths with QUYET_HOME=%j', (home, expectedHome) => {
    vi.stubEnv('QUYET_HOME', home)
    try {
      expect(quyetCachePath()).toBe(join(expectedHome, 'cache'))
      expect(quyetCachePath('models', 'index.json')).toBe(join(expectedHome, 'cache', 'models', 'index.json'))
    } finally {
      vi.unstubAllEnvs()
    }
  })

  it('resolves configured cache homes before the environment', () => {
    vi.stubEnv('QUYET_HOME', '~/env-quyet')
    try {
      expect(quyetCachePath({ quyetHome: '~/explicit-quyet' })).toBe(join(homedir(), 'explicit-quyet', 'cache'))
      expect(quyetCachePath({ quyetHome: './explicit-quyet' }, 'attachments', 'request-images'))
        .toBe(resolve('./explicit-quyet/cache/attachments/request-images'))
      expect(quyetCachePath({}, 'attachments')).toBe(join(homedir(), 'env-quyet', 'cache', 'attachments'))
    } finally {
      vi.unstubAllEnvs()
    }
  })

  it('canonicalizes a watcher ancestor while preserving a missing suffix', async () => {
    const root = await mkdtemp(join(tmpdir(), 'quyet-watch-path-'))
    const target = join(root, 'target')
    const alias = join(root, 'alias')
    try {
      await mkdir(target)
      await symlink(target, alias, process.platform === 'win32' ? 'junction' : 'dir')
      await expect(canonicalizeWatchPath(alias)).resolves.toBe(await realpath(target))
      await expect(canonicalizeWatchPath(join(alias, 'later', 'config.yml'))).resolves.toBe(
        join(await realpath(target), 'later', 'config.yml'),
      )
      const file = join(root, 'file')
      await writeFile(file, 'not a directory')
      await expect(canonicalizeWatchPath(join(file, 'child'))).rejects.toMatchObject({ code: 'ENOTDIR' })
    } finally {
      await rm(root, { recursive: true, force: true })
    }
  })
})
