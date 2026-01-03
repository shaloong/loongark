import { rm } from "node:fs/promises";
import { resolve } from "node:path";

const packages = [
  "tokens",
  "theme",
  "primitives",
  "kit",
  "vue",
  "react",
  "svelte",
  "cli",
];

await Promise.all(
  packages.map(async (pkg) => {
    const dir = resolve("packages", pkg, "dist");
    await rm(dir, { force: true, recursive: true });
  })
);
