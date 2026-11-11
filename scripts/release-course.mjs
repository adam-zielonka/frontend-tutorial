// Generate an independent Git history without switching or modifying the working tree.
import {execFileSync} from 'node:child_process';
import {mkdtempSync, readFileSync, rmSync} from 'node:fs';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {lessons, validateLessons, projectFiles, tagFor, branch} from './course-project.mjs';
validateLessons();
const git = (args, options = {}) => execFileSync('git', args, {encoding: 'utf8', ...options}).trim();
const exists = ref => {try {git(['show-ref', '--verify', '--quiet', ref]); return true;} catch {return false;}};
const refs = [`refs/heads/${branch}`, ...lessons.flatMap(l => ['start', 'solution'].map(v => `refs/tags/${tagFor(l.id, v)}`))];
for (const ref of refs) if (exists(ref)) throw Error(`Ref already exists; never rewrite a released checkpoint: ${ref}`);
const directory = mkdtempSync(path.join(tmpdir(), 'course-index-'));
const env = {...process.env, GIT_INDEX_FILE: path.join(directory, 'index')};
let parent;
const updates = [];
try {
  for (const lesson of lessons) for (const variant of ['start', 'solution']) {
    const files = projectFiles(lesson, variant);
    files['pnpm-lock.yaml'] = readFileSync(new URL(`../course/locks/${lesson.id}.yaml`, import.meta.url), 'utf8');
    files['LICENSE'] = readFileSync(new URL('../LICENSE', import.meta.url), 'utf8');
    git(['read-tree', '--empty'], {env});
    const index = Object.entries(files).map(([name, content]) => `100644 ${git(['hash-object', '-w', '--stdin'], {input: content})}\t${name}\n`).join('');
    git(['update-index', '--index-info'], {env, input: index});
    const tree = git(['write-tree'], {env});
    const tag = tagFor(lesson.id, variant);
    const commit = git(['commit-tree', tree, ...(parent ? ['-p', parent] : []), '-m', `${lesson.title}: ${variant} (${tag})`]);
    // Annotated tags record the actual teaching checkpoint, not the website commit.
    const identity = git(['var', 'GIT_COMMITTER_IDENT']);
    const tagObject = git(['mktag'], {input: `object ${commit}\ntype commit\ntag ${tag}\ntagger ${identity}\n\n${lesson.title} — ${variant}\n`});
    updates.push(`create refs/tags/${tag} ${tagObject}`);
    parent = commit;
    console.log(`${tag} ${commit}`);
  }
  updates.push(`create refs/heads/${branch} ${parent}`);
  git(['update-ref', '--stdin'], {input: `start\n${updates.join('\n')}\nprepare\ncommit\n`});
  console.log(`Created ${branch} and 16 annotated tags locally. Push these exact refs after validation.`);
} finally {rmSync(directory, {recursive: true, force: true});}
