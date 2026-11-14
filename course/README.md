# Step-by-step course source

Each `chapters/*.json` file contains one ordered chapter of small, progressive
lessons. Edit these sources and run `pnpm course:assemble` to regenerate
`lessons.json`, which is shared by the website and the project exporter.
`pnpm test` checks that the generated manifest is current.

Each step has the following fields:

- `id`: stable `XX-YY-name` identifier, with chapter and step numbers.
- `chapter`, `chapterTitle`: group used in navigation and the sidebar.
- `doc`: exact MDX page path under `docs/`, without the extension.
- `title`, `objective`, `tasks`, `hints`: explanation and completion criteria.
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

## Runtime and verification

The editor and preview start automatically on each lesson page, using Sandpack
`react-ts`, React/React DOM 18.3.1 and the step's dependency map. The site itself
uses a separate React version. The preview transpiles TypeScript; exported
`npm run build` performs type checking too.

Fetch fixtures use Sandpack's static-file service worker and a local URL adapter
(`/ramps.json` for Vite, `/public/ramps.json` for Sandpack). Test lessons provide a
manual interactive harness in the preview; Vitest executes in the local or
StackBlitz terminal, not in the preview.

```sh
pnpm course:assemble
pnpm test
pnpm typecheck
pnpm course:check
pnpm build
```

`course:check` builds both variants of every step in temporary directories and
runs test files from solutions. Dependency profiles share lockfiles under
`locks/v3/`; v1 and v2 lockfiles are retained with their earlier editions. To change
project dependencies intentionally, run `node scripts/check-course.mjs --update-locks`.
See [the development guide](../DEVELOPMENT.md) for release instructions.

References: [Sandpack configuration](https://sandpack.codesandbox.io/docs/getting-started/usage),
[automatic preview startup](https://sandpack.codesandbox.io/docs/getting-started/layout),
[static files](https://sandpack.codesandbox.io/docs/advanced-usage/serving-static-files),
[MobX](https://mobx.js.org/README.html),
[Vitest](https://v3.vitest.dev/guide/),
[UI5 React](https://ui5.github.io/webcomponents-react/).
