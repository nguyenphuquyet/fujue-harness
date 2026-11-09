/** The package names the plugin manager protects, hides, orders, or marks experimental. */

/**
 * Plugin packages the plugin manager refuses to disable or remove, because management itself needs them; a bundle that
 * contains one is read-only as well. Removing a name drops only this `management-required` refusal; the manager's own
 * entry, installation-carried bundles, and unaddressable rows stay protected by their own rules.
 */
export const PROTECTED_PLUGINS: ReadonlySet<string> = new Set([
  '@quyet/plugin-manager', '@quyet/cordis-plugin-loader',
  '@quyet/cordis-plugin-include', '@quyet/api-gateway',
  '@quyet/host-webserver', '@quyet/client-modules',
  '@quyet/client-ui-settings-plugin-inventory', '@quyet/client-ui-plugin-manager',
  '@quyet/host-plugin-inventory', '@quyet/typert-registry',
  '@quyet/api-remotes', '@quyet/api-remote-access',
  '@quyet/cordis-plugin-timer', '@quyet/client-connection',
  '@quyet/host-frontend-static', '@quyet/tools',
  '@quyet/hmr',
])

/**
 * Built-in profile bundles, persistent terminals, and the standalone worktree tool, which have no plugin manager page.
 * Their Host availability and activation stay intact.
 */
export const HIDDEN_BUNDLES: ReadonlySet<string> = new Set([
  '@quyet/base',
  '@quyet/web-app',
  '@quyet/headless',
  '@quyet/sdk-app',
  '@quyet/acp-app',
  '@quyet/sdk-minimal',
  '@quyet/experimental-terminal-bundle',
  '@quyet/experimental-tool-worktree',
])

/**
 * The optional bundles the plugin manager's main and More lists rank first, in this order. {@link MORE_BUNDLES}, not
 * this list, decides whether a bundle appears on the main list.
 */
export const EXTENSION_BUNDLES: readonly string[] = [
  '@quyet/experimental-voice-input-bundle',
  '@quyet/experimental-plugin-market-bundle',
  '@quyet/experimental-auto-review',
]

/**
 * The optional bundles the plugin manager's main list leaves out until the profile enables them; its More list,
 * which includes every eligible bundle, ranks them last in this order.
 */
export const MORE_BUNDLES: readonly string[] = [
  '@quyet/personalized-recommendations',
  '@quyet/experimental-inspector-profile',
  '@quyet/cua-bundle',
  '@quyet/experimental-cot-translation-bundle',
  '@quyet/experimental-session-search',
  '@quyet/experimental-session-titles-bundle',
  '@quyet/experimental-badge-skill-bundle',
  '@quyet/experimental-ralph-bundle',
  '@quyet/subagent-codex',
  '@quyet/subagent-claude-code',
]

/** Official bundles the plugin manager marks with the Experimental badge. */
export const EXPERIMENTAL_BUNDLES: ReadonlySet<string> = new Set([
  '@quyet/personalized-recommendations',
  '@quyet/cua-bundle',
  '@quyet/experimental-voice-input-bundle',
  '@quyet/experimental-auto-review',
  '@quyet/experimental-inspector-profile',
  '@quyet/experimental-forge-bundle',
  '@quyet/experimental-tool-worktree',
  '@quyet/experimental-cot-translation-bundle',
  '@quyet/experimental-session-search',
  '@quyet/experimental-session-titles-bundle',
  '@quyet/experimental-badge-skill-bundle',
  '@quyet/experimental-ralph-bundle',
  '@quyet/experimental-plugin-market-bundle',
  '@quyet/experimental-liveshare',
])
