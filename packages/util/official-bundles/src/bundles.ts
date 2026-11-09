/** The bundle package names the quyet installation selects, offers, installs on demand, or retires. */

/** Installation-owned defaults used when a shipped profile is first opened. */
export interface ProfileTemplate {
  /** Ordered bundle layer list. */
  bundles: readonly string[]
}

/** The shipped profile templates auto-initialized on first use, by name. */
export const PROFILE_TEMPLATES: Record<string, ProfileTemplate> = {
  acp: {
    bundles: ['@quyet/base', '@quyet/acp-app'],
  },
  web: {
    bundles: ['@quyet/base', '@quyet/web-app'],
  },
  headless: {
    bundles: ['@quyet/base', '@quyet/headless'],
  },
  sdk: {
    bundles: ['@quyet/base', '@quyet/sdk-app'],
  },
  'sdk-minimal': {
    bundles: ['@quyet/sdk-minimal'],
  },
}

/**
 * Installation-owned bundle tuples that an earlier release wrote into a shipped profile; app-boot replaces an exact
 * match with the {@link PROFILE_TEMPLATES} entry of the same name and leaves every other list untouched.
 */
export const INSTALLATION_OWNED_PROFILE_TUPLES: Readonly<Record<string, readonly string[]>> = {
  headless: ['@quyet/base', '@quyet/web-app', '@quyet/headless'],
}

/** Bundles an earlier release shipped and the installation no longer carries; app-boot removes them from profiles. */
export const RETIRED_BUNDLES: ReadonlySet<string> = new Set([
  // The Web composition mounts Schedule itself
  // ([upgrade guide](../../../../docs/upgrade-guide/v0.2.0-rc.2/schedule-bundle-retired/guide.md)).
  '@quyet/experimental-schedule-bundle',
  '@quyet/experimental-agent-team-profile',
])

/** The bundle list a `quyet plugin` init uses for a name with no shipped template. */
export const DEFAULT_PROFILE_BUNDLES: readonly string[] = ['@quyet/base']

/**
 * The bundles the quyet installation ships for a person to switch on: each a
 * runtime dependency of the installation that declares `quyet.bundle.patch`,
 * an `icon`, and `./locale/*.json` display metadata, selected by no shipped
 * template, and offered switched off by the plugin manager except persistent
 * terminals, which have no page switch
 * ([rationale](../../../../.agents/notes/implemented/process/2026-09-15-shipped-optional-bundles.md),
 * [admission](../../../../.agents/notes/implemented/architecture/2026-09-21-experimental-capabilities-as-optional-bundles.md)).
 */
export const OPTIONAL_BUNDLES: readonly string[] = [
  '@quyet/personalized-recommendations',
  '@quyet/cua-bundle',
  '@quyet/experimental-session-search',
  '@quyet/experimental-ralph-bundle',
  '@quyet/experimental-terminal-bundle',
  '@quyet/experimental-badge-skill-bundle',
  '@quyet/experimental-session-titles-bundle',
  '@quyet/experimental-voice-input-bundle',
  '@quyet/experimental-cot-translation-bundle',
  '@quyet/experimental-auto-review',
  '@quyet/experimental-inspector-profile',
  '@quyet/experimental-liveshare',
  '@quyet/experimental-plugin-market-bundle',
  '@quyet/experimental-tool-worktree',
  '@quyet/experimental-forge-bundle',
]

/** Public Quyết release members available through the ordinary on-demand bundle installer. */
export const ON_DEMAND_BUNDLES: readonly string[] = [
  '@quyet/subagent-claude-code',
  '@quyet/subagent-codex',
]
