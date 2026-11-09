# Loadable Harness plugin packages

This file is GENERATED from workspace manifests (`scripts/gen-plugin-packages.ts`) and verified fresh by `pnpm run verify-plugin-packages` (part of `doc-sync`); do not edit it by hand.

Every package below exports a Cordis plugin that a bundle patch can name in a Loader row. `Config` marks packages whose row accepts a `config` mapping; query `Config.listConfigs` through `cordis_inspect_query` (filter by `name`, then query the `entry` id) for the mounted schema. Packages under `experimental` are pre-stable.

## acp

| Package | Config | Description |
|---|---|---|
| `@quyet/acp` | yes | Automation-only Agent Client Protocol server for driving JueTech Harness agents over JSON-RPC stdio |

## api

| Package | Config | Description |
|---|---|---|
| `@quyet/api-account-controller` | no | Expose safe account operations over authenticated Remote |
| `@quyet/api-gateway` | yes | Typert Remote Host dispatcher and Client API endpoint |
| `@quyet/api-job-controller` | yes | Job Remote observation stream and the reference-counted client job-output service |
| `@quyet/api-remote-access` | no | Method-level Remote access control for non-owner Peers and the per-Peer access snapshot |
| `@quyet/api-remotes` | no | Remote BFF assembly for application-selected Host capabilities |
| `@quyet/api-session-controller` | yes | Session Remote commands, cold reads, and live control transport |
| `@quyet/api-settings-controller` | yes | Remote owner for the configuration surfaces over the settings-domain seams |
| `@quyet/api-terminal-controller` | yes | Session-owned interactive terminals with shell discovery, screen recovery and typed Remote control |
| `@quyet/api-workspace-controller` | yes | Workspace Remote commands and reconnect-safe state transport |
| `@quyet/api-workspace-files` | yes | Workspace file service and Client resource provider: bounded reads, directory listing, and live metadata over the workspaceFiles Remote namespace |

## attachment

| Package | Config | Description |
|---|---|---|
| `@quyet/attachment-local` | yes | Private content-addressed QUYET_HOME attachment storage |

## boot

| Package | Config | Description |
|---|---|---|
| `@quyet/config-editor` | no | Persist plugin configuration through profile patches and Loader reconciliation |
| `@quyet/hmr` | yes | Coordinated module and profile configuration hot reload |
| `@quyet/plugin-manager` | yes | Current-profile plugin and bundle management shared by quyet CLI, Web and agent tools |
| `@quyet/plugin-market` | yes | Configured plugin market indexes for the Web Discover page and the plugin_market agent tool |

## browser-use

| Package | Config | Description |
|---|---|---|
| `@quyet/browser-use` | no | Exclusive named browser-use provider registration |

## bundle

| Package | Config | Description |
|---|---|---|
| `@quyet/acp-app` | no | The quyet ACP profile bundle: automation-only JSON-RPC stdio and process lifecycle over quyet-base |
| `@quyet/headless` | yes | The quyet one-shot bundle: a direct core Agent/Session runner over quyet-base with no Host, HTTP, or browser layer |
| `@quyet/sdk-app` | yes | The quyet SDK profile bundle: stdio JSON-RPC serving and process lifecycle over quyet-base |
| `@quyet/web-app` | yes | The quyet browser-surface bundle: the web patch layer over quyet-base plus the runtime glue plugin (frontend dist serving, bash runtime variables, URL line) |

## client

