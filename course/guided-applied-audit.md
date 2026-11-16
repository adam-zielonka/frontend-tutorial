# Applied chapters: guided coverage

Baseline: `30e83a2`, four chapter documents. Current exercise sources: `course/chapters/05-shippingboard.json` through `08-ui5.json`.

| Original sections | Location now |
| --- | --- |
| ShippingBoard workspace, view store, buttons, conditional view | Chapter 5 overview and steps 1–2; original MobX continuation |
| URL parameters | Chapter 5 original continuation |
| RampBox, LoadingBox, model assignments, details click and status/quantity | Chapter 5 steps 3–4 and original continuation |
| Test setup/configuration, tests, running, exercises, coverage, end-to-end | Chapter 6 overview, steps 1–3 and UI/end-to-end continuation |
| Fetch workspace, base URL, response types, await, then, store initialization | Chapter 7 overview, steps 1–4 and original API continuation |
| UI5 project, dependencies, provider, button, icons/design, chart/progress/wizard/dialog | Chapter 8 overview, steps 1–3 and continuation |

Corrections: HTTP failures are surfaced rather than silently mapped to an empty list; runtime data validation is distinct from a TypeScript assertion. Mini ramp status intentionally uses a different priority from the original. Store tests use Node; browser emulation is optional for UI tests. UI5 and Vitest references target the pinned major/version.

Verification: compared all four baseline section headings and examples with the linked locations; compared walkthroughs with the v3 starter and solution file maps; Docusaurus production build and `git diff --check` passed. Consulted React effects, MDN Fetch and URLSearchParams, MobX reactions, Vitest v3 guide/environment, and UI5 React v2.15.0 ProgressIndicator source. The initial integration summaries were expanded into concrete continuations; see the verification below and the separate ShippingBoard continuation audit.


## Integration verification

- Added literal code examples for view switching, the first tests, abort cleanup, retry and the UI5 provider; checked all 30 lesson pages have a visible worked example before their editor and self-checks after it.
- Corrected checks that asked learners to edit read-only `data.ts`/`public/ramps.json`: optional fixture edits are explicitly local; the required data-validation experiment runs in editable `api.ts`.
- Documented the actual JSON download → clone → import → Vitest workflow rather than implying a download is a runnable project.
- Restored invalid-number and collection-capacity/removal tests using the completed v3 MobX project. Both example tests passed in its exported project.
- Expanded Fetch into a complete typed/validated customer and ramp API, async store initialization with `runInAction`, and visible loading/error states. Applied the exact documentation snippets to an isolated copy of original `create-fetch` commit `bdd5494f80b7b78080e5d5dc479405a614458579`. Its frozen pnpm 7.33.7 installation and `tsc && vite build` passed on Node 24. The documented install command now matches that verification.
- Separately exercised the published Fetch snippets for successful mapping, HTTP errors, invalid data, invalid JSON, network rejection, and dependency initialization order. All passed. These checks use mocked requests, not browser rendering.
- Integrated the worked ShippingBoard continuation; its separate audit records nine intermediate typechecks, the final build, and fixture/URL runtime assertions.
- Final integration: all seven course tests, site TypeScript checking and the production build passed. Checked all 30 rendered and locally served preview pages for visible teaching before the workspace, checks after it, contents menus, and concrete JSON import commands. This checks generated/served HTML, not interactive browser execution.
- Compared every lesson manifest with the previous v3 source: executable file maps, dependency versions, styles, IDs and focus files are unchanged. Four task descriptions now match the guided instructions; the immutable published code tags and browser drafts remain valid.
