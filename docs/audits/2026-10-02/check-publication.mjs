import { spawnSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';

const results = [];
for (const framework of ['vue', 'solid']) {
  const entry = `./packages/${framework}/dist/index.js`;
  const probe = spawnSync(process.execPath, ['--conditions=browser', '--input-type=module', '-e',
    `try { await import(${JSON.stringify(entry)}); console.log('import OK') } catch(error) { console.error(error.toString()); process.exitCode = 1 }`],
  { cwd: new URL('../../../', import.meta.url), encoding: 'utf8', timeout: 60000 });
  results.push({ framework, entry, status: probe.status, stdout: probe.stdout.trim(), stderr: probe.stderr.trim(), error: probe.error?.message });
}
await writeFile(new URL('publication-checks.json', import.meta.url), JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
