# Step-by-step course source

Each `chapters/*.json` file contains one ordered chapter of small, progressive
lessons. Edit these sources and run `pnpm course:assemble` to regenerate
`lessons.json`, which is shared by the website and the project exporter. The same command creates `navigation.json` from numbered lesson pages, including guided project continuations without an embedded editor.
`pnpm test` checks that the generated manifest is current.

Each step has the following fields:

- `id`: stable `XX-YY-name` identifier, with chapter and step numbers.
- `chapter`, `chapterTitle`: group used in navigation and the sidebar.
- `doc`: exact MDX page path under `docs/`, without the extension.
- `title`, `objective`, `tasks`, `hints`: export metadata and optional hints. The visible guided instructions have one source in MDX; do not repeat this task list after the walkthrough.
- `activeFile`: selected file when the editor opens.
- `focusFiles`: editable files for this specific step, including `activeFile`.
- `files`, `solution`: complete runnable source maps with the same keys.
- `dependencies`: pinned extra runtime packages; React 18.3.1 is supplied centrally.

The solution can only change `focusFiles`; supporting files are read-only and
hidden by default. Each step has its own prepared checkpoint and browser draft.
Changes are not automatically transplanted between steps, because scaffolding
and the model can change as a new concept is introduced. Previous drafts remain
accessible by returning to their step. Keep adjacent checkpoints incremental;
explain any new scaffolding in the step's prose.

Virtual source paths such as `/App.tsx` map to `src/App.tsx` in the exported
Vite project. `/public/*` remains in the project's `public/` directory. The
exporter supplies the entry point, configuration, README, and draft importer.

## Example appearance

The MobX steps retain the yellow/orange cards, green display, blue controls, and
Verdana typography from the original [mobx-example stylesheet](https://github.com/adam-zielonka/mobx-example/blob/02e70f73629d15da431d858da7132eeab5b91dbb/src/index.css).
Selectors are adapted to semantic `output` elements and the lesson's controls;
fluid widths keep the same design usable inside a narrow preview. The original
`0`, `+`, and `X` captions retain descriptive accessible names. Styling is supplied
in both variants of every step, outside the exercise's editable focus files.

ShippingBoard preserves its original navbar, ramp/loading cards, status colors,
and compact table; see [sources and adaptations](./styles-shippingboard.md).

## Runtime and verification

The editor and preview start automatically on each lesson page, using Sandpack
`react-ts`, React/React DOM 18.3.1 and the step's dependency map. The site itself
uses a separate React version. The preview transpiles TypeScript; exported
`npm run build` performs type checking too.

Fetch fixtures use Sandpack's static-file service worker and a local URL adapter
(`/ramps.json` for Vite, `/public/ramps.json` for Sandpack). Test lessons replace the app preview with a Vitest results workspace built from the current editor files. Run tests submits a snapshot to StackBlitz; the real pinned Vitest executes there. Chromium supports embedding; Safari/Firefox open the same project in a new tab. No test result is inferred from matching the reference source. Local exports retain a manual app for inspecting the store and run tests via `pnpm test:run`.

```sh
pnpm course:assemble
pnpm test
pnpm typecheck
pnpm course:check
pnpm build
```

`course:check` builds both variants of every step in temporary directories and
runs test files from solutions. Dependency profiles share lockfiles under
`locks/v5/`; earlier lockfiles are retained with their earlier editions. To change
project dependencies intentionally, run `node scripts/check-course.mjs --update-locks`.
See [the development guide](../DEVELOPMENT.md) for release instructions.

References: [Sandpack configuration](https://sandpack.codesandbox.io/docs/getting-started/usage),
[automatic preview startup](https://sandpack.codesandbox.io/docs/getting-started/layout),
[static files](https://sandpack.codesandbox.io/docs/advanced-usage/serving-static-files),
[MobX](https://mobx.js.org/README.html),
[Vitest](https://vitest.dev/guide/),
[UI5 React](https://ui5.github.io/webcomponents-react/).

## Guided writing

Use a short context, explain the new idea beside the change, and give one observable result. Put filenames in code fence titles (for example `title="/Store.ts"`); matching editor files become keyboard-accessible links. Use `{2-4}` for changed-line emphasis where helpful. Keep prerequisites, cleanup and validation explained at the step where they matter. Move common environment instructions to course help and longer extensions to numbered pages. Do not delete the original teaching when reducing repetition.

The v5 source revision keeps v3/v4 drafts in their original keys. Compatible work is read into the new edition; incompatible work under the same lesson ID is offered through Previous draft.

Runtime references: [StackBlitz SDK](https://developer.stackblitz.com/platform/api/javascript-sdk), [browser support](https://developer.stackblitz.com/platform/webcontainers/browser-support), [Vitest reporters](https://vitest.dev/guide/reporters).
