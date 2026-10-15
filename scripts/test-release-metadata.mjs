import assert from "node:assert/strict";
import { mkdir, mkdtemp, readdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const parent = resolve(".artifacts/releases/package-name-tests");
await mkdir(parent, { recursive: true });
const root = await mkdtemp(resolve(parent, "invalid-"));
try {
  await mkdir(resolve(root, "packages/cli"), { recursive: true });
  for (const name of ["@loongark/cli", "@shaloong/cli"]) {
    await writeFile(
      resolve(root, "packages/cli/package.json"),
      JSON.stringify({ name, version: "1.0.0" }),
    );
    const result = spawnSync(
      process.execPath,
      [fileURLToPath(new URL("./check-release.mjs", import.meta.url))],
      { cwd: root, encoding: "utf8", timeout: 10000 },
    );
    assert.equal(result.error, undefined);
    assert.notEqual(result.status, 0, `${name} 不应进入发布产物`);
    assert.match(result.stderr, /发布包名必须使用 @shaloong\/loongark-\*/);
    assert.deepEqual(
      await readdir(resolve(root, ".artifacts/releases/packages")),
      [],
      "错误包名必须在生成任何 tarball 前停止",
    );
  }
  const repository = {
    type: "git",
    url: "git+https://github.com/shaloong/loongark.git",
    directory: "packages/cli",
  };
  for (const invalid of [
    undefined,
    repository.url,
    { ...repository, url: "git+https://github.com/other/loongark.git" },
    { ...repository, directory: "packages/react" },
  ]) {
    await writeFile(
      resolve(root, "packages/cli/package.json"),
      JSON.stringify({ name: "@shaloong/loongark-cli", version: "1.0.0", repository: invalid }),
    );
    const result = spawnSync(
      process.execPath,
      [fileURLToPath(new URL("./check-release.mjs", import.meta.url))],
      { cwd: root, encoding: "utf8", timeout: 10000 },
    );
    assert.equal(result.error, undefined);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /repository 必须指向当前仓库及包目录/);
    assert.deepEqual(await readdir(resolve(root, ".artifacts/releases/packages")), []);
  }
  console.log("发布元数据回归通过：错误包名及缺失或错误的 provenance 仓库信息均在打包前拒绝。");
} finally {
  await rm(root, { recursive: true, force: true });
}
