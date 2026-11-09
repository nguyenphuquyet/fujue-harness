/** Shared names for the desktop Platform bridge. */
/** Private desktop channels; the Platform renderer receives bootstrap and locale updates. */
export const PLATFORM_IPC = {
  bootstrap: 'quyet-platform:bootstrap',
  localeChanged: 'quyet-platform:locale-changed',
  open: 'quyet-platform:open',
  bounds: 'quyet-platform:bounds',
  close: 'quyet-platform:close',
} as const

/** Resolved Platform language; Desktop resolves the system preference before sending it. */
export type PlatformLocale = 'en_US' | 'zh_CN'
