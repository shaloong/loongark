import { test, expect } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`DataTable editing ${mode} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(
        `/iframe.html?id=components-datatable--editing&globals=mode:${mode}`,
      );
      await expect(
        page.getByRole("table", { name: "Editable projects" }),
      ).toBeVisible();
      await page
        .getByRole("button", { name: /^Edit Revenue for alpha: / })
        .click();
      await expect(page.locator('[data-part="cell-input"]')).toBeFocused();
      await page.locator('[data-part="cell-input"]').fill("-1");
      await page.locator('[data-part="cell-input"]').press("Enter");
      await expect(page.getByRole("alert")).toHaveText(
        "Revenue cannot be negative",
      );
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("body")).toHaveScreenshot(
        `data-table-edit-${mode}-${width}.png`,
        { animations: "disabled" },
      );
    });
