# Course content regression audit

Two revisions answer different questions. The eight chapter documents at `30e83a2` define the original teaching scope. The 66 learner-facing Markdown and MDX pages at `f54b885` are the baseline for this editing pass. The review followed topics into numbered lessons, worked examples and local continuations.

| Chapter | Material traced from the original | Result |
| --- | --- | --- |
| 1. Tools | Node versions, package managers, dependency patches, Vite, TypeScript, React and MobX | The overview and local setup retain the commands and reasons for using each tool. |
| 2. Development | OS differences, shell, Git and editor configuration | Lesson 2.1 distinguishes the model students edit from the settings they change locally. |
| 3. React | Scaffolding, directory structure, entry point, JSX, state and Vite configuration | The three embedded exercises teach the counter. [3.4](../docs/03-react-basics/optional-vite-project.mdx) holds the standalone scaffold and proxy examples. |
| 4. MobX | Observer, collection ownership, limits, removal, total, direct editing, inspection, URL and storage | Local lessons 4.13–4.14 complete the sequence. [4.13](../docs/04-mobx/13-edit-value.mdx) now checks a signed decimal and clearing the field. The controlled input still requires a separate draft to support intermediate invalid text. |
| 5. ShippingBoard | View state, deep links, ramp and loading cards, assignments, status and dialog occupancy | Steps 5.5–5.15 retain the pinned checkout, cumulative edits, build command and expected results. The difference in status priority between the mini fixture and the original project is explicit in 5.13. |
| 6. Tests | Configuration, assertions, boundaries, coverage, DOM and end-to-end tests | The three embedded exercises cover the single-value store. The [local continuation](../docs/06-tests/optional-testing.mdx) includes invalid input and collection removal. |
| 7. Fetch | Base URL, response fields, await, promise chains and dependent initialization | Steps 7.6–7.11 use their own archived project. Its constructors, initialization order, temporary type errors and failure check remain in the lessons. |
| 8. UI5 | New project, provider, button, icon, emphasis, progress, chart, wizard and dialog | [8.4](../docs/08-ui5/optional-ui5.mdx) had lost the direct routes to the optional controls and its copyable project setup. Restored the component links, linked the fresh scaffold in 3.4 and added a reproducible React 18.3.1 starting point. |

## Verification

- Compared every page with its pre-edit version. All 66 paths, frontmatter blocks, 155 Markdown headings, 22 explicit span anchors, 34 exercise mounts and existing Markdown link destinations were preserved. All 85 fenced examples retained their original contents. The UI5 install block gained the prerequisite checkout and install commands.
- On the 66 pages, whitespace-delimited body words decreased from 15,548 to 14,647. This count excludes frontmatter, fenced samples and link destinations. The changes affect 25 pages.
- Confirmed the chapter 3 solution tag exists on the remote. Installed its frozen lockfile and the five UI5 packages in an isolated export, then built it with the provider and button from lesson 8.1. Checked the four linked component IDs against the UI5 React v2 Storybook index.
- The course tests, TypeScript check and production site build passed. The build contained the expected 23 page-specific diagrams and alt texts. A new course test covers the 17 original-project steps: each must have a navigation entry, a worked example and a populated result-check section. Semantic correctness still requires comparison with the lesson and its source.
- This was a text and source audit. Interactive steps were not replayed end to end. Existing chapter audits in this directory document earlier checks of the exercise implementations.
