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
      // 语法着色会替换行节点；选取与测量必须位于同一个页面任务，
      // 否则 Locator 返回的旧行可能已脱离 DOM，计算样式为空。
      const measure = () =>
        page.evaluate(() => {
          const node = document.querySelector(".cm-content .cm-line");
          if (!(node instanceof HTMLElement) || !node.isConnected)
            throw new Error("未找到活动的代码行");
          const style = getComputedStyle(node);
          if (!style.fontFamily || !style.fontSize)
            throw new Error("活动代码行的计算字体为空");
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
      const widths = await measure();
      expect(widths[0]).toBeGreaterThan(0);
      expect(Math.abs(widths[0] - widths[1])).toBeLessThan(0.05);

      // 负例确保测量确实读取编辑器的字体，不能仅验证 mono 字符串。
      const content = page.locator(".cm-content");
      const original = await content.evaluate((node) => {
        const previous = node.style.getPropertyValue("font-family");
        const priority = node.style.getPropertyPriority("font-family");
        node.style.setProperty("font-family", "serif", "important");
        return { previous, priority };
      });
      try {
        const proportional = await measure();
        expect(Math.abs(proportional[0] - proportional[1])).toBeGreaterThan(1);
      } finally {
        await content.evaluate((node, { previous, priority }) => {
          if (previous) node.style.setProperty("font-family", previous, priority);
          else node.style.removeProperty("font-family");
        }, original);
      }
    });
