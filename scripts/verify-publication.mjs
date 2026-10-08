import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";

for (const framework of ["react", "vue", "solid"]) {
  const result = spawnSync(
    process.execPath,
    [
      "--conditions=browser",
      "--input-type=module",
      "-e",
      `const api = await import('./packages/${framework}/dist/index.js'); if (!Object.keys(api).length) throw Error('Empty API'); process.exit(0);`,
    ],
    { encoding: "utf8", timeout: 60000 },
  );
  assert.equal(
    result.status,
    0,
    `${framework} 发布入口无法导入：${result.stderr || result.error}`,
  );
}
for (const name of await readdir("packages/svelte/src/components")) {
  if (name.endsWith(".d.ts") || name.endsWith(".svelte")) {
    await access(`packages/svelte/dist/components/${name}`);
  }
}
for (const framework of ["react", "vue", "solid", "svelte"]) {
  const manifest = JSON.parse(
    await readFile(`packages/${framework}/package.json`, "utf8"),
  );
  for (const entry of [manifest.main, manifest.types])
    await access(`packages/${framework}/${entry}`);
  for (const target of Object.values(manifest.exports["./editors"] ?? {}))
    await access(`packages/${framework}/${target}`);
}
console.log("发布入口、Svelte 声明与清单文件验证通过");
