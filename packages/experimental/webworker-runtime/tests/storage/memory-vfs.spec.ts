/**
 * The identity, timestamp, link, mutation, and durability-sink guarantees
 * MemoryVfs owes its consumers, asserted directly rather than through the
 * `node:fs` bridge.
 *
 * `quyet-fs-local` builds a version token from `dev:ino:size:mtimeNs:ctimeNs` and
 * refuses a write whose token moved since it read. Two properties carry that:
 * `ino` identifies the entry at a path, and `mtimeMs` moves on every write. The
 * timestamp cases freeze the clock, because these writes are in memory and two
 * revisions routinely land in the same millisecond — a real-clock test passes
 * whether or not the strict increment exists.
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MemoryVfs } from '../../src/storage/memory.ts'
import type { VfsBigIntStats, VfsMutation, VfsMutationSink, VfsStats } from '../../src/storage/types.ts'

const identity = (vfs: MemoryVfs, path: string): bigint =>
  (vfs.statSync(path, { bigint: true }) as VfsBigIntStats).ino

const linkCount = (vfs: MemoryVfs, path: string): bigint =>
  (vfs.statSync(path, { bigint: true }) as VfsBigIntStats).nlink

const modified = (vfs: MemoryVfs, path: string): number => (vfs.statSync(path) as VfsStats).mtimeMs

afterEach(() => { vi.restoreAllMocks() })

describe('entry identity', () => {
  it('distinguishes paths and holds each identity across repeated stats', () => {
    const vfs = new MemoryVfs()
    vfs.seed('/quyet/one.txt', 'one')
    vfs.seed('/quyet/two.txt', 'two')
    const first = identity(vfs, '/quyet/one.txt')
    expect(identity(vfs, '/quyet/two.txt')).not.toBe(first)
    expect(identity(vfs, '/quyet/one.txt')).toBe(first)
  })

  it('forgets the identities under a directory removed as a subtree', () => {
    const vfs = new MemoryVfs()
    vfs.seed('/quyet/skills/git/SKILL.md', '# git\n')
    const before = identity(vfs, '/quyet/skills/git/SKILL.md')
    vfs.rmSync('/quyet/skills', { recursive: true })
    vfs.seed('/quyet/skills/git/SKILL.md', '# git rebuilt\n')
    expect(identity(vfs, '/quyet/skills/git/SKILL.md')).not.toBe(before)
  })

  it('moves the source identity when a file replaces another path', () => {
    const vfs = new MemoryVfs()
    vfs.seed('/quyet/from.txt', 'moved')
    vfs.seed('/quyet/to.txt', 'replaced')
    const [source, destination] = [identity(vfs, '/quyet/from.txt'), identity(vfs, '/quyet/to.txt')]
    vfs.renameSync('/quyet/from.txt', '/quyet/to.txt')
    const renamed = identity(vfs, '/quyet/to.txt')
    expect(vfs.readFileSync('/quyet/to.txt', 'utf8')).toBe('moved')
    expect([renamed === source, renamed === destination]).toEqual([true, false])
  })
})

describe('modification time', () => {
  it('hydrates explicit metadata without confusing timestamps with permission bits', () => {
    const vfs = new MemoryVfs()
    vfs.seed('/quyet/restored', 'value', { mode: 0o600, mtimeMs: 1_600_000_000_000 })
    vfs.seedDirectory('/quyet/restored-directory', { mode: 0o700, mtimeMs: 1_600_000_000_001 })
    const stats = vfs.statSync('/quyet/restored') as VfsStats
    const directory = vfs.statSync('/quyet/restored-directory') as VfsStats
    expect([stats.mode & 0o777, stats.mtimeMs]).toEqual([0o600, 1_600_000_000_000])
    expect([directory.mode & 0o777, directory.mtimeMs]).toEqual([0o700, 1_600_000_000_001])
  })

  it('advances on every write even while the clock stands still', () => {
    vi.spyOn(Date, 'now').mockReturnValue(1_700_000_000_000)
    const vfs = new MemoryVfs()
    vfs.seed('/quyet/log.jsonl', 'first\n')
    const seeded = modified(vfs, '/quyet/log.jsonl')
    vfs.writeFileSync('/quyet/log.jsonl', 'second\n')
    const written = modified(vfs, '/quyet/log.jsonl')
    vfs.appendFileSync('/quyet/log.jsonl', 'third\n')
    const appended = modified(vfs, '/quyet/log.jsonl')
    vfs.truncateSync('/quyet/log.jsonl', 6)
    const truncated = modified(vfs, '/quyet/log.jsonl')
    expect([written > seeded, appended > written, truncated > appended]).toEqual([true, true, true])
    // One millisecond per revision: the increment is the minimum that separates
    // two tokens, not a coarser bump that would skew a real timestamp.
    expect(truncated - seeded).toBe(3)
  })

  it('takes the clock once the clock has passed the entry', () => {
    const clock = vi.spyOn(Date, 'now').mockReturnValue(1_700_000_000_000)
    const vfs = new MemoryVfs()
    vfs.seed('/quyet/log.jsonl', 'first\n')
    clock.mockReturnValue(1_700_000_005_000)
    vfs.writeFileSync('/quyet/log.jsonl', 'second\n')
    expect(modified(vfs, '/quyet/log.jsonl')).toBe(1_700_000_005_000)
  })

  it('extends truncation with zero bytes', async () => {
    const vfs = new MemoryVfs()
    vfs.seed('/quyet/file', new Uint8Array([1, 2]))
    vfs.truncateSync('/quyet/file', 5)
    expect([...vfs.readFileSync('/quyet/file') as Uint8Array]).toEqual([1, 2, 0, 0, 0])
    const handle = vfs.open('/quyet/file', 'r+')
    await handle.truncate(7)
    expect([...vfs.readFileSync('/quyet/file') as Uint8Array]).toEqual([1, 2, 0, 0, 0, 0, 0])
  })

  it('advances a directory only when its immediate entry set changes', () => {
    vi.spyOn(Date, 'now').mockReturnValue(1_700_000_000_000)
    const vfs = new MemoryVfs()
    vfs.seedDirectory('/quyet/workspace')
    const empty = modified(vfs, '/quyet/workspace')
    vfs.writeFileSync('/quyet/workspace/file.txt', 'one')
    const created = modified(vfs, '/quyet/workspace')
    vfs.writeFileSync('/quyet/workspace/file.txt', 'two')
    const rewritten = modified(vfs, '/quyet/workspace')
    vfs.rmSync('/quyet/workspace/file.txt')
    const removed = modified(vfs, '/quyet/workspace')
    expect([created > empty, rewritten === created, removed > rewritten]).toEqual([true, true, true])
  })
})

describe('mutation publication', () => {
  it('publishes only committed runtime changes and keeps image seeding silent', () => {
    const vfs = new MemoryVfs()
    const mutations: VfsMutation[] = []
    vfs.subscribe((mutation) => { mutations.push(mutation) })
    vfs.seed('/quyet/seeded.txt', 'seeded')
    expect(mutations).toEqual([])
    vfs.writeFileSync('/quyet/seeded.txt', 'changed')
    vfs.mkdirSync('/quyet/created')
    vfs.chmodSync('/quyet/created', 0o700)
    vfs.renameSync('/quyet/seeded.txt', '/quyet/renamed.txt')
    vfs.rmSync('/quyet/created', { recursive: true })
    expect(mutations.map(mutation => ({
      kind: mutation.kind,
      path: mutation.path,
      ...mutation.kind === 'write' ? { entryChanged: mutation.entryChanged } : {},
      ...mutation.kind === 'chmod' ? { mode: mutation.mode } : {},
    }))).toEqual([
      { kind: 'write', path: '/quyet/seeded.txt', entryChanged: false },
      { kind: 'mkdir', path: '/quyet/created' },
      { kind: 'chmod', path: '/quyet/created', mode: 0o700 },
      { kind: 'remove', path: '/quyet/seeded.txt' },
      { kind: 'write', path: '/quyet/renamed.txt', entryChanged: true },
      { kind: 'remove', path: '/quyet/created' },
    ])
    const renamed = mutations[4]
    expect(renamed?.kind === 'write' && new TextDecoder().decode(renamed.bytes)).toBe('changed')
    expect(() => { vfs.writeFileSync('/missing/file', 'no') }).toThrow(/ENOENT/)
    expect(mutations).toHaveLength(6)
  })

  it('contains a faulty observer and lets disposal stop later notifications', () => {
    const vfs = new MemoryVfs()
    vfs.seedDirectory('/quyet')
    const reported = vi.spyOn(console, 'error').mockImplementation(() => {})
    const first = vfs.subscribe(() => { throw new Error('observer failed') })
    const seen: string[] = []
    const second = vfs.subscribe((mutation) => { seen.push(mutation.path) })
    vfs.writeFileSync('/quyet/one', '1')
    first()
    second()
    vfs.writeFileSync('/quyet/two', '2')
    expect(seen).toEqual(['/quyet/one'])
    expect(reported).toHaveBeenCalledOnce()
  })

  it('feeds the same complete mutations to a durable sink and live subscribers', async () => {
    const recorded: VfsMutation[] = []
    let flushes = 0
    const sink: VfsMutationSink = {
      record: (mutation) => { recorded.push(mutation) },
      flush: async () => { flushes += 1 },
    }
    const vfs = new MemoryVfs({ sink })
    vfs.seedDirectory('/quyet')
    const observed: VfsMutation[] = []
    vfs.subscribe((mutation) => { observed.push(mutation) })
    vfs.writeFileSync('/quyet/log', 'a')
    vfs.appendFileSync('/quyet/log', 'bc')
    await vfs.flush()
    expect(observed).toEqual(recorded)
    expect(observed[0]).toBe(recorded[0])
    expect(recorded[0]).toMatchObject({ kind: 'write', path: '/quyet/log', mode: 0o644, entryChanged: true })
    expect(recorded[1]).toMatchObject({ kind: 'write', path: '/quyet/log', mode: 0o644, entryChanged: false, appendedFrom: 1 })
    expect(recorded[1]?.kind === 'write' && new TextDecoder().decode(recorded[1].bytes)).toBe('abc')
    expect(flushes).toBe(1)
  })

  it('publishes descriptor writes at the file identity current path', () => {
    const mutations: VfsMutation[] = []
    const vfs = new MemoryVfs()
    vfs.seed('/quyet/source', 'old')
    const descriptor = vfs.openFileSync('/quyet/source', 'r+')
    vfs.subscribe((mutation) => { mutations.push(mutation) })
    vfs.renameSync('/quyet/source', '/quyet/destination')
    mutations.length = 0
    descriptor.write(0, new TextEncoder().encode('new'))
    expect(mutations.map(mutation => mutation.path)).toEqual(['/quyet/destination'])
    expect(vfs.readFileSync('/quyet/destination', 'utf8')).toBe('new')
    vfs.unlinkSync('/quyet/destination')
    mutations.length = 0
    descriptor.write(0, new TextEncoder().encode('detached'))
    expect(mutations).toEqual([])
    expect(new TextDecoder().decode(descriptor.read(0, descriptor.stat().size))).toBe('detached')
  })

  it('reports the path identity through a BigInt file handle stat', async () => {
    const vfs = new MemoryVfs()
    vfs.seed('/quyet/session.lock', '')
    const handle = vfs.open('/quyet/session.lock', 'w')
    const held = await handle.stat({ bigint: true }) as VfsBigIntStats
    const current = vfs.statSync('/quyet/session.lock', { bigint: true }) as VfsBigIntStats

    expect([held.dev, held.ino]).toEqual([current.dev, current.ino])
    await handle.chmod(0o600)
    expect((vfs.statSync('/quyet/session.lock') as VfsStats).mode & 0o777).toBe(0o600)
    await handle.close()
  })

  it('decomposes a directory rename into replayable destination state', () => {
    const recorded: VfsMutation[] = []
    const vfs = new MemoryVfs({
      sink: { record: (mutation) => { recorded.push(mutation) }, flush: () => Promise.resolve() },
    })
    vfs.seedDirectory('/quyet/staging/nested', { mode: 0o700 })
    vfs.seed('/quyet/staging/nested/file', 'value', { mode: 0o600 })
    vfs.renameSync('/quyet/staging', '/quyet/published')

    expect(recorded.map(mutation => [mutation.kind, mutation.path])).toEqual([
      ['remove', '/quyet/staging'],
      ['mkdir', '/quyet/published'],
      ['mkdir', '/quyet/published/nested'],
      ['write', '/quyet/published/nested/file'],
    ])
    expect(recorded[3]).toMatchObject({ kind: 'write', mode: 0o600, entryChanged: true })
    expect(recorded[3]?.kind === 'write' && new TextDecoder().decode(recorded[3].bytes)).toBe('value')
  })
})

describe('directory rename', () => {
  it('rejects file, non-empty directory, and missing-parent destinations before mutation', () => {
    const vfs = new MemoryVfs()
    vfs.seed('/quyet/source/nested/file', 'source')
    vfs.seed('/quyet/file', 'destination')
    vfs.seed('/quyet/non-empty/child', 'destination')
    const mutations: VfsMutation[] = []
    vfs.subscribe((mutation) => { mutations.push(mutation) })

    expect(() => { vfs.renameSync('/quyet/source', '/quyet/file') })
      .toThrow(expect.objectContaining({ code: 'ENOTDIR' }))
    expect(() => { vfs.renameSync('/quyet/source', '/quyet/non-empty') })
      .toThrow(expect.objectContaining({ code: 'ENOTEMPTY' }))
    expect(() => { vfs.renameSync('/quyet/source', '/missing/destination') })
      .toThrow(expect.objectContaining({ code: 'ENOENT' }))

    expect(vfs.readFileSync('/quyet/source/nested/file', 'utf8')).toBe('source')
    expect(vfs.readFileSync('/quyet/file', 'utf8')).toBe('destination')
    expect(vfs.readFileSync('/quyet/non-empty/child', 'utf8')).toBe('destination')
    expect(mutations).toEqual([])
  })

  it('replaces an empty directory with the source subtree', () => {
    const vfs = new MemoryVfs()
    vfs.seedDirectory('/quyet/source/nested', { mode: 0o700 })
    vfs.seed('/quyet/source/nested/file', 'source')
    vfs.seedDirectory('/quyet/destination', { mode: 0o711 })

    vfs.renameSync('/quyet/source', '/quyet/destination')

    expect(vfs.existsSync('/quyet/source')).toBe(false)
    expect(vfs.readFileSync('/quyet/destination/nested/file', 'utf8')).toBe('source')
    expect((vfs.statSync('/quyet/destination') as VfsStats).mode & 0o777).toBe(0o755)
    expect((vfs.statSync('/quyet/destination/nested') as VfsStats).mode & 0o777).toBe(0o700)
  })
})

describe('hard links', () => {
  it('shares identity, bytes, and mode until one name is removed', () => {
    const vfs = new MemoryVfs()
    vfs.seed('/quyet/session.jsonl', 'committed\n')
    vfs.linkSync('/quyet/session.jsonl', '/quyet/session-latest.jsonl')
    vfs.linkSync('/quyet/session-latest.jsonl', '/quyet/session-archive.jsonl')
    expect(identity(vfs, '/quyet/session-latest.jsonl')).toBe(identity(vfs, '/quyet/session.jsonl'))
    expect(linkCount(vfs, '/quyet/session.jsonl')).toBe(3n)
    expect(vfs.readFileSync('/quyet/session-latest.jsonl', 'utf8')).toBe('committed\n')
    const changedPaths: string[] = []
    vfs.subscribe((mutation) => { changedPaths.push(mutation.path) })
    vfs.appendFileSync('/quyet/session.jsonl', 'appended\n')
    expect(changedPaths).toEqual([
      '/quyet/session.jsonl',
      '/quyet/session-latest.jsonl',
      '/quyet/session-archive.jsonl',
    ])
    expect(vfs.readFileSync('/quyet/session.jsonl', 'utf8')).toBe('committed\nappended\n')
    expect(vfs.readFileSync('/quyet/session-latest.jsonl', 'utf8')).toBe('committed\nappended\n')
    vfs.chmodSync('/quyet/session-latest.jsonl', 0o600)
    expect((vfs.statSync('/quyet/session.jsonl') as VfsStats).mode & 0o777).toBe(0o600)
    vfs.unlinkSync('/quyet/session-latest.jsonl')
    expect(linkCount(vfs, '/quyet/session.jsonl')).toBe(2n)
    vfs.unlinkSync('/quyet/session-archive.jsonl')
    expect(linkCount(vfs, '/quyet/session.jsonl')).toBe(1n)
    expect(vfs.readFileSync('/quyet/session.jsonl', 'utf8')).toBe('committed\nappended\n')
  })

  it('treats rename between names of the same node as a no-op', () => {
    const vfs = new MemoryVfs()
    vfs.seed('/quyet/source', 'value')
    vfs.linkSync('/quyet/source', '/quyet/alias')
    const mutations: VfsMutation[] = []
    vfs.subscribe((mutation) => { mutations.push(mutation) })

    vfs.renameSync('/quyet/source', '/quyet/alias')

    expect(vfs.readFileSync('/quyet/source', 'utf8')).toBe('value')
    expect(vfs.readFileSync('/quyet/alias', 'utf8')).toBe('value')
    expect(linkCount(vfs, '/quyet/source')).toBe(2n)
    expect(mutations).toEqual([])
  })

  it('retargets linked names through file replacement and directory moves', () => {
    const vfs = new MemoryVfs()
    vfs.seed('/quyet/replacement', 'replacement')
    vfs.seed('/quyet/target', 'old')
    vfs.linkSync('/quyet/target', '/quyet/target-alias')
    const replaced = vfs.openFileSync('/quyet/target', 'r+')
    vfs.renameSync('/quyet/replacement', '/quyet/target')
    const mutations: VfsMutation[] = []
    vfs.subscribe((mutation) => { mutations.push(mutation) })

    replaced.write(0, new TextEncoder().encode('changed'))
    expect(mutations.map(mutation => mutation.path)).toEqual(['/quyet/target-alias'])
    expect(vfs.readFileSync('/quyet/target', 'utf8')).toBe('replacement')
    expect(vfs.readFileSync('/quyet/target-alias', 'utf8')).toBe('changed')
    expect(linkCount(vfs, '/quyet/target-alias')).toBe(1n)

    vfs.seed('/quyet/tree/file', 'tree')
    vfs.linkSync('/quyet/tree/file', '/quyet/outside')
    const moved = vfs.openFileSync('/quyet/tree/file', 'r+')
    vfs.renameSync('/quyet/tree', '/quyet/moved')
    mutations.length = 0
    moved.write(0, new TextEncoder().encode('moved'))
    expect(mutations.map(mutation => mutation.path)).toEqual(['/quyet/outside', '/quyet/moved/file'])
    expect(linkCount(vfs, '/quyet/moved/file')).toBe(2n)

    vfs.rmSync('/quyet/moved', { recursive: true })
    mutations.length = 0
    moved.write(0, new TextEncoder().encode('kept!'))
    expect(mutations.map(mutation => mutation.path)).toEqual(['/quyet/outside'])
    expect(vfs.readFileSync('/quyet/outside', 'utf8')).toBe('kept!')
    expect(linkCount(vfs, '/quyet/outside')).toBe(1n)
  })

  it('rejects renaming a file over an existing directory', () => {
    const vfs = new MemoryVfs()
    vfs.seed('/quyet/file', 'value')
    vfs.seedDirectory('/quyet/directory')
    expect(() => { vfs.renameSync('/quyet/file', '/quyet/directory') }).toThrow(expect.objectContaining({ code: 'EISDIR' }))
    expect(vfs.readFileSync('/quyet/file', 'utf8')).toBe('value')
    expect(vfs.statSync('/quyet/directory').isDirectory()).toBe(true)
  })
})
