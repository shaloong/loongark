import { expect, test } from "@playwright/test";

for (const framework of ["react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"]) {
    test(`连续方向键在绘制前累计 ${framework} ${mode}`, async ({ page }) => {
      test.skip(!process.env.STATIC_DIR, "四端发布消费");
      await page.goto(
        `/examples-${framework}/?example=VirtualGridExample&mode=${mode}`,
      );
      const cell = (column: number) =>
        page.locator(
          `[data-scope="virtual-grid"] [data-row-key="row-0"][data-column-key="column-${column}"]`,
        );
      await expect(cell(0)).toBeVisible();
      await cell(0).focus();
      await page.clock.install();
      await page.clock.pauseAt(new Date(Date.now() + 1000));
      try {
        for (let i = 0; i < 12; i++) await page.keyboard.press("ArrowRight");
      } finally {
        await page.clock.resume();
      }
      await expect(cell(12)).toBeFocused();
      await expect(
        page.locator(
          '[data-scope="virtual-grid"] [data-part="cell"][tabindex="0"]',
        ),
      ).toHaveCount(1);
      expect(
        await cell(12).evaluate((node) =>
          node.dispatchEvent(
            new KeyboardEvent("keydown", {
              bubbles: true,
              cancelable: true,
              key: "ArrowRight",
              keyCode: 229,
            }),
          ),
        ),
      ).toBe(true);
      await expect(cell(12)).toBeFocused();
      const outside = page.getByRole("button", {
        name: "Go to first item",
        exact: true,
      });
      await page.clock.pauseAt(new Date(Date.now() + 1000));
      try {
        await page.keyboard.press("ArrowRight");
        await outside.focus();
      } finally {
        await page.clock.resume();
      }
      await expect(cell(13)).toHaveAttribute("tabindex", "0");
      await expect(outside).toBeFocused();
    });

    test(`列排序组合取消不打断键盘会话 ${framework} ${mode}`, async ({
      page,
    }) => {
      test.skip(!process.env.STATIC_DIR, "四端发布消费；组合事件契约");
      await page.goto(
        `/examples-${framework}/?example=DataTableColumnsExample&mode=${mode}`,
      );
      const handle = page.locator(
        '[data-part="column-move"][data-column-key="name"]',
      );
      await handle.press("Space");
      await handle.press("ArrowRight");
      for (const composing of [true, false]) {
        expect(
          await handle.evaluate(
            (node, composing) =>
              node.dispatchEvent(
                new KeyboardEvent("keydown", {
                  bubbles: true,
                  cancelable: true,
                  key: "Escape",
                  isComposing: composing,
                  keyCode: composing ? 27 : 229,
                }),
              ),
            composing,
          ),
        ).toBe(true);
        await expect(handle).toHaveAttribute("aria-pressed", "true");
      }
      await handle.press("Escape");
      await expect(handle).toHaveAttribute("aria-pressed", "false");
      await expect(
        page.locator("thead th[data-column-key]").first(),
      ).toHaveAttribute("data-column-key", "name");
      await expect(handle).toBeFocused();
    });

    test(`表格组合确认不提前保存或取消 ${framework} ${mode}`, async ({
      page,
    }) => {
      test.skip(!process.env.STATIC_DIR, "四端发布消费；事件契约不冒充系统IME");
      await page.goto(
        `/examples-${framework}/?example=DataTableComplexEditorsExample&mode=${mode}`,
      );
      await page
        .getByRole("button", { name: /^Edit Project for alpha: / })
        .click();
      const input = page.locator('[data-part="cell-input"]');
      await input.fill("中文输入草稿");
      for (const composing of [true, false]) {
        for (const key of ["Enter", "Escape"]) {
          const accepted = await input.evaluate(
            (node, details) =>
              node.dispatchEvent(
                new KeyboardEvent("keydown", {
                  bubbles: true,
                  cancelable: true,
                  key: details.key,
                  ctrlKey: true,
                  isComposing: details.composing,
                  keyCode: details.composing ? 13 : 229,
                }),
              ),
            { key, composing },
          );
          expect(accepted).toBe(true);
          await expect(input).toHaveValue("中文输入草稿");
          await expect(input).toBeEnabled();
        }
      }
      await input.press("Control+Enter");
      await expect(page.locator("output")).toContainText("中文输入草稿");
      await expect(input).toHaveCount(0);
    });

    test(`富文本链接组合确认保留面板 ${framework} ${mode}`, async ({
      page,
    }) => {
      test.skip(!process.env.STATIC_DIR, "四端发布消费；事件契约不冒充系统IME");
      await page.goto(
        `/examples-${framework}/?example=RichTextEditorExample&mode=${mode}`,
      );
      const root = page.locator('[data-scope="editor"][data-kind="rich"]');
      await expect(root).toHaveAttribute("data-mounted", "true");
      await root.getByRole("button", { name: "Link", exact: true }).click();
      const input = root.locator('[data-part="link-url"]');
      await input.fill("https://example.com/中文");
      for (const composing of [true, false]) {
        for (const key of ["Enter", "Escape"]) {
          expect(
            await input.evaluate(
              (node, details) =>
                node.dispatchEvent(
                  new KeyboardEvent("keydown", {
                    bubbles: true,
                    cancelable: true,
                    key: details.key,
                    isComposing: details.composing,
                    keyCode: details.composing ? 13 : 229,
                  }),
                ),
              { key, composing },
            ),
          ).toBe(true);
          await expect(input).toBeVisible();
          await expect(input).toHaveValue("https://example.com/中文");
        }
      }
      await input.press("Escape");
      await expect(input).not.toBeVisible();
      await expect(root.locator(".ProseMirror")).toBeFocused();
    });

    test(`排序和图表不消费组合取消键 ${framework} ${mode}`, async ({
      page,
    }) => {
      test.skip(!process.env.STATIC_DIR, "四端发布消费；组合事件契约");
      await page.goto(
        `/examples-${framework}/?example=QuestionnaireRankingExample&mode=${mode}`,
      );
      const key = await page
        .locator('[data-question-control="rank-drag"]')
        .first()
        .getAttribute("data-key");
      const handle = page.locator(
        `[data-question-control="rank-drag"][data-key="${key}"]`,
      );
      await expect(handle).toBeVisible();
      for (const composing of [true, false]) {
        expect(
          await handle.evaluate(
            (node, composing) =>
              node.dispatchEvent(
                new KeyboardEvent("keydown", {
                  bubbles: true,
                  cancelable: true,
                  key: "Enter",
                  isComposing: composing,
                  keyCode: composing ? 13 : 229,
                }),
              ),
            composing,
          ),
        ).toBe(true);
        await expect(handle).toHaveAttribute("aria-pressed", "false");
      }
      await handle.press("Space");
      await expect(handle).toHaveAttribute("aria-pressed", "true");
      await handle.press("ArrowDown");
      await handle.press("Enter");
      await expect(page.getByLabel("Ranking updates")).toHaveText(
        "1 callbacks",
      );

      await page.goto(
        `/examples-${framework}/?example=ChartInteractionExample&mode=${mode}`,
      );
      const chart = page.locator('[data-scope="chart"]');
      await chart.locator('[data-chart-index="4"]').first().hover();
      await expect(chart.getByRole("tooltip")).toBeVisible();
      for (const composing of [true, false]) {
        await page.evaluate(
          (composing) =>
            document.dispatchEvent(
              new KeyboardEvent("keydown", {
                bubbles: true,
                cancelable: true,
                key: "Escape",
                isComposing: composing,
                keyCode: composing ? 27 : 229,
              }),
            ),
          composing,
        );
        await expect(chart.getByRole("tooltip")).toBeVisible();
      }
      await page.keyboard.press("Escape");
      await expect(chart.getByRole("tooltip")).toHaveCount(0);
    });
  }

