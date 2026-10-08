import assert from "node:assert/strict";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { gunzipSync } from "node:zlib";

const folder = resolve(".artifacts/releases/packages");
await mkdir(folder, { recursive: true });
const report = [];
function tarFiles(buffer) {
  const files = new Map();
  for (let offset = 0; offset + 512 <= buffer.length;) {
    const header = buffer.subarray(offset, offset + 512);
    const text = (start, length) =>
      header
        .subarray(start, start + length)
        .toString()
        .replace(/\0.*$/s, "");
    const name = text(0, 100),
      prefix = text(345, 155),
      size = parseInt(text(124, 12).trim() || "0", 8);
    if (!name) break;
    assert.ok(Number.isFinite(size), "无效 tar 大小");
    if (text(156, 1) === "0" || text(156, 1) === "")
      files.set(
        prefix ? `${prefix}/${name}` : name,
        buffer.subarray(offset + 512, offset + 512 + size),
      );
    offset += 512 + Math.ceil(size / 512) * 512;
  }
  return files;
}
for (const packageName of (await readdir("packages")).sort()) {
  const manifest = JSON.parse(
    await readFile(`packages/${packageName}/package.json`, "utf8"),
  );
  assert.match(manifest.version, /^\d+\.\d+\.\d+(?:-[\w.-]+)?$/);
  execFileSync(
    "pnpm",
    ["--dir", `packages/${packageName}`, "pack", "--pack-destination", folder],
    { stdio: "pipe" },
  );
  const tarball = resolve(
    folder,
    `${manifest.name.replace(/^@/, "").replace("/", "-")}-${manifest.version}.tgz`,
  );
  const compressed = await readFile(tarball);
  const files = tarFiles(gunzipSync(compressed));
  const packed = JSON.parse(files.get("package/package.json").toString());
  assert.equal(packed.license, "MIT");
  assert.ok(
    files.get("package/LICENSE")?.length,
    `${manifest.name} 缺少 LICENSE`,
  );
  assert.ok(
    ![...files.keys()].some((path) =>
      /(?:node_modules|\.artifacts|storybook-static|test-results|\.tsbuildinfo|\/src\/)/.test(
        path,
      ),
    ),
    `${manifest.name} 包含过程文件`,
  );
  for (const [dependency, version] of Object.entries(
    packed.dependencies ?? {},
  )) {
    assert.ok(
      !version.startsWith("workspace:"),
      `${dependency} 未替换工作区版本`,
    );
    if (dependency.startsWith("@loongark/"))
      assert.equal(
        version,
        manifest.version,
        `${dependency} 必须与本次版本保持一致`,
      );
  }
  const checkTargets = (entry) => {
    if (typeof entry === "string")
      assert.ok(
        files.has(`package/${entry.replace(/^\.\//, "")}`),
        `${manifest.name} 未打包 ${entry}`,
      );
    else if (entry && typeof entry === "object")
      Object.values(entry).forEach(checkTargets);
  };
  Object.values(packed.exports).forEach(checkTargets);
  report.push({
    name: manifest.name,
    version: manifest.version,
    tarball,
    files: files.size,
    compressedBytes: compressed.length,
    unpackedBytes: [...files.values()].reduce(
      (size, file) => size + file.length,
      0,
    ),
    exports: packed.exports,
  });
}
assert.equal(
  new Set(report.map((entry) => entry.version)).size,
  1,
  "工作区包版本必须同步",
);
await writeFile(
  resolve(folder, "report.json"),
  JSON.stringify(report, null, 2) + "\n",
);
console.log(
  `发布演练通过：${report.length} 个实际 tarball，版本/许可/工作区依赖/全部条件入口完整；未发布、未打标签。`,
);
