import { expect, test } from "@playwright/test";

for (const mode of ["light", "dark"])
  for (const width of [1280, 375]) {
    test(`必填标签保持行内 ${mode} ${width}`, async ({ page }) => {
      test.skip(!!process.env.STATIC_DIR, "Story 默认布局专项");
      await page.setViewportSize({ width, height: 812 });
      await page.goto(
        `/iframe.html?id=components-field--basic&globals=mode:${mode}`,
      );
      await page
        .locator("#loongark-primitive-extended")
        .waitFor({ state: "attached" });
      const label = page.locator("[data-scope=field][data-part=label]");
      await expect(label).toBeVisible();
      const bounds = await label.evaluate((el) => {
        const text = document.createRange();
        text.selectNodeContents(el.firstChild!);
        const a = text.getBoundingClientRect();
        const b = el
          .querySelector("[data-part=required-indicator]")!
          .getBoundingClientRect();
        return {
          sameLine: Math.abs(a.top - b.top),
          afterText: b.left - a.right,
        };
      });
      expect(bounds.sameLine).toBeLessThan(2);
      expect(bounds.afterText).toBeGreaterThanOrEqual(-1);
      await label.click();
      await expect(page.getByRole("textbox")).toBeFocused();
      await page.screenshot({
        path: `.artifacts/p0-close/default-corrections/${test.info().project.name}-field-${mode}-${width}.png`,
        animations: "disabled",
      });
    });

    test(`角度拇指与键盘和指针值一致 ${mode} ${width}`, async ({ page }) => {
      test.skip(!!process.env.STATIC_DIR, "Story 默认布局专项");
      await page.setViewportSize({ width, height: 812 });
      await page.goto(
        `/iframe.html?id=components-angleslider--basic&globals=mode:${mode}`,
      );
      await page
        .locator("#loongark-primitive-extended")
        .waitFor({ state: "attached" });
      const thumb = page.getByRole("slider", { name: "Rotation" });
      const control = page.locator(
        "[data-scope=angle-slider][data-part=control]",
      );
      await expect(thumb).toHaveAttribute("aria-valuenow", "45");
      const checkPosition = async () => {
        await expect
          .poll(() =>
            thumb.evaluate((el) => {
              const a = el.getBoundingClientRect();
              const b = el.parentElement!.getBoundingClientRect();
              const x = a.x + a.width / 2 - b.x - b.width / 2;
              const y = a.y + a.height / 2 - b.y - b.height / 2;
              const angle = ((Math.atan2(y, x) * 180) / Math.PI + 450) % 360;
              const value = Number(el.getAttribute("aria-valuenow"));
              return Math.min(
                Math.abs(angle - value),
                360 - Math.abs(angle - value),
              );
            }),
          )
          .toBeLessThan(1);
      };
      await checkPosition();
      await page.screenshot({
        path: `.artifacts/p0-close/default-corrections/${test.info().project.name}-angle45-${mode}-${width}.png`,
        animations: "disabled",
      });
      await thumb.focus();
      await thumb.press("Home");
      await expect(thumb).toHaveAttribute("aria-valuenow", "0");
      await checkPosition();
      await thumb.press("ArrowRight");
      await expect(thumb).toHaveAttribute("aria-valuenow", "1");
      await checkPosition();
      const box = (await control.boundingBox())!;
      await page.mouse.click(box.x + box.width / 2, box.y + box.height - 10);
      await expect(thumb).toHaveAttribute("aria-valuenow", "180");
      await checkPosition();
      await expect(page.locator('input[name="rotation"]')).toHaveValue("180");
      await page.screenshot({
        path: `.artifacts/p0-close/default-corrections/${test.info().project.name}-angle180-${mode}-${width}.png`,
        animations: "disabled",
      });
    });
  }
