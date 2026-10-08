import { expect, test } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`ranking preview ${mode} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(
        `/iframe.html?id=components-questionnaire--ranking-interaction&globals=mode:${mode}`,
      );
      const handle = page.locator(
        '[data-question-control="rank-drag"][data-key="access"]',
      );
      await handle.press("Space");
      await handle.press("End");
      await expect(handle).toBeFocused();
      await expect(handle).toHaveAttribute("aria-pressed", "true");
      await expect(page.getByLabel("Ranking updates")).toHaveText(
        "0 callbacks",
      );
      await page.evaluate(() => document.fonts.ready);
      await page
        .locator("body")
        .screenshot({
          path: `.artifacts/gap-completion/ranking-preview-${mode}-${width}.png`,
          animations: "disabled",
        });
      await expect(page.locator("body")).toHaveScreenshot(
        `ranking-preview-${mode}-${width}.png`,
        { animations: "disabled" },
      );
    });
