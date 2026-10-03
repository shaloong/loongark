import { spawnSync } from "node:child_process";
for (const name of [
  "tokens",
  "theme",
  "primitives",
  "kit",
  "react",
  "vue",
  "solid",
  "svelte",
  "cli",
]) {
  const result = spawnSync(
    process.execPath,
    ["scripts/fix-dist-imports.mjs", `packages/${name}/dist`],
    { stdio: "inherit", windowsHide: true },
  );
  if (result.status) process.exit(result.status);
}
