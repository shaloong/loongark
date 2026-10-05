import { test, expect } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    for (const type of ["textarea", "select"])
      test(`DataTable complex ${type} ${mode} ${width}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 1100 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(
          `/iframe.html?id=components-datatable--complex-editors&globals=mode:${mode}`,
        );
        await page
          .getByRole("button", {
            name: new RegExp(
              `^Edit ${type === "select" ? "Owner" : "Project"} for alpha: `,
            ),
          })
          .click();
        const field = page.locator("[data-part=cell-input]");
        await expect(field).toBeFocused();
        if (type === "select") await field.selectOption("Platform");
        else
          await field.fill(
            "A multiline note\nReview keyboard access.\nKeep useful context.",
          );
        await page.evaluate(() => document.fonts.ready);
        await expect(page.locator("body")).toHaveScreenshot(
          `data-table-complex-${type}-${mode}-${width}.png`,
          { animations: "disabled" },
        );
      });
