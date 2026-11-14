---
sidebar_position: 50
---

# 5. ShippingBoard Lite

Compose a small board from the fixed loading and ramp fixtures. React state holds view/filter choices; visible rows and ramp status are derived from the records. Each mini-lesson carries the previous solution forward.

The examples isolate view and ramp concepts from the [original ShippingBoard Lite project](https://github.com/adam-zielonka/shippingboard-lite) without its backend or older UI dependencies. The fixture is intentionally local: it does not implement persistence, editing assignments, or a production shipping system.

## Lessons

1. [Switch between board views](./05-shippingboard/01-view-switching.mdx) — Connect view selection to two presentations of the same data.
2. [Filter loading status](./05-shippingboard/02-status-filter.mdx) — Derive visible rows from a controlled status selector.
3. [Group loadings by ramp](./05-shippingboard/03-ramp-groups.mdx) — Render each ramp with its matching visible assignments.
4. [Explain empty ramps and ramp status](./05-shippingboard/04-empty-and-status.mdx) — Distinguish an available ramp from a filter with no matches.

Work in order. Each lesson has its own starter, focused editor, and preview. The previous solution forms the next starter within the chapter; your saved edits remain scoped to the lesson where you made them.

## Official references

[React rendering lists](https://react.dev/learn/rendering-lists), [conditional rendering](https://react.dev/learn/conditional-rendering), [choosing state structure](https://react.dev/learn/choosing-the-state-structure).
