import { expect, test } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`matrix multiple ${mode} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(
        `/iframe.html?id=components-questionnaire--matrix-multiple&globals=mode:${mode}`,
      );
      await page
        .getByRole("checkbox", { name: "Keyboard interaction", exact: true })
        .first()
        .check();
      await page
        .getByRole("checkbox", { name: "Layout and alignment", exact: true })
        .first()
        .check();
      await page.getByRole("button", { name: "Next", exact: true }).click();
      await expect(
        page.locator('[data-part="matrix-row"][data-row="content"]'),
      ).toHaveAttribute("aria-invalid", "true");
      await page.evaluate(() => document.fonts.ready);
      await page
        .locator("body")
        .screenshot({
          path: `.artifacts/gap-completion/matrix-error-${mode}-${width}.png`,
          animations: "disabled",
        });
      await expect(page.locator("body")).toHaveScreenshot(
        `matrix-multiple-${mode}-${width}.png`,
        { animations: "disabled" },
      );
    });
