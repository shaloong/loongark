import { expect, test } from "@playwright/test";
for (const framework of ["Story", "react", "vue", "solid", "svelte"])
  test(`TagsInput pending restore respects Tab ${framework}`, async ({
    page,
  }) => {
    test.skip(
      framework === "Story"
        ? !!process.env.STATIC_DIR
        : !process.env.STATIC_DIR,
    );
    await page.clock.install();
    await page.goto(
      framework === "Story"
        ? "/iframe.html?id=components-tagsinput--basic"
        : `/examples-${framework}/?example=TagsInputExample`,
    );
    const root = page
      .locator("[data-scope=tags-input][data-part=root]")
      .first();
    const input = root.locator("[data-part=input]");
    const clear = root.locator("[data-part=clear-trigger]");
    await expect(input).toBeVisible();
    await input.fill("Pending");
    await input.press("Enter");
    await expect(root.locator("[data-part=item]")).toHaveCount(4);
    await page.clock.runFor(100);
    await page.clock.pauseAt(await page.evaluate(() => Date.now() + 1000));
    await input.press("ArrowLeft");
    await input.press("Delete");
    await expect(root.locator("[data-part=item]")).toHaveCount(3);
    await input.press("Tab");
    await expect(clear).toBeFocused();
    // 不让下一帧运行直到 Tab 已完成，真实复现 CI 中删除后延迟 focus 的竞争。
    await page.clock.runFor(100);
    await expect(clear).toBeFocused();
    await page.keyboard.press("Enter");
    await page.clock.runFor(100);
    await expect(input).toBeFocused();
    await expect(root.locator("[data-part=item]")).toHaveCount(0);
  });

for (const framework of ["Story", "react", "vue", "solid", "svelte"])
  test(`TagsInput cancelled readonly key preserves Tab ${framework}`, async ({
    page,
  }) => {
    test.skip(
      framework === "Story"
        ? !!process.env.STATIC_DIR
        : !process.env.STATIC_DIR,
    );
    await page.clock.install();
    await page.goto(
      framework === "Story"
        ? "/iframe.html?id=components-radiogroup--responsive-controls"
        : `/examples-${framework}/?example=SelectionControlsExample`,
    );
    const form = page.getByRole("form", { name: "Selection preferences" });
    await expect(form).toBeVisible();
    await page.locator("details > summary").first().click();
    await page.getByRole("button", { name: "Read only", exact: true }).click();
    const tags = form.locator("[data-scope=tags-input][data-part=input]");
    const group = form.locator("[data-scope=radio-group][data-part=root]");
    const radio = group.locator("input:checked");
    await expect(tags).toHaveJSProperty("readOnly", true);
    await expect(group).toHaveAttribute("aria-readonly", "true");
    await page.clock.runFor(100);
    await page.clock.pauseAt(await page.evaluate(() => Date.now() + 1000));
    await tags.focus();
    await page.keyboard.press("Shift+Tab");
    // Ark 的只读外框也是原生 Tab 停靠点，继续 Shift+Tab 才离开整个组件。
    await expect(
      form.locator("[data-scope=tags-input][data-part=control]"),
    ).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(radio).toBeFocused();
    await page.keyboard.press("ArrowRight");
    await expect(radio).toBeFocused();
    // 被只读控件取消的方向键没有新的焦点请求，不能解除此前真实 Tab 的保护。
    await page.clock.runFor(100);
    await expect(radio).toBeFocused();
    await expect(radio).toHaveValue("compact");
    // 新的有效按键必须同步解除保护，不能拦截调用方处理器内的 focus()。
    await tags.focus();
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Shift+Tab");
    await expect(radio).toBeFocused();
    await radio.evaluate((node) => {
      node.addEventListener("keydown", (event) => {
        if ((event as KeyboardEvent).key === "Enter")
          document
            .querySelector<HTMLInputElement>(
              "[data-scope=tags-input][data-part=input]",
            )
            ?.focus();
      });
    });
    await page.keyboard.press("Enter");
    await expect(tags).toBeFocused();
    await page.clock.runFor(100);
    await expect(tags).toBeFocused();
  });
