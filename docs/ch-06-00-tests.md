# 6. Tests

```mdx-code-block
import LessonExercise from '@site/src/components/LessonExercise';
```

<LessonExercise id="06-tests" />

## Goals

Write repeatable tests for store behavior and understand what coverage measures.

## Install and configure

Use this lesson’s tagged starter. Its `CounterStore` uses `change(delta)` and clamps a single value between 0 and 10. This differs from chapter 4’s multi-counter collection on purpose: the smaller model isolates testing. Vitest is already installed in the tagged project; to add matching coverage support run:

```bash
npm install -D @vitest/coverage-v8@3.2.6
```

Add scripts to the existing `scripts` object in `package.json`:

```json
"test": "vitest",
"test:run": "vitest run",
"test:coverage": "vitest run --coverage"
```

Keep the existing scripts and valid JSON commas. Vitest uses Vite configuration; these store tests run in Node and need no simulated DOM.

## Test behavior

Create `src/Store.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { CounterStore } from './Store';

describe('CounterStore', () => {
  it('adds positive and negative amounts', () => {
    const counter = new CounterStore();
    counter.change(3);
    counter.change(-1);
    expect(counter.value).toBe(2);
  });

  it('resets the value', () => {
    const counter = new CounterStore();
    counter.change(5);
    counter.reset();
    expect(counter.value).toBe(0);
  });
});
```

Run `npm run test:run`, then `npm run test:coverage`. `npm test` runs watch mode; stop it with Ctrl+C. The V8 coverage package should match the installed Vitest version. Coverage shows which code ran, not whether every behavior is correct. As an extension, add tests for board empty input and toggling; UI tests require an appropriate DOM environment and user-oriented assertions.

## Official references

[Vitest getting started](https://vitest.dev/guide/), [Vitest coverage](https://vitest.dev/guide/coverage.html), [Testing Library guiding principles](https://testing-library.com/docs/guiding-principles/).

## Work through the test exercise

Open `Store.test.ts` in the editor and turn each task into an assertion.
The embedded app offers a small, labelled browser check for immediate feedback;
it is not the Vitest runner and does not execute edits to the test file. To execute
the actual tests, open the same checkpoint in StackBlitz's terminal or clone it and
run `npm test`. Save the test file to rerun in watch mode.

Follow a short feedback loop: write a test that fails for the intended reason,
implement the behavior, and run it again. A passing empty test proves nothing.
Use a new store in each test so one test's state cannot affect another. Include
negative amounts, a reset after several operations, both clamping boundaries, and independent instances.
For CI, `npm run test:run` runs once and exits with a failing status on failure.

Store tests do not verify keyboard operation or DOM updates. As an extension,
use React Testing Library to click a counter button and assert the displayed
value, then cover a full user path with Playwright. Prefer observable behavior to
asserting internal implementation details.
