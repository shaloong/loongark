import { expect, test } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    for (const rtl of [false, true])
      test(`column window ${mode} ${width} ${rtl ? "rtl" : "default"}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 1100 });
        await page.goto(`/iframe.html?id=components-datatable--column-virtualization&globals=mode:${mode}`);
        const grid = page.getByRole("grid", { name: "Windowed projects" });
        await expect(grid).toBeVisible();
        if (rtl) {
          await page.locator("summary").filter({ hasText: "More controls" }).click();
          await page.getByRole("button", { name: "Use RTL", exact: true }).click();
          await page.getByRole("button", { name: "Go to column 41", exact: true }).click();
          await expect(grid.locator('th[data-column-key="c40"]')).toHaveCount(1);
        }
        await page.evaluate(async () => {
          await document.fonts.ready;
          await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
        });
        const name = `column-window-${mode}-${width}-${rtl ? "rtl" : "default"}.png`;
        await page.locator("body").screenshot({ path: `.artifacts/gap-completion/${name}`, animations: "disabled" });
        await expect(page.locator("body")).toHaveScreenshot(name, { animations: "disabled" });
      });
