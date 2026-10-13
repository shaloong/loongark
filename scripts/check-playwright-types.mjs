import { spawnSync } from "node:child_process";
import {
  assertPlaywrightTypeCoverage,
  playwrightConfigs,
} from "./playwright-type-coverage.mjs";

console.log(`${assertPlaywrightTypeCoverage()} 个测试与共享源码已纳入类型检查`);

// 每个框架独立解析 JSX 与发布声明；任一检查失败立即停止。
for (const config of playwrightConfigs) {
  const result = spawnSync(
    process.execPath,
    ["node_modules/typescript/bin/tsc", "-p", config],
    {
      stdio: "inherit",
      windowsHide: true,
    },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
  console.log(`${config}: 类型检查通过`);
}
const svelte = spawnSync(
  process.execPath,
  [
    "node_modules/svelte-check/bin/svelte-check",
    "--tsconfig",
    "tsconfig.playwright.svelte.json",
  ],
  {
    stdio: "inherit",
    windowsHide: true,
  },
);
if (svelte.error) throw svelte.error;
process.exit(svelte.status ?? 1);
