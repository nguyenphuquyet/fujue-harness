/** Platform-neutral assembly of generated Host Remote contributions. */

import type { Context } from '@quyet/cordis'
import productAnalyticsRemote from '@quyet/client-product-analytics/remote'
export type {} from '@quyet/client-product-analytics/remote'
import agentPresetsRemote from '@quyet/agent-preset-registry/remote'
import userQuestionsRemote from '@quyet/user-questions/remote'
import commandsRemote from '@quyet/commands/remote'
import agentTeamsRemote from '@quyet/agent-team/remote'
export type {} from '@quyet/agent-team/remote'
import accountRemote from '@quyet/api-account-controller/remote'
import settingsControllerRemote from '@quyet/api-settings-controller/remote'
import officeToPdfRemote from '@quyet/office-to-pdf/remote'
import goalsRemote from '@quyet/goal/remote'
import scheduleRemote from '@quyet/schedule/remote'
import llmRemote from '@quyet/llm/remote'
import dynamicRemote from '@quyet/cordis-host-runner/remote'
import pluginManagerRemote from '@quyet/plugin-manager/remote'
import mcpManagerRemote from '@quyet/mcp-manager/remote'
import toolResultsRemote from '@quyet/client-ui-trajectory/remote'
import pluginRegistryProbeRemote from '@quyet/client-ui-plugin-manager/remote'
import pluginMarketRemote from '@quyet/plugin-market/remote'
import pluginInventoryRemote from '@quyet/host-plugin-inventory/remote'
import messageFeedbackRemote from '@quyet/message-feedback/remote'
import permissionPresetsRemote from '@quyet/permission-presets/remote'
import sessionFeedbackRemote from '@quyet/command-feedback/remote'
import fileUploadsRemote from '@quyet/client-file-upload/remote'
import sessionReferencesRemote from '@quyet/session-reference/remote'
import subagentsRemote from '@quyet/subagent/remote'
import sessionRemote from '@quyet/api-session-controller/remote'
import jobRemote from '@quyet/api-job-controller/remote'
import workspaceRemote from '@quyet/api-workspace-controller/remote'
import terminalRemote from '@quyet/api-terminal-controller/remote'
import workspaceFilesRemote from '@quyet/api-workspace-files/remote'
import webRemote from '@quyet/web/remote'
import type { ClientRemote } from '@quyet/api-gateway/client'

export type { ClientRemote } from '@quyet/api-gateway/client'
export type {
  BundleDetail, BundleInfo, BundleRowInfo, ChangeResult, IncompatiblePlugin, InspectOptions, InstallBundleOptions, InstallSpecKind,
  ManagementError, PackageResult,
  PluginChange, PluginEntryId, PluginInfo, PluginInspectProblem, PluginInstallCancellation, PluginInstallFailureKind,
  PluginInstallLogChunk, PluginInstallProgress, PluginInstallRequestId, PluginRegistries, PluginSpecInspection,
  PluginUpdateProgress, PluginUpdateResult, PluginUpdateStep, PluginVersion, PluginVersionList, RegistryAttempt,
  ReadOnlyReason, Registry, RestartReason,
} from '@quyet/plugin-manager/types'
export type { McpManagedServerStatus, McpManagedServerView } from '@quyet/mcp-manager/types'
export type {} from '@quyet/plugin-manager/remote'
export type {} from '@quyet/mcp-manager/remote'
export type {} from '@quyet/client-ui-plugin-manager/remote'
export type {} from '@quyet/client-ui-trajectory/remote'
export type {} from '@quyet/plugin-market/remote'
export type {
  MarketCompatibility, MarketIndexSummary, MarketInstallation, MarketInstallationStatus, MarketListingEntry, MarketListingVersion,
  MarketQuery, MarketSearchResult, MarketSort, PluginDetail, PluginDetailDocumentId, PluginDetailOrigin,
} from '@quyet/plugin-market/types'
export type { PluginInventorySnapshot } from '@quyet/host-plugin-inventory/types'
export type {} from '@quyet/agent-preset-registry/remote'
export type {} from '@quyet/user-questions/remote'
export type {} from '@quyet/commands/remote'
export type {} from '@quyet/web/remote'
export type {} from '@quyet/api-settings-controller/remote'
export type {} from '@quyet/api-account-controller/remote'
export type {} from '@quyet/goal/remote'
export type {} from '@quyet/schedule/remote'
export type {} from '@quyet/office-to-pdf/remote'
export type {} from '@quyet/llm/remote'
export type {} from '@quyet/host-plugin-inventory/remote'
export type {} from '@quyet/message-feedback/remote'
export type {} from '@quyet/permission-presets/remote'
export type {} from '@quyet/command-feedback/remote'
export type {} from '@quyet/client-file-upload/remote'
export type {} from '@quyet/session-reference/remote'
export type {} from '@quyet/subagent/remote'
export type * from '@quyet/subagent/client'
export type {} from '@quyet/api-session-controller/remote'
export type * from '@quyet/api-session-controller/types'
export type {} from '@quyet/api-job-controller/remote'
export type * from '@quyet/api-job-controller/types'
export type {} from '@quyet/api-workspace-controller/remote'
export type * from '@quyet/api-workspace-controller/types'
export type {} from '@quyet/api-workspace-files/remote'
export type * from '@quyet/api-workspace-files/types'
export type {} from '@quyet/api-terminal-controller/remote'
export type * from '@quyet/api-terminal-controller/types'
// The forwarded-event allowlist's selection seat: without it in the consumer's
// compilation face `TypertRemoteEvent` is `never` and every `$on` call fails.
export type { ApiRemoteForwardedEvent } from '../types.ts'
// The owner packages' client-safe `./types` exports supply the `Events`
// signatures `$on` hands to a listener, so a consumer reads the very
// declaration the Host emits rather than a flattened restatement of it.
export type {} from '@quyet/commands/types'
export type {} from '@quyet/web/types'
export type {} from '@quyet/cordis-host-runner/types'
export type {} from '@quyet/credentials/types'
export type {} from '@quyet/llm/types'
export type {} from '@quyet/agent-preset-registry/types'
export type {} from '@quyet/permission-presets/types'
export type {} from '@quyet/settings/types'
export type {} from '@quyet/user-approval/types'
export type {} from '@quyet/user-questions/types'
export type {} from '@quyet/api-session-controller/types'

