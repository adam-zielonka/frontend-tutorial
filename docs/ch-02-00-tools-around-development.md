---
sidebar_position: 20
---

# 2. Tools around development

Suppose you give a field the wrong type, then save the file. Can your editor point out the mistake? Could you get back to the last working version? In this chapter you’ll use TypeScript to spot mistakes, project scripts to run checks, and Git to save your work.

The browser exercise gives you a practice checklist. Changing a value there updates what you see in the preview. Each lesson also shows where the corresponding setting or command belongs on your own computer.

## Lessons

1. [Configure editor and type checks](./02-development-tools/01-editor-and-types.mdx) — Distinguish a typed practice model from real editor and compiler settings.
2. [Use scripts and a Git checkpoint](./02-development-tools/02-scripts-and-git.mdx) — Finish the script model, then practice a real local tool workflow.

For drafts and local setup, see [course help](./course-help.mdx).

## Official references

[Git documentation](https://git-scm.com/doc), [VS Code setup](https://code.visualstudio.com/docs/setup/setup-overview), [TypeScript configuration](https://www.typescriptlang.org/tsconfig/), [Chrome DevTools](https://developer.chrome.com/docs/devtools/overview).

## A comfortable local environment

Open the project folder in VS Code. In the file explorer, find `src/App.tsx`. Now open the integrated terminal. Its *working directory* is the folder where your commands run. Run `node --version` and `git --version` there to check that both tools are available. Use Node 24 and the same package manager throughout an exported project. Browser developer tools let you inspect the page while it runs.

Choose the notes for your operating system:

- **Windows.** You can use a native terminal or run Linux through [WSL](https://learn.microsoft.com/en-us/windows/wsl/install). If you choose WSL, keep the project files, Node and the terminal together inside WSL. Windows Terminal can open either kind of shell. In a native Windows project, Developer Mode can help when a tool needs permission to create symbolic links.
- **macOS.** On a case-insensitive filesystem, Git can miss a rename such as `card.tsx` to `Card.tsx`. Use `git mv` to give the file a temporary name and then its final name. Check `git status` before building on Linux, where the case matters.
- **Linux.** You can use the same environment for local development that many projects use on their servers and for automated checks.

VS Code extensions can add formatting or language support for your files. You can also personalise the terminal with a shell such as zsh, a prompt such as Starship, or a compatible Nerd Font.

Git keeps local snapshots of tracked files. `git status` shows changes, `git diff` shows edits to tracked files, and a commit records the staged snapshot. A remote can back up or share commits, but a local commit alone does not upload them. The second lesson walks through a checkpoint; the [Git book](https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F) explains the model in more detail.
