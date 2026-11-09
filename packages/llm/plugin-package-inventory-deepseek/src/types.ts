/** Wire types for the active DeepSeek plugin package inventory. */

/** One active plugin package, with its version when available. */
export interface DeepSeekPluginPackageIdentity {
  readonly name: string
  readonly version?: string
}

/** Versioned full package inventory carried by each official DeepSeek request. */
export interface DeepSeekPluginPackageInventoryExtension {
  readonly version: 1
  readonly packages: readonly DeepSeekPluginPackageIdentity[]
}

declare module '@quyet/deepseek-llm-api-extensions/types' {
  interface DeepSeekLlmApiExtensionMap {
    quyet_plugin_packages: DeepSeekPluginPackageInventoryExtension
  }
}
