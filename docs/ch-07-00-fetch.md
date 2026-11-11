# 7. Fetch

```mdx-code-block
import LessonExercise from '@site/src/components/LessonExercise';
```

<LessonExercise id="07-fetch" />

## Goals

Fetch JSON, handle network and HTTP failures, and update MobX state safely after `await`.

## Read a response

In the sandbox, create `src/api.ts`. This example uses a public demonstration endpoint and validates the fields it needs:

```ts
export type Todo = { id: number; title: string; completed: boolean };

export async function getTodo(signal?: AbortSignal): Promise<Todo> {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', { signal });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data: unknown = await response.json();
  if (typeof data !== 'object' || data === null ||
      !('id' in data) || typeof data.id !== 'number' ||
      !('title' in data) || typeof data.title !== 'string' ||
      !('completed' in data) || typeof data.completed !== 'boolean') {
    throw new Error('Invalid todo response');
  }
  return { id: data.id, title: data.title, completed: data.completed };
}
```

`fetch` rejects for network errors, but an HTTP 404 still resolves, so check `response.ok`. A TypeScript assertion alone does not validate external JSON. The endpoint must permit cross-origin requests when called directly from a browser.

## Update a MobX store

Create `src/TodoStore.ts`:

```ts
import { makeAutoObservable, runInAction } from 'mobx';
import { getTodo } from './api';
import type { Todo } from './api';

export class TodoStore {
  todo: Todo | null = null;
  loading = false;
  error: string | null = null;
  constructor() { makeAutoObservable(this); }

  async load() {
    this.loading = true;
    this.error = null;
    try {
      const todo = await getTodo();
      runInAction(() => { this.todo = todo; this.loading = false; });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Request failed';
        this.loading = false;
      });
    }
  }
}
```

Call `load` from a button in an `observer` component and render loading, error, and todo states. The example assumes one request at a time; disable the button while loading. For lifecycle-driven requests, use an `AbortController` and cleanup, and consider stale responses. A Vite development proxy can forward a path to a real API target, but production routing and authentication must be configured separately. Never put secrets in client code.

## Official references

[Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController), [MobX async actions](https://mobx.js.org/actions.html), [Vite proxy](https://vite.dev/config/server-options#server-proxy).

## Practice without a remote API

The interactive exercise uses a bundled ramps JSON fixture so your first fetch
exercise does not depend on a third-party API. Read the file, render the loaded
ramps, and distinguish loading, success, and error states. In local Vite projects,
files in `public` are served as static assets. The on-page sandbox serves its own
copy of the fixture.

Add retry by starting a fresh request, not by hiding the previous error. In an
effect, create an `AbortController` for each request and abort it in cleanup.
Ignore an aborted request's result so it cannot replace a newer request's state.
React Strict Mode deliberately exercises setup and cleanup in development; the
request code should remain correct when the effect is started again.

To test the failure path locally, temporarily request a missing file and confirm
that the HTTP status becomes an error message. Restore the path, retry, and check
that the successful response replaces the error. Do not treat an HTTP failure as
an empty successful list: users need to distinguish “no ramps” from “not loaded”.