| Package | Config | Description |
|---|---|---|
| `@quyet/client-connection` | yes | Authenticated RPC transport and generation lifecycle |
| `@quyet/client-file-upload` | no | Agent-scoped browser file upload, streaming intake, and staged receipt service |
| `@quyet/client-hmr` | yes | Web client graph synchronization and rebuilt-bundle reload transport |
| `@quyet/client-locale` | no | Locale plugin: Host-backed preference, extensible language catalog, browser fallback, and typed built-in dictionaries |
| `@quyet/client-modules` | no | Client module system, dual-face: node half composes the __QUYET_BOOT__ entry graph (incremental quyet.client scan, bundle route, index tap, webPlugins service); browser half is the lazy-CJS module table the vendored cordis Loader consumes as its internal seam |
| `@quyet/client-product-analytics` | yes | Desktop product event collection and authenticated Host reporting |
| `@quyet/client-resources` | no | Unified client resource model: protocol-registered providers turn URL addresses into live values, consumed through the useResource global standard hook |
| `@quyet/client-shortcuts` | yes | Application keyboard command registry and physical-key routing |
| `@quyet/client-ui-agent-preset` | no | Agent-preset surfaces: the default for later sessions, this session's seat, and the composition editor |
| `@quyet/client-ui-agent-team` | no | Web shared task board for a subagent tree |
| `@quyet/client-ui-approval` | no | Approval composer takeover over the scoped Remote Event waterfall |
| `@quyet/client-ui-attachment` | no | Dynamic attachment presentation plugin for conversation input, message-image, and trajectory image slots |
| `@quyet/client-ui-brand-official` | no | Official JueTech Harness brand artwork and click-triggered home background |
| `@quyet/client-ui-chat` | no | Chat Conversation target, node definitions, renderers, and details surface |
| `@quyet/client-ui-commands` | no | Client command surface: global directory cache, '/' source, three command UI kinds, popupSelect registry |
| `@quyet/client-ui-context-menu` | no | Typed, plugin-extensible context menus with captured targets and shared Web presentation |
| `@quyet/client-ui-conversation` | no | Target-neutral Conversation assembly, shell, composer, queue, and view navigation |
| `@quyet/client-ui-deliverables` | no | Changed-files card with per-file comparison tabs, delivery cards, and clickable final-response file references for Web |
| `@quyet/client-ui-directory-picker-browse` | no | In-app directory browsing surface: the workspace directory-flow owner rendering the host's listing and creation primitives |
| `@quyet/client-ui-directory-picker-native` | no | Native directory-picker surface: the renderless workspace directory-flow occupant driving the local Desktop or Host OS chooser |
| `@quyet/client-ui-entry-customization` | no | Customize plugin entries in the left sidebar, conversation views, and right sidebar, and quickly create new plugins. |
| `@quyet/client-ui-file-actions` | no | Original-file saving and image clipboard actions for Web and Desktop |
| `@quyet/client-ui-file-drag` | no | Application-owned file drag transfers and localized failure feedback |
| `@quyet/client-ui-goal` | no | Session goal surface: GoalBar docked above the composer, read from the goal session projection |
| `@quyet/client-ui-input-trigger` | no | Input trigger pipeline: '/' and '@' detection, candidate menu, pick routing to registered sources |
| `@quyet/client-ui-jobs` | no | Session-header background-job list with on-demand streaming record panels |
| `@quyet/client-ui-layout` | no | Shell plugin: three-column AppFrame with drag handles, ctx.layout viewing-state service (navigation + panels) |
| `@quyet/client-ui-message-feedback` | no | The Web feedback surface: per-message Like/Dislike in the assistant-message action strip and the feedback dialog behind both ratings and /feedback, backed by the messageFeedback and sessionFeedback Host Remotes |
| `@quyet/client-ui-model-selection` | no | Model selection over the shared model catalog, Session projection, and session.selectModel |
| `@quyet/client-ui-open-in-app` | no | Session application submenus and native opening controls for directories and previewed files |
| `@quyet/client-ui-permission-presets` | no | Permission surfaces: a new-session default in General settings and a current-session /permission popup over the permissions projection |
| `@quyet/client-ui-plan` | no | Plan mode controls, persistent transcript plan cards, and sidebar Markdown previews |
| `@quyet/client-ui-plugin-manager` | yes | Plugin management for the quyet web client: the sidebar Plugins panel installs, enables, disables, retries, and composes installed plugin packages |
| `@quyet/client-ui-plugin-market` | no | Discover tab of the quyet web Plugins page: browse configured plugin market indexes and install their bundles |
| `@quyet/client-ui-reference` | no | Unified Web @file and @session reference source |
| `@quyet/client-ui-renderer` | no | Browser UI renderer: React slot bindings, ctx.uiRenderer, and the assembled application root |
| `@quyet/client-ui-schedule` | no | Host task management page and Session reminder catalog |
| `@quyet/client-ui-secret-mask` | no | Web display masking for recognized credentials in sent user text |
| `@quyet/client-ui-session` | no | Session Controller adapter for React and session-scoped slots |
| `@quyet/client-ui-settings` | no | Settings domain base plugin: shared configuration forms and the canonical settings slot-type contract |
| `@quyet/client-ui-settings-account` | yes | Manage DeepSeek login and open Platform billing pages |
| `@quyet/client-ui-settings-agent-loop` | no | Settings page of the agent loop on the quyet web client's Plugins page: the parallel tool-call cap of the agent-loop namespace |
| `@quyet/client-ui-settings-general` | no | Settings ownerless-copy plugin: the General section, shell trigger/header chrome content, and settings dictionaries |
| `@quyet/client-ui-settings-models` | yes | Models settings and shared product-onboarding dialogs over existing settings and credential joins |
| `@quyet/client-ui-settings-plugin-inventory` | no | Read-only Cordis Loader inventory tab in Web Plugins settings |
| `@quyet/client-ui-settings-plugins` | no | Built-in plugins settings section for the quyet web client: the Settings navigation entry and the tab chrome feature-owned tabs register into |
| `@quyet/client-ui-settings-session-log` | no | General settings control for Session-log upload with DeepSeek API requests |
| `@quyet/client-ui-settings-shell` | no | Settings page of the shell executor on the quyet web client's Plugins page: the command timeout and the per-stream output cap of the shell namespace |
| `@quyet/client-ui-settings-subagent` | no | Settings page of Subagent delegation on the quyet web client's Plugins page: recursion depth, parallel capacity, and the models agents may choose for subagents |
| `@quyet/client-ui-settings-web-search` | no | Settings page for web search and fetch on the quyet web client's Plugins page: the Search and Fetch provider menus, the DeepSeek Search API result count, and legacy Messages search settings |
| `@quyet/client-ui-shortcuts` | no | Keyboard shortcut reference, recording, and local preference editing |
| `@quyet/client-ui-sidebar` | no | Sidebar plugin: session multi-level tree, search, grouping, state dots |
| `@quyet/client-ui-sidebar-browser` | no | Sandboxed Web browser tabs for the right Sidebar |
| `@quyet/client-ui-sidebar-documentpreview` | yes | Extensible Sidebar previews for Office documents, spreadsheets, Markdown, code, images, PDF, HTML, and plain text |
| `@quyet/client-ui-sidebar-files` | no | The workspace files page and one workspace directory tree per pane beside docked and floating file previews, listed lazily over the workspaceFiles Remote namespace |
| `@quyet/client-ui-sidebar-right` | no | Right Sidebar: the docking surface's session-bound state, its panel and header expand control, and the navigation service over it |
| `@quyet/client-ui-sidebar-terminal` | no | Interactive shell tabs for the right Sidebar |
| `@quyet/client-ui-skill` | no | Web skill references and the dedicated skill tool row |
| `@quyet/client-ui-subagent` | no | Subagent conversation catalog, continuation routing UI, and '@' reference source |
| `@quyet/client-ui-theme` | yes | Theme plugin: Host bootstrap for the pre-plugin palette; ThemeRuntime for light/dark/system state and icon replacements; --dsw-* token styles and Appearance settings row |
| `@quyet/client-ui-tool` | no | Client Tool call-tree renderer and keyed per-tool presentation slot |
| `@quyet/client-ui-trajectory` | yes | Trajectory event ledger and timing overview with live tool-result inspection |
| `@quyet/client-ui-user-questions` | no | Web ask_user_question composer takeover and plan-review presentation UI |
| `@quyet/client-ui-workflow-run` | no | Durable workflow-run Conversation Node and nested member disclosure for quyet web |
| `@quyet/client-ui-workspace` | no | Workspace picker plugin: one WorkspacePicker registered into the sidebar and empty-state workspace slots |

