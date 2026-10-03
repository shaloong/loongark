import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { checkMessageScrollerAdvanced } from "./messageScrollerAdvancedChecks";
for (const mode of ["light", "dark"])
  test(`MessageScroller ${mode} 媒体锚点、历史与异步清理`, async ({ page }) => {
    await page.goto(
      `/iframe.html?id=components-messagescroller--advanced&globals=mode:${mode}`,
    );
    await checkMessageScrollerAdvanced(page);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
