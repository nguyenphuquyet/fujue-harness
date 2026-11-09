/**
 * Test-only client roster of the assembled viewer page.
 *
 * A served viewer page is the owner's own Web shell with the owner's client plugins; this roster is the
 * subset the viewer page specs need: the wire plugin, the Gateway, remote access, the Session/Workspace controllers,
 * the menu service, presentation plugins, and the Liveshare `./client` face, which mounts the viewer surfaces when the
 * carrier names a share. Every row is the package's own `/client` face registered as a module-table
 * factory. It must be imported only after {@link prepareViewerRemoteFaces} answered the generated
 * `/remote` faces these plugins import.
 *
 * @module @quyet/experimental-liveshare/tests/viewer-page-roster
 */

import * as apiGateway from '@quyet/api-gateway/client'
import * as apiRemoteAccess from '@quyet/api-remote-access/client'
import * as apiRemotes from '@quyet/api-remotes/client'
import * as apiSessionController from '@quyet/api-session-controller/client'
import * as apiWorkspaceController from '@quyet/api-workspace-controller/client'
import * as clientConnection from '@quyet/client-connection/client'
import * as clientFileUpload from '@quyet/client-file-upload/client'
import * as clientLocale from '@quyet/client-locale/client'
import * as clientModules from '@quyet/client-modules/client'
import * as clientResources from '@quyet/client-resources/client'
import * as clientShortcuts from '@quyet/client-shortcuts/client'
import * as uiAttachment from '@quyet/client-ui-attachment/client'
import * as uiChat from '@quyet/client-ui-chat/client'
import * as uiContextMenu from '@quyet/client-ui-context-menu/client'
import * as uiConversation from '@quyet/client-ui-conversation/client'
import * as uiDeliverables from '@quyet/client-ui-deliverables/client'
import * as uiFileDrag from '@quyet/client-ui-file-drag/client'
import * as uiLayout from '@quyet/client-ui-layout/client'
import * as uiRenderer from '@quyet/client-ui-renderer/client'
import * as uiSession from '@quyet/client-ui-session/client'
import * as uiSettings from '@quyet/client-ui-settings/client'
import * as uiSidebar from '@quyet/client-ui-sidebar/client'
import * as uiSidebarRight from '@quyet/client-ui-sidebar-right/client'
import * as uiTheme from '@quyet/client-ui-theme/client'
import * as uiTool from '@quyet/client-ui-tool/client'
import * as uiTrajectory from '@quyet/client-ui-trajectory/client'
import * as uiWorkspace from '@quyet/client-ui-workspace/client'
import * as typertRegistry from '@quyet/typert-registry/client'
import * as liveshare from '../src/client/index.ts'

/** One module-table row: the entry id the Loader creates, and that plugin's client exports. */
export interface ViewerPageRosterRow {
  readonly id: string
  readonly exports: Readonly<Record<string, unknown>>
}

/** Entry id of the module-system bootstrap whose exports the facade hands to the module system. */
export const VIEWER_PAGE_BOOTSTRAP_ID = '@quyet/client-modules'

/** The viewer page roster; Cordis composes these entries by service injection, so order is irrelevant. */
export const VIEWER_PAGE_ROSTER: readonly ViewerPageRosterRow[] = [
  { id: '@quyet/typert-registry', exports: typertRegistry },
  { id: '@quyet/experimental-liveshare', exports: liveshare },
  { id: VIEWER_PAGE_BOOTSTRAP_ID, exports: clientModules },
  { id: '@quyet/client-connection', exports: clientConnection },
  { id: '@quyet/api-gateway', exports: apiGateway },
  { id: '@quyet/api-remote-access', exports: apiRemoteAccess },
  { id: '@quyet/api-remotes', exports: apiRemotes },
  { id: '@quyet/api-session-controller', exports: apiSessionController },
  { id: '@quyet/api-workspace-controller', exports: apiWorkspaceController },
  { id: '@quyet/client-file-upload', exports: clientFileUpload },
  { id: '@quyet/client-locale', exports: clientLocale },
  { id: '@quyet/client-resources', exports: clientResources },
  { id: '@quyet/client-shortcuts', exports: clientShortcuts },
  { id: '@quyet/client-ui-renderer', exports: uiRenderer },
  { id: '@quyet/client-ui-theme', exports: uiTheme },
  { id: '@quyet/client-ui-settings', exports: uiSettings },
  { id: '@quyet/client-ui-layout', exports: uiLayout },
  { id: '@quyet/client-ui-session', exports: uiSession },
  { id: '@quyet/client-ui-sidebar', exports: uiSidebar },
  { id: '@quyet/client-ui-conversation', exports: uiConversation },
  { id: '@quyet/client-ui-chat', exports: uiChat },
  { id: '@quyet/client-ui-context-menu', exports: uiContextMenu },
  { id: '@quyet/client-ui-tool', exports: uiTool },
  { id: '@quyet/client-ui-attachment', exports: uiAttachment },
  { id: '@quyet/client-ui-file-drag', exports: uiFileDrag },
  { id: '@quyet/client-ui-sidebar-right', exports: uiSidebarRight },
  { id: '@quyet/client-ui-trajectory', exports: uiTrajectory },
  { id: '@quyet/client-ui-deliverables', exports: uiDeliverables },
  { id: '@quyet/client-ui-workspace', exports: uiWorkspace },
]
