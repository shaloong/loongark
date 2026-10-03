import { test, expect } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`DataTable ${mode} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(
        `/iframe.html?id=compositions-project-tables--basic&globals=mode:${mode}`,
      );
      await expect(
        page.locator("[data-scope=data-table]").first(),
      ).toBeVisible();
      await expect(page.locator("body")).toHaveScreenshot(
        `data-table-${mode}-${width}.png`,
        { animations: "disabled" },
      );
    });
