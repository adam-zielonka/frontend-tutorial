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

Work in order. Each lesson has its own starter, focused editor, and preview. The previous solution forms the next starter within the chapter; your saved edits remain scoped to the lesson where you made them.

## Official references

[Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController), [React effects](https://react.dev/reference/react/useEffect), [Vite static assets](https://vite.dev/guide/assets.html#the-public-directory).
