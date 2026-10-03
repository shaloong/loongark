import { spawn } from "node:child_process";
const child = spawn(
  process.execPath,
  [
    "scripts/run-playwright.mjs",
    "tests/framework-consumers.spec.ts",
    "tests/framework-examples.spec.ts",
    "--project=chromium",
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
