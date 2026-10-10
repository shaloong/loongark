import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { auditDirectory } from "./auditDirectory";

for (const framework of ["react", "vue", "solid", "svelte"]) {
  for (const mode of ["light", "dark"]) {
    test(`${framework} ${mode} 日期浮层缩屏、选择与关闭焦点`, async ({
      page,
    }) => {
      test.skip(!process.env.STATIC_DIR, "通过四端消费服务器运行");
      await page.setViewportSize({ width: 900, height: 650 });
      await page.goto(
        `/examples-${framework}/?example=DatePickerExample&mode=${mode}`,
      );
      const trigger = page.locator(
        "[data-scope=date-picker][data-part=trigger]",
      );
      const content = page.locator(
        "[data-scope=date-picker][data-part=content]",
      );
      await trigger.click();
      await expect(content).toBeVisible();
      for (const width of [375, 900, 320, 900, 375]) {
        await page.setViewportSize({ width, height: 812 });
        // 检查真实滚动范围与可见几何，防止 WebKit 残留旧的合成层溢出。
        await expect
          .poll(() => page.evaluate(() => document.documentElement.scrollWidth))
          .toBeLessThanOrEqual(width + 1);
        await expect
          .poll(() =>
            content.evaluate((el) => el.getBoundingClientRect().right),
          )
          .toBeLessThanOrEqual(width + 1);
        await expect
          .poll(() => content.evaluate((el) => el.getBoundingClientRect().left))
          .toBeGreaterThanOrEqual(0);
      }
      const root = auditDirectory(
        `picker-overlays-${test.info().project.name}`,
      );
      await page.screenshot({
        path: `${root}/${framework}-${mode}-date-mobile.png`,
        animations: "disabled",
      });
      await page.setViewportSize({ width: 1280, height: 800 });
      await expect
        .poll(() => page.evaluate(() => document.documentElement.scrollWidth))
        .toBeLessThanOrEqual(1281);
      await page.screenshot({
        path: `${root}/${framework}-${mode}-date-desktop.png`,
        animations: "disabled",
      });
      await page.setViewportSize({ width: 375, height: 812 });
      await page.keyboard.press("Escape");
      await expect(content).toBeHidden();
      await expect(trigger).toBeFocused();
      await trigger.click();
      await content
        .locator(
          "[data-part=table-cell-trigger]:not([data-disabled]):not([data-outside-range])",
        )
        .filter({ hasText: /^15$/ })
        .click();
      await expect(
        page.locator("[data-scope=date-picker][data-part=input]"),
      ).toHaveValue(/15/);
      await expect(content).toBeHidden();
      // 选择后 Ark 返回日期输入框；Escape 返回打开按钮。
      await expect(
        page.locator("[data-scope=date-picker][data-part=input]"),
      ).toBeFocused();
    });

    test(`${framework} ${mode} 颜色浮层稳定对比度与快速开关`, async ({
      page,
    }) => {
      test.skip(!process.env.STATIC_DIR, "通过四端消费服务器运行");
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(
        `/examples-${framework}/?example=ColorPickerExample&mode=${mode}`,
      );
      const trigger = page.locator(
        "[data-scope=color-picker][data-part=trigger]",
      );
      const content = page.locator(
        "[data-scope=color-picker][data-part=content]",
      );
      for (const reducedMotion of ["no-preference", "reduce"] as const) {
        await page.emulateMedia({ reducedMotion });
        await trigger.click();
        await expect(content).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(trigger).toBeFocused();
        await trigger.click();
        await expect(content).toBeVisible();
        // 不删除对比度规则；等待可观测的最终透明度，避免把淡入采样当成最终配色。
        await expect
          .poll(() => content.evaluate((el) => getComputedStyle(el).opacity))
          .toBe("1");
        expect(
          (
            await new AxeBuilder({ page })
              .withTags(["wcag2a", "wcag2aa"])
              .analyze()
          ).violations,
        ).toEqual([]);
        await page
          .locator("[data-scope=color-picker][data-part=swatch-trigger]")
          .nth(1)
          .click();
        await expect(
          page.locator("[data-scope=color-picker][data-part=channel-input]"),
        ).toHaveValue(/0a3565/i);
        const root = auditDirectory(
          `picker-overlays-${test.info().project.name}`,
        );
        await page.screenshot({
          path: `${root}/${framework}-${mode}-color-${reducedMotion}.png`,
          animations: "disabled",
        });
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.screenshot({
          path: `${root}/${framework}-${mode}-color-${reducedMotion}-desktop.png`,
          animations: "disabled",
        });
        await page.setViewportSize({ width: 375, height: 812 });
        await page.keyboard.press("Escape");
        await expect(content).toBeHidden();
        await expect(trigger).toBeFocused();
      }
    });
  }
}
