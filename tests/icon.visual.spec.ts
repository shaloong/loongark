import { test, expect } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`Icon ${mode} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(
        `/iframe.html?id=components-icon--basic&globals=mode:${mode}`,
      );
      await expect(
        page.getByRole("img", { name: "Medium search" }),
      ).toBeVisible();
      await expect(page.locator("body")).toHaveScreenshot(
        `icon-${mode}-${width}.png`,
        { animations: "disabled" },
      );
    });
