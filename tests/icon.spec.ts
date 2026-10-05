import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { checkIcons } from "./iconChecks";
for (const mode of ["light", "dark"])
  test(`Icon 名称、动态节点、尺寸与 RTL ${mode}`, async ({ page }) => {
    await page.goto(
      `/iframe.html?id=components-icon--basic&globals=mode:${mode}`,
    );
    await checkIcons(page);
    expect(
      (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze())
        .violations,
    ).toEqual([]);
  });
