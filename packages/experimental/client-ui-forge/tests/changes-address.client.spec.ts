/** Changes tab addresses, titles, the tab type definition, and the per-tab store. */
import { describe, expect, it } from 'vitest'
import { makeTranslate } from '@quyet/client-test-runtime'
import { SessionId } from '@quyet/session/types'
import {
  CHANGES_ID, CHANGES_KIND, changesAddress, changesDefinition, changesTitle, parseChangesAddress,
} from '../src/client/changes-address.ts'
import { createChangesStore } from '../src/client/changes-store.ts'
import { en, zh } from '../src/client/locales.ts'

const SESSION = SessionId('s/1')
const URL = 'https://github.com/octo/demo/pull/7'

describe('changes addresses', () => {
  it('round-trip the Session and the source with each part percent-encoded', () => {
    const local = changesAddress({ sessionId: SESSION, source: { kind: 'local' } })
    const change = changesAddress({ sessionId: SESSION, source: { kind: 'change', url: URL } })
    expect(local).toBe('quyet-resource://forge-changes/s%2F1/local')
    expect(change).toBe(`quyet-resource://forge-changes/s%2F1/change/${encodeURIComponent(URL)}`)
    expect(parseChangesAddress(local)).toEqual({ sessionId: SESSION, source: { kind: 'local' } })
    expect(parseChangesAddress(change)).toEqual({ sessionId: SESSION, source: { kind: 'change', url: URL } })
  })

  it.each([
    'quyet-resource://file/session/s/a.ts',
    'quyet-resource://forge-changes//local',
    'quyet-resource://forge-changes/s',
    'quyet-resource://forge-changes/s/remote',
    'quyet-resource://forge-changes/s/local/extra',
    'quyet-resource://forge-changes/s/change',
    'quyet-resource://forge-changes/s/change/',
    'quyet-resource://forge-changes/s/change/a/b',
    'quyet-resource://forge-changes/%E0%A4%A/local',
  ])('reject %s', (address) => {
    expect(parseChangesAddress(address)).toBeUndefined()
  })

  it('name the local view and a change request view by its number when the URL ends in one', () => {
    const t = makeTranslate(zh)
    expect(changesTitle({ kind: 'local' }, t)).toBe('本地变更')
    expect(changesTitle({ kind: 'change', url: URL }, t)).toBe('#7 的变更')
    expect(changesTitle({ kind: 'change', url: 'https://example.com/review' }, t)).toBe('变更')
  })
})

describe('changesDefinition', () => {
  it('claims and titles the addresses this package mints and leaves others named by their address', () => {
    const definition = changesDefinition(makeTranslate(en))
    expect(definition).toMatchObject({ id: CHANGES_ID, kind: CHANGES_KIND, keepMounted: true, patterns: ['quyet-resource://forge-changes/**'] })
    const address = changesAddress({ sessionId: SESSION, source: { kind: 'change', url: URL } })
    expect(definition.canOpen?.(address)).toBe(true)
    expect(definition.title(address)).toBe('Changes in #7')
    expect(definition.canOpen?.('quyet-resource://forge-changes/s/remote')).toBe(false)
    expect(definition.title('quyet-resource://forge-changes/s/remote')).toBe('quyet-resource://forge-changes/s/remote')
  })
})

describe('createChangesStore', () => {
  it('seeds a tab on its first navigation, keeps its choices, and forgets it', () => {
    const store = createChangesStore().create()
    store.actions.navigated('tab-1', 1)
    expect(store.getSnapshot().byTab['tab-1']).toEqual({ scope: 'branch', base: null, split: true, wrap: true, navigated: 1 })
    store.actions.scoped('tab-1', 'staged')
    store.actions.based('tab-1', { ref: 'refs/heads/topic', name: 'topic' })
    store.actions.toggledSplit('tab-1')
    store.actions.toggledWrap('tab-1')
    store.actions.navigated('tab-1', 2)
    expect(store.getSnapshot().byTab['tab-1']).toEqual({
      scope: 'staged', base: { ref: 'refs/heads/topic', name: 'topic' }, split: false, wrap: false, navigated: 2,
    })
    store.actions.navigated('tab-2', 1)
    store.actions.forget('tab-1')
    expect(Object.keys(store.getSnapshot().byTab)).toEqual(['tab-2'])
    expect(() => { store.actions.toggledWrap('tab-1') }).toThrow('no changes state for tab "tab-1"')
  })
})
