import { test, expect } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`Conditional questionnaire ${mode} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(
        `/iframe.html?id=components-questionnaire--conditional&globals=mode:${mode}`,
      );
      await expect(
        page.getByRole("form", { name: "Workspace setup" }),
      ).toBeVisible();
      await expect(page.locator("body")).toHaveScreenshot(
        `questionnaire-conditional-${mode}-${width}.png`,
        { animations: "disabled" },
      );
    });
