# 1.1. Explain the Tool Set

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

TODO

## [Vite.js](https://vitejs.dev/) - Frontend Tool

TODO