## compaction

| Package | Config | Description |
|---|---|---|
| `@quyet/command-compact` | no | Human-facing slash command for explicit session compaction |
| `@quyet/compaction-basic` | yes | Token-meter-driven compaction policy and LLM summarization backend for the JueTech Harness |
| `@quyet/compaction-image-offload` | no | Durable image offload for image-capable routes: replace over-budget request images with placeholders and retry |
| `@quyet/compaction-tool-result-pruner` | yes | Replay-safe model-free head/middle/tail pruning for tool-result surface nodes |

## computer-use

| Package | Config | Description |
|---|---|---|
| `@quyet/computer-use` | no | Exclusive named computer-use provider registration |

## context

| Package | Config | Description |
|---|---|---|
| `@quyet/agent-instructions` | yes | Workspace context loader for AGENTS.md/CLAUDE.md instruction files |
| `@quyet/file-reference-local` | yes | Local-filesystem ctx.fileReferences provider with bounded fuzzy indexes |
| `@quyet/harness-dev-context` | no | Model context naming the JueTech Harness checkout and Web GUI URL without letting either change the system prompt |
| `@quyet/session-reference` | yes | Cross-session snapshot references and durable untrusted model context (ctx.sessionReferenceResolver) |
| `@quyet/time-context` | yes | Durable per-step context with the current time and elapsed time |
| `@quyet/tmux-context` | yes | Opt-in durable per-step context with this agent's tmux pane and window location |

## core

| Package | Config | Description |
|---|---|---|
| `@quyet/agent` | no | Agent interface, registry, initiator scope, and event vocabulary for the JueTech Harness |
| `@quyet/agent-default-model` | yes | Default model selection shared by Agent entry points |
| `@quyet/agent-loop` | yes | The concrete agent loop plugin for the JueTech Harness |
| `@quyet/agent-tool-presentation` | yes | Deprecated tool presentation selector; use quyet-tool-executor-native or quyet-tool-executor-ptc directly |
| `@quyet/session` | no | Event-sourced session store for the JueTech Harness |
| `@quyet/system-prompt` | yes | System prompt assembly registry for the JueTech Harness |
| `@quyet/tool-executor-native` | no | Native tool execution plugin |
| `@quyet/tool-executor-ptc` | yes | PTC program execution, tool bindings, and generated SDK prompts |
| `@quyet/tools` | no | Tool registry and execution pipeline for the JueTech Harness |

## credentials

| Package | Config | Description |
|---|---|---|
| `@quyet/authorization` | no | Authorization seam (ctx.authorization): plugin-owned flows that obtain a credential through a conversation with the human |
| `@quyet/credentials-local` | yes | File-backed credentials provider ($QUYET_HOME/.env under the live process environment) for the JueTech Harness |
| `@quyet/deepseek-account-platform` | yes | Authorize DeepSeek accounts through browser PKCE |

