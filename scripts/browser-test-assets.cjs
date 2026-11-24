const path = require('node:path');
const {fileURLToPath} = require('node:url');
const {readFileSync} = require('node:fs');
const {buildSync} = require('esbuild');
const {zipSync, strToU8} = require('fflate');
const {projectFiles, lockfileFor} = require('./course-project.mjs');

// StackBlitz's POST API accepts text files. Submit the same checkpoint as the ZIP
// from the newly opened tab, including when the published Git tag is older.
function onlineEditorPage(lesson, variant, files) {
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const fields = {
    'project[title]': `${lesson.title} — ${variant}`,
    'project[description]': lesson.objective,
    'project[template]': 'node',
    ...Object.fromEntries(Object.entries(files).map(([name, code]) => [`project[files][${name}]`, code])),
  };
  const inputs = Object.entries(fields).map(([name, value]) =>
    `<input type="hidden" name="${escape(name)}" value="${escape(value)}">`);
  const file = encodeURIComponent('src' + lesson.activeFile);
  return `<!doctype html><html lang="en"><meta charset="utf-8"><title>Open in StackBlitz</title>
<form method="post" action="https://stackblitz.com/run?file=${file}">
${inputs.join('\n')}
<button>Open in StackBlitz</button></form><script>document.forms[0].submit()</script></html>`;
}

function emitAssets(compilation, RawSource) {
  const entry = path.resolve(__dirname, '../src/lib/browser-tests/worker.mjs');
  const bundle = buildSync({
    entryPoints: [entry], bundle: true, minify: true, write: false,
    metafile: true, define: {'process.env.NODE_ENV': '"production"'},
  });
  for (const input of Object.keys(bundle.metafile.inputs)) {
    compilation.fileDependencies.add(path.resolve(input));
  }
  compilation.emitAsset('course/tests/worker.js', new RawSource(bundle.outputFiles[0].text), {minimized: true});

  const chapter = path.resolve(__dirname, '../course/chapters/06-tests.json');
  compilation.fileDependencies.add(chapter);
  for (const lesson of JSON.parse(readFileSync(chapter, 'utf8'))) {
    const lock = fileURLToPath(lockfileFor(lesson));
    compilation.fileDependencies.add(lock);
    for (const variant of ['start', 'solution']) {
      const files = projectFiles(lesson, variant);
      files['pnpm-lock.yaml'] = readFileSync(lock, 'utf8');
      files['README.md'] = `# ${lesson.title}\n\n${lesson.objective}\n\nRun pnpm install --frozen-lockfile, then pnpm test:run. Use pnpm dev to open the counter app. To import your browser edits, run node import-draft.mjs ./your-download.json first.\n`;
      const output = `course/tests/${lesson.id}-${variant}`;
      compilation.emitAsset(`${output}.html`, new RawSource(onlineEditorPage(lesson, variant, files)));
      const entries = Object.entries(files).map(([name, code]) => [name, strToU8(code)]);
      const zip = zipSync(Object.fromEntries(entries));
      compilation.emitAsset(`${output}.zip`, new RawSource(Buffer.from(zip)));
    }
  }
}

module.exports = () => ({
  name: 'browser-test-assets',
  configureWebpack(_config, isServer) {
    if (isServer) return {};
    const plugin = {
      apply(compiler) {
        compiler.hooks.thisCompilation.tap('browser-test-assets', compilation => {
          compilation.hooks.processAssets.tap('browser-test-assets', () => {
            emitAssets(compilation, compiler.webpack.sources.RawSource);
          });
        });
      },
    };
    return {plugins: [plugin]};
  },
});
