# Filter loading status — start

Derive visible rows from a controlled status selector.

## Run

Use Node.js 24.

```sh
npm install
npm run dev
```

Or use the pinned pnpm version and lockfile: `pnpm install --frozen-lockfile`, then `pnpm dev`. Run `npm run build` to type-check and bundle. Lesson 6 also uses `npm test` (watch mode) or `npm run test:run`. Its starter tests are deliberately incomplete; finish the pending cases and assertions.

## Tasks

- Derive visible by filtering loadings against filter; all must keep every record.
- Confirm Waiting, Loading, and Done each show one matching row.
- Return to All and verify the count and table return to three rows.

## Continue your work

A tag checkout is detached: run `git switch -c my-work` before making your own commits. To import a JSON download from the lesson editor, copy it here and run `npm run import-draft -- ./download.json` (this replaces your exercise files).

[Read the lesson](https://adam-zielonka.github.io/frontend-tutorial/05-shippingboard/02-status-filter) · [Starter](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-02-status-filter-start-v2) · [Solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-02-status-filter-solution-v2)

## All checkpoints

- Describe a shipment with types: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-01-01-shipment-shape-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-01-01-shipment-shape-solution-v2)
- Derive the manifest summary: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-01-02-derived-summary-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-01-02-derived-summary-solution-v2)
- Configure editor and type checks: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-02-01-editor-and-types-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-02-01-editor-and-types-solution-v2)
- Use scripts and a Git checkpoint: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-02-02-scripts-and-git-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-02-02-scripts-and-git-solution-v2)
- Render the counter component: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-03-01-component-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-03-01-component-solution-v2)
- Remember the pallet count: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-03-02-state-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-03-02-state-solution-v2)
- Bound subtraction and reset: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-03-03-bounded-events-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-03-03-bounded-events-solution-v2)
- Build the counter layout: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-01-counter-layout-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-01-counter-layout-solution-v2)
- Make the counter interactive: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-02-local-state-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-02-local-state-solution-v2)
- Create an observable counter store: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-03-observable-store-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-03-observable-store-solution-v2)
- Subscribe React with observer: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-04-react-observer-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-04-react-observer-solution-v2)
- Manage multiple counters: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-05-counter-collection-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-05-counter-collection-solution-v2)
- Derive capacity and the total: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-06-computed-capacity-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-06-computed-capacity-solution-v2)
- Remove a counter safely: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-07-counter-removal-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-07-counter-removal-solution-v2)
- Restore and serialize URL state: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-08-url-state-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-08-url-state-solution-v2)
- Persist counters in localStorage: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-09-persistence-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-09-persistence-solution-v2)
- Switch between board views: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-01-view-switching-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-01-view-switching-solution-v2)
- Filter loading status: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-02-status-filter-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-02-status-filter-solution-v2)
- Group loadings by ramp: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-03-ramp-groups-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-03-ramp-groups-solution-v2)
- Explain empty ramps and ramp status: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-04-empty-and-status-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-04-empty-and-status-solution-v2)
- Write the first store tests: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-01-first-test-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-01-first-test-solution-v2)
- Test both clamping boundaries: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-02-boundaries-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-02-boundaries-solution-v2)
- Test reset and independent stores: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-03-reset-and-independence-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-03-reset-and-independence-solution-v2)
- Fetch the local ramp fixture: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-01-request-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-01-request-solution-v2)
- Reject HTTP and invalid data: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-02-http-and-data-errors-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-02-http-and-data-errors-solution-v2)
- Cancel obsolete requests: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-03-abort-cleanup-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-03-abort-cleanup-solution-v2)
- Retry the same request: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-04-retry-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-04-retry-solution-v2)
- Add a UI5 provider and button: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-08-01-provider-and-button-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-08-01-provider-and-button-solution-v2)
- Wire actions and register icons: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-08-02-events-and-icons-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-08-02-events-and-icons-solution-v2)
- Show progress and enforce capacity: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-08-03-progress-and-capacity-start-v2) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-08-03-progress-and-capacity-solution-v2)

These are self-contained teaching projects. The documentation website has its own dependency versions.