## deliverables

| Package | Config | Description |
|---|---|---|
| `@quyet/deliverable-file-references` | no | Shared model guidance for file links and deliverables across JueTech Harness hosts |
| `@quyet/tool-present` | yes | Explicit workspace file delivery declarations for the JueTech Harness |
| `@quyet/workspace-changes` | yes | Per-turn workspace file changes recorded from git working-tree snapshots and whole-file captures, with per-file comparisons, for the JueTech Harness |

## document

| Package | Config | Description |
|---|---|---|
| `@quyet/office-to-pdf` | yes | Shared Office-to-PDF conversion with bounded queues and caching |

## experimental

| Package | Config | Description |
|---|---|---|
| `@quyet/action-cards` | yes | Optional action cards below answers: one shared proposal tool, card state, user actions and status notices |
| `@quyet/client-ui-action-cards` | no | Action cards below completed answers: the shared card frame, kind bodies and the compact tool row |
| `@quyet/client-ui-creation-recommendations` | no | Body of the personalized page card: location choice, creation progress, Undo and Restore |
| `@quyet/client-ui-plugin-recommendations` | no | Official plugin card body with catalog text and enabling |
| `@quyet/creation-recommendations` | no | Create persistent removable interface plugins from explicit conversation needs |
| `@quyet/cua` | no | Shared Computer Use application objects, authorization, and logged tool execution |
| `@quyet/experimental-api-speech-to-text` | yes | Authenticated experimental speech transcription for browser clients |
| `@quyet/experimental-auto-review` | no | Per-tool LLM authorization review for the JueTech Harness Auto permission preset |
| `@quyet/experimental-browser-use-chrome-devtools-mcp` | yes | Experimental per-Session Chromium browser tools through chrome-devtools-mcp |
| `@quyet/experimental-browser-use-playwright-mcp` | yes | Experimental per-Session Chromium browser tools through @playwright/mcp |
| `@quyet/experimental-browser-use-stagehand-native` | yes | Experimental Stagehand browser tools with separately configured native models |
| `@quyet/experimental-claude-code-mods` | yes | Experimental bridge: load Claude Code mods (hooks modules) and run their hook chains on JueTech Harness extension points |
| `@quyet/experimental-client-ui-claude-code-mods` | no | Web band above the prompt for Claude Code mods: draws each session's mod tree and sends button presses back to the bridge |
| `@quyet/experimental-client-ui-cot-translation` | yes | Optional machine translation of expanded reasoning, preserving original Session text |
| `@quyet/experimental-client-ui-forge` | yes | Sidebar panel for a Session's change requests, with a worktree option for new Sessions and its Host Remote |
| `@quyet/experimental-client-ui-stats` | no | Per-turn and per-step context, timing, cache, and tool-cost table contributed as an experimental conversation View |
| `@quyet/experimental-client-ui-voice-input` | no | Record speech and insert editable text into the conversation draft |
| `@quyet/experimental-computer-use-cua-driver-mcp` | yes | Experimental computer use through an installed Cua Driver MCP executable |
| `@quyet/experimental-computer-use-cua-driver-native` | no | Experimental computer-use provider embedding the Cua Driver native npm SDK |
| `@quyet/experimental-cua-macos` | yes | macOS native provider for shared Computer Use application and window objects |
| `@quyet/experimental-forge` | yes | Provider-neutral change request registry with shared status polling |
| `@quyet/experimental-forge-github` | yes | GitHub provider for the experimental forge registry, read through the GitHub CLI on the host |
| `@quyet/experimental-forge-session` | yes | Binds change requests to the Session that created, pushed, or tracked them |
| `@quyet/experimental-inspector` | yes | Experimental cross-realm CDP hub for Host debugging and Client Runtime inspection |
| `@quyet/experimental-ptc-runtime-python` | yes | CPython subprocess implementation of the JueTech Harness PTC execution seam |
| `@quyet/experimental-session-inspector` | no | Experimental virtualized Session log and live Chat group/node inspectors |
| `@quyet/experimental-speech-to-text` | yes | Experimental speech recognition with independently selectable providers |
| `@quyet/experimental-speech-to-text-sensevoice` | yes | Local SenseVoice ONNX transcription with a managed sherpa-onnx process |
| `@quyet/experimental-subagent-oar` | yes | Experimental one-shot subagents through OAR runtimes |
| `@quyet/experimental-tool-subagent-oar` | yes | Delegate standalone tasks to configured external subagent providers |
| `@quyet/experimental-tool-worktree` | no | Model tool that creates and enters a new Git worktree |
| `@quyet/experimental-translator` | yes | Machine translation with reusable Session results |
| `@quyet/experimental-worktree` | yes | Creates a named Git worktree and changes the calling Session working directory |
| `@quyet/hooks-claude-code` | yes | Bridge plugin: run a Claude Code hooks.json / settings hook config on the JueTech Harness interception seams |
| `@quyet/hooks-codex` | yes | Bridge plugin: run a Codex hooks.json hook config on the JueTech Harness interception seams |
| `@quyet/plugin-recommendations` | no | Official plugin suggestions with explicit user activation and persistent conversation decisions |
| `@quyet/session-title-all-prompts-llm` | yes | All-user-messages LLM provider plugin for JueTech Harness session titles |
| `@quyet/skill-badge` | no | Bundled quyet badge skill provider for JueTech Harness |
| `@quyet/tool-ralph` | yes | Model-facing fresh-agent Ralph loop over the workflow and subagent seams |
| `@quyet/tool-session-query` | yes | Workspace-authorized model-facing session history search, trace, and event read tools |
| `@quyet/tool-terminal` | yes | Six model-facing persistent PTY tools with owner isolation and generic background-job integration |
| `@quyet/webhook` | no | Fire-and-forget webhook rule runtime that creates Workspace-backed JueTech Harness Sessions |
| `@quyet/webhook-github` | yes | Signed GitHub HTTP webhook adapter for the JueTech Harness webhook runtime |

