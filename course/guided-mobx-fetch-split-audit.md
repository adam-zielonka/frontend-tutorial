# MobX and Fetch: focused lesson split

Coverage baseline: `30e83a2:docs/ch-04-00-mobx-and-react.md` and
`30e83a2:docs/ch-07-00-fetch.md`. The existing guided edition supplies the
corrected runtime examples. The local Svelte tutorial's short explanation →
named-file edit → immediate result pattern informed the rewrite.

## Coverage and IDs

| Previously taught material | Current location |
| --- | --- |
| Counter markup, original appearance/screenshots, React local state | 4.1–4.2 |
| Classes/instances, observable state/actions, binding, stable ownership | 4.3 |
| React subscription and render-time reads | 4.4 |
| Parent/child stores, adding, stable keys | 4.5 |
| Four-counter capacity, computed sum, guarded action | 4.6 |
| Removal, surviving identity, recovered capacity and empty lists | 4.7 |
| Semicolon serialization and atomic finite-value validation | 4.8 |
| URL restoration, absent versus intentionally empty values | 4.9 |
| URL reaction, current URL/history preservation and disposal | 4.10 |
| URL priority and guarded numeric JSON storage fallback | 4.11 |
| Immediate autorun writer, failure fallback and dual cleanup | 4.12 |
| Original value input, controlled-input caveat and model inspection | Supplemental local pages 4.13–4.14 |
| Original source/demo, styles, collection/deletion checkpoints | 4.1 and 4.13–4.14 |
| Request, asynchronous JSON parse and preview path adapter | 7.1 |
| HTTP status versus network failure | 7.2 |
| JSON parse versus runtime structure validation | 7.3 |
| Per-effect cancellation, stale-result guards and cleanup order | 7.4 |
| Same-URL retries, loading/error reset, fresh effect run | 7.5 |
| Original workspace, immutable API base URL, response types | Supplemental original-project pages 7.6–7.7 |
| Original customer await and ramp promise chain, model conversion | 7.8–7.9 |
| Ordered dependency initialization and asynchronous MobX actions | 7.10 |
| Loading/error UI, observer and failed-request experiment | 7.11 |

Old → new embedded IDs:

- `04-01-counter-layout` through `04-07-counter-removal`: unchanged.
- `04-08-url-state` → retained for serialization/validation, followed by
  `04-09-restore-url` and `04-10-url-reaction`.
- `04-09-persistence` → `04-11-persistence`, followed by
  `04-12-storage-autorun`.
- `07-01-request`: unchanged.
- `07-02-http-and-data-errors` → retained for HTTP, followed by
  `07-03-validate-data`.
- `07-03-abort-cleanup` → `07-04-abort-cleanup`.
- `07-04-retry` → `07-05-retry`.

Renumbering is required by the existing sequential-ID validator. Every manifest
entry has a matching LessonExercise embed; existing document filenames/URLs are
retained, with new pages linked in lesson order. Supplemental pages explicitly
use local projects and have no embedded runtime or manifest entry.

## Continuity and contracts

Every Fetch solution exactly equals the next starter. MobX has exact transitions
1→2, 8→9, 9→10 and 11→12. Its necessary new scaffolds are explained once where
introduced: model/temporary bridge (3), direct reads without the bridge (4),
collection and IDs (5), derived-value UI/limit (6), removal UI (7), import/share
UI and initially inert browser helpers (8), persistence connector (11).

Both final solution file maps are byte-for-byte equal to the previous edition.
Original styles and dependencies are preserved. The new intermediate maps
separate previously combined edits, with explicit focusFiles. Arithmetic still
checks finite inputs/results. Hydration validates the complete bounded payload
before replacement; URL writes preserve other parameters, hash and history state.
URL restoration precedes both writers. Valid URLs (including empty values) win
over storage. Blocked or full storage leaves counters usable. Both subscriptions
are disposed. Fetch retains signal propagation, no fallback after abort, active
result guards and the existing user-retry effect contract.

The archived Fetch migration intentionally has a temporary compiler error after
changing each API return type in 7.8–7.9. Those checks explicitly identify the
old synchronous caller; 7.10 fixes it with awaited arrays and runInAction. Static
JSON imports are removed only when their corresponding method is replaced.

## Scoped verification

- Existing validateLessons accepted the chapter sources combined in memory with
  the unchanged other chapters. The assembled manifest was not written.
- All 17 embedded lessons' starters and solutions type-check and build: 34
  isolated Vite exports using the existing dependency locks. The final edited
  4.2 starter was checked again after making continuity exact.
- 290 runtime assertions cover finite arithmetic, invalid/oversized/empty atomic
  hydration, URL/history preservation and disposal, storage priority and
  malformed/blocked storage, dual cleanup, HTTP-before-parse checks, invalid
  data/JSON/network errors, path fallback and abort propagation.
- All 27 affected MD/MDX pages compile; TypeScript/JavaScript fences have titles.
  Local links resolve except the planned shared `course-help` page.

- Applied the literal supplemental snippets to an isolated export of the final
  MobX solution: 4.13 (input/style extension) and 4.14 (typed shared debug store)
  both type-check and build.
- Applied the literal archived Fetch snippets to an isolated git archive of
  `bdd5494f80b7b78080e5d5dc479405a614458579`, with its frozen historical
  dependency installation. 7.7 builds; 7.8 and 7.9 produce the documented
  promise/array diagnostics; 7.10 and the final 7.11 both type-check and build.
- `git diff --check` passes. No browser or full-site integration checks were run.

## Parent integration

Assemble the manifest, release v5 checkpoints and advance the draft revision.
The current generated manifest, immutable checkpoints and draft keys deliberately
remain untouched here. Until assembly, the new embed IDs are not in the website's
runtime manifest.

Provide `docs/course-help` at the planned `/course-help` URL. Supplemental pages
are linked from overviews and their preceding pages; the current custom sidebar
only lists manifest-backed lessons, so include supplemental pages there if the
integrated course menu/Previous–Next navigation should list them too. They must
not be added as runtime lessons without starter/solution maps. Parent owns the
full-site build, integrated tests and preview/release.
