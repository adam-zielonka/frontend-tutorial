---
sidebar_position: 60
---

# 6. Tests

Your counter reads 9. Someone adds two more, but the limit is 10. What should the new value be? A test lets you write down the answer and check it again whenever the code changes.

For these exercises, you get a small `CounterStore` with a single value. Call `change(delta)` to add or subtract an amount. The result stays between 0 and 10. Call `reset()` to return to zero. Later, you can apply the same techniques to the collection from chapter 4.

Edit `/Store.test.ts`, then choose **Run tests**. Vitest shows which checks passed, which failed, and which are still waiting to be written. The tests work directly with the store, so they can run without a browser document. To run them in your terminal, follow [Work locally](./course-help.mdx), import your edits, install the dependencies and run `pnpm exec vitest run`.

## Lessons

1. [Write the first store tests](./06-tests/01-first-test.mdx) — Turn behavior into assertions executed by Vitest.
2. [Test both clamping boundaries](./06-tests/02-boundaries.mdx) — Verify overshoots and repeated attempts at the limits.
3. [Test reset and independent stores](./06-tests/03-reset-and-independence.mdx) — Prove reset changes a nonzero value and instances do not share state.

Each lesson starts from a prepared checkpoint; your own edits remain in that lesson. See [course help](./course-help.mdx) for drafts and local work.

## Official references

[Vitest guide](https://vitest.dev/guide/), [assertions](https://vitest.dev/api/expect.html), [coverage](https://vitest.dev/guide/coverage.html), [Testing Library principles](https://testing-library.com/docs/guiding-principles/).

[Optional continuation: more testing techniques](./06-tests/optional-testing.mdx).
