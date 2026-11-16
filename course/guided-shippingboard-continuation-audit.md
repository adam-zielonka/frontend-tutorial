# ShippingBoard original-project continuation: coverage and validation

Scope: `docs/ch-05-00-shippingboard-lite.md`, alongside the existing four mini-lessons. The mini pages, chapter JSON, fixtures, locks and registry are unchanged by this scoped continuation. The original ShippingBoard walkthrough has now been executed against its pinned checkpoint; validation of the other applied chapters is recorded separately in `guided-applied-audit.md`.

## Source of truth

- Teaching baseline: `30e83a2:docs/ch-05-00-shippingboard-lite.md` (the original worked tutorial, not only its headings).
- Application starting point: [`create-ramp-view` at `3634bcb9a1ee0ecf8bd9e956550970ff159a6c99`](https://github.com/adam-zielonka/shippingboard-lite/tree/3634bcb9a1ee0ecf8bd9e956550970ff159a6c99). The remote branch's advertised SHA was checked against the local remote-tracking ref during this audit.
- Application repository inspected read-only: `/root/projekty/shippingboard-lite`. Its current `main` is not the tutorial starting point. Validation used a temporary archive of the pinned commit, without checking out or modifying that repository.
- Lockfile-resolved runtime dependencies: React/React DOM 18.3.1, MobX 6.15.0, mobx-react-lite 4.1.1, Blueprint core 4.20.2 and Sass 1.99.0. Tooling includes TypeScript 5.9.3, Vite 8.0.8 and plugin-react 6.0.1. These are checkpoint versions, not the mini app's dependency set.

## Worked coverage

| Original teaching content | Restored location in the overview | Concrete learner result |
| --- | --- | --- |
| Intended dashboard and starting table | Introduction to the worked continuation | Both original screenshots retained; live demo distinguished from pinned starting source. |
| Workspace, branch, install and development command | Step 1 | Exact clone, commit, learner branch, lockfile install, dev and build commands; expected initial table/dialog. |
| UI view field, getters and actions | Step 2 | Add class members to the real `UI.ts`, preserving its constructor and existing dialog behavior. |
| Header buttons | Step 2 | Complete `Header.tsx`, including all imports, active flags and existing Add loading action. |
| Conditional content | Step 3 | Complete intermediate `Content.tsx`, with working table branch and explicit dashboard placeholder. |
| URL initialization and reactions | Step 4 | Complete `UI.ts`, including helper, constructor, both restorations, both reactions, view getters/actions and all dialog getters/actions. |
| Ramp shell and styling | Step 5 | Complete new `RampBox.tsx` and updated `Content.tsx`; existing `Ramp.scss` imported without restyling. |
| Loading card, dates, customers, quantities and progress | Step 6 | Complete new `LoadingBox.tsx`, data-to-model mapping table and temporary first-loading preview. |
| Assigned loadings and keyed component mapping | Step 7 | Complete intermediate `Ramp.ts` and `RampBox.tsx`; object-reference relationship explained, temporary imports removed. |
| Click to open loading details | Step 8 | Exact store import and replacement Card opening tag using the existing dialog action. |
| Computed ramp predicates and status priority | Step 9 | Complete `Ramp.ts` with all predicates and status getter; correct body class, fixture-specific results and mixed-state check. |
| Ramp quantity and assignment intent | Step 10 | Exact quantity getter and complete replacement ramp section in `Details.tsx`, including ∅; existing dialog lifecycle retained. |
| Acceptance of the complete original assignment | Step 11 | Build command and manual scenarios for both views, shared dialog, reassign/clear, URL restoration and mixed ramp states. |

Each step explains its purpose and expected observable result. Replacement files contain their real imports. Partial snippets say exactly where to add them or which element/section to replace. Intermediate placeholders are explicitly removed by the next complete replacement. The learner need not infer missing actions, helpers or component wiring from external links.

## Corrections and model distinctions

- Corrected `npm dev` to a real package-script invocation, with a tested pnpm runner. The original dependency lockfile is retained instead of generating a new resolution with an unpinned install.
- Corrected the original tutorial's nonexistent `src/store/Ramp.tsx` path to `src/store/Ramp.ts`.
- Corrected the malformed URL example with its unmatched constructor fragment by supplying a complete compiling class. Kept the existing loading-ID lookup and loading reaction when adding view handling.
- Reused `addQueryParam` in its existing file and retained `pushState` semantics, but corrected its URL construction to preserve the fragment and omit a trailing `?`. Unrelated query parameters survive both reactions. No `popstate` synchronization or router is claimed.
- Unknown view values fall back to dashboard without an unsafe type assertion. Initialization deliberately does not canonicalize the address. Reaction lifetime is explicitly tied to the once-initialized singleton; shorter-lived stores require disposal.
- The checkpoint's `makeAutoObservable` is retained. Getters derive assignments/status/counts; no second mutable assignment collection or duplicated selected-loading state is introduced.
- `loading.ramp` is an object relationship, resolved by the checkpoint API parser and set by its existing actions. This is not the mini fixture's string ID. Unassigned loadings remain in the existing table.
- `LoadingBox` uses the original DateTime/customer/pallet model getters and Blueprint's numeric 0–1 progress API. It guards an absent customer and strips leading zeroes only for the displayed customer ID.
- Status precedence preserves the original tutorial: empty, all loaded, any not started, any in progress, fallback. `every(isLoaded)` is equivalent to the old `!some(!isLoaded)`; empty is checked first. The original `Loading.isInProgress` overlaps with not-started for positive totals, so priority matters. This differs explicitly from the mini board's Loading-before-Waiting rule.
- Quantity counts assignments, not pallets. The dialog uses neutral for an empty ramp, primary for the occupied current ramp and danger for another occupied ramp. Its superscript uses an explicit ternary so zero does not render as an unwanted `0`.
- All original Sass, including Blueprint 4 selectors, stays unchanged. No decorative UI, additional filters, backend setup or dependency migration is introduced.

## Validation performed

Environment: Node.js 24.22.3; commands invoked pnpm 8.15.9 through the available pnpm runner. Validation was performed in `/tmp/shippingboard-continuation-u922c0xk`.

1. Exported the exact pinned application tree with `git archive` to a temporary directory. Installed with `pnpm dlx pnpm@8.15.9 install --frozen-lockfile`. The lockfile stayed byte-for-byte equal to the checkpoint (SHA-256 `bd4ef7371ec481fa32aee4f917f170f317c6e7a69654aef59a17857678bb5fe1`).
2. Ran the untouched checkpoint's `pnpm dlx pnpm@8.15.9 run build`: passed TypeScript and Vite.
3. Extracted the TypeScript/TSX code fences directly from the edited Markdown. Applied the documented full-file replacements and precise insertions/replacements in teaching order to that temporary tree. No hand-written alternative solution or `tsconfig` adjustment was used.
4. Ran `tsc --noEmit` after each of steps 2 through 10: all nine intermediate stages passed, including the intentionally temporary first-loading card stage.
5. Ran the finished application's `pnpm dlx pnpm@8.15.9 run build`: passed TypeScript and Vite (1,482 modules; final JS 763.59 kB, 245.95 kB gzip). Both the untouched and final checkpoint builds emit Vite's pre-existing large-chunk warning; no build error or lesson-specific dependency workaround was required.
6. Bundled a temporary Node validation entry with Vite SSR and rendered the real Header, Content and LoadingBox components with ReactDOMServer. Checked seven ramp cards, eight assigned loading cards, eleven table loadings including the three unassigned IDs, customer mapping, `11 of 22`, 50% progress and the completed success bar. Checked that Add loading remains in the header. The Details component could render, but its portal content was not inspected by this SSR check.
7. Asserted initial ramp counts/statuses against the real fixture: A/F/G empty, B loaded, C/D progress, E not-started. Verified actual MobX computed annotations and assignment reactions; moving/clearing a loading changed both counts and status. Verified the zero-picked loading satisfies the original overlapping predicates and still makes E not-started ahead of partial progress.
8. Ran the same runtime checks in four fresh Node processes with a small `window.location`/`history.pushState` stub: `/`, `/?view=loadings&loading=0007703&keep=yes#dock`, `/?view=dashboard&loading=0007701`, and `/?view=unknown&loading=missing`. Checked startup selection, no initial URL write, dialog actions, removal of default parameters, retention of unrelated parameters/hash and `Loading.create()` with zero progress and an empty ID.
9. Compared the completed temporary application against the archived tree. Only five existing files changed (`UI.ts`, `Ramp.ts`, `Header.tsx`, `Content.tsx`, `Details.tsx`); only `RampBox.tsx` and `LoadingBox.tsx` were added under `src`. All original styles, API/data files and other application files matched. The original repository's working tree remained clean.
10. Ran `git diff --check` for the scoped documentation changes: passed.

The extraction/apply driver and runtime entry live only in the temporary validation directory (the extraction driver is `/tmp/validate-shippingboard-continuation.py`); they are not course infrastructure or committed artifacts. The Markdown fences remain the teaching source.

## Primary references checked

- Pinned ShippingBoard source, especially `UI.ts`, `Store.ts`, `Loading.ts`, `Ramp.ts`, `DateTime.ts`, `api.ts`, `parse.ts`, `fakeApi.ts`, `Header.tsx`, `Content.tsx`, `Details.tsx`, `Ramp.scss`, `Content.scss` and `main.scss`; original teaching baseline compared against the restored stages.
- [MobX automatic annotations](https://mobx.js.org/observable-state.html#makeautoobservable), [React observer integration](https://mobx.js.org/react-integration.html), [computed values](https://mobx.js.org/computeds.html), [reaction tracking, defaults and disposal](https://mobx.js.org/reactions.html).
- [Blueprint core 4.20.2 Card source](https://github.com/palantir/blueprint/blob/%40blueprintjs%2Fcore%404.20.2/packages/core/src/components/card/card.tsx), [Button source](https://github.com/palantir/blueprint/blob/%40blueprintjs%2Fcore%404.20.2/packages/core/src/components/button/buttons.tsx), [ProgressBar source](https://github.com/palantir/blueprint/blob/%40blueprintjs%2Fcore%404.20.2/packages/core/src/components/progress-bar/progressBar.tsx). Installed package declarations and production compilation also checked these exact props.
- [MDN URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams), [History.pushState](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState) and [Vite's development/build scripts and Node requirement](https://vite.dev/guide/).

## Explicit gaps and handoff

No browser tools were used, as requested. The manual acceptance scenarios are instructions for the learner, not a claim of automated clicks, visual inspection, keyboard testing or screenshot comparison. Dialog button intents/count markup and the Card click handler are source-checked and typechecked; real browser events, dialog portals and animations are not covered by the Node/SSR assertions. Styles were preserved and compiled, not visually inspected. The optional StackBlitz route was not run; the local pinned workflow was the verified path.

The full tutorial-site build and integrated course checks belong to the root task and were not run by this scoped implementation. This work does not publish a preview, change host configuration, alter the original application repository or push commits.
