import { expect, test } from "@playwright/test";
for (const framework of ["react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`code extension before paint ${framework} ${mode} ${width}`, async ({
        page,
      }) => {
        test.skip(!process.env.STATIC_DIR, "四端消费构建后运行");
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.setViewportSize({ width, height: 1200 });
        await page.goto(
          `/examples-${framework}/?example=CodeEditorExample&mode=${mode}`,
        );
        const root = page.locator('[data-scope="editor"][data-kind="code"]');
        const input = root.getByRole("textbox", {
          name: "Source code",
          exact: true,
        });
        const value = root.locator('textarea[data-part="form-value"]');
        const extensions = page.getByLabel("Editor extensions");
        await expect(root).toHaveAttribute("data-mounted", "true");
        await expect(root).not.toHaveAttribute("aria-busy", "true");
        await page
          .locator("details summary")
          .filter({ hasText: "More controls" })
          .click();
        await page.clock.install();
        await page.clock.pauseAt(new Date(Date.now() + 1000));
        try {
          // 暂停绘制后切换 Props；真实键盘事件必须使用当前扩展，而非上一帧配置。
          await page
            .getByRole("button", { name: "Enable extension", exact: true })
            .press("Enter");
          await expect(
            page.getByRole("button", {
              name: "Disable extension",
              exact: true,
            }),
          ).toBeVisible();
          await input.focus();
          await input.press("Alt+Enter");
          await expect(extensions).toContainText("1 shortcuts");
          const enabledValue = await input.innerText();
          expect(enabledValue).toContain("extension inserted");
          await page
            .getByRole("button", { name: "Disable extension", exact: true })
            .press("Enter");
          await expect(
            page.getByRole("button", { name: "Enable extension", exact: true }),
          ).toBeVisible();
          await input.focus();
          await input.press("Alt+Enter");
          await expect(extensions).toContainText("1 shortcuts");
          expect(await input.innerText()).toBe(enabledValue);
          await expect(input).toBeFocused();
        } finally {
          if (!page.isClosed()) await page.clock.resume();
        }
        await expect(value).toHaveValue(/extension inserted/);
        expect(errors).toEqual([]);
        await page.screenshot({
          path: `.artifacts/gap-completion/editor-frame-${framework}-${mode}-${width}.png`,
          fullPage: true,
        });
      });

for (const framework of ["react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`code native state before paint ${framework} ${mode} ${width}`, async ({
        page,
      }) => {
        test.skip(!process.env.STATIC_DIR, "四端消费构建后运行");
        await page.setViewportSize({ width, height: 1200 });
        await page.goto(
          `/examples-${framework}/?example=CodeEditorExample&mode=${mode}`,
        );
        const root = page.locator('[data-scope="editor"][data-kind="code"]');
        const input = root.getByRole("textbox", {
          name: "Source code",
          exact: true,
        });
        const value = root.locator('textarea[data-part="form-value"]');
        await expect(root).toHaveAttribute("data-mounted", "true");
        await expect(root).not.toHaveAttribute("aria-busy", "true");
        await page
          .locator("details summary")
          .filter({ hasText: "More controls" })
          .click();
        const initial = await value.inputValue();
        const visibleInitial = await input.innerText();
        await page.clock.install();
        await page.clock.pauseAt(new Date(Date.now() + 1000));
        try {
          // 框架属性已提交、编辑器下一帧尚未配置的真实竞争窗口。
          for (const [block, restore] of [
            ["Read only", "Allow editing"],
            ["Disable editor", "Enable editor"],
          ]) {
            await page
              .getByRole("button", { name: block, exact: true })
              .press("Enter");
            await expect(
              page.getByRole("button", { name: restore, exact: true }),
            ).toBeVisible();
            await input.focus();
            await page.keyboard.press("ControlOrMeta+z");
            await page.keyboard.insertText("forbidden");
            expect(await input.innerText()).toBe(visibleInitial);
            await expect(value).toHaveValue(initial);
            await page
              .getByRole("button", { name: restore, exact: true })
              .press("Enter");
          }
          await input.focus();
          await page.keyboard.press("ControlOrMeta+a");
          await page.keyboard.insertText("editable before paint");
          await expect(input.locator(".cm-line").first()).toHaveText(
            "editable before paint",
          );
        } finally {
          if (!page.isClosed()) await page.clock.resume();
        }
        await expect(value).toHaveValue("editable before paint");
      });
