import { describe, expect, it } from 'vitest'
import type { NpmPackageLock, RegistryIndex } from './benchmark-npm-resolution.ts'
import {
  assertDualQuyetInstallLayout,
  assertResolutionWorkBudget,
  buildDualQuyetRegistry,
  MAX_RESOLUTION_WORK_UNITS,
} from './verify-npm-install-layout.ts'

function validLayout(): NpmPackageLock {
  return {
    lockfileVersion: 3,
    packages: {
      '': { dependencies: { '@quyet/harness': '0.2.0', 'quyet-previous': 'npm:@quyet/harness@0.1.0' } },
      'node_modules/@quyet/cordis': { version: '4.0.1' },
      'node_modules/@quyet/harness': {
        version: '0.2.0',
        dependencies: { '@quyet/child': '^0.2.0' },
        peerDependencies: { '@quyet/cordis': '^4.0.1' },
      },
      'node_modules/@quyet/child': {
        version: '0.2.0',
        dependencies: { '@quyet/leaf': '^0.2.0' },
      },
      'node_modules/@quyet/leaf': { version: '0.2.0' },
      'node_modules/quyet-previous': {
        name: '@quyet/harness',
        version: '0.1.0',
        dependencies: { '@quyet/child': '^0.1.0' },
        peerDependencies: { '@quyet/cordis': '^4.0.1' },
      },
      'node_modules/quyet-previous/node_modules/@quyet/child': {
        version: '0.1.0',
        dependencies: { '@quyet/leaf': '^0.1.0' },
      },
      'node_modules/quyet-previous/node_modules/@quyet/leaf': { version: '0.1.0' },
    },
  }
}

describe('npm install layout verifier', () => {
  it('creates two incompatible versions of every Quyết package', () => {
    const index: RegistryIndex = new Map([
      ['@quyet/harness', new Map([['0.1.1-rc.2', {
        name: '@quyet/harness',
        version: '0.1.1-rc.2',
        dependencies: { '@quyet/child': '^0.1.1-rc.2' },
        peerDependencies: { '@quyet/cordis': '^4.0.1' },
      }]])],
      ['@quyet/child', new Map([['0.1.1-rc.2', {
        name: '@quyet/child',
        version: '0.1.1-rc.2',
      }]])],
      ['@quyet/cordis', new Map([['4.0.1', {
        name: '@quyet/cordis',
        version: '4.0.1',
      }]])],
    ])

    const dual = buildDualQuyetRegistry(index, '0.1.1-rc.2')

    expect([...dual.get('@quyet/harness')?.keys() ?? []]).toEqual(['0.1.0', '0.2.0'])
    expect(dual.get('@quyet/harness')?.get('0.1.0')).toMatchObject({
      version: '0.1.0',
      dependencies: { '@quyet/child': '^0.1.0' },
      peerDependencies: { '@quyet/cordis': '^4.0.1' },
    })
    expect(dual.get('@quyet/harness')?.get('0.2.0')).toMatchObject({
      version: '0.2.0',
      dependencies: { '@quyet/child': '^0.2.0' },
    })
    expect(dual.get('@quyet/cordis')).toBe(index.get('@quyet/cordis'))
  })

  it('accepts isolated Quyết releases with one shared Cordis installation', () => {
    expect(assertDualQuyetInstallLayout(validLayout())).toEqual({
      quyetPackagesPerVersion: 3,
      checkedQuyetEdges: 4,
    })
  })

  it.each([
    ['react', 'node_modules/react'],
    ['react-dom', 'node_modules/react-dom'],
    ['react', 'node_modules/quyet-previous/node_modules/react'],
    ['react-dom', 'node_modules/quyet-previous/node_modules/react-dom'],
  ])('rejects browser runtime %s installed at %s in the Quyết-only consumer', (name, path) => {
    const layout = validLayout()
    const packages = { ...layout.packages, [path]: { version: '18.3.1' } }
    expect(() => assertDualQuyetInstallLayout({ ...layout, packages })).toThrow(
      `${path}: ${name} is a browser build input`,
    )
  })

  it('rejects an internal edge that crosses release versions', () => {
    const layout = validLayout()
    const packages = { ...layout.packages }
    Reflect.deleteProperty(packages, 'node_modules/quyet-previous/node_modules/@quyet/leaf')

    expect(() => assertDualQuyetInstallLayout({ ...layout, packages })).toThrow(
      'node_modules/quyet-previous/node_modules/@quyet/child: dependencies '
      + '@quyet/leaf resolves to node_modules/@quyet/leaf@0.2.0, expected 0.1.0',
    )
  })

  it('rejects a second Cordis installation', () => {
    const layout = validLayout()
    const packages = {
      ...layout.packages,
      'node_modules/quyet-previous/node_modules/@quyet/cordis': { version: '4.0.1' },
    }

    expect(() => assertDualQuyetInstallLayout({ ...layout, packages })).toThrow(
      'expected one shared @quyet/cordis',
    )
  })
})

describe('resolution work budget', () => {
  it.each([
    [277, 2524, 699_148],
    [316, 2780, 878_480],
    [316, 2786, 880_376],
    [317, 2786, 883_162],
    [320, 2836, 907_520],
  ])('accepts the measured dual-release graph with %i packages and %i edges', (packages, edges, units) => {
    expect(assertResolutionWorkBudget({ quyetPackagesPerVersion: packages, checkedQuyetEdges: edges }))
      .toBe(units)
  })

  it('accepts a graph exactly at the budget and rejects one internal edge above it', () => {
    const packages = 320
    const edgesAtBudget = Math.floor(MAX_RESOLUTION_WORK_UNITS / packages)

    expect(packages * edgesAtBudget).toBe(MAX_RESOLUTION_WORK_UNITS)
    expect(assertResolutionWorkBudget({ quyetPackagesPerVersion: packages, checkedQuyetEdges: edgesAtBudget }))
      .toBe(MAX_RESOLUTION_WORK_UNITS)
    expect(() => assertResolutionWorkBudget({
      quyetPackagesPerVersion: packages,
      checkedQuyetEdges: edgesAtBudget + 1,
    })).toThrow(`= ${String(MAX_RESOLUTION_WORK_UNITS + packages)} unit(s), budget ${String(MAX_RESOLUTION_WORK_UNITS)} unit(s)`)
  })

  it('accepts the headroom and rejects a runaway graph with its own measured counts', () => {
    expect(assertResolutionWorkBudget({ quyetPackagesPerVersion: 350, checkedQuyetEdges: 3200 }))
      .toBe(1_120_000)
    expect(() => assertResolutionWorkBudget({ quyetPackagesPerVersion: 400, checkedQuyetEdges: 3000 }))
      .toThrow(`400 package(s) per release x 3000 internal edge(s) = 1200000 unit(s), budget ${String(MAX_RESOLUTION_WORK_UNITS)} unit(s)`)
  })
})
