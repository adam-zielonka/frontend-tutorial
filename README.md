# Write CounterStore tests — start

Turn manual observations into isolated, repeatable Vitest assertions.

## Run

Use Node.js 24.

```sh
npm install
npm run dev
```

Or use the pinned pnpm version and lockfile: `pnpm install --frozen-lockfile`, then `pnpm dev`. Run `npm run build` to type-check and bundle. Lesson 6 also uses `npm test` (watch mode) or `npm run test:run`. Its starter tests are deliberately incomplete; finish the pending cases and assertions.

## Tasks

- Complete the addition/subtraction test: after the existing +4 assertion, apply -2 and assert 2.
- Test upper and lower clamping, including another change at each boundary.
- Test reset after a nonzero value and prove that separate store instances do not share state.
- Run pnpm exec vitest run in the exported project; all five tests must pass with none pending.

## Continue your work

A tag checkout is detached: run `git switch -c my-work` before making your own commits. To import a JSON download from the lesson editor, copy it here and run `npm run import-draft -- ./download.json` (this replaces your exercise files).

[Read the lesson](https://adam-zielonka.github.io/frontend-tutorial/ch-06-00-tests) · [Starter](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-tests-start-v1) · [Solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-tests-solution-v1)

## All checkpoints

- A typed shipment manifest: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-01-tool-set-start-v1) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-01-tool-set-solution-v1)
- Configure a development workspace: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-02-development-tools-start-v1) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-02-development-tools-solution-v1)
- React state and events: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-03-react-basics-start-v1) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-03-react-basics-solution-v1)
- A bounded MobX collection: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-mobx-start-v1) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-mobx-solution-v1)
- Two views of the shipping board: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-shippingboard-start-v1) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-shippingboard-solution-v1)
- Write CounterStore tests: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-tests-start-v1) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-tests-solution-v1)
- Fetch with cleanup and retry: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-fetch-start-v1) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-fetch-solution-v1)
- UI5 shipment progress: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-08-ui5-start-v1) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-08-ui5-solution-v1)

These are self-contained teaching projects. The documentation website has its own dependency versions.
