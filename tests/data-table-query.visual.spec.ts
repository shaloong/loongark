import { test, expect } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375]) {
    test(`DataTable column query ${mode} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1100 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(
        `/iframe.html?id=components-datatable--column-queries&globals=mode:${mode}`,
      );
      const root = page.locator('[data-scope="data-table"][data-part="root"]');
      await root.getByRole("button", { name: "Team", exact: true }).click();
      await root
        .getByRole("button", { name: "Revenue", exact: true })
        .click({ modifiers: ["Shift"] });
      await expect(root.locator('[data-part="sort-priority"]')).toHaveCount(2);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("body")).toHaveScreenshot(
        `data-table-query-sorted-${mode}-${width}.png`,
        { animations: "disabled" },
      );
      await root
        .getByRole("textbox", { name: "Filter Revenue", exact: true })
        .fill("-");
      await expect(root.getByRole("alert")).toHaveText("Enter a finite number");
      await expect(page.locator("body")).toHaveScreenshot(
        `data-table-query-error-${mode}-${width}.png`,
        { animations: "disabled" },
      );
    });
  }
