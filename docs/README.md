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

Read the explanation, make the changes in the named editor file, and check the result. Hints and a read-only solution are available when you need them. On a phone, switch between **Lesson**, **Code**, and **Preview**; the testing chapter also has **Run tests** for actual test results.

Each step starts from a prepared checkpoint, while your own draft stays in its lesson. For saving, importing, refresh behavior, and local work, see [course help](./course-help.mdx). The [course examples](https://github.com/adam-zielonka/frontend-tutorial/tree/course-examples-v4) contain the tagged starters and solutions.

## Why we teach this stack

This tutorial began as a way to share how our team at ZF builds applications with colleagues and students. Our applications support factory work on computers, tablets, and scanner devices. On the backend, we use SAP ERP and ABAP services; different frontend projects use Angular, React, or UI5.

There is no single frontend technology for every problem. This course focuses on the combination of [React](https://react.dev/) and [MobX](https://mobx.js.org/README.html), then shows how it fits into a practical development workflow. The small, self-contained examples let you study that workflow without needing access to a company system.

## Development

See [DEVELOPMENT.md](https://github.com/adam-zielonka/frontend-tutorial/blob/main/DEVELOPMENT.md) for the website's runtime, builds, checks, and checkpoint publishing.
