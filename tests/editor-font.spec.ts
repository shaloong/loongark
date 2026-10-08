import { expect, test } from "@playwright/test";
for (const framework of ["react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    test(`code columns use a monospace font ${framework} ${mode}`, async ({
      page,
    }) => {
      test.skip(!process.env.STATIC_DIR, "验证四端实际发布产物");
      await page.goto(
        `/examples-${framework}/?example=CodeEditorExample&mode=${mode}`,
      );
      await page
        .locator("#loongark-primitive-editor")
        .waitFor({ state: "attached" });
      await expect(
        page.locator('[data-scope="editor"][data-kind="code"]'),
      ).toHaveAttribute("data-mounted", "true");
      await expect(page.locator(".cm-content")).toBeVisible();
      // 测量实际继承的字体，样式包含 mono 文字不代表浏览器真的使用等宽字形。
      await page.evaluate(() => document.fonts.ready.then(() => {}));
      const widths = await page
        .locator(".cm-line")
        .first()
        .evaluate((node) => {
          const style = getComputedStyle(node);
          const sample = document.createElement("span");
          sample.style.cssText =
            "position:fixed;visibility:hidden;white-space:pre";
          sample.style.fontFamily = style.fontFamily;
          sample.style.fontSize = style.fontSize;
          sample.style.fontWeight = style.fontWeight;
          document.body.append(sample);
          try {
            sample.textContent = "iiii";
            const narrow = sample.getBoundingClientRect().width;
            sample.textContent = "WWWW";
            return [narrow, sample.getBoundingClientRect().width];
          } finally {
            sample.remove();
          }
        });
      expect(widths[0]).toBeGreaterThan(0);
      expect(Math.abs(widths[0] - widths[1])).toBeLessThan(0.05);
    });
