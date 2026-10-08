import { expect, test } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    for (const nested of [false, true])
      test(`custom renderer ${mode} ${width} ${nested ? "nested" : "basic"}`, async ({
        page,
      }) => {
        await page.setViewportSize({ width, height: 1100 });
        await page.goto(
          `/iframe.html?id=components-questionnaire--custom-renderer&globals=mode:${mode}`,
        );
        await expect(
          page.getByRole("form", { name: "Experience review" }),
        ).toBeVisible();
        if (nested) {
          await page
            .locator("summary")
            .filter({ hasText: "More controls" })
            .click();
          await page
            .getByRole("button", { name: "Use nested questions", exact: true })
            .click();
          await page
            .getByRole("button", { name: "Add person", exact: true })
            .click();
          await page
            .getByRole("button", { name: "Submit", exact: true })
            .click();
          await expect(
            page
              .getByText("Please answer this question.", { exact: true })
              .first(),
          ).toBeVisible();
        }
        await page.evaluate(() => document.fonts.ready);
        const name = `custom-${mode}-${width}-${nested ? "nested" : "basic"}.png`;
        await page
          .locator("body")
          .screenshot({
            path: `.artifacts/gap-completion/${name}`,
            animations: "disabled",
          });
        await expect(page.locator("body")).toHaveScreenshot(name, {
          animations: "disabled",
        });
      });
