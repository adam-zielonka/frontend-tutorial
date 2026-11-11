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

Work in order. Each lesson has its own starter, focused editor, and preview. The previous solution forms the next starter within the chapter; your saved edits remain scoped to the lesson where you made them.

## Official references

[Vitest v3 guide](https://v3.vitest.dev/guide/), [assertions](https://v3.vitest.dev/api/expect.html), [coverage](https://v3.vitest.dev/guide/coverage.html), [Testing Library principles](https://testing-library.com/docs/guiding-principles/).