for (const framework of ["react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const kind of ["code", "rich"] as const)
      test(`浏览器中文组合输入与受控拒绝 ${kind} ${framework} ${mode}`, async ({
        page,
      }, info) => {
        test.skip(
          !process.env.STATIC_DIR || info.project.name !== "chromium",
          "仅 Chromium CDP 输入协议；不是系统IME或真机",
        );
        await page.goto(
          `/examples-${framework}/?example=${kind === "code" ? "CodeEditorExample" : "RichTextEditorExample"}&mode=${mode}`,
        );
        const root = page.locator(`[data-scope="editor"][data-kind="${kind}"]`);
        await expect(root).toHaveAttribute("data-mounted", "true");
        const input = root.getByRole("textbox");
        const value = root.locator('textarea[data-part="form-value"]');
        const session = await page.context().newCDPSession(page);
        const compose = async (text: string) => {
          await input.click();
          await input.press("ControlOrMeta+a");
          for (let length = 1; length <= text.length; length++)
            await session.send("Input.imeSetComposition", {
              text: text.slice(0, length),
              selectionStart: length,
              selectionEnd: length,
            });
          await session.send("Input.insertText", { text });
        };
        try {
          await compose("中文输入法测试");
          await expect(input).toHaveText("中文输入法测试");
          await expect(value).toHaveValue(/中文输入法测试/);
          const accepted = await value.inputValue();
          expect(accepted).toContain("中文输入法测试");
          await page
            .getByRole("button", { name: "Use controlled value", exact: true })
            .click();
          await page
            .locator("details summary")
            .filter({ hasText: "More controls" })
            .click();
          await page
            .getByRole("button", { name: "Reject updates", exact: true })
            .click();
          await compose("不应接受的中文");
          await expect(input).toHaveText("中文输入法测试");
          await expect(value).toHaveValue(accepted);
          await expect(input).toBeFocused();
        } finally {
          await session.detach();
        }
      });
