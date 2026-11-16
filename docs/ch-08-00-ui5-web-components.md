---
sidebar_position: 80
---

# 8. UI5 Web Components for React

Compose UI5 components, add stateful actions with registered icons, then derive progress and enforce capacity. Each step opens `App.tsx` and preserves the previous solution.

The exercises pin `@ui5/webcomponents-react`, `@ui5/webcomponents`, `@ui5/webcomponents-base`, `@ui5/webcomponents-fiori`, and `@ui5/webcomponents-icons` to 2.15.0. These dependencies belong to the lesson project, separately from the website. A single `ThemeProvider` lives inside `App`; the generated entry does not add another one.

## Lessons

1. [Add a UI5 provider and button](./08-ui5/01-provider-and-button.mdx) — Compose a UI5 React component inside its provider.
2. [Wire actions and register icons](./08-ui5/02-events-and-icons.mdx) — Update React state from UI5 buttons with registered icons.
3. [Show progress and enforce capacity](./08-ui5/03-progress-and-capacity.mdx) — Derive a percentage and keep loading bounded at ten pallets.

In a local export, editor `/App.tsx` is `src/App.tsx`; other editor paths likewise live under `src` unless identified as public files. Work in order. Each lesson has its own starter, focused editor, and preview. The previous solution forms the next starter within the chapter; your saved edits remain scoped to the lesson where you made them.

## Official references

[UI5 Web Components for React](https://ui5.github.io/webcomponents-react/), [UI5 first steps](https://ui5.github.io/webcomponents/docs/getting-started/first-steps/), [using icons](https://ui5.github.io/webcomponents/docs/advanced/using-icons/).

## Optional continuation: a new project and other controls

The original chapter began with a new Vite React TypeScript project. In a separate project created with [Vite's React TypeScript template](https://vite.dev/guide/), install matching UI5 packages, import a `ThemeProvider` and wrap the app once. In these exports dependencies are already pinned and editor `/App.tsx` corresponds to local `src/App.tsx`; do not add a second provider in the entry file.

The original also explored button design: on a UI5 `Button`, try `design="Emphasized"` alongside a registered icon and a text label. Compare it to the default to see how visual emphasis changes. Beyond the exercise, explore the versioned [UI5 React v2 component documentation](https://ui5.github.io/webcomponents-react/v2/) for a chart, a wizard and a dialog. For a dialog, first decide which action opens it, keep its open state in React, and provide an explicit close action; check keyboard focus as well as the visible result. A wizard organizes a sequence of steps, while a chart summarizes data; neither replaces a labelled progress indicator for this single shipment.
