/** Filesystem ownership for the Electron-managed desktop installation. */

import { join } from 'node:path'
import { resolveQuyetHome } from '@quyet/home-paths'

/** Stable desktop installation paths under the shared Harness home. */
export interface DesktopPaths {
  readonly profile: string
  readonly lock: string
}

/**
 * Resolve every Electron-owned path without changing the shared data roots.
 * @param quyetHome - Harness home shared with npm-installed quyet.
 * @returns immutable desktop path set.
 */
export function resolveDesktopPaths(quyetHome: string = resolveQuyetHome()): DesktopPaths {
  return {
    profile: join(quyetHome, 'profiles', 'desktop'),
    lock: join(quyetHome, 'profiles', 'desktop', 'lock'),
  }
}
