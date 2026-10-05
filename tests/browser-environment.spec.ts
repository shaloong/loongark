import { test, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

test("记录真实浏览器，禁止把 Chromium 或 WebKit 标记为 Firefox 或原生 Safari", async ({
  browser,
  page,
}, testInfo) => {
  const name = browser.browserType().name();
  expect(name).toBe(testInfo.project.name);
  await page.goto("about:blank");
  const report = {
    commit: process.env.GITHUB_SHA,
    platform: process.platform,
    project: testInfo.project.name,
    browser: name,
    version: browser.version(),
    userAgent: await page.evaluate(() => navigator.userAgent),
    realDevice: false,
    nativeSafari: false,
    scope: process.env.STATIC_DIR ? "frameworks" : "storybook",
  };
  await mkdir(".artifacts/browser-environment", { recursive: true });
  await writeFile(
    `.artifacts/browser-environment/${name}-${report.scope}.json`,
    JSON.stringify(report, null, 2),
  );
});
