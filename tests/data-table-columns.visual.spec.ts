import { test, expect } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`column layout ${mode} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1100 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(
        `/iframe.html?id=components-datatable--column-layout&globals=mode:${mode}`,
      );
      const root = page.locator('[data-scope="data-table"][data-part="root"]');
      await root
        .getByRole("separator", { name: "Resize Project column", exact: true })
        .press("Shift+ArrowRight");
      await root
        .getByRole("button", { name: "Move Owner column", exact: true })
        .press("ArrowRight");
      await expect(
        root.getByRole("separator", {
          name: "Resize Project column",
          exact: true,
        }),
      ).toHaveAttribute("aria-valuenow", "290");
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("body")).toHaveScreenshot(
        `columns-${mode}-${width}.png`,
        { animations: "disabled" },
      );
      await page.getByRole("button", { name: "Use RTL", exact: true }).click();
      await expect(page.locator("body")).toHaveScreenshot(
        `columns-rtl-${mode}-${width}.png`,
        { animations: "disabled" },
      );
    });
