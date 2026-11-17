# Restore and serialize URL state — solution

Hydrate validated values and synchronize them with the URL using a disposed reaction.

## Run

Use Node.js 24.

```sh
npm install
npm run dev
```

Or use the pinned pnpm version and lockfile: `pnpm install --frozen-lockfile`, then `pnpm dev`. Run `npm run build` to type-check and bundle. Lesson 6 also uses `npm test` (watch mode) or `npm run test:run`. Its starter tests are deliberately incomplete; finish the pending cases and assertions.

## Tasks

- Implement serializedValues as a semicolon-separated value list and hydrate as an all-or-nothing validated replacement.
- Reject more than four counters, payloads longer than 512 characters, blank tokens, NaN and Infinity. Treat an entirely empty string as an empty collection.
- Implement restoreUrl and syncUrl. Use the value query parameter, preserve other parameters and the hash, catch browser failures, and return the reaction disposer.
- Load 5;-2, change a value, and inspect the share query. Invalid input such as 1;;2 or Infinity must preserve the current collection. In the exported app, reload a URL containing ?value=5%3B-2.

## Continue your work

A tag checkout is detached: run `git switch -c my-work` before making your own commits. To import a JSON download from the lesson editor, copy it here and run `npm run import-draft -- ./download.json` (this replaces your exercise files).

[Read the lesson](https://adam-zielonka.github.io/frontend-tutorial/04-mobx/08-url-state) · [Starter](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-08-url-state-start-v4) · [Solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-08-url-state-solution-v4)

## All checkpoints

- Describe a shipment with types: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-01-01-shipment-shape-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-01-01-shipment-shape-solution-v4)
- Derive the manifest summary: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-01-02-derived-summary-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-01-02-derived-summary-solution-v4)
- Configure editor and type checks: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-02-01-editor-and-types-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-02-01-editor-and-types-solution-v4)
- Use scripts and a Git checkpoint: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-02-02-scripts-and-git-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-02-02-scripts-and-git-solution-v4)
- Render the counter component: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-03-01-component-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-03-01-component-solution-v4)
- Remember the pallet count: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-03-02-state-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-03-02-state-solution-v4)
- Bound subtraction and reset: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-03-03-bounded-events-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-03-03-bounded-events-solution-v4)
- Build the counter layout: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-01-counter-layout-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-01-counter-layout-solution-v4)
- Make the counter interactive: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-02-local-state-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-02-local-state-solution-v4)
- Create an observable counter store: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-03-observable-store-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-03-observable-store-solution-v4)
- Subscribe React with observer: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-04-react-observer-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-04-react-observer-solution-v4)
- Manage multiple counters: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-05-counter-collection-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-05-counter-collection-solution-v4)
- Derive capacity and the total: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-06-computed-capacity-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-06-computed-capacity-solution-v4)
- Remove a counter safely: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-07-counter-removal-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-07-counter-removal-solution-v4)
- Restore and serialize URL state: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-08-url-state-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-08-url-state-solution-v4)
- Persist counters in localStorage: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-09-persistence-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-04-09-persistence-solution-v4)
- Switch between board views: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-01-view-switching-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-01-view-switching-solution-v4)
- Filter loading status: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-02-status-filter-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-02-status-filter-solution-v4)
- Group loadings by ramp: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-03-ramp-groups-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-03-ramp-groups-solution-v4)
- Explain empty ramps and ramp status: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-04-empty-and-status-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-05-04-empty-and-status-solution-v4)
- Write the first store tests: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-01-first-test-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-01-first-test-solution-v4)
- Test both clamping boundaries: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-02-boundaries-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-02-boundaries-solution-v4)
- Test reset and independent stores: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-03-reset-and-independence-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-06-03-reset-and-independence-solution-v4)
- Fetch the local ramp fixture: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-01-request-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-01-request-solution-v4)
- Reject HTTP and invalid data: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-02-http-and-data-errors-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-02-http-and-data-errors-solution-v4)
- Cancel obsolete requests: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-03-abort-cleanup-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-03-abort-cleanup-solution-v4)
- Retry the same request: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-04-retry-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-07-04-retry-solution-v4)
- Add a UI5 provider and button: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-08-01-provider-and-button-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-08-01-provider-and-button-solution-v4)
- Wire actions and register icons: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-08-02-events-and-icons-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-08-02-events-and-icons-solution-v4)
- Show progress and enforce capacity: [start](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-08-03-progress-and-capacity-start-v4) · [solution](https://github.com/adam-zielonka/frontend-tutorial/tree/lesson-08-03-progress-and-capacity-solution-v4)

These are self-contained teaching projects. The documentation website has its own dependency versions.
