import { expect, test } from "@playwright/test";
import { openDirection } from "./drawerDirectionChecks";

for (const framework of ["react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    test(`输入中可用视口收缩与弹层焦点 ${framework} ${mode}`, async ({
      page,
    }, info) => {
      test.skip(
        !process.env.STATIC_DIR,
        "消费构建；视口变化模拟不等于系统软键盘",
      );
      await page.setViewportSize({ width: 375, height: 812 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(
        `/examples-${framework}/?example=DrawerDirectionsExample&mode=${mode}`,
      );
      for (const direction of ["up", "down", "start", "end"] as const) {
        const { dialog, trigger } = await openDirection(page, direction, "rtl");
        const field = dialog.getByRole("textbox", {
          name: "Project name",
          exact: true,
        });
        await expect(field).toBeFocused();
        await field.fill("中文项目与软键盘模拟");
        await page.setViewportSize({ width: 375, height: 350 });
        await field.scrollIntoViewIfNeeded();
        await expect(field).toBeFocused();
        await expect(field).toHaveValue("中文项目与软键盘模拟");
        await expect
          .poll(async () => {
            const b = await field.boundingBox();
            return (
              !!b &&
              b.y >= 0 &&
              b.y + b.height <= 351 &&
              b.x >= -1 &&
              b.x + b.width <= 376
            );
          })
          .toBe(true);
        await page.screenshot({
          path: `.artifacts/p1-boundaries/mobile/${info.project.name}-${framework}-${mode}-${direction}.png`,
          fullPage: true,
          animations: "disabled",
        });
        await page.setViewportSize({ width: 375, height: 812 });
        await expect(field).toBeFocused();
        await page.keyboard.press("Escape");
        await expect(dialog).toBeHidden();
        await expect(trigger).toBeFocused();
      }
    });
