# 1. Explain the Tool Set

You should know some things about tools that are used during this training, but you should also be aware that this Tool Set can be valid in 2023, and probably will be working in future, there are some big possibilities that new tools arrive and change how we work. You should keep eye on [State of JavaScript](https://stateofjs.com/en-us/), to see which tools are on a top.

## [Node.js](https://nodejs.org/en/) - Engine for tools

Let's start with node.js. From the project [website](https://nodejs.org/en/):

> Node.js® is an open-source, cross-platform JavaScript runtime environment.

Most tools (that we will be use) to build web apps are created in JS, and Node.js is a runtime to run this tools. It isn't the best runtime, but it is the most popular. We have some alternatives like [deno](https://deno.land/) or [bun](https://bun.sh/), but the tools that we use, didn't migrate to them.

How to start with node.js? You can just go to main page of project [nodejs.org](https://nodejs.org/en/) and download one of the version: LTS or Current. Current is the latest release with all new features and you should choose this version if you planning use them. LTS provide longer time for support and good for project that need to survive more than year.

But you shouldn't install node form this website. When you start working of one project it is not a problem, but if you working new ones and support old ones, you will have trouble, because older projects won't be able to work on newer version of node.

There is solution: Node version management tool. I used [nodenv](https://github.com/nodenv/nodenv), it is light, work pretty fast, and what I need to do with all my project it is to add file `.node-version` with version number as a value. `nodenv install` and version for this project will be downloaded. But for newest project I use `pnpm` as package manager (I explain this later) that also provider functionality for node version management, in very simpler way, only needing to be added property [`use-node-version`](https://pnpm.io/npmrc#use-node-version) to `.npmrc` we don't need to do anything else. `pnpm` take care to download proper version in the background.

Of course if you starting from scratch and you want generate some project, you can setup global version of node using `nodenv global 18.12.1` or [`pnpm env use --global 18.12.1`](https://pnpm.io/cli/env) that will be used in that cases.

## [PNPM](https://pnpm.io/) - Package manager

The big advantage of JS development is [`npm`](https://www.npmjs.com/) registry, that contain very large amount of code packages, that you can easily use in your project. That's what package managers are for. The default one is [`npm`](https://www.npmjs.com/package/npm), it's stable and working, but have some problems with `node_modules` like for each project can exist the same set of libraries (and some of this problem are under development). But second amazing thing around JS world are alternatives like: [`yarn`](https://yarnpkg.com/) and [`pnpm`](https://pnpm.io/).

For newest project I use [`pnpm`](https://pnpm.io/), because solve problems of `node_modules` (you can read more in [pnpm motivation](https://pnpm.io/motivation)), but also add some features that help during development, like: [managing Node.js versions](https://pnpm.io/npmrc#use-node-version), [patching dependencies](https://pnpm.io/cli/patch).


:::note

If you decided to stay on Windows with environment, you should remember to enable in `Settings` => `Privacy & security` => `For developers` => `Developer mode`. `pnpm` relay on symlinks, that are disable in normal mode for not admin terminal. 

:::

## [Vite](https://vitejs.dev/) - Frontend Tool

And the last kind of tools that you need to know is frontend tool such as [Vite](https://vitejs.dev/). This tool allow you to serve your code during development, and bundle js, css and other assets together for production. You can learn more from video [Vite in 100 Seconds](https://www.youtube.com/watch?v=KCrXgy8qtjM)

## [TypeScript](https://www.typescriptlang.org/) - Language

> `TypeScript` is `JavaScript` with syntax for types.

When I started working at my team we the first fronted projects was done in `JavaScript` and at first we didn't see problems that show up in next years, that `TypeScript` show you this errors during development. 

- Fancy code - Strange coding that isn't self explaining. Using `TS` you can describe all fancy code that you can write in `JS`, but when is difficult to type something, the red flag in your mind should appear and code should be rewritten.
- What I have in that place - something you need display new information, and we don't know if that info already is in that place and debugging is needed to add small info.
- Typos - There were some missing info because the field in an class have different name.
- Auto complete in `JS` more like guessing - in `TS` is real.

But all this features have a cost: you need to learn how to type, for beginning development in `TS` will be much slower (in my case I typed to much).

## [React](https://react.dev/) - for building user interfaces

> The library for web and native user interfaces

## [MobX](https://mobx.js.org/) - for state management

> Simple, scalable state management.
