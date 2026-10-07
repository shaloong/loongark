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
