# Hands-on course fixtures

`lessons.json` is an ordered array of eight independent exercises. The site can
load `files` into Sandpack's `react-ts` template and replace the entire map with
`solution` when showing an answer. Each starter compiles and renders useful UI;
TODO comments identify the incomplete behavior. Solutions contain no TODOs.
All content and shipment data are synthetic; no original ShippingBoard assets,
credentials, remote APIs, or live logistics systems are required.

## Fixture contract

Every entry has exactly these fields:

| Field | Type | Purpose |
| --- | --- | --- |
| `id` | string | Stable ordered identifier, `01-tool-set` through `08-ui5`. |
| `title` | string | Human-readable lesson name. |
| `doc` | string | Existing `docs/ch-XX*.md` basename, without `.md`. |
| `objective` | string | Skill practiced by the exercise. |
| `tasks` | string[] | Concrete completion criteria. |
| `hints` | string[] | Guidance without replacing the exercise. |
| `activeFile` | string | Initially selected file; exists in both maps. |
| `files` | Record<string, string> | Complete starter source, keyed by root paths. |
| `solution` | Record<string, string> | Complete answer source with exactly the same keys. |
| `dependencies` | Record<string, string> | Additional npm dependencies with exact versions. |

Paths such as `/App.tsx`, `/Store.ts`, and `/styles.css` are virtual **project
root** paths. They are not under `/src`. Every App imports `./styles.css` and
exports a default React component. The central runner/exporter supplies the
entrypoint, HTML, TypeScript and Vite configuration, and React + React DOM
**18.3.1**. Do not merge the website's React 19 dependencies into these lessons.
There is deliberately no lesson `index.tsx`, `main.tsx`, or `package.json`.

The production exporter in `scripts/course-project.mjs` puts source files under
`src/` and public fixtures under `public/`, preserving relative imports. The
standalone validator below uses the equivalent root-source layout. Use the automatic JSX transform (`jsx: "react-jsx"` for TypeScript
and a React Vite plugin or `esbuild: { jsx: 'automatic' }` for Vite). The
exporter's package manifest must include the lesson dependencies, including
Vitest in lesson 06. Never import `*.test.ts` into the App or entrypoint.
`course/validate.mjs` demonstrates the root layout without modifying the site's
package manifest or installing anything in the repository.

## Local fixtures and execution boundaries

