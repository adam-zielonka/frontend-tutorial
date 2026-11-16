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

Verification: compared all four baseline section headings and examples with the linked locations; compared walkthroughs with the v3 starter and solution file maps; Docusaurus production build and `git diff --check` passed. Consulted React effects, MDN Fetch and URLSearchParams, MobX reactions, Vitest v3 guide/environment, and UI5 React v2.15.0 ProgressIndicator source. The original-project continuations explain integration concepts but have not been run against the old checkpoints.
