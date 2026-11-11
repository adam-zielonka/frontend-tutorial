# Development

Use Node.js 24.22+ (24–26) and pnpm 12. The repository pins the verified package manager and runtime.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm audit --audit-level=high
```

Pull requests run validation without deploying. Pages deployment is restricted to
the default branch. Dependabot checks compatible updates weekly; major updates
are reviewed separately.

## Interactive course

Edit `course/chapters/*.json` and run `pnpm course:assemble`. The website and downloadable projects share the generated `course/lessons.json`. Each step mounts
`LessonExercise` with a stable ID. The editor and preview open automatically, keep drafts per step
in localStorage, and shows solutions without overwriting drafts. Sandpack runs in a
CodeSandbox iframe and needs network access. Its TypeScript preview transpiles code;
Vite's local `build` also type-checks. Lesson 6 uses Vitest in a real terminal; the
embedded preview provides a separate, explicitly labelled browser check.

```sh
pnpm test          # manifest, exports, draft recovery and downloaded-file imports
pnpm typecheck
pnpm course:check  # install, type-check and build all step projects; run solution tests
pnpm build
```

Fixtures and teaching-project dependencies are separate from the documentation site.
Dependency profiles share pnpm lockfiles in `course/locks/v2`. After deliberately changing
project dependencies, run `node scripts/check-course.mjs --update-locks`, then review
and commit the updated lockfiles. Students may also use npm; pnpm with the supplied
lockfile provides the reproducible install.

### Publishing course checkpoints

`pnpm course:release` creates the independent branch `course-examples-v2` and two annotated
tags per step named `lesson-<id>-start-v2` and `lesson-<id>-solution-v2`. It uses Git objects and
an isolated index, without switching the website checkout. Each tag contains a complete
Vite app at its root. The branch history follows all ordered step start/solution pairs; its tip
is the final solution, and its README links every checkpoint.

Run the validation commands first. Push the explicit branch and the generated step tag
refs before publishing the website, so student links resolve. Do not use `git push --tags`
(it could publish unrelated local tags). The release command refuses to overwrite any
existing checkpoint. For later editions, update the version in `scripts/course-project.mjs`
and `src/lib/course.ts` together; preserve previous tags for enrolled students.

Editor downloads contain JSON file maps. The generated projects include
`npm run import-draft -- ./download.json` to apply the matching lesson's files locally.
The importer validates the lesson and allowlists filenames before writing.

Integration references: [Sandpack](https://sandpack.codesandbox.io/docs/getting-started/usage),
[Sandpack static files](https://sandpack.codesandbox.io/docs/advanced-usage/serving-static-files),
[StackBlitz Git refs](https://developer.stackblitz.com/guides/integration/open-from-github).
