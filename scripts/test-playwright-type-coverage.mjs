import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { assertPlaywrightTypeCoverage } from "./playwright-type-coverage.mjs";

const root = mkdtempSync(join(tmpdir(), "loongark-playwright-coverage-"));
try {
  mkdirSync(join(root, "tests/consumers"), { recursive: true });
  const write = (path, source) => writeFileSync(join(root, path), source);
  write("tests/consumers/helper.ts", "export const value = 1;");
  write(
    "tests/main.ts",
    "import { value } from './consumers/helper'; export { value };",
  );
  write("tests/consumers/View.svelte", "<p>真实组件</p>");
  const config = "tsconfig.playwright.svelte.json";
  write(
    config,
    JSON.stringify({
      compilerOptions: { noEmit: true, types: [] },
      include: ["tests/main.ts", "tests/consumers/*.svelte"],
    }),
  );
  assert.equal(
    assertPlaywrightTypeCoverage(root, [config]),
    3,
    "被入口导入的辅助模块与独立 Svelte 编译单元均被覆盖",
  );
  for (const extension of ["ts", "tsx", "mts", "cts", "svelte"]) {
    const file = `tests/missing.${extension}`;
    write(file, "");
    assert.throws(
      () => assertPlaywrightTypeCoverage(root, [config]),
      (error) => error instanceof Error && error.message.includes(file),
      `${extension} 源码被配置排除时必须阻断验收`,
    );
    rmSync(join(root, file));
  }
  write(
    "tsconfig.json",
    JSON.stringify({
      compilerOptions: { noEmit: true, types: [] },
      include: ["tests/**/*"],
    }),
  );
  assert.throws(
    () => assertPlaywrightTypeCoverage(root, ["tsconfig.json"]),
    /View\.svelte/,
    "普通 tsc 配置不能冒充 Svelte 编译覆盖",
  );
  write(config, "{");
  assert.throws(
    () => assertPlaywrightTypeCoverage(root, [config]),
    "配置解析失败不能作为已覆盖",
  );
  console.log(
    "Playwright 类型覆盖：导入辅助模块、Svelte、漏检与无效配置回归通过",
  );
} finally {
  rmSync(root, { recursive: true, force: true });
}
