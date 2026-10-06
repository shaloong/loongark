import { expect, test } from "@playwright/test";
for (const story of [
  "stacked-area",
  "donut",
  "scatter",
  "time-axis",
  "log-axis",
])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`chart ${story} ${mode} ${width}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(
          `/iframe.html?id=components-chart--${story}&globals=mode:${mode}`,
        );
        await expect(page.locator('svg[role="img"]')).toBeVisible();
        await page.evaluate(() => document.fonts.ready);
        await expect(page.locator("body")).toHaveScreenshot(
          `chart-${story}-${mode}-${width}.png`,
          { animations: "disabled" },
        );
      });
