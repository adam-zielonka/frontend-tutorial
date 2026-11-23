# 4. MobX in React

Build the original [counter app](https://github.com/adam-zielonka/mobx-example): start with one visible value, give it state, then manage a collection and keep it between visits. The diagram connects the same ideas: a button calls an action, the model changes, and an observing React component updates its display. Computed values derive the total and remaining capacity.

## Lessons

1. [Build the counter layout](./04-mobx/01-counter-layout.mdx).
2. [Make the counter interactive](./04-mobx/02-local-state.mdx).
3. [Create an observable counter store](./04-mobx/03-observable-store.mdx).
4. [Subscribe React with observer](./04-mobx/04-react-observer.mdx).
5. [Manage multiple counters](./04-mobx/05-counter-collection.mdx).
6. [Derive capacity and the total](./04-mobx/06-computed-capacity.mdx).
7. [Remove a counter safely](./04-mobx/07-counter-removal.mdx).
8. [Serialize and validate counter values](./04-mobx/08-url-state.mdx).
9. [Restore counters from a URL](./04-mobx/09-restore-url.mdx).
10. [Synchronize the URL and dispose the reaction](./04-mobx/10-url-reaction.mdx).
11. [Restore a storage snapshot as fallback](./04-mobx/09-persistence.mdx).
12. [Save snapshots and clean up both effects](./04-mobx/12-storage-autorun.mdx).
13. [Edit a value directly](./04-mobx/13-edit-value.mdx) — local guided continuation.
14. [Inspect the model](./04-mobx/14-inspect-model.mdx) — debugger and original-project comparison.

Steps 4.1–4.12 use separate browser drafts. Continue locally in 4.13–4.14. See [course help](./course-help) for editor, preview and local setup.

[Observable state](https://mobx.js.org/observable-state.html) · [Actions](https://mobx.js.org/actions.html) · [React integration](https://mobx.js.org/react-integration.html) · [Computed values](https://mobx.js.org/computeds.html) · [Reactions](https://mobx.js.org/reactions.html)
