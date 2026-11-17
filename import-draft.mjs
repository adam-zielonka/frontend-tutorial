import {readFileSync,writeFileSync} from 'node:fs';
const draft = JSON.parse(readFileSync(process.argv[2], 'utf8'));
if (draft.lesson !== "07-04-retry") throw Error('This download belongs to another lesson');
const allowed = ["/App.tsx","/api.ts","/public/ramps.json","/styles.css"];
for (const name of allowed) {
  if (typeof draft.files?.[name] !== 'string') throw Error('Missing file: ' + name);
}
for (const name of allowed) writeFileSync(name.startsWith('/public/') ? name.slice(1) : 'src' + name, draft.files[name]);
console.log('Imported exercise files. Run npm run dev.');
