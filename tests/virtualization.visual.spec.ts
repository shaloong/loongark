import { test, expect } from "@playwright/test";
for (const component of ["datatable", "messagescroller"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`Virtual ${component} ${mode} ${width}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 1100 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(
          `/iframe.html?id=components-${component}--virtualized&globals=mode:${mode}`,
        );
        await expect(page.locator("[data-virtual-key]").first()).toBeVisible();
        await page.evaluate(() => document.fonts.ready);
        // 等待首轮真实高度测量和锚点修正。
        await page.waitForTimeout(250);
        await expect(page.locator("body")).toHaveScreenshot(
          `virtual-${component}-${mode}-${width}.png`,
          { animations: "disabled" },
        );
      });
