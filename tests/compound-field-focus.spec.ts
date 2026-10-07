import { expect, test } from "@playwright/test";

for (const framework of ["Story", "react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`compound field focus ${framework} ${mode} ${width}`, async ({
        page,
      }) => {
        test.skip(
          framework === "Story"
            ? !!process.env.STATIC_DIR
            : !process.env.STATIC_DIR,
        );
        await page.setViewportSize({ width, height: 812 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        const families =
          framework === "Story"
            ? [
                ["combobox", "combobox"],
                ["command", "combobox"],
                ["date-picker", "date-picker"],
                ["numberinput", "number-input"],
              ]
            : [
                ["Combobox", "combobox"],
                ["NumberInput", "number-input"],
              ];
        for (const [family, scope] of families) {
          await page.goto(
            framework === "Story"
              ? `/iframe.html?id=components-${family}--${family === "combobox" ? "playground" : "basic"}&globals=mode:${mode}`
              : `/examples-${framework}/?example=${family}Example&mode=${mode}`,
          );
          const input = page
            .locator(`[data-scope="${scope}"][data-part="input"]`)
            .first();
          await expect(input).toBeVisible();
          await input.focus();
          await expect(input).toBeFocused();
          // 外框必须包含整个组合控件，内部输入不得出现第二个、尺寸更小的焦点框。
          await expect
            .poll(() =>
              input.evaluate((node) => {
                const control = node.closest('[data-part="control"]')!;
                const outer = getComputedStyle(control),
                  inner = getComputedStyle(node);
                return (
                  outer.outlineStyle !== "none" &&
                  parseFloat(outer.outlineWidth) > 0 &&
                  inner.outlineStyle === "none"
                );
              }),
            )
            .toBe(true);
          if (scope === "date-picker") {
            const content = page
              .locator('[data-scope="date-picker"][data-part="content"]')
              .first();
            await expect(content).toBeVisible();
            const bounds = await content.boundingBox();
            for (const part of ["month-select", "year-select"]) {
              const select = content.locator(`[data-part="${part}"]`);
              const rect = await select.boundingBox();
              expect(rect!.x).toBeGreaterThanOrEqual(bounds!.x);
              expect(rect!.x + rect!.width).toBeLessThanOrEqual(
                bounds!.x + bounds!.width,
              );
            }
            const trigger = page.getByRole("button", {
              name: "Open calendar",
              exact: true,
            });
            await expect(trigger.locator("svg")).toBeVisible();
            expect(
              await trigger
                .locator("svg")
                .evaluate((node) => node.getBoundingClientRect().width),
            ).toBeGreaterThan(10);
          }
          if (scope === "number-input") {
            await input.fill("24");
            await input.press("ArrowUp");
            await expect(input).toHaveValue("25");
            await input.press("ArrowDown");
            await expect(input).toHaveValue("24");
            const increment = page
              .locator(
                '[data-scope="number-input"][data-part="increment-trigger"]',
              )
              .first();
            await expect(increment.locator("svg")).toBeVisible();
            await increment.click();
            await expect(input).toHaveValue("25");
            await input.focus();
            await input.press("Tab");
            // Ark 的步进按钮默认不进入 Tab 顺序；键盘模式下主动聚焦仍须可见。
            await increment.focus();
            await expect(increment).toBeFocused();
            await expect
              .poll(() =>
                increment.evaluate(
                  (node) => getComputedStyle(node).outlineStyle,
                ),
              )
              .not.toBe("none");
            await input.focus();
          } else if (scope === "combobox") {
            await input.press("ArrowDown");
            await expect(
              page
                .locator('[data-scope="combobox"][data-part="content"]')
                .first(),
            ).toBeVisible();
            await input.press("Escape");
            await expect(input).toBeFocused();
            if (family !== "command")
              await expect(
                page
                  .locator('[data-scope="combobox"][data-part="content"]')
                  .first(),
              ).toBeHidden();
          }
          await page.screenshot({
            path: `.artifacts/focus-fields/verified-${framework}-${family}-${mode}-${width}.png`,
          });
        }
      });

for (const mode of ["light", "dark"])
  for (const dir of ["ltr", "rtl"])
    test(`number stepper corners ${mode} ${dir}`, async ({ page }) => {
      test.skip(!!process.env.STATIC_DIR, "Story 的实际三种尺寸");
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(
        `/iframe.html?id=components-numberinput--sizes&globals=mode:${mode}`,
      );
      await page
        .locator('[data-scope="number-input"][data-part="root"]')
        .first()
        .waitFor();
      await page.evaluate((direction) => {
        document.documentElement.dir = direction;
        // Ark 给每个部件设置显式方向；本回归检查这套方向样式的实际圆角和布局。
        for (const node of document.querySelectorAll(
          '[data-scope="number-input"]',
        ))
          node.setAttribute("dir", direction);
      }, dir);
      for (const size of ["sm", "md", "lg"]) {
        const control = page.locator(
          `[data-scope="number-input"][data-part="control"][data-size="${size}"]`,
        );
        const input = control.locator('[data-part="input"]');
        await input.focus();
        const geometry = await control.evaluate((node, direction) => {
          const outer = node.getBoundingClientRect();
          const up = node.querySelector('[data-part="increment-trigger"]')!;
          const down = node.querySelector('[data-part="decrement-trigger"]')!;
          const top = getComputedStyle(up),
            bottom = getComputedStyle(down);
          const edge = up.getBoundingClientRect();
          return {
            topRadius: parseFloat(
              direction === "rtl"
                ? top.borderTopLeftRadius
                : top.borderTopRightRadius,
            ),
            bottomRadius: parseFloat(
              direction === "rtl"
                ? bottom.borderBottomLeftRadius
                : bottom.borderBottomRightRadius,
            ),
            outside: edge.left < outer.left || edge.right > outer.right,
            inlineEnd:
              direction === "rtl"
                ? edge.right < outer.right
                : edge.left > outer.left,
          };
        }, dir);
        expect(geometry.topRadius).toBeGreaterThan(0);
        expect(geometry.bottomRadius).toBeGreaterThan(0);
        expect(geometry.outside).toBe(false);
        expect(geometry.inlineEnd).toBe(true);
      }
      await page.screenshot({
        path: `.artifacts/focus-fields/number-sizes-${mode}-${dir}.png`,
      });
    });

for (const mode of ["light", "dark"])
  test(`date input size geometry ${mode}`, async ({ page }) => {
    test.skip(!!process.env.STATIC_DIR, "Story 的实际三种尺寸");
    await page.setViewportSize({ width: 375, height: 1100 });
    await page.goto(
      `/iframe.html?id=components-date-picker--sizes&globals=mode:${mode}`,
    );
    const roots = page.locator('[data-scope="date-picker"][data-part="root"]');
    await expect(roots).toHaveCount(3);
    for (let index = 0; index < 3; index++) {
      const control = roots.nth(index).locator('[data-part="control"]');
      const input = control.locator('[data-part="input"]');
      await input.focus();
      const outer = await control.boundingBox(),
        inner = await input.boundingBox();
      expect(outer!.height).toBe([32, 36, 40][index]);
      expect(inner!.height).toBeGreaterThanOrEqual(outer!.height - 2);
      expect(inner!.y).toBeGreaterThanOrEqual(outer!.y);
      expect(inner!.y + inner!.height).toBeLessThanOrEqual(
        outer!.y + outer!.height,
      );
    }
    await page.screenshot({
      path: `.artifacts/focus-fields/date-sizes-${mode}.png`,
    });
  });
