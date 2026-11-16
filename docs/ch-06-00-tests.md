---
sidebar_position: 60
---

# 6. Tests

Write repeatable assertions for a complete single-value `CounterStore`. `change(delta)` adds a positive or negative amount and clamps between 0 and 10; `reset()` sets the value to zero. This smaller test fixture is separate from chapter 4's multi-counter collection.

The live preview is an explicitly labelled **manual harness** for the real store. It does not execute `Store.test.ts` or report Vitest results. To run your test edits, export the edited project, install dependencies, and run `pnpm exec vitest run` in a real local or StackBlitz terminal. Vitest 3.2.6 is included; its default Node environment is enough for these store-only tests.

## Lessons

1. [Write the first store tests](./06-tests/01-first-test.mdx) — Turn behavior into assertions executed by Vitest in a terminal.
2. [Test both clamping boundaries](./06-tests/02-boundaries.mdx) — Verify overshoots and repeated attempts at the limits.
3. [Test reset and independent stores](./06-tests/03-reset-and-independence.mdx) — Prove reset changes a nonzero value and instances do not share state.

In a local export, editor `/App.tsx` is `src/App.tsx`; other editor paths likewise live under `src` unless identified as public files. Work in order. Each lesson has its own starter, focused editor, and preview. The previous solution forms the next starter within the chapter; your saved edits remain scoped to the lesson where you made them.

## Run this step from your edited browser files

The **Download my files** button saves JSON containing your source files, not a ready-to-run ZIP. Opening a StackBlitz link opens the tagged starter, not your current browser edits. For the first test lesson, use this complete local workflow:

1. In the lesson, keep **Your code** selected and choose **Download my files** after editing `Store.test.ts`.
2. In a terminal, clone its starter into a separate directory:

   ```sh
   git clone --branch lesson-06-01-first-test-start-v3 --depth 1 https://github.com/adam-zielonka/frontend-tutorial.git test-practice
   cd test-practice
   git switch -c my-work
   pnpm install --frozen-lockfile
   ```

3. Copy the downloaded `06-01-first-test-my-files.json` into `test-practice` using your file manager. Import it, then run tests:

   ```sh
   node import-draft.mjs ./06-01-first-test-my-files.json
   pnpm exec vitest run
   ```

The importer replaces this project's exercise files with your download. It rejects a download from a different lesson. For later lessons, use that lesson's clone command and its own download filename. Alternatively, work directly in the cloned project from the start, or copy your test edits into the corresponding file in StackBlitz and use its terminal.

A passing case is an executed assertion, a failing case shows an expected/actual difference, and `it.todo` is a deliberately pending case. The first completed lesson has two passing and three pending cases; the last has five passing and none pending. Keep the terminal open while changing an expected value to deliberately fail a test, then restore it: this confirms you are running your edited file.

## Official references

[Vitest v3 guide](https://v3.vitest.dev/guide/), [assertions](https://v3.vitest.dev/api/expect.html), [coverage](https://v3.vitest.dev/guide/coverage.html), [Testing Library principles](https://testing-library.com/docs/guiding-principles/).

## Where test configuration belongs

The exported `package.json` already has `test` (watch mode) and `test:run` (one run). That is why `pnpm test` and `pnpm test:run` work without inventing new scripts. The direct command `pnpm exec vitest run` invokes the same local test runner.

No config file is needed for these store tests. If you want to make the environment explicit, create a separate `vitest.config.ts` at the project root:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
  },
});
```

Use `defineConfig` from `vitest/config` here so TypeScript knows about the `test` options. This file configures tests, not the development server. You can keep `vite.config.ts` unchanged. With these pure model tests, the same five checks should pass before and after adding the file. Browser emulation only becomes relevant when the tested code needs a DOM.

## Optional continuation: UI and end-to-end tests

The original [mobx-example `create-tests` checkpoint](https://github.com/adam-zielonka/mobx-example/tree/create-tests) tests a different store. The mini export already includes Vitest, so no installation or DOM emulator is needed for its store tests. In a separate UI test, install compatible testing dependencies for that project and configure the [Vitest v3 environment](https://v3.vitest.dev/guide/environment.html) as `happy-dom` or `jsdom` when browser APIs are required. For example, in a Vitest config use `test: { environment: 'happy-dom' }` after installing happy-dom. Keep Node for pure store tests. The original configuration's browser emulation is not a real browser.

Run tests once with `pnpm exec vitest run`, or omit `run` to watch edits. For coverage in a local chapter 6 copy, run `pnpm add -D @vitest/coverage-v8@3.2.6` to match the installed Vitest, then `pnpm exec vitest run --coverage`. Inspect missed branches as well as percentages. A high percentage alone cannot establish that assertions are meaningful. For user journeys across the browser and application, [Playwright](https://playwright.dev/docs/intro) provides end-to-end tests; use it separately from the unit tests, for example to open the page, click a control and assert the visible result.

### Apply the tests to the counter collection

The original exercise also asked you to test invalid inputs and adding/removing counters. Use a **separate local clone of the completed MobX chapter**, rather than putting these tests into the smaller chapter 6 fixture:

```sh
git clone --branch lesson-04-09-persistence-solution-v3 --depth 1 https://github.com/adam-zielonka/frontend-tutorial.git counter-collection-tests
cd counter-collection-tests
pnpm install --frozen-lockfile
```

That export already includes its own Vitest version. Create `src/Store.test.ts` with the following two cases and run `pnpm exec vitest run`:

```ts
import { expect, it } from 'vitest';
import { CounterStore, Store } from './Store';

it('keeps a valid value when an invalid delta arrives, then resets', () => {
  const counter = new CounterStore(1);
  counter.add(7);
  counter.add(Number.NaN);
  counter.add(Infinity);
  expect(counter.value).toBe(7);
  counter.reset();
  expect(counter.value).toBe(0);
});

it('enforces capacity and frees a slot when a counter is removed', () => {
  const store = new Store();
  expect(store.counters).toHaveLength(1);
  for (let i = 0; i < 6; i++) store.addCounter();
  expect(store.counters).toHaveLength(4);
  expect(store.canAddMoreCounters).toBe(false);
  const removedId = store.counters[1].id;
  store.removeCounter(removedId);
  expect(store.counters).toHaveLength(3);
  expect(store.counters.some(counter => counter.id === removedId)).toBe(false);
  expect(store.canAddMoreCounters).toBe(true);
});
```

The model starts at zero and a collection starts with one model. These tests assert those actual contracts, instead of retaining the original sample's incorrect expectation that a new counter has value 1. Persistence helpers are not started by constructing these classes, so these tests do not need a browser. Add a case that gives two counters different values and verifies the computed sum before and after deleting one.
