/**
 * Virtual root of the worker host's in-memory filesystem. Kept
 * in one module so the process shim, the path/os shims, and the VFS image
 * collector cannot drift apart.
 */

/** Virtual filesystem root; `process.cwd()` and every absolute path start here. */
export const QUYET_ROOT = '/quyet'

/** `$QUYET_HOME`: durable-state directory inside the image. */
export const QUYET_HOME = `${QUYET_ROOT}/home`

/** Flat, symlink-free package tree resolved by the worker module loader. */
export const QUYET_NODE_MODULES = `${QUYET_ROOT}/node_modules`

/** Image configuration directory: the VFS manifest and the shipped agent presets. */
export const QUYET_CONFIG = `${QUYET_ROOT}/config`

/** Default (empty) workspace directory. */
export const QUYET_WORKSPACE = `${QUYET_ROOT}/workspace`

/** Temporary directory reported by `os.tmpdir()`. */
export const QUYET_TMP = `${QUYET_ROOT}/tmp`
