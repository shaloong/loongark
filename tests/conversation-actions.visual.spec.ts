import { test, expect } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`Conversation actions ${mode} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(
        `/iframe.html?id=examples-conversationactions--overview&globals=mode:${mode}`,
      );
      await expect(
        page.getByRole("article", { name: "Message from Lin" }),
      ).toBeVisible();
      await expect(page.locator("body")).toHaveScreenshot(
        `conversation-actions-${mode}-${width}.png`,
        { animations: "disabled" },
      );
    });
