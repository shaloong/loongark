import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import ts from "typescript";

// 发布构建必须保留真实 React 运行时模块的 RSC 边界，不能仅检查源码字符串。
async function checkReactBoundaries(folder) {
  let count = 0;
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const path = `${folder}/${entry.name}`;
    if (entry.isDirectory()) {
      count += await checkReactBoundaries(path);
    } else if (entry.name.endsWith(".js")) {
      const source = ts.createSourceFile(
        path,
        await readFile(path, "utf8"),
        ts.ScriptTarget.Latest,
        true,
      );
      const usesReact = source.statements.some(
        (statement) =>
          ts.isImportDeclaration(statement) &&
          ts.isStringLiteral(statement.moduleSpecifier) &&
          statement.moduleSpecifier.text === "react",
      );
      if (!usesReact) continue;
      const first = source.statements[0];
      assert.ok(
        first &&
          ts.isExpressionStatement(first) &&
          ts.isStringLiteral(first.expression) &&
          first.expression.text === "use client",
        `${path} 丢失客户端边界`,
      );
      count++;
    }
  }
  return count;
}
assert.ok((await checkReactBoundaries("packages/react/dist")) > 0);

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
  for (const entry of Object.values(manifest.exports))
    for (const target of typeof entry === "string"
      ? [entry]
      : Object.values(entry))
      await access(`packages/${framework}/${target}`);
}
console.log("发布入口、Svelte 声明与清单文件验证通过");
