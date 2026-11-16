---
sidebar_position: 10
---

# 1. Explain the tool set

Node.js runs development tools on your computer; TypeScript checks the model; React renders it; Vite serves and builds the exported app. The browser runs transformed JavaScript. The lesson projects use React 18.3.1 and their own pinned dependencies; the documentation website has a separate toolchain.

Use Node 24 when working locally and check it with `node --version`. In the browser you can begin immediately: each small step opens the needed file beside a live preview.

## Lessons

1. [Describe a shipment with types](./01-tool-set/01-shipment-shape.mdx) — Add a required priority to the shipment model and display it.
2. [Derive the manifest summary](./01-tool-set/02-derived-summary.mdx) — Calculate summary values from the typed records.

Work in order. Each lesson has its own starter, focused editor, and preview. The previous solution forms the next starter within the chapter; your saved edits remain scoped to the lesson where you made them.

## Official references

[Node.js](https://nodejs.org/en/download), [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/intro.html), [React learning](https://react.dev/learn), [Vite guide](https://vite.dev/guide/).

## How the tools fit together

[Node.js](https://nodejs.org/en/) runs JavaScript outside the browser, including development tools. Node's [release schedule](https://nodejs.org/en/about/previous-releases) distinguishes Current from longer-supported LTS releases. Projects can require different versions; a version manager such as [nodenv](https://github.com/nodenv/nodenv) can select a project version via `.node-version`. Check the active version with `node --version`; these exports use Node 24. The original tutorial also discussed pnpm's Node management; consult the [current pnpm documentation](https://pnpm.io/cli/env) before configuring it.

A package manager downloads project dependencies from a registry and records versions in a lockfile. npm, Yarn and pnpm are alternatives. [pnpm's shared store](https://pnpm.io/motivation) can save disk space between projects. Install from the supplied lockfile rather than upgrading dependencies as part of this course.

[Vite](https://vite.dev/guide/) provides a development server with fast updates and builds assets for production. [TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html) adds types to JavaScript: they help editors offer completion and catch misspelled properties or incompatible values before runtime, but require learning and do not validate arbitrary runtime data automatically. [React](https://react.dev/learn) describes the interface as components. [MobX](https://mobx.js.org/README.html) manages observable state, which we explore later. Tools change over time; surveys such as [State of JavaScript](https://stateofjs.com/) offer context rather than a prescription.