Lesson 07 includes `/public/ramps.json` in **both** file maps. Vite serves it at
`/ramps.json`. Sandpack's static-file service worker uses `/public/ramps.json`;
the provided `loadLocalRamps` adapter tries the Vite URL and falls back to
Sandpack's URL on failure, without retrying intentional aborts. The central
Sandpack runner must enable `options.experimental_enableServiceWorker: true`
for static files, as described in the
[official Sandpack guide](https://sandpack.codesandbox.io/docs/advanced-usage/serving-static-files).
A file in the editor alone is not an HTTP response. The JSON has
three `{ "id": string, "name": string }` records. The helper validates these
fields before rendering. An empty array is a valid empty state.

The missing-fixture checkbox intentionally requests `/missing-ramps.json`.
Depending on the host, this yields an HTTP error or an HTML fallback that fails
JSON parsing. Both must reach the error UI. Retry refetches the currently
selected URL; uncheck the checkbox to recover. No external service is involved.

Lesson 02's configuration is a **typed practice model**, displayed as a
checklist. It does not change Git, the editor, the sandbox package manifest,
or TypeScript settings. The page explicitly describes the real local steps;
it contains no simulated terminal.

Lesson 06's page is an interactive **manual harness**, not a test runner. Run
`pnpm exec vitest run` after installing the exported Vite project locally or
in a StackBlitz terminal. These store-only tests use the default Node
environment and require neither happy-dom nor a browser. Starter tests pass
with three pending cases and an incomplete subtraction check; the solution has
five executable passing tests.

## Manual expected behavior

| Lesson | Runnable starter | Completed behavior to check |
| --- | --- | --- |
| 01 Tool set | Shows three typed shipments; aggregate fields are exercise placeholders. | Summary is **3 shipments, 16 pallets, 2 ready**. S-101 is express; S-102 and S-103 are standard. Changing typed data updates the derived summary. |
| 02 Development tools | Displays VS Code/Git configuration, four incomplete checks, and real local instructions. | All **4 / 4** checks are ready; commands are `vite --host 0.0.0.0` and `tsc --noEmit`. Apply actual settings separately in the exported project and editor. |
| 03 React | Add pallet works; Remove and Reset are TODOs. | Add twice → 2, Remove → 1, Reset → 0. Remove is disabled at zero; the count cannot become negative. |
| 04 MobX | Observable counter changes and collection buttons work; the sum, bounds, and capacity are TODOs. | +100 stops at **10**, −100 stops at **−10**; total changes immediately. At most **3** counters exist. Removing a counter updates total and frees capacity; removing all shows the empty message. |
| 05 ShippingBoard | Displays a table, status selector, and view switch; filtering and ramp assignments are TODOs. | All shows **3** loadings. Each status selects **1** loading. Switching to Ramps preserves the filter and shows matching assignments. R3 remains visible with an empty message. Returning to All restores all assignments. |
| 06 Tests | Counter harness works; initial-state and addition tests pass; subtraction is incomplete and three test cases are pending. | Manual Reset → +4 → −2 gives **2**, +100 gives **10**, −100 gives **0**. Vitest reports **5 passed, no pending**; assertions cover changes, both bounds, reset, and separate instances. |
| 07 Fetch | Fetches three local ramps, reports loading/errors, and ignores stale completions; HTTP checks, abort and Retry are TODOs. | Three ramps appear. Missing fixture shows an error; Retry issues another request without a page reload. Restoring the fixture recovers. With network throttling, loading appears; switching URLs or unmounting aborts prior requests without displaying a cancellation error. |
| 08 UI5 | ThemeProvider, icon buttons, and a progress component render; percentage, capacity and reset are TODOs. | One pallet shows **10%**. Ten show **100%**, and Load pallet is disabled. Reset restores **0%** and reenables loading. Both icons display, and keyboard activation works. |

Use keyboard Tab and Enter/Space to exercise buttons, the view navigation,
select, and checkbox. Check the live outputs and loading/error text. Loading
may be too fast to observe without network throttling. The UI5 lesson uses
custom elements and should also be checked in the actual Sandpack preview;
a Vite build alone does not prove sandbox bundler or browser behavior.

## Dependency sources

Versions were checked against the official npm registry on 2026-11-11.
React/React DOM 18.3.1 are host-supplied and intentionally absent from each
lesson's `dependencies` map.

- [MobX 6.13.7 registry metadata](https://registry.npmjs.org/mobx/6.13.7)
  and [mobx-react-lite 4.1.0 metadata](https://registry.npmjs.org/mobx-react-lite/4.1.0).
  The wrapper accepts MobX `^6.9.0` and React 18.
- [Vitest 3.2.6 metadata](https://registry.npmjs.org/vitest/3.2.6)
  accepts Vite 5/6/7; isolated validation uses Vite 6.4.1.
  See the [Vitest CLI](https://v3.vitest.dev/guide/cli.html) for `vitest run`.
- [UI5 React 2.15.0 metadata](https://registry.npmjs.org/@ui5/webcomponents-react/2.15.0)
  accepts React/React DOM `^18 || ^19` and requires UI5 `~2.15.0` peers.
  The React wrapper, core components, base, Fiori, and icons are all pinned to
  **2.15.0**, including peers not directly imported by the App.
  The published package's exports support component subpaths such as
  `@ui5/webcomponents-react/ProgressIndicator`; UI5 v2 uses `value`, not
  `percentValue`. Individual icons register through
  `@ui5/webcomponents-icons/dist/add.js` and `dist/refresh.js`.
  See the [official UI5 React project](https://github.com/UI5/webcomponents-react)
  for ThemeProvider and component guidance.

## Validation

From the repository root:

```sh
# Offline structural validation; uses only Node built-ins.
node course/validate.mjs

# Install dependencies in an OS temp directory, then validate both maps.
node course/validate.mjs --build

# Keep temporary projects to inspect or run them manually.
node course/validate.mjs --build --keep
```

`--build` requires Node 22+ and pnpm on PATH (override the executable with
`COURSE_PACKAGE_MANAGER`). It creates no root manifests, lockfiles, or
node_modules. It runs strict TypeScript and production Vite builds for all
**16** starter/solution projects, the lesson 06 tests in both versions, and
seven extra solution contract tests for the MobX collection and fetch helper
(success, HTTP errors, invalid JSON/data, empty data, network errors, signal
forwarding, abort rejection, and the Sandpack URL fallback). Temporary projects
are removed unless `--keep` is used, including on failure.

These automated checks do not run an actual Sandpack bundler, inspect browser
rendering, or drive the retry/cleanup UI. The manual checklist above covers
those integration checks for the central runner.
