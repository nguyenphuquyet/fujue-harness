/**
 * Resolve the public SDK launch configuration to one quyet subprocess.
 * @module @quyet/sdk-client/launch
 */

import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { HarnessClientOptions } from './types.ts'

/** Default bound for a profile to answer the SDK initialize handshake. */
export const DEFAULT_INITIALIZE_TIMEOUT_MS = 10_000

/** Internal generic process launch used by the transport and fake-runtime tests. */
export interface RuntimeProcessOptions {
  command: string
  args: string[]
  cwd?: string
  /** Materialize the complete child environment when the client starts its subprocess. */
  environment: () => NodeJS.ProcessEnv
  description: string
  initializeTimeoutMs: number
  requestTimeoutMs?: number
  shutdownTimeoutMs?: number
  disposeEofGraceMs?: number
  disposeGraceMs?: number
}

/** Node argv plus internal profile patches required by one resolved quyet entry. */
export interface QuyetNodeLaunch {
  /** Arguments before the profile selector. */
  nodeArgs: string[]
  /** Internal patches applied below caller-supplied patches. */
  patches: string[]
  /** Environment values required by the resolved entry mode. */
  environment: NodeJS.ProcessEnv
}

interface PackageManifest {
  version?: unknown
  bin?: unknown
}

/** Read a package manifest from one resolved package.json URL. */
function manifest(url: string): PackageManifest {
  return JSON.parse(readFileSync(fileURLToPath(url), 'utf8')) as PackageManifest
}

/**
 * Resolve and version-check a quyet executable from package manifests.
 * @param quyetManifestUrl - resolved URL of the quyet package manifest.
 * @param clientManifestUrl - resolved URL of the SDK client manifest.
 * @returns the absolute quyet executable path.
 */
export function resolveQuyetBinFromManifests(quyetManifestUrl: string, clientManifestUrl: string): string {
  const quyetManifest = manifest(quyetManifestUrl)
  const clientManifest = manifest(clientManifestUrl)
  if (typeof quyetManifest.version !== 'string' || quyetManifest.version !== clientManifest.version) {
    throw new Error(`quyet SDK client ${String(clientManifest.version)} requires the same quyet version, got ${String(quyetManifest.version)}`)
  }
  const bin = typeof quyetManifest.bin === 'object' && quyetManifest.bin !== null
    ? (quyetManifest.bin as Record<string, unknown>).quyet
    : quyetManifest.bin
  if (typeof bin !== 'string' || bin === '') throw new Error('@quyet/harness declares no quyet executable')
  return resolve(dirname(fileURLToPath(quyetManifestUrl)), bin)
}

/**
 * Resolve and version-check the built quyet executable installed with this SDK.
 * @returns the absolute built executable path, whether or not it exists in a source checkout.
 */
export function installedQuyetBin(): string {
  return resolveQuyetBinFromManifests(
    import.meta.resolve('@quyet/harness/package.json'),
    new URL('../package.json', import.meta.url).href,
  )
}

/**
 * Resolve the Node launch for one same-version quyet package.
 * @param quyetManifestUrl - resolved URL of the quyet package manifest.
 * @param clientManifestUrl - resolved URL of the SDK client manifest.
 * @param sourceLoaderUrl - optional absolute tsx loader URL for deterministic tests.
 * @returns built output, or the source entry plus its compatibility patch and tsx environment.
 */
export function resolveQuyetNodeLaunchFromManifests(
  quyetManifestUrl: string,
  clientManifestUrl: string,
  sourceLoaderUrl?: string,
): QuyetNodeLaunch {
  const bin = resolveQuyetBinFromManifests(quyetManifestUrl, clientManifestUrl)
  if (existsSync(bin)) return { nodeArgs: [bin], patches: [], environment: {} }

  const packageDir = dirname(fileURLToPath(quyetManifestUrl))
  const sourceBin = resolve(packageDir, 'src/bin.ts')
  const sourcePatch = resolve(packageDir, 'src/sdk-source.cordis.patch.yml')
  const sourceTsconfig = resolve(packageDir, 'tsconfig.json')
  if (!existsSync(sourceBin) || !existsSync(sourcePatch) || !existsSync(sourceTsconfig)) {
    throw new Error(
      `@quyet/harness is missing its built executable ${bin} and complete source launch files ${sourceBin}, ${sourcePatch}, ${sourceTsconfig}`,
    )
  }
  const loader = sourceLoaderUrl ?? import.meta.resolve('tsx/esm')
  return {
    nodeArgs: ['--import', loader, sourceBin],
    patches: [sourcePatch],
    environment: { TSX_TSCONFIG_PATH: sourceTsconfig },
  }
}

/**
 * Resolve the installed quyet package to a built or source Node launch.
 * @returns the launch descriptor for the current checkout or installed package.
 */
function installedQuyetNodeLaunch(): QuyetNodeLaunch {
  return resolveQuyetNodeLaunchFromManifests(
    import.meta.resolve('@quyet/harness/package.json'),
    new URL('../package.json', import.meta.url).href,
  )
}

/**
 * Resolve caller-relative filesystem inputs and construct canonical quyet argv.
 * @param options - public SDK launch options.
 * @param callerCwd - parent-process directory used for lexical resolution.
 * @returns one generic subprocess spec for the JSON-RPC transport.
 */
export function resolveQuyetLaunch(
  options: HarnessClientOptions = {},
  callerCwd: string = process.cwd(),
): RuntimeProcessOptions {
  const profile = options.profile ?? 'sdk'
  const quyetLaunch = options.quyetBin === undefined
    ? installedQuyetNodeLaunch()
    : { nodeArgs: [resolve(callerCwd, options.quyetBin)], patches: [], environment: {} }
  const patches = [
    ...quyetLaunch.patches,
    ...(options.patches ?? []).map(path => resolve(callerCwd, path)),
  ]
  const quyetHome = options.quyetHome === undefined ? undefined : resolve(callerCwd, options.quyetHome)
  return {
    command: process.execPath,
    args: [...quyetLaunch.nodeArgs, '--profile', profile, ...patches.flatMap(path => ['--patch', path])],
    ...options.processCwd === undefined ? {} : { cwd: resolve(callerCwd, options.processCwd) },
    environment: () => ({
      ...(options.env ?? process.env),
      ...quyetLaunch.environment,
      ...quyetHome === undefined ? {} : { QUYET_HOME: quyetHome },
    }),
    description: `quyet profile ${JSON.stringify(profile)}`,
    initializeTimeoutMs: options.initializeTimeoutMs ?? DEFAULT_INITIALIZE_TIMEOUT_MS,
    ...options.requestTimeoutMs === undefined ? {} : { requestTimeoutMs: options.requestTimeoutMs },
    ...options.shutdownTimeoutMs === undefined ? {} : { shutdownTimeoutMs: options.shutdownTimeoutMs },
    ...options.disposeEofGraceMs === undefined ? {} : { disposeEofGraceMs: options.disposeEofGraceMs },
    ...options.disposeGraceMs === undefined ? {} : { disposeGraceMs: options.disposeGraceMs },
  }
}
