---
sidebar_position: 60
---

# 6. Tests

In chapter 4 you could type 42, click **+1** and see 43 in both the counter and the total. How would you know if that still worked after changing the store? Here you’ll turn those manual checks into repeatable tests.

Start with the completed [editable counter](./04-mobx/13-edit-value.mdx). The app, styles, MobX models and persistence helpers are supplied. You’ll add tests in `/Store.test.ts`. Each test creates its own model, so it runs independently of the values saved by the app.

Choose **Run tests** to execute the current editor files in this page’s Vitest simulator. It supports the test APIs used in these lessons and reports passed, failed and pending cases. To run the same files with full Vitest, use **Work locally** and run `pnpm test:run`.

## Lessons

1. [Write the first store tests](./06-tests/01-first-test.mdx) — Turn behavior into assertions for the chapter 4 model.
2. [Test invalid values and collection capacity](./06-tests/02-boundaries.mdx) — Reject non-finite inputs and exercise the four-counter limit.
3. [Test reset and the computed total](./06-tests/03-reset-and-independence.mdx) — Check that resetting one counter updates the total and preserves its neighbor.

Each lesson starts from a prepared checkpoint; your own edits remain in that lesson. See [course help](./course-help.mdx) for drafts and local work.

## Official references

[Vitest guide](https://vitest.dev/guide/), [assertions](https://vitest.dev/api/expect.html), [coverage](https://vitest.dev/guide/coverage.html), [Testing Library principles](https://testing-library.com/docs/guiding-principles/).

[Optional continuation: more testing techniques](./06-tests/optional-testing.mdx).
