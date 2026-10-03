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
  "solid",
  "cli",
];

await Promise.all(
  packages.flatMap((pkg) => {
    const dir = resolve("packages", pkg, "dist");
    const buildInfo = resolve("packages", pkg, "tsconfig.tsbuildinfo");

    return [
      rm(dir, { force: true, recursive: true }),
      rm(buildInfo, { force: true }),
    ];
  }),
);

await Promise.all(
  ["examples", "stories"].map((project) =>
    rm(resolve(project, "tsconfig.tsbuildinfo"), { force: true }),
  ),
);

await Promise.all(
  ["storybook-static", "test-results", "playwright-report", "blob-report"].map(
    (dir) => rm(resolve(dir), { force: true, recursive: true }),
  ),
);
