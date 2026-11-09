// Preserve Node's exit before Vitest installs its test-level process.exit guard.
globalThis.__quyetCoverageFixtureExit = process.exit.bind(process)
