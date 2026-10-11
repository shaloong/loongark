import { expect, test } from "@playwright/test";
import { writeFileSync } from "node:fs";
import { auditDirectory } from "./auditDirectory";

function luminance(color: string) {
  const channels = color
    .match(/[\d.]+/g)
    ?.slice(0, 3)
    .map(Number);
  if (!channels || channels.length !== 3)
    throw new Error(`无法解析实测颜色 ${color}`);
  const linear = channels.map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

function contrast(first: string, second: string) {
  const a = luminance(first),
    b = luminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

for (const framework of ["react", "vue", "solid", "svelte"])
  test(`${framework} 消费入口拒绝未知示例与原型名称`, async ({ page }) => {
    test.skip(!process.env.STATIC_DIR, "四端消费构建后运行");
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`/examples-${framework}/?example=__proto__`);
    await expect.poll(() => errors).toContain("未知示例: __proto__");
    await expect(page.locator("[data-example-content]")).toHaveCount(0);
  });

for (const framework of ["react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark", "high-contrast"])
    test(`${framework} ${mode} 颜色选择双色轮廓与独立焦点`, async ({
      page,
    }) => {
      test.skip(!process.env.STATIC_DIR, "四端消费构建后运行");
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(
        `/examples-${framework}/?example=ColorPickerExample&mode=${mode}`,
      );
      await expect(
        page.locator(`[data-theme="${mode}"]`).first(),
      ).toBeAttached();
      await page
        .locator("[data-scope=color-picker][data-part=trigger]")
        .click();
      const content = page.locator(
        "[data-scope=color-picker][data-part=content]",
      );
      await expect(content).toBeVisible();
      await expect
        .poll(
          () => content.evaluate((node) => getComputedStyle(node).opacity),
          { timeout: 15_000 },
        )
        .toBe("1");
      const swatch = content.locator("[data-part=swatch-trigger]").nth(1);
      await swatch.click();
      const indicator = swatch.locator("[data-part=swatch-indicator]");
      await expect(indicator).toBeVisible();
      const evidence = await indicator.evaluate((node) => {
        const css = getComputedStyle(node);
        const parent = node.parentElement;
        if (!parent) throw new Error("选中标记缺少色块");
        return {
          border: css.borderTopColor,
          shadow: css.boxShadow,
          fill: getComputedStyle(parent).backgroundColor,
        };
      });
      const root = auditDirectory(
        `color-picker-contrast-${test.info().project.name}`,
      );
      // 截图先于断言：旧样式失败时仍保留真实 Deep Blue 复现。
      await page.screenshot({
        path: `${root}/${framework}-${mode}-desktop.png`,
        animations: "disabled",
      });
      await page.setViewportSize({ width: 375, height: 812 });
      await page.screenshot({
        path: `${root}/${framework}-${mode}-mobile.png`,
        animations: "disabled",
      });
      writeFileSync(
        `${root}/${framework}-${mode}.json`,
        JSON.stringify(evidence, null, 2),
      );
      const shadow = evidence.shadow.match(/rgba?\([^)]+\)/)?.[0];
      expect(shadow, "选中标记必须具有第二道轮廓").toBeTruthy();
      if (!shadow) throw new Error("缺少第二道轮廓");
      expect(
        Math.max(
          contrast(evidence.border, evidence.fill),
          contrast(shadow, evidence.fill),
        ),
      ).toBeGreaterThanOrEqual(3);

      // 任意 sRGB 背景（含透明颜色合成后）均落在此亮度区间。
      for (let gray = 0; gray <= 255; gray++) {
        const fill = `rgb(${gray}, ${gray}, ${gray})`;
        expect(
          Math.max(contrast(evidence.border, fill), contrast(shadow, fill)),
        ).toBeGreaterThanOrEqual(3);
      }
      for (const part of ["area-thumb", "channel-slider-thumb"]) {
        const thumb = content.locator(`[data-part=${part}]`);
        await expect(thumb).toHaveCSS("border-top-color", evidence.border);
        await expect(thumb).toHaveCSS("box-shadow", evidence.shadow);
      }
      const input = content.locator("[data-part=channel-input]");
      await input.focus();
      // 使用可信 Tab 导航验证键盘焦点，而不是依赖各引擎的脚本聚焦启发式。
      await page.keyboard.press("Shift+Tab");
      await page.keyboard.press("Shift+Tab");
      for (const part of ["area-thumb", "channel-slider-thumb"]) {
        const thumb = content.locator(`[data-part=${part}]`);
        await expect(thumb).toBeFocused();
        await page.keyboard.press("ArrowRight");
        await expect(thumb).toBeFocused();
        await expect(thumb).toHaveCSS("outline-style", "solid");
        await expect(thumb).toHaveCSS("outline-width", "2px");
        await page.screenshot({
          path: `${root}/${framework}-${mode}-${part}-focus.png`,
          animations: "disabled",
        });
        if (part === "area-thumb") await page.keyboard.press("Tab");
      }
      for (const [color, accepted] of [
        ["#000000", "rgb(0, 0, 0)"],
        ["#ffffff", "rgb(255, 255, 255)"],
        ["#777777", "rgb(119, 119, 119)"],
        ["#0a3565", "rgb(10, 53, 101)"],
      ]) {
        await input.focus();
        // Zag 在 RAF 同步通道字段；先完成前一次滑块变化的绘制再编辑草稿。
        await page.evaluate(
          () =>
            new Promise<void>((resolve) => {
              requestAnimationFrame(() =>
                requestAnimationFrame(() => resolve()),
              );
            }),
        );
        await input.fill(color);
        await input.press("Enter");
        // 输入草稿不是接受值；等待根状态实际渲染颜色后再验收 blur。
        await expect(page.locator("[data-part=value-swatch]")).toHaveCSS(
          "background-color",
          accepted,
        );
        await page.evaluate(
          () =>
            new Promise<void>((resolve) => {
              requestAnimationFrame(() =>
                requestAnimationFrame(() => resolve()),
              );
            }),
        );
        await input.press("Tab");
        await expect(input).toHaveValue(new RegExp(color.slice(1), "i"));
        if (color === "#000000" || color === "#ffffff") {
          await input.focus();
          await page.keyboard.press("Shift+Tab");
          await page.keyboard.press("Shift+Tab");
          await expect(content.locator("[data-part=area-thumb]")).toBeFocused();
          await page.screenshot({
            path: `${root}/${framework}-${mode}-${color.slice(1)}-edge.png`,
            animations: "disabled",
          });
        }
      }
      for (const colorScheme of ["light", "dark"] as const) {
        await page.emulateMedia({ forcedColors: "active", colorScheme });
        const system = await content.evaluate((host) => {
          const probe = document.createElement("span");
          probe.style.cssText = "color:CanvasText;background:Canvas";
          // 系统色随浮层继承的 color-scheme 解析，不能使用主题外的探针。
          host.append(probe);
          const css = getComputedStyle(probe);
          const colors = { text: css.color, canvas: css.backgroundColor };
          probe.remove();
          return colors;
        });
        const thumb = content.locator("[data-part=channel-slider-thumb]");
        await input.focus();
        await page.keyboard.press("Shift+Tab");
        await expect(thumb).toBeFocused();
        await page.keyboard.press("ArrowRight");
        await expect(thumb).toHaveCSS("outline-style", "solid");
        await expect(thumb).toHaveCSS("border-top-width", "2px");
        await expect(thumb).toHaveCSS("border-top-color", system.text);
        expect(contrast(system.text, system.canvas)).toBeGreaterThanOrEqual(3);
        await page.screenshot({
          path: `${root}/${framework}-${mode}-forced-${colorScheme}.png`,
          animations: "disabled",
        });
      }
    });
