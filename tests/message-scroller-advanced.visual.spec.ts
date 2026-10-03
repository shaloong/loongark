import { test, expect } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`MessageScroller advanced ${mode} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(
        `/iframe.html?id=components-messagescroller--advanced&globals=mode:${mode}`,
      );
      await expect(
        page.getByRole("region", { name: "Workspace discussion" }),
      ).toBeVisible();
      await expect(page.locator("body")).toHaveScreenshot(
        `message-scroller-${mode}-${width}.png`,
        { animations: "disabled" },
      );
    });
