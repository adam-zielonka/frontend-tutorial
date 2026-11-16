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

## Official references

[Vitest v3 guide](https://v3.vitest.dev/guide/), [assertions](https://v3.vitest.dev/api/expect.html), [coverage](https://v3.vitest.dev/guide/coverage.html), [Testing Library principles](https://testing-library.com/docs/guiding-principles/).

## Optional continuation: UI and end-to-end tests

The original [mobx-example `create-tests` checkpoint](https://github.com/adam-zielonka/mobx-example/tree/create-tests) tests a different store. The mini export already includes Vitest, so no installation or DOM emulator is needed for its store tests. In a separate UI test, install compatible testing dependencies for that project and configure the [Vitest v3 environment](https://v3.vitest.dev/guide/environment.html) as `happy-dom` or `jsdom` when browser APIs are required. For example, in a Vitest config use `test: { environment: 'happy-dom' }` after installing happy-dom. Keep Node for pure store tests. The original configuration's browser emulation is not a real browser.

Run tests once with `pnpm exec vitest run`, or omit `run` to watch edits. For coverage, install the matching `@vitest/coverage-v8@3.2.6` in a local copy and run `pnpm exec vitest run --coverage`; inspect missed branches as well as percentages. A high percentage alone cannot establish that assertions are meaningful. For user journeys across the browser and application, [Playwright](https://playwright.dev/docs/intro) provides end-to-end tests; use it separately from the unit tests, for example to open the page, click a control and assert the visible result.
