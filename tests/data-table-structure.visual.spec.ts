import { expect, test } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`structure ${mode} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1200 });
      await page.goto(
        `/iframe.html?id=components-datatable--grouping-and-tree&globals=mode:${mode}`,
      );
      await expect(
        page.getByRole("table", { name: "Structured projects" }),
      ).toContainText("Team: Design");
      await expect(page.locator("body")).toHaveScreenshot(
        `table-group-${mode}-${width}.png`,
        { animations: "disabled" },
      );
      await page
        .getByRole("button", { name: "Show tree rows", exact: true })
        .click();
      await expect(
        page.getByRole("button", { name: "Collapse atlas", exact: true }),
      ).toBeVisible();
      await expect(page.locator("body")).toHaveScreenshot(
        `table-tree-${mode}-${width}.png`,
        { animations: "disabled" },
      );
    });
