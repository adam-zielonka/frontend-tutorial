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
- `dependencies`: pinned extra runtime packages. React and React DOM come from `project-dependencies.json`.

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
`react-ts` and the step's dependency map. Most chapters use React/React DOM 19.3.1.
The UI5 exercises use React/React DOM 18.3.1 to match their UI5 dependencies.
The preview transpiles TypeScript. Exported `npm run build` also checks types.

Fetch fixtures use Sandpack's static-file service worker and a local URL adapter
(`/ramps.json` for Vite, `/public/ramps.json` for Sandpack). Test lessons execute the current test and chapter 4 model with a small Vitest-compatible browser runner. Work locally supplies the matching Vite app and the real Vitest runner.

```sh
pnpm course:assemble
pnpm test
pnpm typecheck
pnpm course:check
pnpm build
```

`course:check` builds both variants of every step in temporary directories and
runs test files from solutions. Dependency profiles share lockfiles under
`locks/v6/`. Published checkpoints retain the lockfiles from their editions. To change
project dependencies intentionally, run `node scripts/check-course.mjs --update-locks`.
The website's checkpoint links use the published v5 tags until v6 is released.
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
