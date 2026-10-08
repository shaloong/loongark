import { expect, test } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    for (const advanced of [false, true])
      test(`repeated groups ${mode} ${width} ${advanced ? "nested" : "basic"}`, async ({
        page,
      }) => {
        await page.setViewportSize({ width, height: 1100 });
        await page.goto(
          `/iframe.html?id=components-questionnaire--repeated-groups&globals=mode:${mode}`,
        );
        await expect(
          page.getByRole("form", { name: "Contact review" }),
        ).toBeVisible();
        if (advanced) {
          await page
            .locator("summary")
            .filter({ hasText: "More controls" })
            .click();
          await page
            .getByRole("button", {
              name: "Show advanced questions",
              exact: true,
            })
            .click();
          await page
            .getByRole("button", { name: "Add backup", exact: true })
            .first()
            .click();
        }
        await page.evaluate(() => document.fonts.ready);
        await page
          .locator("body")
          .screenshot({
            path: `.artifacts/gap-completion/groups-visual-${mode}-${width}-${advanced ? "nested" : "basic"}.png`,
            animations: "disabled",
          });
        await expect(page.locator("body")).toHaveScreenshot(
          `groups-${mode}-${width}-${advanced ? "nested" : "basic"}.png`,
          { animations: "disabled" },
        );
      });
