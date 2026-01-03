import { defineConfig, devices } from "@playwright/test";

const storybookUrl = process.env.STORYBOOK_URL ?? "http://127.0.0.1:6006";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  expect: {
    timeout: 5_000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
    },
  },
  fullyParallel: true,
  use: {
    baseURL: storybookUrl,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      testIgnore: ["**/*.visual.spec.ts"],
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "chromium-visual",
      testMatch: ["**/*.visual.spec.ts"],
      use: {
        ...devices["Desktop Chrome"],
        colorScheme: "light",
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
  webServer: {
    command: "pnpm storybook --ci",
    url: storybookUrl,
    reuseExistingServer: !process.env.CI,
    stdout: "pipe",
    stderr: "pipe",
  },
});
