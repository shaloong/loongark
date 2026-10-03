import { test, expect } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`Chart ${mode} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(
        `/iframe.html?id=compositions-chart-overview--basic&globals=mode:${mode}`,
      );
      await expect(page.locator("[data-scope=chart]").first()).toBeVisible();
      await expect(page.locator("body")).toHaveScreenshot(
        `chart-${mode}-${width}.png`,
        { animations: "disabled" },
      );
    });
