# 2. Tools around development

```mdx-code-block
import LessonExercise from '@site/src/components/LessonExercise';
```

<LessonExercise id="02-development-tools" />

## Goals

Prepare a terminal, Git, and an editor; use browser developer tools to inspect an application.

## Practical steps

1. Install Node 24 and Git on Windows, macOS, or Linux. On Windows, a regular terminal or Windows Subsystem for Linux works; keep your project and tools in the same environment.
2. Open a terminal and run `node --version`, `npm --version`, and `git --version`. Install an editor such as VS Code and open your project folder.
3. Use `pwd` (or `cd` in Windows Command Prompt) to check your location. Use `cd` to move between folders. Stop a running development server with Ctrl+C.
4. Open browser developer tools. The Console shows errors; Elements lets you inspect HTML and CSS; Network shows requests and responses. Reload the page with Network open to see requests from startup.
5. Use `git status` to inspect changes. Commit your own sandbox work when a working step is complete; avoid committing dependencies or secrets.

## Official references

[Git documentation](https://git-scm.com/doc), [VS Code setup](https://code.visualstudio.com/docs/setup/setup-overview), [Chrome DevTools](https://developer.chrome.com/docs/devtools/overview), [Node.js downloads](https://nodejs.org/en/download).
