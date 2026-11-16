# Frontend tutorial

Learn how to build a React interface, give it state with MobX, and develop it with tests and data loading. We will explain each change, show a small example, and then give you a place to try it. The editor is part of the lesson: read the walkthrough before starting the exercise.

**[Start with chapter 1: Understand the tool set](./ch-01-00-explain-the-tool-set.md).** You can begin in your browser without installing anything.

## What this course builds

The course starts with small shipment and pallet examples, then builds the original MobX counter application one step at a time. ShippingBoard introduces a larger business interface. Later chapters isolate testing, loading data, and UI5 components so you can understand each technique before applying it to a larger project.

These are related teaching projects, not one application that changes silently between chapters. Each chapter explains its starting point, and each lesson tells you which code is already supplied.

1. [Understand the tool set](./ch-01-00-explain-the-tool-set.md): distinguish Node.js, the package manager, Vite, TypeScript, React, and MobX. Describe a shipment and derive a summary from it.
2. [Prepare your development tools](./ch-02-00-tools-around-development.md): choose a local environment if you want one, use editor feedback, understand project scripts, and save changes with Git.
3. [Create a React application](./ch-03-00-create-base-for-your-app.md): follow the path from the HTML entry point to a component, then give a pallet counter state and button handlers.
4. [Build counters with MobX](./ch-04-00-mobx-and-react.md): start with a visible counter, move its state into a model, subscribe React, manage a collection, and add persistence.
5. [Extend ShippingBoard Lite](./ch-05-00-shippingboard-lite.md): switch views, filter shipments, group them by ramp, and explain empty states and status.
6. [Test the behavior](./ch-06-00-tests.md): turn expectations into assertions, cover boundaries, and keep tests independent.
7. [Load data with Fetch](./ch-07-00-fetch.md): request data, distinguish network/HTTP/data errors, cancel obsolete requests, and retry deliberately.
8. [Use UI5 components](./ch-08-00-ui5-web-components.md): integrate a component library, handle events and icons, and display capacity with a progress indicator.

Read each chapter introduction before its numbered steps. It connects the small exercises to the original application and explains the local setup and any optional continuations.

## How to work through a lesson

1. **Understand the starting point.** Read what the app already does and the problem this step will solve. A starter may deliberately contain a placeholder or an unconnected button; the lesson explains what to expect before editing.
2. **Follow the walkthrough.** It names the file to edit, shows the relevant lines, and explains why they work. Apply one change at a time rather than replacing everything with a solution.
3. **Try it in the editor.** The editor and live preview start automatically below the explanation. Only the files relevant to this step are editable by default; you can inspect the supporting files too.
4. **Check the result.** Perform the checks beneath the workspace. Predict the outcome first, then compare it with what the preview shows. In the testing chapter, distinguish the manual browser demonstration from Vitest running in a terminal.
5. **Compare and explain.** If you get stuck, open a hint or choose **Compare with the solution**. The solution is read-only and does not replace your work. Return to **Your code**, fix the difference, and explain what the change does before moving on.

Use the page's contents menu to return to a particular explanation. Previous/next links come after the lesson's checks, so you can finish the current idea before starting another.

## What happens when you open the next step?

Each step opens a prepared checkpoint, with the required setup explained in its walkthrough. **Your edits are not automatically copied into the next step.** This lets you continue even if your current experiment is unfinished. Return to the same lesson to find its browser draft.

Drafts are saved separately in this browser. Download your edited files if you want to keep a copy, move to another device, or continue in a local editor. Read the instructions under **Run this step locally or in an online editor** before importing a download: the importer replaces that project's exercise files.

The embedded preview needs internet access to use CodeSandbox. If it cannot start, the lesson's text and code examples are still readable; the local project and StackBlitz links offer another way to work. Do not enter private data into the examples.

## Work locally or online

Every lesson includes commands to clone its exact starter or solution, plus a StackBlitz link. For local development, use Node.js 24 and Git; chapters 1–3 explain the tools and commands. A `git clone --branch lesson-…` command selects a **tagged checkpoint**, so create your own branch with `git switch -c my-work` before committing changes.

In the embedded editor, `/App.tsx` means the virtual project file; in the cloned Vite project it is `src/App.tsx`. The same applies to other lesson source files. Public assets are the exception: they live in the project's `public/` folder.

The current code is on [`course-examples-v3`](https://github.com/adam-zielonka/frontend-tutorial/tree/course-examples-v3), with `lesson-<chapter>-<step>-<name>-start-v3` and matching `solution-v3` tags. Earlier v1 and v2 checkpoints remain available. The explanatory text can improve without changing these code checkpoints or your saved v3 drafts.

## Why we teach this stack

This tutorial began as a way to share how our team at ZF builds applications with colleagues and students. Our applications support factory work on computers, tablets, and scanner devices. On the backend, we use SAP ERP and ABAP services; different frontend projects use Angular, React, or UI5.

There is no single frontend technology for every problem. This course focuses on the combination of [React](https://react.dev/) and [MobX](https://mobx.js.org/README.html), then shows how it fits into a practical development workflow. The small, self-contained examples let you study that workflow without needing access to a company system.

## Development

See [DEVELOPMENT.md](https://github.com/adam-zielonka/frontend-tutorial/blob/main/DEVELOPMENT.md) for the website's runtime, builds, checks, and checkpoint publishing.
