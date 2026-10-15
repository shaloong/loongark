import { expect, test } from "@playwright/test";

for (const framework of ["react", "vue", "solid", "svelte"])
  test(`rich toolbar pointer across paint ${framework}`, async ({ page }) => {
    test.skip(!process.env.STATIC_DIR, "四端消费构建后运行");
    await page.setViewportSize({ width: 1280, height: 1200 });
    await page.goto(`/examples-${framework}/?example=RichTextEditorExample&mode=dark`);
    const root = page.locator('[data-scope="editor"][data-kind="rich"]');
    await expect(root).toHaveAttribute("data-mounted", "true");
    await page.locator("details summary").filter({ hasText: "More controls" }).click();
    await page.getByRole("button", { name: "Insert table through handle", exact: true }).click();
    await expect(root.locator("table")).toHaveCount(1);
    await root.locator('[data-part="table-tools"] summary').click();
    const remove = root.getByRole("button", { name: "Delete table", exact: true });
    await expect(remove).toBeEnabled();
    const cell = await root.locator("td").last().boundingBox();
    const label = await remove.locator("span").boundingBox();
    expect(cell).not.toBeNull();
    expect(label).not.toBeNull();
    if (!cell || !label) throw new Error("表格与工具栏必须有可见边界");
    await remove.evaluate(button => {
      button.addEventListener("click", event => {
        button.setAttribute("data-test-trusted-click", String(event.isTrusted));
      }, { once: true, capture: true });
    });
    await page.clock.install();
    await page.clock.pauseAt(new Date(Date.now() + 1000));
    try {
      await page.mouse.click(cell.x + cell.width / 2, cell.y + cell.height / 2);
      await page.mouse.move(label.x + label.width / 2, label.y + label.height / 2);
      await page.mouse.down();
      await page.clock.runFor(40);
      await page.mouse.up();
      await expect(remove).toHaveAttribute("data-test-trusted-click", "true");
      await expect(root.locator("table")).toHaveCount(0);
    } finally {
      await page.clock.resume();
    }
  });

for (const framework of ["react", "vue", "solid", "svelte"])
  test(`rich link pointer across paint ${framework}`, async ({ page }) => {
    test.skip(!process.env.STATIC_DIR, "四端消费构建后运行");
    await page.setViewportSize({ width: 1280, height: 1200 });
    await page.goto(`/examples-${framework}/?example=RichTextEditorExample&mode=dark`);
    const root = page.locator('[data-scope="editor"][data-kind="rich"]');
    await expect(root).toHaveAttribute("data-mounted", "true");
    const input = root.getByRole("textbox", { name: "Document", exact: true });
    await input.click();
    await input.press("ControlOrMeta+a");
    await root.getByRole("button", { name: "Link", exact: true }).click();
    await root.getByRole("textbox", { name: "Link URL", exact: true }).fill("https://shaloong.com/docs");
    const apply = root.getByRole("button", { name: "Apply link", exact: true, includeHidden: true });
    await expect(apply).toBeVisible();
    await apply.evaluate(button => {
      button.addEventListener("click", event => {
        button.setAttribute("data-test-trusted-click", String(event.isTrusted));
      }, { once: true, capture: true });
    });
    await page.clock.install();
    await page.clock.pauseAt(new Date(Date.now() + 1000));
    try {
      await input.focus();
      await input.press("ArrowRight");
      const box = await apply.boundingBox();
      if (!box) throw new Error("链接操作必须有可见边界");
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      await page.clock.runFor(40);
      await page.mouse.up();
      await expect(apply).toHaveAttribute("data-test-trusted-click", "true");
      await expect(root.locator('[data-part="link-editor"]')).toBeHidden();
      await expect(input.locator("a").first()).toHaveAttribute("href", "https://shaloong.com/docs");
    } finally {
      await page.clock.resume();
    }
  });

test("rich React input survives a delayed render commit", async ({ page }) => {
  test.skip(!process.env.STATIC_DIR, "四端消费构建后运行");
  await page.addInitScript(() => {
    const NativeMessageChannel = MessageChannel;
    window.MessageChannel = class extends NativeMessageChannel {
      constructor() {
        super();
        const port = this.port1;
        Object.defineProperty(port, "onmessage", {
          set(handler: (event: MessageEvent) => void) {
            port.addEventListener("message", event => setTimeout(() => handler(event), 150));
            port.start();
          },
        });
      }
    };
  });
  await page.goto("/examples-react/?example=RichTextEditorExample&mode=dark");
  const root = page.locator('[data-scope="editor"][data-kind="rich"]');
  const input = root.getByRole("textbox", { name: "Document", exact: true });
  await expect(root).toHaveAttribute("data-mounted", "true");
  await page.locator("details summary").filter({ hasText: "More controls" }).click();
  await page.getByRole("button", { name: "Clear required value", exact: true }).click();
  await expect(input).toHaveText("");
  await input.focus();
  await page.clock.install();
  await page.clock.pauseAt(new Date(Date.now() + 1000));
  try {
    await input.press("-");
    await page.clock.runFor(40);
    await expect(input).toHaveText("-");
    await input.press("Space");
    await page.clock.runFor(40);
    await expect(input.locator("ul li")).toHaveCount(1);
  } finally {
    await page.clock.resume();
  }
  await page.getByRole("button", { name: "Reject updates", exact: true }).click();
  await expect(page.getByRole("button", { name: "Accept updates", exact: true })).toBeVisible();
  await input.focus();
  await input.pressSequentially("rejected");
  await expect(input).toHaveText("");
  await expect(input.locator("ul li")).toHaveCount(1);
  await page.getByRole("button", { name: "Set external value", exact: true }).click();
  await expect(input).toHaveText("External structured document");
});

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