/**
 * The carrier's Client-facing types, re-exported so a business package names one
 * assembly package instead of both this facade and the Connection plugin. Type-only:
 * the carrier's runtime values stay behind their own module edge.
 */
export type {
  ConnectionHandle, ConnectionSinks, ContentBlock,
  MessageId,
  RpcId, RpcRequest, RpcResponse, RpcResult, SessionId,
  StreamChunk,
} from '@quyet/client-connection/client'
export type {} from '@quyet/api-gateway/client'
export type {} from '@quyet/cordis-host-runner/remote'

// The payload vocabulary of the selected namespaces, re-exported so a Client
// contribution can name what it sends and receives without importing a Host
// package: this assembly is the one place both planes legitimately meet.
export type {
  ApprovalRequestId,
  CordisHalfState,
  CordisDynamicPackageId,
  CordisDynamicPluginId,
  CordisDynamicPluginRunId,
  CordisDynamicRunMode,
  CordisInspectMethodManifest,
  CordisInspectPlatform,
  CordisInspectProviderManifest,
  CordisInspectProviderView,
  CordisInspectQueryRequest,
  CordisInspectQueryResolution,
  CordisInspectQueryResolved,
  CordisInspectRequestId,
  CordisInspectResolveAck,
  CordisRunDiagnostic,
  CordisRunStatus,
  DynamicCordisClientSource,
  DynamicCordisHostHalfResult,
  DynamicCordisInventoryRow,
  DynamicCordisInvokeResult,
  DynamicCordisPackage,
  DynamicCordisRequestResolved,
  DynamicCordisResolveAck,
  DynamicCordisRetracted,
  DynamicCordisRunRequest,
  DynamicCordisRunResolution,
  DynamicCordisRunAttempt,
  DynamicCordisRunResponse,
  DynamicCordisStopResponse,
  DynamicCordisUndefineReceipt,
  RequestRunOutcome,
} from '@quyet/cordis-host-runner/types'
// Credential state vocabulary for the credentials namespace (values never ride it).
export type { CredentialInfo } from '@quyet/credentials/types'
// Redacted namespace vocabulary for the settings namespace (secrets never ride
// it). It travels with its seam, whose `./types` the Client face already reads.
export type {
  SettingsDescribeValue, SettingsNamespaceView, SettingsPathOpView, SettingsSecretView,
} from '@quyet/settings/types'
// Provider registry and discovery vocabulary for the llm namespace.
export type {
  LlmConfigurableProvider, LlmDiscoveredModel,
  LlmModelDiscoveryRequest, LlmNativeAuth, LlmProviderInfo,
} from '@quyet/llm/types'
// Reference-discovery result vocabulary for the fileReferences and
// sessionReferenceResolver namespaces.
export type { FileReferenceCandidate } from '@quyet/file-reference/types'
export type { SessionReferenceMentionCandidate } from '@quyet/session-reference/types'

// The Remote failure vocabulary, re-exported so business packages keep naming
// this assembly alone. Types only: a value export would make spec imports load
// this module's owner /remote artifacts; specs take RemoteError from
// quyet-client-test-runtime instead.
export type {
  RemoteErrorCode, RemoteErrorDetailsMap, RemoteFailure, RemoteResult,
} from '@quyet/typert-protocol'
export type { RemoteHostFacts } from '@quyet/api-gateway/client'

declare module '@quyet/cordis' {
  interface Context {
    /** Generated Remote namespaces selected by this Client assembly. */
    remote: ClientRemote
  }
}

/** Required service: the typed Client Remote contribution mount. */
export const inject = ['remote']

/**
 * Mount the Host capabilities explicitly selected for this Client assembly.
 * @param ctx - Client Cordis root carrying the typed API service.
 * @returns disposer after every selected Remote namespace is ready.
 */
export async function apply(ctx: Context): Promise<() => Promise<void>> {
  const disposers: Array<() => Promise<void>> = []
  try {
    for (const contribution of [
      productAnalyticsRemote, agentPresetsRemote, commandsRemote, agentTeamsRemote, settingsControllerRemote, accountRemote,
      goalsRemote, llmRemote, dynamicRemote, scheduleRemote,
      pluginInventoryRemote, pluginManagerRemote, mcpManagerRemote, pluginMarketRemote, pluginRegistryProbeRemote,
      toolResultsRemote,
      messageFeedbackRemote, sessionFeedbackRemote,
      fileUploadsRemote, sessionReferencesRemote,
      permissionPresetsRemote, subagentsRemote, sessionRemote, jobRemote, workspaceRemote, workspaceFilesRemote, terminalRemote,
      officeToPdfRemote, userQuestionsRemote, webRemote,
    ]) {
      disposers.push(await ctx.remote.$mount(contribution))
    }
  } catch (error) {
    for (const dispose of disposers.reverse()) await dispose()
    throw error
  }
  // Unwound in reverse mount order, so a namespace never outlives one mounted
  // after it.
  return async () => {
    for (const dispose of disposers.reverse()) await dispose()
  }
}
