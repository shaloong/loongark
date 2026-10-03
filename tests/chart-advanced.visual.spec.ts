import { test, expect } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`Interactive chart ${mode} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(
        `/iframe.html?id=components-chart--interactive&globals=mode:${mode}`,
      );
      await expect(
        page.getByRole("img", { name: "Quarterly metrics", exact: true }),
      ).toBeVisible();
      await expect(page.locator("body")).toHaveScreenshot(
        `chart-interactive-${mode}-${width}.png`,
        { animations: "disabled" },
      );
    });
