// Compatibility entry point: validation now follows the actual production exporter.
import {execFileSync} from 'node:child_process';
import {lessons, validateLessons} from '../scripts/course-project.mjs';
validateLessons();
console.log(`Validated ${lessons.length} step lessons`);
if (process.argv.includes('--build')) {
  execFileSync(process.execPath, [new URL('../scripts/check-course.mjs', import.meta.url).pathname], {stdio: 'inherit'});
}
