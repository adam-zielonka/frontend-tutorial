# ShippingBoard numbered lessons: coverage and validation

Scope: `docs/ch-05-00-shippingboard-lite.md`, `docs/05-shippingboard/**` and this audit. The overview is now a short goal, final-result image and ordered map. The chapter has **15 lessons, 5.1–5.15**: four embedded React examples followed by eleven stages of the original MobX application. The latter are the required main project, not an optional discarded extension.

The four mini pages now teach why → concrete edit → one observable check. Their exercise IDs, starter/solution maps, styles and immutable checkpoint tags are unchanged. `course/chapters/05-shippingboard.json` and assembled lessons are unchanged. The parent is removing the generated duplicate objectives/tasks/checks from `LessonExercise`, retaining hints.

The continuation carries the same `shippingboard-lite-ramp-lesson` checkout from 5.5 through 5.15. Each page identifies its original `src/` files and build command, keeps its complete code or precise insertion instructions, and has a stage-specific accessible SVG diagram under `docs/05-shippingboard/diagrams/`. It does not mount a mini editor or claim new per-stage source checkpoints. Local and alternative online setup remain together in 5.5.

## Source of truth

- Teaching baseline: `30e83a2:docs/ch-05-00-shippingboard-lite.md` (the original worked tutorial, not only its headings).
- Application starting point: [`create-ramp-view` at `3634bcb9a1ee0ecf8bd9e956550970ff159a6c99`](https://github.com/adam-zielonka/shippingboard-lite/tree/3634bcb9a1ee0ecf8bd9e956550970ff159a6c99). The remote branch's advertised SHA was checked against the local remote-tracking ref during this audit.
- Application repository inspected read-only: `/root/projekty/shippingboard-lite`. Its current `main` is not the tutorial starting point. Validation used a temporary archive of the pinned commit, without checking out or modifying that repository.
- Lockfile-resolved runtime dependencies: React/React DOM 18.3.1, MobX 6.15.0, mobx-react-lite 4.1.1, Blueprint core 4.20.2 and Sass 1.99.0. Tooling includes TypeScript 5.9.3, Vite 8.0.8 and plugin-react 6.0.1. These are checkpoint versions, not the mini app's dependency set.

## Worked coverage

| Original teaching content | Numbered lesson | Concrete learner result |
| --- | --- | --- |
| Intended dashboard and starting table | Overview; [5.5](../docs/05-shippingboard/05-original-workspace.mdx) | Both original screenshots retained; live demo distinguished from pinned starting source. |
| Workspace, branch, install and development command | [5.5. Prepare the original application](../docs/05-shippingboard/05-original-workspace.mdx) | Exact clone, commit, learner branch, lockfile install, dev and build commands; expected initial table/dialog. |
| UI view field, getters, actions and header buttons | [5.6. Share view state with the header](../docs/05-shippingboard/06-shared-view.mdx) | Insert class members into the real `UI.ts`; complete `Header.tsx` preserves Add loading. |
| Conditional content | [5.7. Switch the original content](../docs/05-shippingboard/07-content-switch.mdx) | Complete intermediate `Content.tsx`, working table branch and explicit dashboard placeholder. |
| URL initialization and reactions | [5.8. Restore view and loading links](../docs/05-shippingboard/08-view-url.mdx) | Complete `UI.ts`, helper, constructor, both restorations/reactions, view and dialog members. |
| Ramp shell and styling | [5.9. Render the original ramp shells](../docs/05-shippingboard/09-ramp-shells.mdx) | Complete `RampBox.tsx` and updated `Content.tsx`; existing `Ramp.scss` imported without restyling. |
| Loading card, dates, customers, quantities and progress | [5.10. Build a loading card](../docs/05-shippingboard/10-loading-card.mdx) | Complete `LoadingBox.tsx`, model mapping table and temporary first-loading preview. |
| Assigned loadings and keyed component mapping | [5.11. Derive ramp assignments](../docs/05-shippingboard/11-ramp-assignments.mdx) | Complete intermediate `Ramp.ts` and `RampBox.tsx`; object relationship explained, temporary imports removed. |
| Click to open loading details | [5.12. Open shared loading details](../docs/05-shippingboard/12-card-details.mdx) | Exact import and Card tag replacement reuse the existing dialog action. |
| Computed ramp predicates and status priority | [5.13. Derive ramp status](../docs/05-shippingboard/13-ramp-status.mdx) | Complete `Ramp.ts`, original body class, fixture results and mixed-state check. |
| Ramp quantity and assignment intent | [5.14. Show occupancy in the dialog](../docs/05-shippingboard/14-dialog-occupancy.mdx) | Exact quantity getter and complete ramp-section replacement in `Details.tsx`, including ∅. |
| Acceptance of the complete original assignment | [5.15. Verify the complete board](../docs/05-shippingboard/15-complete-board.mdx) | Build and acceptance walkthrough covering both views, shared dialog, reassign/clear, URL restoration and status. |

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

## Earlier restoration validation (before extraction)

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

## Validation of the numbered edition

Environment: Node.js 24.22.3. Exported the exact application checkpoint with `git archive` from the existing read-only repository into `/tmp/shippingboard-numbered-9aihwjw8`, then installed with the documented `pnpm dlx pnpm@8.15.9 install --frozen-lockfile`.

- Compared the **17 TypeScript/TSX code fences** in the preceding overview against the extracted 5.6–5.14 fences: byte-for-byte identical and in the same teaching order. No original code, imports, model getters, dialog behavior or styling was discarded during extraction.
- Built the untouched checkpoint, applied the fences and precise insertions directly from the new lesson pages in order, typechecked all **nine intermediate editing stages (5.6–5.14)** and built the finished application: all passed. Only the five existing application files and two new components listed above changed. Every original Sass file, fixture and the lockfile remained byte-for-byte unchanged. Lockfile SHA-256: `bd4ef7371ec481fa32aee4f917f170f317c6e7a69654aef59a17857678bb5fe1`.
- Bundled the final real components with Vite SSR and ran runtime assertions in four fresh Node processes: `/`, `/?view=loadings&loading=0007703&keep=yes#dock`, `/?view=dashboard&loading=0007701`, and `/?view=unknown&loading=missing`. Passed startup selection/no initial writes, seven ramp/eight assigned-card markup, eleven table records, Kang Tao and `11 of 22`/50% card markup, observable/computed annotations, assignment/count/status reactions, mixed-state priority, empty new-loading defaults and URL parameter/hash retention. This uses a small location/history stub; it does not simulate browser clicks or dialog portals.
- Applied the four mini pages’ actual snippets and prose instructions to their current starters. The results match the published solutions after ignoring formatting/comments, and all four snippet-applied projects typecheck. No exercise source or tag changes are needed.
- Compiled the overview and all **15 MDX pages** with the installed MDX compiler and Docusaurus headings plugin. Checked every local Markdown/image link, the lesson 5.13 status-table anchor, ordered page metadata/pager targets, accessible SVG titles/descriptions and every level-2/3 overview anchor from both `30e83a2` and the preceding continuation. Passed; the two `/course-help` links deliberately await the parent’s shared page.
- `node scripts/assemble-course.mjs --check` and `node --test scripts/course.test.mjs`: passed (8 tests). `git diff --check`: passed.

The extraction/apply, mini-snippet and Markdown validation scripts are temporary `/tmp/validate-numbered-shippingboard.py`, `/tmp/validate-shippingboard-mini.py` and `/tmp/validate-shippingboard-docs.mjs`; they are not new common course infrastructure.

## Explicit gaps and integration handoff

No browser, visual comparison, real click/keyboard, portal or animation testing was performed. Original Sass was preserved and production-compiled. The alternative StackBlitz route was not run. The Vite builds retain the existing large-chunk warning. A complete tutorial-site build, preview and combined course verification belong to the parent integration.

The following shared changes are **required outside this scoped commit**:

1. Register all eleven new docs (5.5–5.15, the ordered routes in the coverage table) in the sidebar and shared Lessons menu. The current `sidebars.ts` and `LessonStudio` derive navigation from embedded exercises only. Do **not** add fake `LessonExercise` records to `course/chapters/05-shippingboard.json` or generate new mini checkpoint tags for these pages.
2. Treat the new pages as chapter 05 original-project lessons without Sandpack. Their frontmatter provides `course_workspace: original-project`, `course_chapter: "05"`, `course_step: 5` through `15`, titles, slugs and `sidebar_position`. Their same-basename SVG assets under `diagrams/` supply stage-specific context; the page already displays the diagram and caption in the article. The parent can use those assets for the right pane as well. Until the shared shell recognizes these pages, its fallback is the generic introduction illustration, and it cannot show their correct chapter/step in its header/menu.
3. Create the shared `/course-help` page and finish the hints-only `LessonExercise` body. Both references are explicit integration dependencies, not new boilerplate copied into this chapter.
4. Preserve the native Docusaurus page sequence. 5.4 overrides `pagination_next` to 5.5; every new page supplies `pagination_prev`, `pagination_next` and `displayed_sidebar: tutorial`; 5.15 leads to the Tests overview. This provides ordered Previous/Next links without duplicate manual navigation rows. Full sidebar registration should use the same order.

The overview retains all old important section anchors (original baseline and the 11-stage continuation) as spans next to explanatory destination links. The `worked-continuation-upgrade-the-original-shippingboard-lite` anchor leads to the main-project map; no code remains hidden in a long overview.

No push, preview deployment, host configuration change, external-repository edit, assembled-lesson edit or unrelated chapter/UI change is part of this work.