## extensions

| Package | Config | Description |
|---|---|---|
| `@quyet/client-ui-cordis` | no | Cordis dynamic-plugin definition card: the keyed cordis_define tool row with its run/stop switch |
| `@quyet/cordis-client-runner` | no | Browser half of dynamic dual-half plugin packages: event subscription, closure evaluation, guard facade, and loader entries |
| `@quyet/cordis-host-runner` | yes | Dynamic package definition registry, host-half sandbox lifecycle, and invoke handler table for model-mounted dual-half packages |
| `@quyet/tool-cordis` | no | Read-only runtime API inspection for Harness plugin development |

## feedback

| Package | Config | Description |
|---|---|---|
| `@quyet/command-feedback` | no | Log-only session feedback: the record event, the sessionFeedback Host Remote, and the human-facing slash command |
| `@quyet/message-feedback` | yes | Canonical Session-log ratings and notes for finalized assistant messages |

## fs

| Package | Config | Description |
|---|---|---|
| `@quyet/fs-local` | yes | Local-filesystem implementation of the JueTech Harness filesystem seam (ctx.fs) |
| `@quyet/fs-observation-policy` | no | File-context policy plugin for the JueTech Harness — observed-state, read-before-edit, and version-guarded write/edit added over the ctx.fs provider seam through the fs/* event gate (no service API) |
| `@quyet/fs-sandbox` | yes | Sandbox-enforcing implementation of the JueTech Harness filesystem seam: fences write/edit by the per-call sandbox mode (read-only denies mutation, workspace-write contains it to the workspace + temp roots) while reads pass through |
| `@quyet/tool-fs` | yes | Model-facing filesystem tools (read, write, edit) over the JueTech Harness filesystem seam (ctx.fs) |
| `@quyet/tool-fs-search` | yes | Model-facing filesystem discovery tools (glob, grep) backed by the packaged ripgrep binary (@vscode/ripgrep) |
| `@quyet/tool-str-replace-editor` | yes | Model-facing view, create, literal replace, and line insert tool over the Harness filesystem service |

## goal

| Package | Config | Description |
|---|---|---|
| `@quyet/command-goal` | no | Human-facing slash command for persisted same-session goals |
| `@quyet/goal` | yes | Event-sourced same-session goal state and lifecycle service for the JueTech Harness |
| `@quyet/goal-round-driver` | no | Race-fenced same-session goal-round driver |
| `@quyet/tool-goal` | yes | Model-facing same-session goal tools with execution-time authority checks |

## guard

| Package | Config | Description |
|---|---|---|
| `@quyet/repeat-tool-reminder` | yes | Repeat-tool-call guard plugin: advisory reminders when an agent loops on identical tool calls |
| `@quyet/tool-call-timeout-policy` | no | Tool-call timeout policy: a tools/execute wrapper that arms a per-tool deadline on exec.signal and returns TOOL_TIMEOUT when it wins |

## host

| Package | Config | Description |
|---|---|---|
| `@quyet/host-directory-picker-auto` | no | Adaptive chooser of the directory-picker seam: resolves the host situation at boot and mounts the native or browse backend for the JueTech Harness web GUI host |
| `@quyet/host-directory-picker-browse` | yes | In-app browsing backend of the directory-picker seam (listing/creation primitives over the host filesystem) |
| `@quyet/host-directory-picker-native` | no | Native-OS-chooser backend of the directory-picker seam for the JueTech Harness web GUI host |
| `@quyet/host-frontend-static` | yes | SPA dist server for the Web shell: owns the webserver fallback seat, serving explicit index entries and static assets with traversal rejection and 404 misses |
| `@quyet/host-open-in-app` | yes | Host half of open-in-app: resolved application catalog, icons, and the launch endpoint as three webServer routes |
| `@quyet/host-plugin-inventory` | no | Read-only Remote projection of current Cordis Loader plugin state |
| `@quyet/host-product-telemetry-otel` | yes | Explicit product usage events exported through OpenTelemetry HTTP logs |
| `@quyet/host-webserver` | yes | Web route-registration plugin: HTTP and upgrade routes, per-Peer index transform taps, and static dist fallback |

## interaction

| Package | Config | Description |
|---|---|---|
| `@quyet/commands` | no | Plugin-owned human command registry for JueTech Harness UIs |
| `@quyet/permission-presets` | yes | User-facing permission presets (ctx.permissionPresets) for the JueTech Harness: one product-level Permissions select bundling the sandbox-mode and approval-policy knobs, written through to their own session events |
| `@quyet/tool-ask-user` | yes | Model-facing ask_user_question tool over the ctx.userQuestions seam |
| `@quyet/user-approval` | yes | User-approval seam (ctx.approval) for the JueTech Harness: one-shot permission decisions dispatched to composed answerers over the approval/request waterfall, fail-closed by default |
| `@quyet/user-questions` | no | Abstract user-questions seam (ctx.userQuestions) for asking the human during agent runs |

## jobs

| Package | Config | Description |
|---|---|---|
| `@quyet/jobs-local` | yes | Process-local implementation of the JueTech Harness background job registry seam |
| `@quyet/tool-jobs` | yes | Model-facing background job control tools (job_output, job_list, job_kill) over the ctx.jobs registry |

## llm

| Package | Config | Description |
|---|---|---|
| `@quyet/deepseek-llm-api-extensions` | no | Additive request-field registry for the official DeepSeek LLM API adapter |
| `@quyet/llm` | no | Provider-neutral LLM service interface for the JueTech Harness |
| `@quyet/llm-deepseek-account` | yes | DeepSeek account provider authentication and discovery |
| `@quyet/llm-deepseek-api-key` | yes | DeepSeek api-key provider authentication and discovery |
| `@quyet/llm-pi-ai` | yes | pi-ai-backed DeepSeek adapter for the JueTech Harness LLM seam (design-verification twin of quyet-llm-deepseek) |
| `@quyet/llm-retry` | yes | Provider-routed LLM request retry policy for the JueTech Harness |
| `@quyet/plugin-package-inventory-deepseek` | yes | Active Loader-backed plugin package inventory for official DeepSeek LLM API requests |
| `@quyet/token-meter` | yes | Replay-aware token measurement service (ctx.tokenMeter) for the JueTech Harness |

## lsp

| Package | Config | Description |
|---|---|---|
| `@quyet/lsp` | no | Abstract LSP capability seam (ctx.lsp) for the JueTech Harness — language-server provider registry keyed by branded id and extension mapping, order-independent per-query selection, normalized definition/references/implementation/hover requests and results, and the LspError taxonomy |
| `@quyet/lsp-stdio` | yes | Generic stdio language-server provider for the JueTech Harness LSP capability seam (ctx.lsp) — spawns configured servers, translates JSON-RPC, and serves transient-open goToDefinition/findReferences/goToImplementation/hover queries in the host filesystem namespace |
| `@quyet/tool-lsp` | yes | Model-facing lsp tool over the JueTech Harness LSP capability seam (ctx.lsp) — one read-only tool with goToDefinition/findReferences/goToImplementation/hover operations, one-based UTF-16 cursor coordinates, bounded location rendering, and hover normalization |

## mcp

| Package | Config | Description |
|---|---|---|
| `@quyet/mcp-client` | yes | MCP client bridge: connects to MCP servers and registers their tools on ctx.tools |
| `@quyet/mcp-manager` | yes | MCP server manager: a settings-driven fleet of mcp-client instances with runtime status, restart, and probe |
| `@quyet/mcp-resources` | no | Scoped MCP resource discovery and reading through shared model tools |

## plan

| Package | Config | Description |
|---|---|---|
| `@quyet/plan-mode` | yes | Logged per-agent plan mode with deployment guidance, a direct slash command, and a user-reviewed exit |

## preset

| Package | Config | Description |
|---|---|---|
| `@quyet/agent-preset` | yes | Declare an Agent capability composition in Cordis YAML |
| `@quyet/agent-preset-registry` | yes | Declarative Agent preset registry and profile-backed editing |
| `@quyet/persona` | yes | Composition-authored deployment persona section for the JueTech Harness |

## ptc-runtime

| Package | Config | Description |
|---|---|---|
| `@quyet/ptc-runtime-node` | yes | Node PTC execution with async function, REPL and VM Script evaluators and optional retained state |

## sandbox

| Package | Config | Description |
|---|---|---|
| `@quyet/sandbox-local` | yes | Local process-sandbox backends for the JueTech Harness sandbox seam: bwrap, the npm-distributed landlock-run launcher, macOS Seatbelt, or the Windows ACL restricted-token runner — functionally probed, fail-closed |
| `@quyet/sandbox-policy` | yes | Per-call sandbox policy resolver and current model context: deployment fallbacks plus each session's mode and workspace root, shared by every enforcing capability family |

## schedule

| Package | Config | Description |
|---|---|---|
| `@quyet/schedule` | yes | Host-wide durable reminders with shared management and delivery to existing or new Sessions |
| `@quyet/tool-schedule` | no | Model-facing scheduled task tools (schedule_create, schedule_list, schedule_view, schedule_edit) over the Host ctx.schedule service |

## sdk

| Package | Config | Description |
|---|---|---|
| `@quyet/sdk-jsonrpc-server` | yes | Stdio JSON-RPC server plugin for out-of-process JueTech Harness SDK clients |

## session

| Package | Config | Description |
|---|---|---|
| `@quyet/message-quotes` | no | Selected-text quotation and Markdown blockquote presentation |
| `@quyet/session-checkpoint-policy` | no | Semantic session durability checkpoints before model requests and tool side effects |
| `@quyet/session-log-deepseek` | yes | Incremental lossless session-log request extension for the official DeepSeek LLM API |
| `@quyet/session-persistence-jsonl` | yes | JSONL durable session persistence backend for the JueTech Harness |
| `@quyet/session-projection` | no | Session-projection seam: the merge-extensible projection type table, the provider contract, and the ctx.sessionProjections registry serving whole current values of log-derived per-session state |
| `@quyet/session-projection-cache` | yes | Persisted projection cache (ctx.sessionProjectionCache): durable per-session checkpoint records on the session_projcache storage domain (per-record layout), throttled write-behind, and the cached listing read |
| `@quyet/session-stats` | no | Whole-log conversation counts and wall times projection (sessionStats) for the JueTech Harness |
| `@quyet/session-telemetry-otel` | yes | Feedback-authorized Session logs over byte-bounded OpenTelemetry HTTP requests |
| `@quyet/session-title` | yes | Log-backed session title service and provider registry for the JueTech Harness |
| `@quyet/session-title-first-prompt-llm` | yes | First-message LLM provider plugin for JueTech Harness session titles |
| `@quyet/session-turn-outline` | no | Whole-log turn outline projection (turnOutline) for the JueTech Harness |
| `@quyet/tool-working-directory` | no | Read and change the active Session working directory |
| `@quyet/working-directory` | yes | Session working directories with durable changes and model context |

## session-query

| Package | Config | Description |
|---|---|---|
| `@quyet/session-log-export` | yes | Web Session-log ZIP export and Session Markdown copy |
| `@quyet/session-query-sqlite` | yes | Concrete ctx.sessionQuery backend with SQLite FTS5 search |

## settings

| Package | Config | Description |
|---|---|---|
| `@quyet/settings` | no | Abstract user-settings seam (ctx.settings) for the JueTech Harness |

## shell

| Package | Config | Description |
|---|---|---|
| `@quyet/bash-local` | yes | Local-subprocess implementation of the JueTech Harness bash executor seam |
| `@quyet/bash-sandbox` | yes | Sandbox-consuming implementation of the JueTech Harness bash executor seam (confines every command via ctx.sandbox, reports denial/enforcement result facts) |
| `@quyet/pwsh-local` | yes | Local PowerShell implementation of the JueTech Harness bash executor seam |
| `@quyet/pwsh-sandbox` | yes | Sandbox-consuming implementation of the JueTech Harness PowerShell executor seam (confines every command via ctx.sandbox, reports denial/enforcement result facts) |
| `@quyet/shell-env` | yes | Tool-independent managed QUYET_* shell environment registry |
| `@quyet/tool-bash` | yes | Model-facing bash tool with optional generic background-job and sandbox-escalation support |
| `@quyet/tool-bash-persistent` | yes | Model-facing owner-scoped persistent Bash tool backed by the Harness PTY service |
| `@quyet/tool-pwsh` | yes | Model-facing pwsh tool over the bash executor seam |
| `@quyet/tool-pwsh-persistent` | yes | Model-facing owner-scoped persistent PowerShell tool backed by the Harness PTY service |

## skill

| Package | Config | Description |
|---|---|---|
| `@quyet/skill` | yes | Agent skill provider registry for the JueTech Harness |
| `@quyet/skill-filesystem` | yes | Local filesystem skill provider for the JueTech Harness |
| `@quyet/skill-office` | yes | Bundled Word, PowerPoint, and Excel workflows and LibreOffice Kit operations |
| `@quyet/tool-skill` | yes | Model-facing skill loading tool for the JueTech Harness |
| `@quyet/tool-workspace-dependencies` | yes | The load_workspace_dependencies tool: absolute paths into a bundled Python, Node.js, and pnpm payload |

## spill

| Package | Config | Description |
|---|---|---|
| `@quyet/spill-local` | yes | Local-filesystem implementation of the JueTech Harness spill storage seam (private session-scoped files) |
| `@quyet/spill-policy` | yes | Token-budgeted tool-result retention with recoverable text and image paths |

## ssh

| Package | Config | Description |
|---|---|---|
| `@quyet/fs-ssh` | no | Filesystem provider over the shared POSIX SSH helper |
| `@quyet/sandbox-ssh` | no | Remote POSIX sandbox argv provider over the shared SSH helper |
| `@quyet/ssh` | yes | Shared OpenSSH connection and versioned POSIX remote helper |
| `@quyet/subprocess-ssh` | no | Subprocess and terminal provider over the shared POSIX SSH helper |

## storage

| Package | Config | Description |
|---|---|---|
| `@quyet/storage` | no | Storage hub (ctx.storage): named backend registry plus mounted data-form facilities for the JueTech Harness |
| `@quyet/storage-domain` | yes | Domain data form (ctx.storage.domain): schema-validated, event-emitting KV domains over storage backends for the JueTech Harness |
| `@quyet/storage-json` | yes | JSON file KV storage backend for the JueTech Harness storage hub |
| `@quyet/storage-sqlite` | yes | SQLite storage backend (kv facet) for the JueTech Harness storage hub |

## subagent

| Package | Config | Description |
|---|---|---|
| `@quyet/subagent` | yes | Abstract subagent seam (ctx.subagents): named-provider registry for delegating to child agents |
| `@quyet/subagent-acp` | yes | Out-of-process ACP subagent backend: drives a child agent in a spawned subprocess over the Agent Client Protocol |
| `@quyet/subagent-claude-code` | yes | One-shot Claude Code subagent provider over the official Agent SDK |
| `@quyet/subagent-codex` | yes | One-shot Codex subagent provider over the official app-server protocol |
| `@quyet/subagent-fork-in-process` | yes | In-process fork subagent backend: runs a child agent seeded with a prefix of the parent's log |
| `@quyet/subagent-quyet-sdk` | yes | Out-of-process SDK subagent backend: drives a child JueTech Harness runtime subprocess over stdio JSON-RPC through the TypeScript SDK client |
| `@quyet/subagent-spawn-in-process` | yes | In-process spawn subagent backend: runs a fresh child agent on ctx.agents |
| `@quyet/tool-subagent` | yes | Model-facing subagent delegation tool over the ctx.subagents seam |
| `@quyet/tool-subagent-control` | yes | Shared messaging, interruption, and child discovery tools for subagents |

## subprocess

| Package | Config | Description |
|---|---|---|
| `@quyet/subprocess-local` | no | Local-subprocess implementation of the JueTech Harness subprocess seam |

## team

| Package | Config | Description |
|---|---|---|
| `@quyet/agent-team` | yes | Shared task DAG and change waits for subagent trees |
| `@quyet/tool-agent-team` | yes | Scoped model-facing Agent Teams tools over ctx.agentTeams |

## telemetry

| Package | Config | Description |
|---|---|---|
| `@quyet/otel` | no | Cordis service for independent ordinary-event and byte-bounded Session-log OTLP channels |

## terminal

| Package | Config | Description |
|---|---|---|
| `@quyet/terminal` | no | Persistent PTY session seam for the JueTech Harness — owner-scoped ids, backend registry, interactive sends, reads, signals, and awaited cleanup |
| `@quyet/terminal-bash` | yes | Persistent shell PTY backend over the JueTech Harness subprocess terminal primitive |

## test-support

| Package | Config | Description |
|---|---|---|
| `@quyet/llm-replay` | yes | Replay LLM plugin: short-circuits llm/stream with model chunks reconstructed from a recorded session JSONL (keyless snapshot tests) |

## todo

| Package | Config | Description |
|---|---|---|
| `@quyet/tool-todo` | yes | Model-facing todo_write tool over the JueTech Harness event-sourced session log |

## typert

| Package | Config | Description |
|---|---|---|
| `@quyet/typert-loader` | yes | Loader integration for generated Typert package contributions |

## web

| Package | Config | Description |
|---|---|---|
| `@quyet/tool-web` | yes | Model-facing web tools (web_search, web_fetch) over the JueTech Harness web capability seam (ctx.web) |
| `@quyet/web` | yes | Abstract web access capability seam (ctx.web) for the JueTech Harness — search/fetch provider registry, registration-order-independent selection, request/result vocabulary, and the WebError taxonomy |
| `@quyet/web-deepseek-api` | yes | DeepSeek Search and Fetch API providers for the JueTech Harness web capability seam (ctx.web) |
| `@quyet/web-fetch-http` | yes | Anonymous HTTP(S) fetch provider for the JueTech Harness web capability seam (ctx.web) |
| `@quyet/web-search-deepseek` | yes | DeepSeek-backed search provider (native web_search via the Anthropic-compatible API) for the JueTech Harness web capability seam (ctx.web) |

## workflow

| Package | Config | Description |
|---|---|---|
| `@quyet/tool-workflow` | yes | Model-facing workflow tool: run a JavaScript orchestration script over ctx.workflowEngine |
| `@quyet/workflow-ptc` | yes | Workflow orchestration in the shared sandboxed Node PTC runtime |

## workspace

| Package | Config | Description |
|---|---|---|
| `@quyet/workspace` | no | Workspace entity registry (ctx.workspaceRegistry): durable workspace records with validated session attachment over the domain data form for the JueTech Harness |
