import type { DesktopFileActions } from '@quyet/client-ui-file-actions/types'
/** Typed preload operations exposed only by the Electron shell. */

export type { DesktopChannelState, DesktopChannelChangeResult } from '@quyet/client-ui-settings-general/types'
import type { DesktopChannelBridge, DesktopChannelState } from '@quyet/client-ui-settings-general/types'
import type { DesktopKeyboardApi, DesktopShortcutsApi } from '@quyet/client-shortcuts/protocol'
import type { IpcMainInvokeEvent } from 'electron'
import type { DesktopBrowserBridge } from '@quyet/client-ui-sidebar-browser/types'
import type { DesktopFileDrag } from '@quyet/util-file-drag'

/** IPC channel names kept private to the desktop application bundle. */
export const DESKTOP_IPC = {
  fileSave: 'quyet-desktop:file-save',
  clipboardImageRead: 'quyet-desktop:clipboard-image-read',
  shortcutsInput: 'quyet-desktop:shortcuts-input',
  shortcutsCloseWindow: 'quyet-desktop:shortcuts-close-window',
  shortcutsGet: 'quyet-desktop:shortcuts-get',
  shortcutsEdit: 'quyet-desktop:shortcuts-edit',
  shortcutsChanged: 'quyet-desktop:shortcuts-changed',
  shortcutsRecording: 'quyet-desktop:shortcuts-recording',
  boot: 'quyet-desktop:boot',
  enterWorkspace: 'quyet-desktop:enter-workspace',
  onboardingActive: 'quyet-desktop:onboarding-active',
  onboardingApiKey: 'quyet-desktop:onboarding-api-key',
  bootFailed: 'quyet-desktop:boot-failed',
  browserAcquire: 'quyet-desktop:browser-acquire',
  browserRelease: 'quyet-desktop:browser-release',
  browserOpenRequested: 'quyet-desktop:browser-open-requested',
  directoryPick: 'quyet-desktop:directory-pick',
  fileDragPrepare: 'quyet-desktop:file-drag-prepare',
  fileDragCancel: 'quyet-desktop:file-drag-cancel',
  fileDragStart: 'quyet-desktop:file-drag-start',
  fileDragRelease: 'quyet-desktop:file-drag-release',
  deviceInfo: 'quyet-desktop:device-info',
  localeBootstrap: 'quyet-desktop:locale-bootstrap',
  localeChanged: 'quyet-desktop:locale-changed',
  updatesChannelGet: 'quyet-desktop:updates-channel-get',
  updatesChannelSet: 'quyet-desktop:updates-channel-set',
  updatesChannelChanged: 'quyet-desktop:updates-channel-changed',
  updatesStatus: 'quyet-desktop:updates-status',
  updatesOpen: 'quyet-desktop:updates-open',
  updatesPresentation: 'quyet-desktop:updates-presentation',
  nativeThemeSet: 'quyet-desktop:native-theme-set',
  windowFullscreen: 'quyet-desktop:window-fullscreen',
  windowsAppearance: 'quyet-desktop:windows-appearance',
  windowsMenu: 'quyet-desktop:windows-menu',
} as const

/** Desktop release update state rendered by desktop-owned UI. */
export type DesktopUpdatePreparationFailureKind = 'stop-failed' | 'tasks-changed' | 'tasks-unavailable' | 'fullscreen-timeout'

export interface DesktopUpdateState {
  readonly phase: 'idle' | 'checking' | 'available' | 'downloading' | 'verifying' | 'installing' | 'ready' | 'error'
  readonly version?: string
  readonly message?: string
  /** Main-owned diagnostics without subprocess output or credentials; hidden until expanded. */
  readonly technicalDetails?: string
  readonly percent?: number
  readonly failedOperation?: 'check' | 'download' | 'install' | 'configuration'
  /** Main-owned preparation cause; UI wording is selected by the active locale. */
  readonly preparationFailure?: DesktopUpdatePreparationFailureKind
  /** Current filesystem failure, independent of previous cache cleanup attempts. */
  readonly downloadFailure?: 'space' | 'permission' | 'busy'
}

/** Classified failure copy selected by the Web locale without exposing raw updater diagnostics. */
export type DesktopUpdateFailureKind =
  | 'configuration'
  | 'check'
  | 'check-network'
  | 'download'
  | 'download-network'
  | 'download-space'
  | 'download-permission'
  | 'download-busy'
  | 'install'
  | 'install-network'
  | 'stop-failed'
  | 'tasks-changed'
  | 'tasks-unavailable'
  | 'fullscreen-timeout'

/** Semantic status content; actions open main-process confirmation dialogs only. */
export interface DesktopUpdatePresentation {
  readonly phase: DesktopUpdateState['phase']
  readonly version?: string
  readonly percent?: number
  readonly failure?: DesktopUpdateFailureKind
  readonly configurationError?: DesktopChannelState['error']
}

/** Product documents cannot supply update versions, package URLs, or installation authorization. */
export interface QuyetDesktopProductApi {
  readonly fileActions: DesktopFileActions
  readonly protocolVersion: 1
  readonly browser: DesktopBrowserBridge
  readonly fileDrag: DesktopFileDrag
  readonly keyboard: DesktopKeyboardApi
  readonly shortcuts: DesktopShortcutsApi
  /**
   * Local machine description for the feedback questionnaire.
   * @returns `name=value` fields separated by `; `, with no hostname, user name, or serial number.
   */
  deviceInfo(): Promise<string>
  readonly updates: {
    readonly channels: DesktopChannelBridge
    status(): Promise<DesktopUpdatePresentation>
    open(): Promise<void>
    subscribe(listener: (state: DesktopUpdatePresentation) => void): () => void
  }
}

/** Scheme of Desktop-owned application documents. */
export const SCHEME = 'quyet-app'

/**
 * Reject IPC outside the allowed Desktop document origins.
 * @param event - IPC caller whose frame URL supplies the origin.
 * @param hostnames - Desktop document hosts allowed for this operation.
 */
export function assertDesktopSender(event: IpcMainInvokeEvent, hostnames: readonly string[]): void {
  const senderFrame = event.senderFrame
  if (senderFrame === null) throw new Error('quyet desktop: rejected IPC without a sender frame')
  const url = new URL(senderFrame.url)
  if (url.protocol !== `${SCHEME}:` || !hostnames.includes(url.hostname)) {
    throw new Error('quyet desktop: rejected IPC from an unowned renderer')
  }
}
