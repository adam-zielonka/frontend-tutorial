---
sidebar_position: 60
---

# 6. Tests

Write repeatable assertions for a complete single-value `CounterStore`. `change(delta)` adds a positive or negative amount and clamps between 0 and 10; `reset()` sets the value to zero. This smaller test fixture is separate from chapter 4's multi-counter collection.

Use **Run tests** to execute the edited `/Store.test.ts` with Vitest and see passing, failing, and pending cases. These store-only tests need no DOM emulator. For a terminal fallback, use [Work locally](./course-help.mdx) to import your edits, install dependencies, and run `pnpm exec vitest run`.

## Lessons

1. [Write the first store tests](./06-tests/01-first-test.mdx) — Turn behavior into assertions executed by Vitest.
2. [Test both clamping boundaries](./06-tests/02-boundaries.mdx) — Verify overshoots and repeated attempts at the limits.
3. [Test reset and independent stores](./06-tests/03-reset-and-independence.mdx) — Prove reset changes a nonzero value and instances do not share state.

Each lesson starts from a prepared checkpoint; your own edits remain in that lesson. See [course help](./course-help.mdx) for drafts and local work.

## Official references

[Vitest v3 guide](https://v3.vitest.dev/guide/), [assertions](https://v3.vitest.dev/api/expect.html), [coverage](https://v3.vitest.dev/guide/coverage.html), [Testing Library principles](https://testing-library.com/docs/guiding-principles/).


[Optional continuation: more testing techniques](./06-tests/optional-testing.mdx).
