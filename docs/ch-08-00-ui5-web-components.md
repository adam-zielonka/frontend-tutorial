---
sidebar_position: 80
---

# 8. UI5 Web Components for React

A shipment has room for ten pallets. Give someone a button to load one, then show how full the shipment is after each click. At ten, the button should stop accepting more. You’ll build this screen with buttons, icons and a progress indicator from UI5. Each exercise opens `App.tsx` beside the preview.

In the first exercise, wrap the controls in one `ThemeProvider` inside `App`. The starter leaves this to you. If you follow the examples locally, use the versions pinned in the exercise. The React wrapper (`@ui5/webcomponents-react`) and its four UI5 packages (`@ui5/webcomponents`, `@ui5/webcomponents-base`, `@ui5/webcomponents-fiori`, `@ui5/webcomponents-icons`) all use 2.15.0. The course website manages its own dependencies.

## Lessons

1. [Add a UI5 provider and button](./08-ui5/01-provider-and-button.mdx) — Compose a UI5 React component inside its provider.
2. [Wire actions and register icons](./08-ui5/02-events-and-icons.mdx) — Update React state from UI5 buttons with registered icons.
3. [Show progress and enforce capacity](./08-ui5/03-progress-and-capacity.mdx) — Derive a percentage and keep loading bounded at ten pallets.

For drafts and local setup, see [course help](./course-help.mdx).

## Official references

[UI5 Web Components for React](https://ui5.github.io/webcomponents-react/), [UI5 first steps](https://ui5.github.io/webcomponents/docs/getting-started/first-steps/), [using icons](https://ui5.github.io/webcomponents/docs/advanced/using-icons/).

[Optional continuation: explore more UI5 controls](./08-ui5/optional-ui5.mdx).
