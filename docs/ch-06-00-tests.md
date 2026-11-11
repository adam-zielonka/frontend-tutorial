# 6. Tests

```mdx-code-block
import LessonExercise from '@site/src/components/LessonExercise';
```

<LessonExercise id="06-tests" />

## Goals

Write repeatable tests for store behavior and understand what coverage measures.

## Install and configure

Continue with the sandbox and `CounterStore` from chapter 4:

```bash
npm install -D vitest @vitest/coverage-v8
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
    counter.add(3);
    counter.add(-1);
    expect(counter.value).toBe(2);
  });

  it('resets the value', () => {
    const counter = new CounterStore();
    counter.add(5);
    counter.reset();
    expect(counter.value).toBe(0);
  });
});
```

Run `npm run test:run`, then `npm run test:coverage`. `npm test` runs watch mode; stop it with Ctrl+C. The V8 coverage package should match the installed Vitest version. Coverage shows which code ran, not whether every behavior is correct. Add tests for board empty input and toggling; UI tests require an appropriate DOM environment and user-oriented assertions.

## Official references

[Vitest getting started](https://vitest.dev/guide/), [Vitest coverage](https://vitest.dev/guide/coverage.html), [Testing Library guiding principles](https://testing-library.com/docs/guiding-principles/).
