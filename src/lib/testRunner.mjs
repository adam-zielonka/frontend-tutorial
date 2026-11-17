// This program runs inside the student's isolated StackBlitz Node workspace.
// Only a read-only report is served; execution is triggered by submitted files.
export const testServer = String.raw`import {createServer} from 'node:http';
import {readFileSync, rmSync, watchFile} from 'node:fs';
import {spawn} from 'node:child_process';

const page = readFileSync('results.html');
let state = {status: 'starting', report: null, output: ''};
let child;
let pending = false;
let debounce;
let requested = '';
function requestId() {
  try { return readFileSync('.test-request', 'utf8'); } catch { return ''; }
}
function run() {
  if (child) { pending = true; return; }
  requested = requestId();
  state = {status: 'running', report: null, output: ''};
  rmSync('.test-results.json', {force: true});
  const processRun = spawn(process.execPath, ['node_modules/vitest/vitest.mjs', 'run', '--reporter=json', '--outputFile=.test-results.json'], {
    env: {...process.env, CI: '1', NO_COLOR: '1'}, stdio: ['ignore', 'pipe', 'pipe'],
  });
  child = processRun;
  const capture = chunk => { state.output = (state.output + chunk.toString()).slice(-16000); };
  processRun.stdout.on('data', capture);
  processRun.stderr.on('data', capture);
  const timeout = setTimeout(() => {
    state.output += '\nThe test run exceeded 30 seconds. Check for an endless loop.';
    processRun.kill('SIGKILL');
  }, 30000);
  processRun.on('error', error => { state.output += '\n' + error.message; });
  processRun.on('close', code => {
    clearTimeout(timeout);
    child = undefined;
    try { state.report = JSON.parse(readFileSync('.test-results.json', 'utf8')); } catch {}
    state.status = code === 0 && state.report ? 'complete' : 'failed';
    if (pending || requestId() !== requested) { pending = false; run(); }
  });
}
watchFile('.test-request', {interval: 300}, () => {
  clearTimeout(debounce);
  debounce = setTimeout(run, 100);
});
const server = createServer((req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') { res.writeHead(405); res.end(); return; }
  if (req.url === '/results') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(state));
  } else if (req.url === '/' || req.url === '/index.html') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(page);
  } else { res.writeHead(404); res.end('Not found'); }
});
const port = Number(process.env.COURSE_TEST_PORT || 3000);
server.listen(port, '0.0.0.0', () => { console.log('Test results: http://localhost:' + port); run(); });
process.on('SIGTERM', () => { child?.kill('SIGKILL'); server.close(); process.exit(0); });
`;

export function reportCounts(report) {
  return [['passed', report.numPassedTests || 0, 'passed'],
    ['failed', report.numFailedTests || 0, 'failed'],
    ['pending', (report.numPendingTests || 0) + (report.numTodoTests || 0), 'pending']];
}

export const resultsPage = String.raw`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Vitest results</title><style>
:root {color-scheme:light dark; --bg:#fff;--fg:#20242b;--muted:#526071;--border:#d7dce3;--pass:#136b43;--fail:#b11b35;--pending:#755200}
@media(prefers-color-scheme:dark){:root{--bg:#202228;--fg:#f0f1f5;--muted:#bec6d3;--border:#515967;--pass:#8de5b2;--fail:#ff9aaf;--pending:#f4d38b}}
*{box-sizing:border-box}body{margin:0;padding:1rem;background:var(--bg);color:var(--fg);font:14px/1.55 system-ui,sans-serif}h1{font-size:1rem;margin:0 0 .5rem}#status{color:var(--muted)}#counts{display:flex;flex-wrap:wrap;gap:.4rem 1rem;margin:1rem 0;font-weight:600}ul{list-style:none;padding:0}li{padding:.55rem 0;border-top:1px solid var(--border);overflow-wrap:anywhere}.passed{color:var(--pass)}.failed{color:var(--fail)}.pending{color:var(--pending)}.label{font-weight:600}pre{white-space:pre-wrap;overflow-wrap:anywhere;font:12px/1.5 ui-monospace,monospace}details{margin-top:.5rem}summary{cursor:pointer}summary:focus-visible{outline:2px solid currentColor;outline-offset:3px}
</style></head><body>
<h1>Vitest results</h1><p id="status" role="status">Starting the test runner…</p>
<div id="counts"></div><ul id="cases" aria-label="Test cases"></ul>
<details id="log"><summary>Runner output</summary><pre id="output"></pre></details>
<script>
const $ = id => document.getElementById(id);
let previous = '';
async function update() {
  try {
    const response = await fetch('/results', {cache:'no-store'});
    if (!response.ok) throw new Error('Could not read test results');
    const raw = await response.text();
    const state = JSON.parse(raw), report = state.report;
    // A successful poll restores connection status even when results did not
    // change while the connection was down.
    $('status').textContent = state.status === 'running' ? 'Running your tests…' : state.status === 'complete' ? 'Run finished.' : state.status === 'failed' ? 'Run failed. Read the failing case or runner output.' : 'Starting…';
    if (raw !== previous) {
      previous = raw;
      $('counts').replaceChildren(); $('cases').replaceChildren();
      if (report) {
        for (const [label, value, style] of (${reportCounts.toString()})(report)) {
          const span = document.createElement('span');span.className=style;span.textContent=(value || 0)+' '+label;$('counts').append(span);
        }
        for (const file of report.testResults || []) {
          for (const test of file.assertionResults || []) {
            const li=document.createElement('li'), label=document.createElement('span');
            const status=test.status==='passed'?'passed':test.status==='failed'?'failed':'pending';
            label.className='label '+status;label.textContent=status.toUpperCase()+' · ';li.append(label,document.createTextNode(test.fullName || test.title));
            if (test.failureMessages?.length) {const pre=document.createElement('pre');pre.textContent=test.failureMessages.join('\n');li.append(pre);}
            $('cases').append(li);
          }
          if (file.message) {const pre=document.createElement('pre');pre.textContent=file.message;$('cases').append(pre);}
        }
      }
      $('output').textContent=state.output;
      $('log').open=state.status==='failed' && !report;
    }
  } catch { $('status').textContent='Waiting for the test runner to reconnect…'; }
  setTimeout(update,800);
}
update();
</script></body></html>`;
