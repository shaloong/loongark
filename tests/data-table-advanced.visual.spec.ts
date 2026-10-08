import { test, expect } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`Remote table ${mode} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(
        `/iframe.html?id=components-datatable--server&globals=mode:${mode}`,
      );
      await expect(
        page.getByRole("table", { name: "Remote projects" }),
      ).toBeVisible();
      await expect(page.locator("body")).toHaveScreenshot(
        `data-table-server-${mode}-${width}.png`,
        { animations: "disabled" },
      );
    });
