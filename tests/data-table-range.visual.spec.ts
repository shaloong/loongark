import { expect, test } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`range ${mode} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(
        `/iframe.html?id=components-datatable--cell-range-and-paste&globals=mode:${mode}`,
      );
      const grid = page.getByRole("grid", { name: "Editable project range" });
      await expect(grid).toContainText("Alpha release");
      await expect(page.locator("body")).toHaveScreenshot(
        `range-default-${mode}-${width}.png`,
        { animations: "disabled" },
      );
      await grid
        .locator(
          'td[data-cell-row="project-1"][data-cell-column="name"] [data-part="cell-range-text"]',
        )
        .click();
      await page.keyboard.press("Shift+ArrowRight");
      await page.keyboard.press("Shift+ArrowDown");
      await expect(page.locator('[data-part="range-status"]')).toHaveText(
        "4 cells selected",
      );
      await expect(page.locator("body")).toHaveScreenshot(
        `range-selected-${mode}-${width}.png`,
        { animations: "disabled" },
      );
    });
