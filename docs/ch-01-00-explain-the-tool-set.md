---
sidebar_position: 10
---

# 1. Explain the tool set

Open the first exercise and you’ll see three shipments. Someone looking at the list wants to know which one is urgent. You’ll give each shipment a priority, display it in the list, then work out how many pallets there are and how many shipments are ready.

You can do both exercises in your browser. Each one opens the file you need beside a live preview. If you prefer to work on your computer, the installation steps are further down this page.

## How the tools fit together

Follow one change from the data to the screen. [TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html) lets you declare the allowed priorities. Your editor can then suggest a value or flag a misspelling. [React](https://react.dev/learn) reads that value and displays it in a row. Later, you’ll use [MobX](https://mobx.js.org/README.html) to update the display when data changes. When data comes from an external service, you’ll also need to check it at runtime.

On your computer, [Node.js](https://nodejs.org/en/) runs development tools. The package manager downloads the libraries those tools and your app need. This course uses pnpm. It can [share downloaded packages](https://pnpm.io/motivation) between projects, and the project’s lockfile records which versions to install. npm and Yarn are other package managers.

Once the packages are installed, [Vite](https://vite.dev/guide/) serves the app locally and updates the page as you edit. It can also build files for publication. In both cases the browser runs JavaScript. The exercises use React 18.3.1 and pin their dependencies separately from this course website.

For local exercises, use Node 24. Node’s [release schedule](https://nodejs.org/en/about/previous-releases) shows which releases receive long-term support. If another project needs a different version, a manager such as [nodenv](https://github.com/nodenv/nodenv) can select it from a `.node-version` file. pnpm also offers [`pnpm runtime`](https://pnpm.io/cli/runtime), the successor to its deprecated `pnpm env` command. For a wider view of the tools developers use, see [State of JavaScript](https://stateofjs.com/).

## Lessons

1. [Describe a shipment with types](./01-tool-set/01-shipment-shape.mdx) — Add a required priority to the shipment model and display it.
2. [Derive the manifest summary](./01-tool-set/02-derived-summary.mdx) — Calculate summary values from the typed records.

For drafts and local setup, see [course help](./course-help.mdx).

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

Sometimes an installed library needs a small correction before its author publishes a release. Editing its installed files directly is temporary: a fresh install can lose the change. pnpm can record the difference and apply it on later installs. The course dependencies need no patches.

For a separate project with an installed dependency, the workflow is:

1. Run `pnpm patch package-name@installed-version`, replacing those placeholders with the actual package and version.
2. Edit the copy in the directory printed by the command.
3. Run `pnpm patch-commit` with that directory path. Review the resulting patch, manifest and lockfile changes, and commit them together after testing.

The patch is a maintained exception, not a substitute for upgrading to an upstream fix. Read [pnpm patch](https://pnpm.io/cli/patch) and [patch-commit](https://pnpm.io/cli/patch-commit) before using this optional workflow.
