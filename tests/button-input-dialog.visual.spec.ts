import AxeBuilder from "@axe-core/playwright";
import { expect, Page, test } from "@playwright/test";
import {
  defaultScenario,
  scenarioTestIds,
} from "../examples/shared/demoScenario";

const storyPath =
  "/iframe.html?id=examples-complete-demos-button-input-dialog--default&viewMode=story";

const disableMotionStyles = `
  *,
  *::before,
  *::after {
    animation-delay: 0s !important;
    animation-duration: 0s !important;
    transition-duration: 0s !important;
  }
`;

test.describe("ButtonInputDialog 视觉与无障碍", () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page);
    await disableAnimations(page);
  });

  test("默认状态截图", async ({ page }) => {
    await resetFocus(page);
    const canvas = page.locator("body");
    await expect(canvas).toHaveScreenshot("button-input-dialog-default.png", {
      animations: "disabled",
    });
  });

  test("弹窗展开截图并通过 Axe", async ({ page }) => {
    await openDialog(page);

    const canvas = page.locator("body");
    await expect(canvas).toHaveScreenshot(
      "button-input-dialog-dialog-open.png",
      {
        animations: "disabled",
      },
    );

    const axe = new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]);
    const { violations } = await axe.analyze();
    expect(violations, "Axe 检查需全部通过").toEqual([]);
  });
});

async function loadStory(page: Page) {
  await page.goto(storyPath);
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts?.ready ?? Promise.resolve());
}

async function disableAnimations(page: Page) {
  // 关闭动画避免截图抖动
  await page.addStyleTag({ content: disableMotionStyles });
}

async function resetFocus(page: Page) {
  await page.evaluate(() =>
    (document.activeElement as HTMLElement | null)?.blur(),
  );
}

async function openDialog(page: Page) {
  const emailInput = page.getByPlaceholder(defaultScenario.emailPlaceholder);
  await emailInput.fill("member@loongark.dev");

  const primaryButton = page.getByTestId(scenarioTestIds.primaryButton);
  await expect(primaryButton).toBeEnabled();
  await primaryButton.click();

  await expect(page.getByTestId(scenarioTestIds.dialogTitle)).toBeVisible();
  await page.waitForTimeout(400);
}
