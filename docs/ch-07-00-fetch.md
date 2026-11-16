---
sidebar_position: 70
---

# 7. Fetch

Load a bundled JSON fixture in four small steps. The effect and UI scaffold are provided; you add the request, validate responses, clean up obsolete work, then enable retry.

Keep `/public/ramps.json` and the supplied `loadLocalRamps` adapter. Vite exposes the fixture at `/ramps.json`; the embedded sandbox can use `/public/ramps.json`. These lessons use local data rather than depending on a remote demonstration API. The adapter's path fallback and the final user-triggered retry serve different purposes.

## Lessons

1. [Fetch the local ramp fixture](./07-fetch/01-request.mdx) — Make a request and render its JSON response through the existing effect.
2. [Reject HTTP and invalid data](./07-fetch/02-http-and-data-errors.mdx) — Validate the response before treating it as ramp data.
3. [Cancel obsolete requests](./07-fetch/03-abort-cleanup.mdx) — Pair every effect request with cancellation and stale-result protection.
4. [Retry the same request](./07-fetch/04-retry.mdx) — Start a fresh request without changing the URL or reloading the page.

In a local export, editor `/App.tsx` is `src/App.tsx`; other editor paths likewise live under `src` unless identified as public files. Work in order. Each lesson has its own starter, focused editor, and preview. The previous solution forms the next starter within the chapter; your saved edits remain scoped to the lesson where you made them.

## Official references

[Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController), [React effects](https://react.dev/reference/react/useEffect), [Vite static assets](https://vite.dev/guide/assets.html#the-public-directory).

## Optional continuation: connect the original ShippingBoard API

The mini app deliberately uses local ramp data so you can learn requests without a backend. The original tutorial applies Fetch to the full ShippingBoard: customers and ramps must arrive before loading records can refer to those models. Follow this continuation in a separate copy, not in the mini editor.

### 1. Open the original starting point

```sh
git clone --branch create-fetch https://github.com/adam-zielonka/shippingboard-lite.git shippingboard-fetch
cd shippingboard-fetch
git switch --detach bdd5494f80b7b78080e5d5dc479405a614458579
git switch -c my-fetch-work
pnpm dlx pnpm@7.33.7 install --frozen-lockfile
pnpm dev
```

These paths and model constructors refer to that original checkpoint, which has an older React/Blueprint/Vite toolchain. Its package versions are separate from the current lesson exports. The one-off pnpm 7 installer reads its historical lockfile without replacing your regular pnpm installation. Use it only for this archived project; current lesson exports use pnpm 12. `pnpm dev` starts the existing development script (`npm run dev` is the npm equivalent). First confirm the unchanged board loads before editing.

### 2. Describe the response and choose a base URL

In `src/api/api.ts`, remove the static `CUSTOMERS` and `RAMPS` JSON imports. Keep the model imports, `LOADINGS`, and `getLoadings` unchanged. After the imports, add:

```ts
const BASE_URL = 'https://raw.githubusercontent.com/adam-zielonka/shippingboard-lite/bdd5494f80b7b78080e5d5dc479405a614458579/src/api/';
type CustomerResponse = { kunnr: string; name1: string; ort01: string; land1: string };
type RampResponse = { ramp_id: string; description: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
function isCustomerResponse(value: unknown): value is CustomerResponse {
  return isRecord(value) && typeof value.kunnr === 'string' &&
    typeof value.name1 === 'string' && typeof value.ort01 === 'string' &&
    typeof value.land1 === 'string';
}
function isRampResponse(value: unknown): value is RampResponse {
  return isRecord(value) && typeof value.ramp_id === 'string' &&
    typeof value.description === 'string';
}
```

The URL ends in `/`, so appending `CUSTOMERS.json` selects a file from the same checkpoint. A real same-origin backend could use `/api/` instead, if it exposes those resources. The response types use the server's field names; the models have constructor arguments designed for the application. The guards check data before it crosses that boundary. A type assertion alone cannot establish what the server actually sent.

### 3. Load customers with async/await

Replace `getCustomers` inside `API` with:

```ts
async getCustomers(): Promise<Customer[]> {
  const response = await fetch(BASE_URL + 'CUSTOMERS.json');
  if (!response.ok) throw new Error(`Customers: HTTP ${response.status}`);
  const json: unknown = await response.json();
  if (!Array.isArray(json) || !json.every(isCustomerResponse)) {
    throw new Error('Invalid customer response');
  }
  return json.map(c => new Customer(c.kunnr, c.name1, c.ort01, c.land1));
}
```

An `async` method returns a promise, so callers can no longer treat its result as an array immediately. The first `await` waits for the response; the second reads and parses the body. Only validated records become `Customer` instances. An HTTP failure, malformed JSON, or invalid record rejects the operation rather than silently returning an empty list. See [Fetch response handling](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

### 4. Express the ramp request as a promise chain

Replace `getRamps` with the equivalent stages written using `.then`:

```ts
getRamps(): Promise<Ramp[]> {
  return fetch(BASE_URL + 'RAMPS.json')
    .then(response => {
      if (!response.ok) throw new Error(`Ramps: HTTP ${response.status}`);
      return response.json();
    })
    .then((json: unknown) => {
      if (!Array.isArray(json) || !json.every(isRampResponse)) {
        throw new Error('Invalid ramp response');
      }
      return json.map(r => new Ramp(r.ramp_id, r.description));
    });
}
```

Returning `response.json()` makes the next callback wait for the parsed data. Returning the outer chain lets `Store.init` await the whole operation. Forgetting either return breaks that chain. There is no need for an additional `async` keyword when the method already returns the promise directly. Use whichever style makes the sequence clearest; both must propagate errors to their caller.

### 5. Wait before constructing dependent models

In `src/store/Store.ts`, add `runInAction` to the existing MobX import. Inside `Store`, add these fields alongside `customers`, `ramps`, and `loadings`:

```ts
status: 'loading' | 'ready' | 'error' = 'loading';
loadError = '';
```

Replace the existing `init` field with:

```ts
init = async () => {
  try {
    const customers = await api.getCustomers();
    const ramps = await api.getRamps();
    runInAction(() => {
      this.customers = customers;
      this.ramps = ramps;
      this.loadings = api.getLoadings();
      this.ui.init();
      this.status = 'ready';
    });
  } catch (error) {
    runInAction(() => {
      this.loadError = error instanceof Error ? error.message : 'Loading failed';
      this.status = 'error';
    });
  }
};
```

Keep the existing `export const store = new Store();` and `store.init()` below the class. `getLoadings()` uses the populated model collections to resolve references, so it must run after assigning both arrays. A missing `await` would assign promises where arrays are expected. Code after an `await` is outside the original synchronous MobX action; [`runInAction`](https://mobx.js.org/actions.html#asynchronous-actions) groups those observable assignments correctly.

### 6. Make waiting and failure visible

In `src/App.tsx`, import `store` from `./store/Store`. At the beginning of the existing `App` function, before its current return, add:

```tsx
if (store.status === 'loading') return <p role="status">Loading the board…</p>;
if (store.status === 'error') return <p role="alert">Could not load the board: {store.loadError}</p>;
```

Keep the normal header/content/details JSX and `export default observer(App)`. The observer subscribes to the status read during render. Until the data is ready, the board cannot offer actions that depend on incomplete collections.

Start the app and expect a loading message followed by the board. In your local experiment, change one requested filename to a missing file and reload: you should see an error, not an apparently empty successful board. Restore the filename and reload. Finally run `pnpm build` to catch missing imports or incorrect types. This original-project continuation initializes once; the mini lessons separately teach cancellation and explicit retry for repeated requests.
