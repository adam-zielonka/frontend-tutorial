---
sidebar_position: 80
---

# 8. UI5 Web Components for React

A shipment has room for ten pallets. Give someone a button to load one, then show how full the shipment is after each click. At ten, the button should stop accepting more. You’ll build this screen with buttons, icons and a progress indicator from UI5. Each exercise opens `App.tsx` beside the preview.

In the first exercise, wrap the controls in one `ThemeProvider` inside `App`. The starter leaves this to you. The exercises use React 18.3.1, the UI5 React wrapper 2.20.1 and the four matching UI5 packages 2.20.5. The published checkpoint records its own package versions in its lockfile.

## Lessons

1. [Add a UI5 provider and button](./08-ui5/01-provider-and-button.mdx) — Compose a UI5 React component inside its provider.
2. [Wire actions and register icons](./08-ui5/02-events-and-icons.mdx) — Update React state from UI5 buttons with registered icons.
3. [Show progress and enforce capacity](./08-ui5/03-progress-and-capacity.mdx) — Derive a percentage and keep loading bounded at ten pallets.

For drafts and local setup, see [course help](./course-help.mdx).

## Official references

[UI5 Web Components for React](https://ui5.github.io/webcomponents-react/), [UI5 first steps](https://ui5.github.io/webcomponents/docs/getting-started/first-steps/), [using icons](https://ui5.github.io/webcomponents/docs/advanced/using-icons/).

[Optional continuation: explore more UI5 controls](./08-ui5/optional-ui5.mdx).
