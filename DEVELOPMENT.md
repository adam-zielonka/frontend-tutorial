# Development

Use Node.js 24.22+ (24–26) and pnpm 12. The repository pins the verified package manager and runtime.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm audit --audit-level=high
```

Pull requests run validation without deploying. Pages deployment is restricted to
the default branch. Dependabot checks compatible updates weekly; major updates
are reviewed separately.

## Interactive course

### Writing a guided lesson

A lesson must teach before asking the learner to implement something. Keep the
explanation visible in the article; reserve collapsible sections for optional
hints or supplementary material. Use the original tutorial at `30e83a2` as the
coverage baseline, and retain the reason for each operation when correcting old
examples. The chapter coverage notes in `course/guided-*-audit.md` map that
material to the current lessons and clearly labelled continuations.

For each step, explain the starting state, the problem to solve, and any supplied
scaffolding added since the previous solution. Walk through small changes with
filenames and insertion/replacement instructions, explain why each change works,
and state what the learner should observe once. Keep one coherent explanation/edit/check sequence, rather than adding a second objective and list of tasks after it.
Do not hide the teaching inside the solution button or make a task list substitute
for an explanation.

Check snippets against both the current starter and solution. Distinguish the
embedded project from optional work in an original repository: name that repository,
its checkpoint and its different files/models. Keep optional extensions separate
from the required progression. Do not imply that Vitest runs in Sandpack, that
TypeScript validates network data, or that browser edits transfer between lessons.
Link the official documentation near the concept it supports.

Explanatory edits do not require republishing immutable code tags. If the exercise
source changes, use the checkpoint publishing procedure below. Keep the page's
contents menu available, and put continuation links after the result checks.

### Lesson workspace layout

All course pages use `LessonStudio`, a viewport-height React shell inspired
by the [Svelte tutorial](https://svelte.dev/tutorial/svelte/multiple-select-bindings).
Docusaurus still owns MDX, routing and search. The home page and eight chapter
introductions show a topic-specific `CourseIllustration` in the right pane; the
embedded exercises show the editor and live preview there. Numbered reading and project
pages use a lesson-specific diagram from `static/course/`, linked through the
`course_illustration`, `course_illustration_alt` and `course_illustration_description`
frontmatter fields. Illustrated pages do not mount Sandpack. Theme wrappers preserve the same navigation and reading pane
throughout the course. Lesson text stays in its MDX file, including checks and
references after `LessonExercise`.

The studio renders optional hints in the reading pane and mounts one separate
`CodeWorkspace`. Its persistent footer contains Console, Work locally, Online editor
and Preview help. Local clone/import instructions open from Work locally; Online
editor opens the selected v5 checkpoint in StackBlitz without transferring drafts.
These run controls stay available while the editor loads or if it fails. A shared
context identifies the studio around the exercise. On narrow screens,
Lesson/Code/Preview controls change visibility,
not component identity. Never conditionally unmount Sandpack for a panel change:
that loses editor selection and resets the running example. Preserve previous-edition drafts when changing source maps or storage keys.

The outer split controls reading width; the inner split controls editor height.
Both support keyboard resizing. Use `min-height: 0` through the flex ancestors and
dynamic viewport height; avoid reintroducing fixed 520px panes. Verify desktop,
375px portrait and short landscape screens, panel toggles, solution/draft recovery,
navigation, the Lessons dropdown, and heading links when changing the layout. On introductions,
mobile tabs are Lesson/Illustration, with no editor-only controls. Dropdown surfaces
must be opaque in both themes: Infima's light `--ifm-background-color` is transparent,
so use `--studio-surface` for the course menu.
The lesson list opens directly below its trigger, before the workspace in keyboard
order. Check toggle, outside click, Escape, Tab departure and lesson navigation;
Escape should return focus to the trigger. Keep its
height within the space below the header and scroll the list to the current lesson
without scrolling the reading pane or remounting the editor.

### Readability and interaction checks

Search uses the plugin's CSS variables for text, muted labels and selected-result
colors. Its theme wrapper keeps the clear button labelled and focusable, bounds
the popup to the visual viewport (including the on-screen keyboard), and keeps
keyboard-selected results in view. Keep these fixes in the wrapper instead of
editing dependencies. The course dropdown contains only lesson navigation.
Search and anchor navigation must reveal the reading pane even when the user is
already on that lesson with Code or Preview open.

`editorThemes.ts` and the Prism configuration define separate readable light/dark
syntax colors; keep theme objects stable to preserve drafts during theme changes.
Use the [WCAG text contrast criterion](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
when checking normal, selected, muted, syntax and error states. The selected dark
search result was measured at 1.82:1 before the fix and 9.66:1 afterward; these are
specific measurements, not a claim of complete WCAG conformance.

Check 375px portrait, reduced viewport height, and short landscape: search results
must scroll inside the popup, editing controls must remain reachable, storage
failures must stay visible, and diagrams must support enlargement without widening
the page. Verify solution/theme changes and same-page search preserve the draft.

### Editing the exercises

Edit `course/chapters/*.json` and run `pnpm course:assemble`. The website and downloadable projects share the generated `course/lessons.json`. Each step mounts
`LessonExercise` with a stable ID. The editor and preview open automatically, keep drafts per step
in localStorage, and shows solutions without overwriting drafts. Sandpack runs in a
CodeSandbox iframe and needs network access. Its TypeScript preview transpiles code;
Vite's local `build` also type-checks. Lesson 6 uses a real Vitest runner in a temporary StackBlitz workspace, populated from the current editor files. The visible result is a snapshot from Run tests. Chromium embeds this workspace; Safari/Firefox use a new tab. Local exports also support `pnpm test:run`.

```sh
pnpm test          # manifest, exports, draft recovery and downloaded-file imports
pnpm typecheck
pnpm course:check  # install, type-check and build all step projects; run solution tests
pnpm course:check:online # install/build with npm for each exported dependency profile
pnpm build
```

Fixtures and teaching-project dependencies are separate from the documentation site.
The generated v6 exercises use the shared pins in `course/project-dependencies.json`.
TypeScript 6 provides a JavaScript compiler that can run in StackBlitz WebContainers.
The UI5 React wrapper 2.20.1 brings in `react-table` 7, which declares React 18
peer support. UI5 2.21 and later use `import.meta` in the runtime that the Sandpack
`react-ts` bundler evaluates. Keep the UI5 profile on React 18 and UI5 2.20 until
the preview supports newer releases.
Dependency profiles share pnpm lockfiles in `course/locks/v6`. After deliberately changing
project dependencies, run `node scripts/check-course.mjs --update-locks`, then review
and commit the updated lockfiles. Students may also use npm; pnpm with the supplied
lockfile provides the reproducible install.

The v3 edition restores the original example styling. The v1/v2 branches and tags
remain unchanged. V4 fixed StackBlitz installation without changing the v3 source maps. V5 uses its own draft key, reads compatible earlier drafts, and preserves incompatible earlier work for download. Renumbered Fetch/persistence lessons retain recovery mappings to their earlier IDs.

StackBlitz currently auto-selects pnpm 8.15.6, which rejects a workspace without
`packages` and cannot consume the pnpm 12 multi-document lockfiles. Generated
workspaces explicitly include the root package. Their `.stackblitzrc` disables
automatic dependency installation and runs `npm install && npm run dev`, as
supported by [StackBlitz project configuration](https://developer.stackblitz.com/platform/webcontainers/project-config).
Local pnpm users keep the pinned version and frozen lockfile; npm uses the exact
direct dependency versions in `package.json` and resolves transitive versions.
For an already-open v3 StackBlitz session, run `npm install && npm run dev` in its
terminal to continue without losing edits. Do not force-move released tags.

### Publishing course checkpoints

`pnpm course:release` creates the independent branch `course-examples-v6` and two annotated
tags per step named `lesson-<id>-start-v6` and `lesson-<id>-solution-v6`. It uses Git objects and
an isolated index, without switching the website checkout. Each tag contains a complete
Vite app at its root. The branch history follows all ordered step start/solution pairs; its tip
is the final solution, and its README links every checkpoint.

Run the validation commands first. Push the explicit branch and the generated step tag
refs before publishing the website, so student links resolve. Do not use `git push --tags`
(it could publish unrelated local tags). The release command refuses to overwrite any
existing checkpoint. For later editions, set the generator version in `scripts/course-project.mjs`
and create that edition's lockfiles. Once the new checkpoint refs are published, switch the
website's published version in `src/lib/course.ts` and update the example links in the docs.

Editor downloads contain JSON file maps. The generated projects include
`npm run import-draft -- ./download.json` to apply the matching lesson's files locally.
The importer validates the lesson and allowlists filenames before writing.

Integration references: [Sandpack](https://sandpack.codesandbox.io/docs/getting-started/usage),
[Sandpack static files](https://sandpack.codesandbox.io/docs/advanced-usage/serving-static-files),
[StackBlitz Git refs](https://developer.stackblitz.com/guides/integration/open-from-github).

Lesson titles and the course menu use chapter.step numbering consistently (for
example, 4.1). Keep the Docusaurus Previous/Next cards after the article; do not add
a second manual Previous/Next/Chapter overview row to lesson Markdown.

The v5 edition splits larger concepts into smaller runnable checkpoints and includes numbered reading/project pages in `course/navigation.json`. Rebuild that manifest with `pnpm course:assemble` after changing titles, slugs or lesson order. The separate read-only Solution view remains; reference text equality is not used as a correctness test.
