# MobX guided chapter coverage

Baseline: `30e83a2:docs/ch-04-00-mobx-and-react.md`.

| Original section | Guided location |
| --- | --- |
| Setup, component, styling and screenshots | Overview environment; 4.1 layout and original styles/source links |
| Local state, store and makeAutoObservable | 4.2–4.3 |
| React observer | 4.4 |
| Global store and adding | 4.5; overview checkpoint links |
| Limit, delete and sum | 4.6–4.7; overview removal checkpoint |
| Value input and console | Overview optional continuation |
| URL reaction and localStorage autorun | 4.8–4.9 |
| Summary, source and demo | Overview references |

Corrections: add accumulates rather than replaces; the negative button uses a negative delta; stable IDs replace index keys; invalid input is rejected before state replacement; persistence retains unrelated URL parts, restores before writing and disposes subscriptions. Input replacement and debugging use the local app's ownership rather than assuming the original singleton. The original static screenshots remain in the repository; the walkthrough describes the supplied styled preview and links the original styles.

Verification: compared original sections and v3 chapter starter/solution file maps; checked MobX observable state, React integration, computed and reaction documentation, React state and browser URL/storage documentation. See commit validation for MDX build/check results.

Integration review added the class/instance/action explanation, complete small constructor/action examples, and concrete URL-reaction and storage-writer snippets with ownership/cleanup explanations. Lesson fixtures and v3 tags remain unchanged.
