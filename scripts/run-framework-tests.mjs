import { spawn } from "node:child_process";
const child = spawn(
  process.execPath,
  [
    "scripts/run-playwright.mjs",
    "tests/browser-environment.spec.ts",
    "tests/framework-consumers.spec.ts",
    "tests/framework-examples.spec.ts",
    "tests/date-input-paste.spec.ts",
    "tests/data-table-complex-editors.spec.ts",
    "tests/data-table-batch.spec.ts",
    "tests/data-table-query.spec.ts",
    "tests/data-table-columns.spec.ts",
    "tests/data-table-structure.spec.ts",
    "tests/data-table-range.spec.ts",
    "tests/editors.spec.ts",
    "tests/virtualization.spec.ts",
    "tests/chart-interaction.spec.ts",
    "tests/chart-types.spec.ts",
    "tests/questionnaire-types.spec.ts",
    "tests/questionnaire-matrix.spec.ts",
    "tests/async-collection.spec.ts",
    `--project=${process.env.BROWSER_PROJECT ?? "chromium"}`,
    "--workers=2",
  ],
  {
    stdio: "inherit",
    env: { ...process.env, STATIC_DIR: "tests/consumer-dist", PORT: "6007" },
    windowsHide: true,
  },
);
child.on("exit", (code) => {
  process.exitCode = code ?? 1;
});
