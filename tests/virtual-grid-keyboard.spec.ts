import { expect, test } from "@playwright/test";

for (const framework of ["react", "vue", "solid", "svelte", "Story"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`网格原生输入的 Tab 与编辑状态 ${framework} ${mode} ${width}`, async ({
        page,
      }, info) => {
        test.skip(
          framework === "Story"
            ? !!process.env.STATIC_DIR
            : !process.env.STATIC_DIR,
          "对应消费/Story构建；可信键盘顺序",
        );
        await page.setViewportSize({ width, height: 1000 });
        await page.goto(
          framework === "Story"
            ? `/iframe.html?id=components-virtualgrid--basic&globals=mode:${mode}`
            : `/examples-${framework}/?example=VirtualGridExample&mode=${mode}`,
        );
        const root = page.getByRole("grid", { name: "Windowed cells" });
        await expect(root).toBeVisible();
        await root.evaluate((node) => {
          const before = document.createElement("button"),
            after = document.createElement("button");
          before.textContent = "Before grid";
          after.textContent = "After grid";
          node.before(before);
          node.after(after);
        });
        const cell = (column: number) =>
          root.locator(
            `[data-row-key="row-0"][data-column-key="column-${column}"]`,
          );
        const before = page.getByRole("button", {
          name: "Before grid",
          exact: true,
        });
        const after = page.getByRole("button", {
          name: "After grid",
          exact: true,
        });
        const input = root.getByRole("textbox", {
          name: "Note for row-0",
          exact: true,
        });
        await before.focus();
        await page.keyboard.press("Tab");
        await expect(cell(0)).toBeFocused();
        await page.keyboard.press("Tab");
        await expect(after).toBeFocused();
        await page.keyboard.press("Shift+Tab");
        await expect(cell(0)).toBeFocused();
        await page.clock.install();
        await page.clock.pauseAt(new Date(Date.now() + 1000));
        try {
          await page.keyboard.press("ArrowRight");
          await page.keyboard.press("Enter");
        } finally {
          await page.clock.resume();
        }
        await expect(input).toBeFocused();
        await input.fill("中文草稿");
        await input.press("ArrowLeft");
        await expect(input).toBeFocused();
        expect(
          await input.evaluate(
            (node) => (node as HTMLInputElement).selectionStart,
          ),
        ).toBe(3);
        expect(
          await input.evaluate((node) =>
            node.dispatchEvent(
              new KeyboardEvent("keydown", {
                bubbles: true,
                cancelable: true,
                key: "Escape",
                keyCode: 229,
              }),
            ),
          ),
        ).toBe(true);
        await expect(input).toBeFocused();
        await input.press("Escape");
        await expect(cell(1)).toBeFocused();
        await expect(input).toHaveValue("中文草稿");
        await page.keyboard.press("F2");
        await expect(input).toBeFocused();
        await page.keyboard.press("Tab");
        await expect(after).toBeFocused();
        await page.keyboard.press("Shift+Tab");
        await expect(cell(1)).toBeFocused();
        await page.screenshot({
          path: `.artifacts/p1-boundaries/grid/${info.project.name}-${framework}-${mode}-${width}.png`,
          fullPage: true,
        });
        await page
          .locator("summary")
          .filter({ hasText: "More controls" })
          .click();
        await cell(1).focus();
        await page.keyboard.press("F2");
        await expect(input).toBeFocused();
        const remove = page.getByRole("button", {
          name: "Remove first item",
          exact: true,
        });
        // 只改变数据，模拟服务端删除；可信点击会先转走输入焦点，无法覆盖此边界。
        await remove.evaluate((node) => (node as HTMLButtonElement).click());
        await expect(
          root.locator('[data-row-key="row-1"][data-column-key="column-1"]'),
        ).toBeFocused();
        await expect(root).toHaveAttribute("aria-rowcount", "9999");
        await after.focus();
        await remove.evaluate((node) => (node as HTMLButtonElement).click());
        await expect(root).toHaveAttribute("aria-rowcount", "9998");
        await expect(after).toBeFocused();
        await page
          .getByRole("button", { name: "Clear data", exact: true })
          .click();
        await expect(root).toHaveAttribute("aria-rowcount", "0");
        // 空状态的语义与 Tab 入口必须同一次提交可用，不能依赖后续 RAF。
        await expect(root).toHaveAttribute("tabindex", "0");
        await before.focus();
        await page.keyboard.press("Tab");
        await expect(root).toBeFocused();
        await page.keyboard.press("Tab");
        await expect(after).toBeFocused();
        await page
          .getByRole("button", { name: "Restore data", exact: true })
          .click();
        await before.focus();
        await page.keyboard.press("Tab");
        await expect(
          root.locator('[data-part="cell"][tabindex="0"]'),
        ).toBeFocused();
      });
