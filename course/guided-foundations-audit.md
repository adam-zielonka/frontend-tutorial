# Foundations source coverage

Baseline: `30e83a2`, chapters 1–3. Current mini examples use `course/chapters/01-tool-set.json` through `03-react-basics.json`.

| Original topic | New location |
| --- | --- |
| Node runtime, LTS/Current, version managers | Chapter 1, How the tools fit together |
| Registry, npm/pnpm/Yarn, store and Windows symlinks | Chapters 1–2, local environment |
| Dependency patching and project Node management | Chapter 1, local installation check and optional patch workflow |
| Vite, TypeScript tradeoffs, React, MobX | Chapter 1 and shipment walkthroughs |
| Windows/WSL, macOS case, Linux, terminal and shell choices | Chapter 2, A comfortable local environment |
| Git and VS Code | Chapter 2 and both development-tools steps |
| Scaffold, install, dev server | Chapter 3, optional separate project |
| Project structure, config, entry HTML, main and App, assets, CSS, state | Chapter 3, Follow the entry point; React steps |
| Conditional Vite configuration, source maps, HTTP/WebSocket proxy | Chapter 3, Optional Vite configuration |

Corrections: version-sensitive scaffold is separate from pinned exports; use an intermediate `git mv` for case-only renames; no blanket assertion that Windows symlinks always require Developer Mode. Proxy example uses a valid URL and no credentials; source maps can expose source. Starter states and snippets checked against v3 JSON. Official Node, pnpm, Vite, React, TypeScript, VS Code and Git documentation consulted for core claims.

Integration review: expanded the first snippets and Git workflow, added a complete `loadEnv` configuration, and replaced the summary check that tried to edit read-only `/shipments.ts` with a filter experiment in editable `/App.tsx`. Current pnpm runtime/patch documentation was checked; the deprecated `pnpm env` workflow is identified explicitly.
