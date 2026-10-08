import { expect, test } from "@playwright/test";

for (const framework of ["Story", "react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`Editable 状态作用于值而非操作区 ${framework} ${mode} ${width}`, async ({
        page,
      }) => {
        test.skip(
          (framework === "Story") === !!process.env.STATIC_DIR,
          "对应 Story / 四端服务器",
        );
        await page.setViewportSize({ width, height: 1100 });
        await page.goto(
          framework === "Story"
            ? `/iframe.html?id=components-editable--states&globals=mode:${mode}`
            : `/examples-${framework}/?example=EditableStatesExample&mode=${mode}`,
        );
        const root = page.locator("[data-editable-states]");
        await expect(root).toBeVisible();
        const invalid = root.locator('[data-demo-state="invalid"]');
        const preview = invalid.locator('[data-part="preview"]');
        const input = invalid.locator('[data-part="input"]');
        const control = invalid.locator('[data-part="control"]');
        await expect
          .poll(() => control.evaluate((el) => getComputedStyle(el).boxShadow))
          .toBe("none");
        await expect
          .poll(() => preview.evaluate((el) => getComputedStyle(el).boxShadow))
          .not.toBe("none");
        await expect(preview).toHaveText("LoongArk Design System");
        await invalid.locator('[data-part="edit-trigger"]').click();
        await expect(input).toBeVisible();
        await expect(input).toBeFocused();
        await input.fill("Updated project");
        await invalid.locator('[data-part="submit-trigger"]').click();
        await expect(preview).toHaveText("Updated project");
        await expect(input).toBeHidden();
        await expect(
          invalid.locator('[data-part="edit-trigger"]'),
        ).toBeFocused();
        await expect(control).toHaveCSS("box-shadow", "none");
        const disabled = root.locator('[data-demo-state="disabled"]');
        await expect(
          disabled.locator('[data-part="edit-trigger"]'),
        ).toBeDisabled();
        await expect
          .poll(() => page.evaluate(() => document.documentElement.scrollWidth))
          .toBeLessThanOrEqual(width + 1);
        await page.screenshot({
          path: `.artifacts/p0-close/editable-${test.info().project.name}-${framework}-${mode}-${width}.png`,
          fullPage: true,
          animations: "disabled",
        });
      });
