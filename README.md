# Reject unsuccessful HTTP responses — solution

Reject unsuccessful HTTP responses before parsing their bodies.

## Run

Use Node.js 24.

```sh
npm install
npm run dev
```

Or use the pinned pnpm version and lockfile: `pnpm install --frozen-lockfile`, then `pnpm dev`. Run `npm run build` to type-check and bundle. Lesson 6 also uses `npm test` (watch mode) or `npm run test:run`. Its starter tests are deliberately incomplete; finish the pending cases and assertions.

## Tasks

- Check response.ok and throw an error containing the HTTP status before parsing JSON.

## Continue your work

A tag checkout is detached: run `git switch -c my-work` before making your own commits. To import a JSON download from the lesson editor, copy it here and run `npm run import-draft -- ./download.json` (this replaces your exercise files).

[Read the lesson](https://adam-zielonka.github.io/frontend-tutorial/07-fetch/02-http-and-data-errors) · [Starter](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-02-http-and-data-errors-start-v5) · [Solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-02-http-and-data-errors-solution-v5)

## All checkpoints

- Describe a shipment with types: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-01-01-shipment-shape-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-01-01-shipment-shape-solution-v5)
- Derive the manifest summary: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-01-02-derived-summary-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-01-02-derived-summary-solution-v5)
- Configure editor and type checks: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-02-01-editor-and-types-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-02-01-editor-and-types-solution-v5)
- Use scripts and a Git checkpoint: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-02-02-scripts-and-git-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-02-02-scripts-and-git-solution-v5)
- Render the counter component: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-03-01-component-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-03-01-component-solution-v5)
- Remember the pallet count: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-03-02-state-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-03-02-state-solution-v5)
- Bound subtraction and reset: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-03-03-bounded-events-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-03-03-bounded-events-solution-v5)
- Build the counter layout: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-01-counter-layout-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-01-counter-layout-solution-v5)
- Make the counter interactive: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-02-local-state-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-02-local-state-solution-v5)
- Create an observable counter store: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-03-observable-store-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-03-observable-store-solution-v5)
- Subscribe React with observer: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-04-react-observer-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-04-react-observer-solution-v5)
- Manage multiple counters: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-05-counter-collection-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-05-counter-collection-solution-v5)
- Derive capacity and the total: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-06-computed-capacity-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-06-computed-capacity-solution-v5)
- Remove a counter safely: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-07-counter-removal-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-07-counter-removal-solution-v5)
- Serialize and validate counter values: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-08-url-state-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-08-url-state-solution-v5)
- Restore counters from a URL: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-09-restore-url-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-09-restore-url-solution-v5)
- Synchronize the URL and dispose the reaction: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-10-url-reaction-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-10-url-reaction-solution-v5)
- Restore a storage snapshot as fallback: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-11-persistence-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-11-persistence-solution-v5)
- Save snapshots and clean up both effects: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-12-storage-autorun-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-12-storage-autorun-solution-v5)
- Switch between board views: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-01-view-switching-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-01-view-switching-solution-v5)
- Filter loading status: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-02-status-filter-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-02-status-filter-solution-v5)
- Group loadings by ramp: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-03-ramp-groups-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-03-ramp-groups-solution-v5)
- Explain empty ramps and ramp status: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-04-empty-and-status-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-04-empty-and-status-solution-v5)
- Write the first store tests: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-01-first-test-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-01-first-test-solution-v5)
- Test both clamping boundaries: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-02-boundaries-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-02-boundaries-solution-v5)
- Test reset and independent stores: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-03-reset-and-independence-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-03-reset-and-independence-solution-v5)
- Fetch the local ramp fixture: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-01-request-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-01-request-solution-v5)
- Reject unsuccessful HTTP responses: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-02-http-and-data-errors-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-02-http-and-data-errors-solution-v5)
- Validate the JSON structure: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-03-validate-data-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-03-validate-data-solution-v5)
- Cancel obsolete requests: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-04-abort-cleanup-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-04-abort-cleanup-solution-v5)
- Retry the same request: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-05-retry-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-05-retry-solution-v5)
- Add a UI5 provider and button: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-08-01-provider-and-button-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-08-01-provider-and-button-solution-v5)
- Wire actions and register icons: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-08-02-events-and-icons-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-08-02-events-and-icons-solution-v5)
- Show progress and enforce capacity: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-08-03-progress-and-capacity-start-v5) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-08-03-progress-and-capacity-solution-v5)

These are self-contained teaching projects. The documentation website has its own dependency versions.
