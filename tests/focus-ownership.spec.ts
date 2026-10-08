import { expect, test } from "@playwright/test";

declare global {
  interface Window {
    heldFocusFrames: Map<number, FrameRequestCallback>;
    originalFocusRAF: typeof requestAnimationFrame;
    originalFocusCancel: typeof cancelAnimationFrame;
  }
}

for (const framework of ["react", "vue", "solid", "svelte"]) {
  test(`queued column navigation ${framework}`, async ({ page }) => {
    test.skip(!process.env.STATIC_DIR, "四端发布产物回归");
    await page.setViewportSize({ width: 375, height: 1100 });
    await page.goto(`/examples-${framework}/?example=TableColumnWindowExample`);
    await page
      .getByRole("button", { name: "Go to column 41", exact: true })
      .click();
    const grid = page.getByRole("grid", { name: "Windowed projects" });
    await grid
      .locator('td[data-cell-row="row-0"][data-cell-column="c40"]')
      .focus();
    await page.evaluate(() => {
      window.originalFocusRAF = requestAnimationFrame;
      window.originalFocusCancel = cancelAnimationFrame;
      window.heldFocusFrames = new Map();
      let next = 100000;
      window.requestAnimationFrame = (callback) => {
        const id = next++;
        window.heldFocusFrames.set(id, callback);
        return id;
      };
      window.cancelAnimationFrame = (id) => {
        window.heldFocusFrames.delete(id);
        window.originalFocusCancel(id);
      };
    });
    for (let index = 0; index < 15; index++)
      await page.keyboard.press("ArrowRight");
    await page.evaluate(() => {
      const frames = [...window.heldFocusFrames.values()];
      window.heldFocusFrames.clear();
      window.requestAnimationFrame = window.originalFocusRAF;
      window.cancelAnimationFrame = window.originalFocusCancel;
      for (const callback of frames) callback(performance.now());
    });
    await expect(
      grid.locator('td[data-cell-row="row-0"][data-cell-column="c55"]'),
    ).toBeFocused();
    await page.keyboard.press("Shift+ArrowLeft");
    await expect(
      grid.locator('td[data-cell-row="row-0"][data-cell-column="c54"]'),
    ).toBeFocused();
    await expect(page.locator('[data-part="range-status"]')).toHaveText(
      "2 cells selected",
    );
    // 旧锚点可能已退出列窗口；复制仍须包含两格，不能依赖离屏节点继续挂载。
    const copied = await grid
      .locator('td[data-cell-row="row-0"][data-cell-column="c54"]')
      .evaluate((node) => {
        const clipboard = new DataTransfer();
        const event = new ClipboardEvent("copy", {
          bubbles: true,
          cancelable: true,
          clipboardData: clipboard,
        });
        node.dispatchEvent(event);
        return event.clipboardData?.getData("text/plain");
      });
    expect(copied).toBe("R1 · C55\tR1 · C56");
  });

  test(`submit ownership ${framework}`, async ({ page }) => {
    test.skip(!process.env.STATIC_DIR, "四端发布产物回归");
    await page.goto(
      `/examples-${framework}/?example=QuestionnaireGroupsExample`,
    );
    await page.locator("summary").click();
    await page
      .getByRole("button", { name: "Show advanced questions", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Require clarity first", exact: true })
      .click();
    const submit = page.locator('form button[type="submit"]');
    // Safari 的鼠标提交可以保留 body 焦点；此处保留真实 SubmitEvent 与 submitter。
    await submit.evaluate((node) => {
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur();
      node.addEventListener("mousedown", (event) => event.preventDefault());
    });
    await expect(page.locator("body")).toBeFocused();
    await submit.click();
    await expect(
      page.getByText("Put clarity first.", { exact: true }).first(),
    ).toBeVisible();
    const invalid = page
      .locator('[data-part="group-question"][aria-invalid="true"]')
      .first();
    await expect(
      invalid.getByRole("button", { name: "Reorder: Quality", exact: true }),
    ).toBeFocused();
    // 外部控件调用原生 requestSubmit 时，不抢走该控件的焦点。
    const outside = page.getByRole("button", {
      name: "Hide advanced questions",
      exact: true,
    });
    await outside.focus();
    await submit.evaluate((node) => {
      if (node instanceof HTMLButtonElement) node.form?.requestSubmit(node);
    });
    await expect(outside).toBeFocused();
    await page.evaluate(
      () =>
        new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        ),
    );
    await expect(outside).toBeFocused();
    await page.screenshot({
      path: `.artifacts/gap-completion/submit-ownership-${framework}.png`,
      fullPage: true,
    });
  });

  test(`batch field deferred focus ${framework}`, async ({ page }) => {
    test.skip(!process.env.STATIC_DIR, "四端发布产物回归");
    await page.goto(`/examples-${framework}/?example=DataTableBatchExample`);
    await page
      .getByRole("button", { name: "Edit selected", exact: true })
      .click();
    const form = page.getByRole("form", { name: "Batch edit" });
    await expect(form).toBeVisible();
    await page.evaluate(() => {
      window.originalFocusRAF = requestAnimationFrame;
      window.originalFocusCancel = cancelAnimationFrame;
      window.heldFocusFrames = new Map();
      let next = 100000;
      window.requestAnimationFrame = (callback) => {
        const id = next++;
        window.heldFocusFrames.set(id, callback);
        return id;
      };
      window.cancelAnimationFrame = (id) => {
        window.heldFocusFrames.delete(id);
        window.originalFocusCancel(id);
      };
    });
    await form
      .getByRole("checkbox", { name: "Change Revenue", exact: true })
      .check();
    await form
      .getByRole("checkbox", { name: "Change Owner", exact: true })
      .check();
    await form.getByLabel("Owner", { exact: true }).selectOption("Platform");
    const amount = form.getByLabel("Revenue", { exact: true });
    await amount.focus();
    await page.evaluate(() => {
      const frames = [...window.heldFocusFrames.values()];
      window.heldFocusFrames.clear();
      window.requestAnimationFrame = window.originalFocusRAF;
      window.cancelAnimationFrame = window.originalFocusCancel;
      for (const callback of frames) callback(performance.now());
    });
    // 用户转到另一个字段后，旧字段恢复任务不得截走原生输入。
    await expect(amount).toBeFocused();
    await page.keyboard.insertText("-1");
    await expect(amount).toHaveValue("-1");
    await page.keyboard.press("Control+Enter");
    await expect(page.getByRole("alert")).toContainText(
      "Revenue cannot be negative",
    );
    await expect(amount).toBeFocused();
    await page.screenshot({
      path: `.artifacts/gap-completion/batch-focus-${framework}.png`,
      fullPage: true,
    });
  });

  for (const reverse of [false, true]) {
    test(`tree editor deferred focus ${framework} ${reverse ? "reverse" : "forward"}`, async ({
      page,
    }) => {
      test.skip(!process.env.STATIC_DIR, "四端发布产物回归");
      await page.goto(
        `/examples-${framework}/?example=DataTableStructureExample`,
      );
      await page
        .getByRole("button", { name: "Show tree rows", exact: true })
        .click();
      await page
        .getByRole("button", { name: "Expand all", exact: true })
        .click();
      await page
        .getByRole("button", { name: /^Edit Project for tokens:/ })
        .click();
      const input = page.getByRole("textbox", {
        name: "Edit Project for tokens",
        exact: true,
      });
      await input.fill("Tokens edited in hierarchy");
      await page.evaluate(() => {
        window.originalFocusRAF = requestAnimationFrame;
        window.originalFocusCancel = cancelAnimationFrame;
        window.heldFocusFrames = new Map();
        let next = 100000;
        window.requestAnimationFrame = (callback) => {
          const id = next++;
          window.heldFocusFrames.set(id, callback);
          return id;
        };
        window.cancelAnimationFrame = (id) => {
          window.heldFocusFrames.delete(id);
          window.originalFocusCancel(id);
        };
      });
      await input.press("Enter");
      const saved = page.getByRole("button", {
        name: /^Edit Project for tokens: Tokens edited/,
      });
      await expect(saved).toBeVisible();
      await saved.focus();
      // 外部受控收起可以不改变当前焦点；结构层应把隐藏后代交还可见祖先。
      await page
        .getByRole("button", { name: "Collapse all", exact: true })
        .evaluate((node) => node.click());
      const ancestor = page.getByRole("button", {
        name: "Expand atlas",
        exact: true,
      });
      await expect(ancestor).toBeVisible();
      await page.evaluate((reverse) => {
        const frames = [...window.heldFocusFrames.values()];
        window.heldFocusFrames.clear();
        window.requestAnimationFrame = window.originalFocusRAF;
        window.cancelAnimationFrame = window.originalFocusCancel;
        for (const callback of reverse ? frames.reverse() : frames)
          callback(performance.now());
      }, reverse);
      await expect(ancestor).toBeFocused();
      await page.evaluate(
        () =>
          new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
          ),
      );
      await expect(ancestor).toBeFocused();
      await page.screenshot({
        path: `.artifacts/gap-completion/tree-focus-${framework}-${reverse}.png`,
        fullPage: true,
      });
    });
  }
}
