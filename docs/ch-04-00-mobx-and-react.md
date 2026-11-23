# 4. MobX in React

Click **+1** on one counter. Its value changes, and the total for the whole page should change with it. You’ll build up to that interaction in the [counter app](https://github.com/adam-zielonka/mobx-example), starting with one number on screen.

The button calls an *action* to change a value in the model. A React component that observes that value can then show the new count. Once you have several counters, the model can *compute* their total and the number of slots left. Finally, you’ll make it possible to close the page and come back to the same collection.

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

Steps 4.1–4.12 each have a separate browser draft, so edits in one step do not carry into the next. Continue locally in 4.13–4.14. See [course help](./course-help) for editor, preview and local setup.

[Observable state](https://mobx.js.org/observable-state.html) · [Actions](https://mobx.js.org/actions.html) · [React integration](https://mobx.js.org/react-integration.html) · [Computed values](https://mobx.js.org/computeds.html) · [Reactions](https://mobx.js.org/reactions.html)
