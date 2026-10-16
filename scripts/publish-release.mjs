import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  loadRelease,
  planPublication,
  publishMissing,
} from "./release-registry.mjs";

const targets = await loadRelease(
  ".artifacts/verified-release",
  process.env.RELEASE_VERSION,
);
const plan = await planPublication(targets);
await publishMissing(plan, (file) => {
  const result = spawnSync(
    "npm",
    ["publish", file, "--access", "public", "--provenance"],
    { stdio: "inherit" },
  );
  assert.equal(result.error, undefined);
  assert.equal(
    result.status,
    0,
    "npm 发布未完成；先核实 registry，使用相同验收产物重跑会跳过内容一致的已有版本",
  );
});
