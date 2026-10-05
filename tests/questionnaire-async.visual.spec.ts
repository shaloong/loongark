import { test, expect } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    for (const scene of ["async-validation", "long-options"])
      test(`Questionnaire ${scene} ${mode} ${width}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 1100 });
        await page.goto(
          `/iframe.html?id=components-questionnaire--${scene}&globals=mode:${mode}`,
        );
        await expect(
          page.locator("[data-scope=questionnaire][data-part=root]"),
        ).toBeVisible();
        await page.evaluate(() => document.fonts.ready);
        await expect(page.locator("body")).toHaveScreenshot(
          `questionnaire-${scene}-${mode}-${width}.png`,
          { animations: "disabled" },
        );
      });
