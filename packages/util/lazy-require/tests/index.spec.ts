import { afterEach, expect, it } from 'vitest'
import { createLazyRequire } from '../src/index.ts'

interface FixtureGlobal {
  __quyetLazyRequireLoads?: number
}

const fixtureGlobal = globalThis as FixtureGlobal

afterEach(() => {
  delete fixtureGlobal.__quyetLazyRequireLoads
})

it('resolves from the caller and caches the successful module value', () => {
  const load = createLazyRequire<{ value: number }>('./fixtures/value.cjs', import.meta.url)
  expect(fixtureGlobal.__quyetLazyRequireLoads).toBeUndefined()
  const first = load()
  expect(first).toEqual({ value: 42 })
  expect(load()).toBe(first)
  expect(fixtureGlobal.__quyetLazyRequireLoads).toBe(1)
})

it('does not cache a failed load', () => {
  const load = createLazyRequire<unknown>('./fixtures/missing.cjs', import.meta.url)
  expect(load).toThrow(/missing\.cjs/u)
  expect(load).toThrow(/missing\.cjs/u)
})
