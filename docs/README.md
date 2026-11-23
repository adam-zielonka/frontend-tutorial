# Frontend tutorial

import ResumeLesson from '@site/src/components/LessonStudio/ResumeLesson';

Imagine a truck arriving at a loading bay. Someone clicks **Add pallet** as each pallet goes on board. How does the number on screen keep up? You’ll start by describing a shipment, build a pallet counter like this, then use React and MobX to track work across several ramps.

**[Start with chapter 1: Understand the tool set](./ch-01-00-explain-the-tool-set.md).** You can begin in your browser without installing anything.

<ResumeLesson />

## What this course builds

The first examples are small enough to change in your browser. Later you’ll open ShippingBoard Lite, an existing application with a table of loadings. Your job will be to add a dashboard so someone at the warehouse can see what’s happening at each ramp.

1. [Understand the tool set](./ch-01-00-explain-the-tool-set.md) — What happens between editing a TypeScript file and seeing a shipment on screen? Follow one example through Node.js, pnpm, Vite and React, and see where MobX fits.
2. [Prepare your development tools](./ch-02-00-tools-around-development.md) — Set up an editor and terminal, run a project script and save a working change with Git.
3. [Create a React application](./ch-03-00-create-base-for-your-app.md) — Trace how the page loads a React component. Then give a pallet counter buttons that change the number on screen.
4. [Build counters with MobX](./ch-04-00-mobx-and-react.md) — Move the count into a model. Let React follow its changes, add more counters, and restore their values on your next visit.
5. [Extend ShippingBoard Lite](./ch-05-00-shippingboard-lite.md) — Switch between a table and a ramp dashboard. Filter the cards and work out why a ramp can look empty while a truck is loading.
6. [Test the behavior](./ch-06-00-tests.md) — Write tests for questions such as “What happens if I add five pallets when there’s room for only two?” Run each check with a fresh store.
7. [Load data with Fetch](./ch-07-00-fetch.md) — Load ramp records from a file. Check the HTTP response and its contents, cancel an outdated request, and let the user try again after a failure.
8. [Use UI5 components](./ch-08-00-ui5-web-components.md) — Connect a UI5 button to the pallet count and show how full the shipment is with a progress indicator.

## How to work through a lesson

In a browser exercise, read the walkthrough, edit the named file, then look for the result described at the end. If you get stuck, open a hint or compare your file with the read-only **Solution**. Return to **Your code** to keep editing.

On a phone, **Lesson**, **Code** and **Preview** let you switch between the instructions, your file and the running app. In chapter 6, **Tests** takes the place of **Preview**. Choose **Run tests** to check your latest edit.

Each browser exercise opens with the files you need for that step. Your draft stays with the lesson where you wrote it. The longer ShippingBoard projects work differently: you open a separate copy of the project at the start of each sequence, then carry your changes from one step to the next.

See [course help](./course-help.mdx) to download your work or import it locally. The [course examples](https://github.com/adam-zielonka/frontend-tutorial/tree/course-examples-v5) also include the starter and solution for each embedded exercise.

## Why we teach this stack

This tutorial began as a way to share how our team at ZF builds applications with colleagues and students. Our applications support factory work on computers, tablets, and scanner devices. On the backend, we use SAP ERP and ABAP services; different frontend projects use Angular, React, or UI5.

The examples let you practice our [React](https://react.dev/) and [MobX](https://mobx.js.org/README.html) workflow without access to a company system.

## Development

See [DEVELOPMENT.md](https://github.com/adam-zielonka/frontend-tutorial/blob/main/DEVELOPMENT.md) for the website's runtime, builds, checks, and checkpoint publishing.
