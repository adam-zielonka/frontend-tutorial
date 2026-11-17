export interface ProjectConfig {
  editor: string;
  versionControl: 'git';
  formatOnSave: boolean;
  strict: boolean;
  scripts: { dev: string; typecheck: string };
}

// This is a typed practice model, not the sandbox's actual tool configuration.
export const project: ProjectConfig = {
  editor: 'VS Code',
  versionControl: 'git',
  formatOnSave: true,
  strict: true,
  scripts: {
    dev: 'vite', // TODO: expose the dev server with --host 0.0.0.0.
    typecheck: '', // TODO: add tsc --noEmit.
  },
};
