---
sidebar_position: 10
---

# 1. Explain the tool set

Node.js runs development tools on your computer; TypeScript checks the model; React renders it; Vite serves and builds the exported app. The browser runs transformed JavaScript. The lesson projects use React 18.3.1 and their own pinned dependencies; the documentation website has a separate toolchain.

Use Node 24 when working locally and check it with `node --version`. In the browser you can begin immediately: each small step opens the needed file beside a live preview.

## How the tools fit together

[Node.js](https://nodejs.org/en/) runs JavaScript outside the browser, including development tools. Node's [release schedule](https://nodejs.org/en/about/previous-releases) distinguishes Current from longer-supported LTS releases. Projects can require different versions; a version manager such as [nodenv](https://github.com/nodenv/nodenv) can select a project version via `.node-version`. Check the active version with `node --version`; these exports use Node 24. The original tutorial also discussed pnpm's Node management; current pnpm uses [`pnpm runtime`](https://pnpm.io/cli/runtime), while the old `pnpm env` command is deprecated.

A package manager downloads project dependencies from a registry and records versions in a lockfile. npm, Yarn and pnpm are alternatives. [pnpm's shared store](https://pnpm.io/motivation) can save disk space between projects. Install from the supplied lockfile rather than upgrading dependencies as part of this course.

[Vite](https://vite.dev/guide/) provides a development server with fast updates and builds assets for production. [TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html) adds types to JavaScript: they help editors offer completion and catch misspelled properties or incompatible values before runtime, but require learning and do not validate arbitrary runtime data automatically. [React](https://react.dev/learn) describes the interface as components. [MobX](https://mobx.js.org/README.html) manages observable state, which we explore later. Tools change over time; surveys such as [State of JavaScript](https://stateofjs.com/) offer context rather than a prescription.

## Lessons

1. [Describe a shipment with types](./01-tool-set/01-shipment-shape.mdx) — Add a required priority to the shipment model and display it.
2. [Derive the manifest summary](./01-tool-set/02-derived-summary.mdx) — Calculate summary values from the typed records.

Work in order. Each lesson has its own starter, focused editor, and preview. The previous solution forms the next starter within the chapter; your saved edits remain scoped to the lesson where you made them.

## Official references

[Node.js](https://nodejs.org/en/download), [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/intro.html), [React learning](https://react.dev/learn), [Vite guide](https://vite.dev/guide/).

## A first local installation check

You can skip installation while using the embedded lessons. When you want a local copy, install Node.js 24 using the [Node download instructions](https://nodejs.org/en/download) or your chosen version manager, and Git using the [Git installation guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). Open a new terminal and run:

```sh
node --version
git --version
```

The first command should report `v24.x.x`. If a command is not found, finish its installation and reopen the terminal; editing React code cannot fix a missing tool. The lesson's clone instructions use pnpm and the supplied lockfile. Install the pinned pnpm version through the npm installation supplied with a standard Node installer:

```sh
npm install -g pnpm@12.14.0
pnpm --version
```

If you installed pnpm standalone, [its runtime manager](https://pnpm.io/cli/runtime) can supply Node. For a separate project, `pnpm runtime set node 24` records a project runtime; follow its printed shim instructions if you want the bare `node` command to select it. pnpm-managed Node does not include npm; the course's pnpm commands work without it. Avoid mixing version managers without checking which `node` your terminal actually selects. The exported README also offers npm commands for learners who choose that package manager. See [pnpm installation](https://pnpm.io/installation).

## Optional: why pnpm supports dependency patches

Sometimes an installed library needs a small correction before its author publishes a release. Editing its installed files directly is temporary: a fresh install can lose the change. pnpm can record the difference and apply it on later installs. No course dependency needs a patch; this recovers the original tutorial's explanation of the tool's purpose.

For a separate project with an installed dependency, the workflow is:

1. Run `pnpm patch package-name@installed-version`, replacing those placeholders with the actual package and version.
2. Edit the copy in the directory printed by the command.
3. Run `pnpm patch-commit` with that directory path. Review the resulting patch, manifest and lockfile changes, and commit them together after testing.

The patch is a maintained exception, not a substitute for upgrading to an upstream fix. Read [pnpm patch](https://pnpm.io/cli/patch) and [patch-commit](https://pnpm.io/cli/patch-commit) before using this optional workflow.
