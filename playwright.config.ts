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
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : undefined,
    trace:
      process.env.CROSS_BROWSER === "1"
        ? "retain-on-failure"
        : "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    ...(process.env.CROSS_BROWSER === "1"
      ? [
          {
            name: "firefox",
            testIgnore: ["**/*.visual.spec.ts"],
            use: { ...devices["Desktop Firefox"], launchOptions: {} },
          },
          {
            name: "webkit",
            testIgnore: ["**/*.visual.spec.ts"],
            use: { ...devices["Desktop Safari"], launchOptions: {} },
          },
        ]
      : []),
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
});
