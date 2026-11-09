---
description: "Shared TypeScript declarations for package identity, runtime requirements, and Quyết plugin metadata."
kind: "package-library"
---

# @quyet/package-manifest

English | [中文](README.zh.md)

## Summary

Use `QuyetPackageManifest` for package metadata, `QuyetManifest` for the public fields under `quyet`, and member types such as `QuyetClientManifest` for one domain. Each reader owns JSON parsing, validation, and default resolution.

## Table of Contents

- [Use this package](#use-this-package)
- [Understand the implementation](#understand-the-implementation)
- [Further Exploration](#further-exploration)
- [Model Experience](#model-experience)
- [Known Limitations and Deferred Work](#known-limitations-and-deferred-work)
- [Dev Note](#dev-note)

-----

<a id="use-this-package"></a>
## Use this package

Import from the package root. Use a development dependency when only checking your own source; use a production dependency if your published declarations reference these types.

```ts
import type { QuyetClientManifest, QuyetPackageManifest } from '@quyet/package-manifest'

const client: QuyetClientManifest = { platform: 'web' }
const manifest: QuyetPackageManifest = {
  name: 'example-quyet-plugin',
  version: '1.0.0',
  engines: { node: '>=24', quyet: '0.1.5-alpha.1' },
  quyet: {
    manifestVersion: 1,
    bundle: { patch: './cordis.patch.yml' },
    client,
  },
}
```

`QuyetPackageManifest` describes the package.json fields used by Quyết, with required `name` and `version`; it includes dependency, peer, and optional dependency declarations but is not an exhaustive npm schema. Local profile readers use `Partial<QuyetPackageManifest>` because profiles need no published version. `QuyetManifest` describes only public author fields under `quyet`. `QuyetBundleManifest.patch` is one patch file path or an ordered list of them, each relative to the package root; the launcher applies a list in order as one bundle layer. TypeScript checks the example and erases `import type`; these interfaces do not parse JSON or write a file.

`QuyetBundleManifest.listedByDefault` is an optional boolean, defaulting to true. False hides an installation-carried bundle from the default GUI lists until the profile enables or installs it; the management inventory remains complete. [Plugin Manager](../../client/ui-plugin-manager/README.md#use-this-package) owns the display and explicit activation paths.

The following metadata fields are optional. Omitting them leaves the format version or compatible host versions undeclared; readers do not infer defaults.

| Field | Meaning |
|---|---|
| `quyet.manifestVersion` | Manifest format identifier; the declared format is `1`, independent of the npm package version and Session format version. |
| `quyet.bundle.platforms` | Optional nonempty list of Node Host platform names, such as `["darwin"]`; omission allows every operating system. The launcher and plugin manager enforce it before composing or selecting the bundle. |
| `engines.quyet` | Author-declared compatible Quyết versions as a SemVer range, including exact prerelease versions. This field sits beside `engines.node` and `engines.npm`; an engines object may omit `quyet`. |

`LocalizedText` carries literal text or a language map with a required English fallback. `PluginLocalizedMeta` carries optional display title, description, an image data URL resolved from a package root's `package.json.icon` or an exported `<specifier>/icon`, and metadata diagnostics for installed plugins. [App boot](../../boot/app-boot/README.md) reads these values; this package only supplies their types.

Public composition declarations are defined in [`src/types.ts`](src/types.ts). Internal `configTrees`, `sessionFormatMigration`, and generated `moduleFallback` metadata remain owned by their image-packer, catalog, and launcher readers; the public types do not expose them.

-----

<a id="understand-the-implementation"></a>
## Understand the implementation

<details>
<summary>Implementation internals — click to expand</summary>

The package root only re-exports declarations from [`src/types.ts`](src/types.ts).

</details>

-----

<a id="further-exploration"></a>
## Further Exploration

- [Profile launcher](../../boot/app-boot/README.md#profiles) — manifest loading and composition.
- [Public package metadata](../../../.agents/notes/implemented/architecture/2026-09-10-public-package-manifest.md) — field placement and reader ownership.

<a id="model-experience"></a>
## Model Experience

None, as this package only exports types.

#### KV Cache effect

Type declarations add no model input, so provider cache reuse is unaffected.

## Known Limitations and Deferred Work

<a id="known-limitations-and-deferred-work"></a>

- **Static typing only.** Consumers read and validate the JSON fields they use, then adapt the shared declarations to their runtime data. The package supplies no parser, getter helpers, file checks, or defaults.
- **Compatibility is declarative.** Current installers and loaders do not enforce `quyet.manifestVersion` or `engines.quyet`; declaring a range does not reject incompatible hosts or validate SemVer syntax.

<a id="dev-note"></a>
### Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
