---
sidebar_position: 20
---

# 2. Tools around development

Prepare an editor, a terminal, Git, and browser developer tools. The first practice changes a typed checklist model; it cannot change your real editor settings or run terminal commands. Each lesson identifies the matching local workflow.

Keep your project and tools in the same operating-system environment. Check `node --version` and `git --version`; use Node 24 for exported projects. Use one package manager consistently.

## Lessons

1. [Configure editor and type checks](./02-development-tools/01-editor-and-types.mdx) — Distinguish a typed practice model from real editor and compiler settings.
2. [Use scripts and a Git checkpoint](./02-development-tools/02-scripts-and-git.mdx) — Finish the script model, then practice a real local tool workflow.

Work in order. Each lesson has its own starter, focused editor, and preview. The previous solution forms the next starter within the chapter; your saved edits remain scoped to the lesson where you made them.

## Official references

[Git documentation](https://git-scm.com/doc), [VS Code setup](https://code.visualstudio.com/docs/setup/setup-overview), [TypeScript configuration](https://www.typescriptlang.org/tsconfig/), [Chrome DevTools](https://developer.chrome.com/docs/devtools/overview).

## A comfortable local environment

Windows, macOS and Linux can all run the tools. On Windows, [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) provides a Linux environment; keep the project, Node and terminal tools together inside that environment. Windows Terminal is one terminal option. Native Windows is also possible; Developer Mode can help when a tool needs permission to create symbolic links. On macOS, case-only file renames can be missed on case-insensitive filesystems: use an intermediate name with `git mv`, then inspect `git status`, especially before building on Linux. Linux also commonly runs CI and servers.

A terminal runs commands in a working directory. VS Code has an integrated terminal; shells such as zsh, prompts such as Starship and a compatible Nerd Font are optional personal choices, not course requirements. In VS Code, open the project folder, use the file explorer to find `src/App.tsx`, and use the terminal to run project commands. Extensions can add formatting and language support; choose one that supports your files.

Git keeps local snapshots of tracked files. `git status` shows changes, `git diff` shows edits to tracked files, and a commit records the staged snapshot. A remote can back up or share commits, but a local commit alone does not upload them. The second lesson walks through a checkpoint; the [Git book](https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F) explains the model in more detail.
