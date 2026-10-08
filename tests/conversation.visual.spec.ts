import { test, expect } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`conversation ${mode} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(
        `/iframe.html?id=compositions-conversation--basic&globals=mode:${mode}`,
      );
      await expect(
        page.locator("[data-scope=questionnaire][data-part=root]"),
      ).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("body")).toHaveScreenshot(
        `conversation-${mode}-${width}.png`,
        { animations: "disabled" },
      );
    });
