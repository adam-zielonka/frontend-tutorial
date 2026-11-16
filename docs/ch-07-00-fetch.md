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

## Optional continuation: original API and store

The [original `create-fetch` checkpoint](https://github.com/adam-zielonka/shippingboard-lite/tree/create-fetch) uses `src/api/api.ts` and model classes, not the mini app's `/api.ts` and `{ id, name }` fixture. Its GitHub raw-data base URL points at `src/api/`; a same-origin service might instead use `/api/`. Define response shapes for customer fields `kunnr`, `name1`, `ort01`, `land1` and ramp fields `ramp_id`, `description`, then map validated responses to the project's `Customer` and `Ramp` constructors. Types alone do not validate JSON.

For example, after validating `json` as the expected customer array, the original mapping is `json.map(c => new Customer(c.kunnr, c.name1, c.ort01, c.land1))`. With promises, the equivalent stages can be written as `fetch(url).then(response => { if (!response.ok) throw new Error(String(response.status)); return response.json(); }).then(json => { /* validate, then map */ })`. Both forms propagate rejection; `await` simply makes the sequential stages easier to read. Unlike the old example, surface errors instead of returning an empty array for HTTP failure, which confuses failure with a successful empty response.

In the original `src/store/Store.ts`, await customer and ramp requests in `init` before setting loadings and calling `store.ui.init()`, because those later operations can depend on the loaded models. Handle rejected requests in the UI. This is separate from the mini app's effect, cancellation and local fixture.
