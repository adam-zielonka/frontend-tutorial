# Frontend tutorial

import ResumeLesson from '@site/src/components/LessonStudio/ResumeLesson';

Build a React interface, manage its state with MobX, and test how it handles user actions and data loading.

**[Start with chapter 1: Understand the tool set](./ch-01-00-explain-the-tool-set.md).** You can begin in your browser without installing anything.

<ResumeLesson />

## What this course builds

Start with shipments and pallet counters, then extend ShippingBoard. Each chapter introduces its project, the code already supplied and any local setup.

1. [Understand the tool set](./ch-01-00-explain-the-tool-set.md): distinguish Node.js, the package manager, Vite, TypeScript, React, and MobX. Describe a shipment and derive a summary from it.
2. [Prepare your development tools](./ch-02-00-tools-around-development.md): choose a local environment if you want one, use editor feedback, understand project scripts, and save changes with Git.
3. [Create a React application](./ch-03-00-create-base-for-your-app.md): follow the path from the HTML entry point to a component, then give a pallet counter state and button handlers.
4. [Build counters with MobX](./ch-04-00-mobx-and-react.md): start with a visible counter, move its state into a model, subscribe React, manage a collection, and add persistence.
5. [Extend ShippingBoard Lite](./ch-05-00-shippingboard-lite.md): switch views, filter shipments, group them by ramp, and explain empty states and status.
6. [Test the behavior](./ch-06-00-tests.md): turn expectations into assertions, cover boundaries, and keep tests independent.
7. [Load data with Fetch](./ch-07-00-fetch.md): request data, distinguish network/HTTP/data errors, cancel obsolete requests, and retry deliberately.
8. [Use UI5 components](./ch-08-00-ui5-web-components.md): integrate a component library, handle events and icons, and display capacity with a progress indicator.

## How to work through a lesson

Read the explanation, make the changes in the named editor file, and check the result. Hints and a read-only solution are available when you need them. On a phone, switch between **Lesson**, **Code**, and **Preview**. Chapter 6 uses **Tests** in place of **Preview**; choose **Run tests** after editing.

Each embedded exercise has its own starter and draft. Each original ShippingBoard sequence uses a separate checkout. Keep your edits between steps in that sequence. For saving, importing, refresh behavior, and local work, see [course help](./course-help.mdx). The [course examples](https://github.com/adam-zielonka/frontend-tutorial/tree/course-examples-v5) contain the tagged starters and solutions.

## Why we teach this stack

This tutorial began as a way to share how our team at ZF builds applications with colleagues and students. Our applications support factory work on computers, tablets, and scanner devices. On the backend, we use SAP ERP and ABAP services; different frontend projects use Angular, React, or UI5.

The examples let you practice our [React](https://react.dev/) and [MobX](https://mobx.js.org/README.html) workflow without access to a company system.

## Development

See [DEVELOPMENT.md](https://github.com/adam-zielonka/frontend-tutorial/blob/main/DEVELOPMENT.md) for the website's runtime, builds, checks, and checkpoint publishing.
