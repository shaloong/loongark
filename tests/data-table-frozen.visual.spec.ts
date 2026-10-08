import { test, expect } from "@playwright/test";
import { settleFrozenTable } from "./dataTableFrozenChecks";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`Frozen table ${mode} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(
        `/iframe.html?id=components-datatable--frozen&globals=mode:${mode}`,
      );
      await expect(
        page.getByRole("table", { name: "Release projects" }),
      ).toBeVisible();
      await settleFrozenTable(page);
      await expect(page.locator("body")).toHaveScreenshot(
        `data-table-frozen-${mode}-${width}.png`,
        { animations: "disabled" },
      );
    });
