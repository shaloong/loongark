import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import AxeBuilder from "@axe-core/playwright";

for (const framework of ["react", "vue", "solid", "svelte"]) {
  test(`四端参考代码真实交互 ${framework}`, async ({ page }, info) => {
    test.skip(!process.env.STATIC_DIR);
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const checkSemantics = async () => {
      // 对比度验证稳定状态；保留真实点击与动效，不在颜色过渡途中采样。
      await page.evaluate(async () => {
        await document.fonts.ready;
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        );
        await Promise.all(
          document
            .getAnimations()
            .filter(
              (animation) =>
                animation.effect?.getComputedTiming().iterations !== Infinity,
            )
            .map((animation) => animation.finished.catch(() => {})),
        );
      });
      const { violations } = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(violations).toEqual([]);
    };
    for (const mode of ["light", "dark"]) {
      await page.goto(
        `/examples-${framework}/?example=CalendarExample&mode=${mode}`,
      );
      const selected = page.locator(
        '[data-scope="date-picker"][data-part="table-cell-trigger"][data-selected]',
      );
      await expect(selected).toHaveText("8");
      await page.getByRole("button", { name: "下个月", exact: true }).click();
      await page.getByRole("button", { name: "上个月", exact: true }).click();
      const day = page
        .locator('[data-part="table-cell-trigger"]')
        .filter({ hasText: /^15$/ })
        .first();
      await day.click();
      await expect(selected).toHaveText("15");
      await checkSemantics();
      await mkdir(".artifacts/reference-examples", { recursive: true });
      await page.screenshot({
        path: `.artifacts/reference-examples/${info.project.name}-${framework}-calendar-${mode}.png`,
        animations: "disabled",
      });
    }
    await page.goto(`/examples-${framework}/?example=DatePickerExample`);
    await page.getByRole("button", { name: "打开日历", exact: true }).click();
    await page
      .locator('[data-part="table-cell-trigger"]')
      .filter({ hasText: /^15$/ })
      .first()
      .click();
    await expect(
      page.locator('[data-scope="date-picker"][data-part="input"]'),
    ).toHaveValue(/15/);
    await expect(
      page.locator('[data-scope="date-picker"][data-part="input"]'),
    ).toBeFocused();
    await checkSemantics();
    await page.goto(`/examples-${framework}/?example=CommandExample`);
    await page.getByRole("combobox").fill("API");
    await expect(
      page.locator('[data-scope="combobox"][data-part="item"]'),
    ).toHaveCount(1);
    await expect(
      page.locator('[data-scope="combobox"][data-part="item"]'),
    ).toContainText("API 参考");
    await checkSemantics();
    for (const mode of ["light", "dark"])
      for (const width of [1280, 375]) {
        await page.setViewportSize({ width, height: 812 });
        await page.goto(
          `/examples-${framework}/?example=TourExample&mode=${mode}`,
        );
        const trigger = page.getByRole("button", {
          name: "开始引导",
          exact: true,
        });
        await trigger.click();
        await expect(page.getByRole("alertdialog")).toBeVisible();
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth),
        ).toBeLessThanOrEqual(width + 1);
        await mkdir(".artifacts/reference-examples", { recursive: true });
        await page.screenshot({
          path: `.artifacts/reference-examples/${info.project.name}-${framework}-tour-${mode}-${width}.png`,
          animations: "disabled",
        });
        await checkSemantics();
        await page.getByRole("button", { name: "关闭", exact: true }).click();
        await expect(page.getByRole("alertdialog")).toBeHidden();
        await expect(trigger).toBeFocused();
        await trigger.click();
        await page.keyboard.press("Escape");
        await expect(page.getByRole("alertdialog")).toBeHidden();
        await expect(trigger).toBeFocused();
      }
    expect(errors).toEqual([]);
  });
}
