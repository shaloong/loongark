import { expect, test } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 320])
    for (const long of [false, true])
      test(`selection ${mode} ${width} ${long ? "long-rtl" : "default"}`, async ({
        page,
      }) => {
        await page.setViewportSize({ width, height: 1000 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(
          `/iframe.html?id=components-radiogroup--responsive-controls&globals=mode:${mode}`,
        );
        await expect(
          page.getByRole("form", { name: "Selection preferences" }),
        ).toBeVisible();
        if (long) {
          await page.getByText("More controls", { exact: true }).click();
          for (const name of ["Long descriptions", "Right-to-left", "Size lg"])
            await page.getByRole("button", { name, exact: true }).click();
          await page.locator("[data-scope=switch][data-part=control]").click();
        }
        await page.evaluate(() => document.fonts.ready);
        const name = `selection-${mode}-${width}-${long ? "long-rtl" : "default"}.png`;
        await page
          .locator("body")
          .screenshot({
            path: `.artifacts/p0-selection/${name}`,
            animations: "disabled",
          });
        await expect(page.locator("body")).toHaveScreenshot(name, {
          animations: "disabled",
        });
      });
