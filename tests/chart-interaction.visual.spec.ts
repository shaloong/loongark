import { test, expect } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`Chart category window ${mode} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1100 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(
        `/iframe.html?id=components-chart--zoom-and-brush&globals=mode:${mode}`,
      );
      await page.getByRole("button", { name: "Zoom in", exact: true }).click();
      const chart = page.locator('[data-scope="chart"]');
      await expect(chart.locator('[data-part="range-status"]')).toHaveText(
        "Categories 4–9 of 12",
      );
      await chart
        .getByRole("combobox", { name: "Inspect category", exact: true })
        .selectOption("1");
      await chart.getByText("View chart data", { exact: true }).click();
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("body")).toHaveScreenshot(
        `chart-window-${mode}-${width}.png`,
        { animations: "disabled" },
      );
    });
