/**
 * Shared wire protocol for the JueTech Harness SDK runtime: the
 * newline-delimited JSON-RPC stdio transport plus the named request, result,
 * and notification types both wire ends speak. The runtime server plugin
 * (`@quyet/sdk-jsonrpc-server`) serves this protocol; SDK clients
 * (`@quyet/sdk-client`, the Python SDK) drive it.
 *
 * @module @quyet/sdk-protocol
 */

export { JsonRpcLineTransport, JsonRpcResponseError } from './transport.ts'
export type { JsonRpcTransportPeer } from './transport.ts'
export type {
  ApprovalRequestParams,
  ApprovalRequestResult,
  CommandExecution,
  HarnessSdkClientRequestMap,
  HarnessSdkNotificationMap,
  HarnessSdkRequestMap,
  HarnessSdkHostRequestMap,
  InitializeParams,
  InitializeResult,
  SdkEncodedImageBlock,
  SdkPromptContentBlock,
  SdkRunStatus,
  SdkUserQuestionRequest,
  SdkUserQuestionAnswer,
  SdkUserQuestionResult,
  SdkUserQuestionCancelled,
  SessionEventNotification,
  SessionQueryParams,
  SessionQueryResult,
  SessionStatusNotification,
  SessionPromptParams,
  SessionPromptResult,
  SessionResumeParams,
  SessionWaitParams,
  SessionWorkingDirectoryParams,
  SessionWorkingDirectorySetParams,
  SessionWorkingDirectoryResult,
  SubagentFinishedNotification,
  SubagentStartedNotification,
} from './types.ts'
