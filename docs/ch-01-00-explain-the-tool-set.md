# 1. Explain the Tool Set

```mdx-code-block
import LessonExercise from '@site/src/components/LessonExercise';
```

<LessonExercise id="01-tool-set" />

## Goals

Identify the tools used in this course and explain where each runs.

## The tools

- **Node.js** runs development tools on your computer; it is not required in the visitor's browser. Use Node 24 for this course and check it with `node --version`.
- **npm** installs packages and runs scripts. It comes with Node; check `npm --version`. pnpm is an optional alternative, but use one package manager consistently in a project.
- **Vite** serves the application during development and builds production assets.
- **TypeScript** adds static types to JavaScript; the browser runs the transformed JavaScript.
- **React** describes the interface as components. **MobX** manages shared observable state.

## Practical steps

Install Node 24, open a terminal, and check both versions. In the next chapters you will create a separate Vite sandbox with React 18.3.1. It has its own dependencies and lockfile: the tutorial website itself uses Docusaurus and may use different versions of React and other packages. Do not change the website's dependencies to follow sandbox instructions.

## Official references

[Node.js downloads](https://nodejs.org/en/download), [npm documentation](https://docs.npmjs.com/), [Vite guide](https://vite.dev/guide/), [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/intro.html), [React learning](https://react.dev/learn), [MobX introduction](https://mobx.js.org/README.html).
