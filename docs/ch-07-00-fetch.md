---
sidebar_position: 70
---

# 7. Fetch

Open the ramp list on a slow connection. Before the data arrives, an empty screen could mean the warehouse has no ramps or the app is still waiting. You’ll give the user a way to tell the difference.

Start by requesting a file. Did the server find it? Can the browser read its contents as JSON? Does each record describe a ramp? Work through those questions one at a time, then let the user try again after a failure. You’ll also cancel a request when the app no longer needs its result.

## Lessons

1. [Fetch the local ramp fixture](./07-fetch/01-request.mdx).
2. [Reject unsuccessful HTTP responses](./07-fetch/02-http-and-data-errors.mdx).
3. [Validate the JSON structure](./07-fetch/03-validate-data.mdx).
4. [Cancel obsolete requests](./07-fetch/03-abort-cleanup.mdx).
5. [Retry the same request](./07-fetch/04-retry.mdx).

The bundled fixture and preview-path adapter are supplied. Work in order: each solution forms the next starter. See [course help](./course-help) for the editor and local exports.

## Apply it to the original project

These supplemental guided pages use a separate archived ShippingBoard project, with its own files and model constructors:

6. [Open the original ShippingBoard project](./07-fetch/06-original-project.mdx).
7. [Describe the response contract](./07-fetch/07-response-contract.mdx).
8. [Load customers with await](./07-fetch/08-customers-await.mdx).
9. [Load ramps with a promise chain](./07-fetch/09-ramps-then.mdx).
10. [Initialize dependent models in order](./07-fetch/10-store-initialization.mdx).
11. [Show loading and failure states](./07-fetch/11-loading-and-errors.mdx).

[Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) · [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) · [React effects](https://react.dev/reference/react/useEffect) · [Vite static assets](https://vite.dev/guide/assets.html#the-public-directory)
