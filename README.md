# Reject HTTP and invalid data — solution

Validate the response before treating it as ramp data.

## Run

Use Node.js 24.

```sh
npm install
npm run dev
```

Or use the pinned pnpm version and lockfile: `pnpm install --frozen-lockfile`, then `pnpm dev`. Run `npm run build` to type-check and bundle. Lesson 6 also uses `npm test` (watch mode) or `npm run test:run`. Its starter tests are deliberately incomplete; finish the pending cases and assertions.

## Tasks

- Check response.ok before JSON parsing; throw an Error containing response.status for a failed HTTP response.
- Parse JSON as unknown and require an array of objects with string id and name fields before returning Ramp[].
- Toggle the missing fixture to inspect the error UI, then restore the working URL.
- Temporarily change a fixture name to a number to exercise invalid data; restore the file afterwards.

## Continue your work

A tag checkout is detached: run `git switch -c my-work` before making your own commits. To import a JSON download from the lesson editor, copy it here and run `npm run import-draft -- ./download.json` (this replaces your exercise files).

[Read the lesson](https://adam-zielonka.github.io/frontend-tutorial/07-fetch/02-http-and-data-errors) · [Starter](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-02-http-and-data-errors-start-v3) · [Solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-02-http-and-data-errors-solution-v3)

## All checkpoints

- Describe a shipment with types: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-01-01-shipment-shape-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-01-01-shipment-shape-solution-v3)
- Derive the manifest summary: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-01-02-derived-summary-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-01-02-derived-summary-solution-v3)
- Configure editor and type checks: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-02-01-editor-and-types-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-02-01-editor-and-types-solution-v3)
- Use scripts and a Git checkpoint: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-02-02-scripts-and-git-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-02-02-scripts-and-git-solution-v3)
- Render the counter component: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-03-01-component-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-03-01-component-solution-v3)
- Remember the pallet count: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-03-02-state-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-03-02-state-solution-v3)
- Bound subtraction and reset: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-03-03-bounded-events-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-03-03-bounded-events-solution-v3)
- Build the counter layout: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-01-counter-layout-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-01-counter-layout-solution-v3)
- Make the counter interactive: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-02-local-state-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-02-local-state-solution-v3)
- Create an observable counter store: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-03-observable-store-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-03-observable-store-solution-v3)
- Subscribe React with observer: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-04-react-observer-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-04-react-observer-solution-v3)
- Manage multiple counters: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-05-counter-collection-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-05-counter-collection-solution-v3)
- Derive capacity and the total: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-06-computed-capacity-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-06-computed-capacity-solution-v3)
- Remove a counter safely: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-07-counter-removal-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-07-counter-removal-solution-v3)
- Restore and serialize URL state: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-08-url-state-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-08-url-state-solution-v3)
- Persist counters in localStorage: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-09-persistence-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-09-persistence-solution-v3)
- Switch between board views: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-01-view-switching-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-01-view-switching-solution-v3)
- Filter loading status: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-02-status-filter-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-02-status-filter-solution-v3)
- Group loadings by ramp: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-03-ramp-groups-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-03-ramp-groups-solution-v3)
- Explain empty ramps and ramp status: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-04-empty-and-status-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-04-empty-and-status-solution-v3)
- Write the first store tests: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-01-first-test-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-01-first-test-solution-v3)
- Test both clamping boundaries: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-02-boundaries-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-02-boundaries-solution-v3)
- Test reset and independent stores: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-03-reset-and-independence-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-03-reset-and-independence-solution-v3)
- Fetch the local ramp fixture: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-01-request-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-01-request-solution-v3)
- Reject HTTP and invalid data: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-02-http-and-data-errors-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-02-http-and-data-errors-solution-v3)
- Cancel obsolete requests: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-03-abort-cleanup-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-03-abort-cleanup-solution-v3)
- Retry the same request: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-04-retry-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-04-retry-solution-v3)
- Add a UI5 provider and button: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-08-01-provider-and-button-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-08-01-provider-and-button-solution-v3)
- Wire actions and register icons: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-08-02-events-and-icons-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-08-02-events-and-icons-solution-v3)
- Show progress and enforce capacity: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-08-03-progress-and-capacity-start-v3) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-08-03-progress-and-capacity-solution-v3)

These are self-contained teaching projects. The documentation website has its own dependency versions.
