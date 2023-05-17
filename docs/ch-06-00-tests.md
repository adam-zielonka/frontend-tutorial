# 6. Tests

Let's start with `mobx-example` project.


## Preparing workspace

To start working on this project you have two option: development using local or online editor:

1. Online Editor
    - Just go to [**stackblitz**](https://stackblitz.com/github/adam-zielonka/mobx-example/tree/create-tests)
2. Local development
    - Clone repo from [**mobx-example**](https://github.com/adam-zielonka/mobx-example/tree/create-tests) and set branch to `create-tests`. You can use this command: 
    ```shell
    git clone --branch create-tests https://github.com/adam-zielonka/mobx-example.git
    ```
    - Open vs code for this project, if you still in terminal you can use this command:
    ```shell
    code mobx-example
    ```
    - Install dependencies:
    ```
    npm install
    ```
    - Run dev server:
    ```
    npm dev
    ```


## Install tools for testing

```shell
pnpm add vitest happy-dom
```

- [vitest](https://vitest.dev/) - tools that allow write and run out test
- [happy-dom](https://github.com/capricorn86/happy-dom) - emulates browser environment by providing Browser API

## Configure

We can add config to `vite.config.ts` or create dedicate file for test environment config. In this case we use shared config:

```ts title="vite.config.ts"
// highlight-next-line
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  // highlight-start
  test: {
    environment: "happy-dom",
  }
  // highlight-end
});
```


## Write tests

```ts title="src/Store.test.ts"
import { describe, test, expect } from "vitest";
import { CounterStore } from "./Store";

describe("CounterStore", () => {
  test("new counter", () => {
    const counter = new CounterStore();
    expect(counter.value).toBe(1);
  });
});
```

## Run test


```
pnpm vitest
```

or if you using npm you need to add to `package.json`

```json title="package.json"
{
  //...
  "scripts": {
    //...
    "test": "vitest"
  },
  //...
}

```

```
npm run test
```

## Exercises

Please test this scenario for `CounterStore`:

- test adding valid/invalid input 
- test reset

And also for `Store`:

- test creation of Store
- test adding/deleting counters (check limitation)

## Coverage

```shell
pnpm add @vitest/coverage-c8
```

```json title="package.json"
{
  //...
  "scripts": {
    //...
    "test-coverage": "pnpm vitest run --coverage",
  },
  //...
}
```

## End-to-end testing

If we wanna test in the way user use application we can use [playwright](https://playwright.dev/)
