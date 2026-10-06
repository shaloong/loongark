import { expect, test } from "@playwright/test";

for (const framework of ["react", "vue", "solid", "svelte"]) {
  test(`chart enlarged category stays bounded ${framework}`, async ({
    page,
  }) => {
    test.skip(!process.env.STATIC_DIR, "四端发布产物布局回归");
    await page.setViewportSize({ width: 375, height: 1100 });
    await page.goto(`/examples-${framework}/?example=ChartInteractionExample`);
    const category = page.locator('[data-part="inspect-category"]');
    await expect(category).toBeVisible();
    // 模拟调用方放大控件字体；较长的原有类别名称仍须留在窄屏内。
    await page.addStyleTag({
      content:
        "[data-scope=chart] [data-part=inspect-category]{font-size:24px}",
    });
    await page.evaluate(
      () =>
        new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        ),
    );
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(375);
    await category.focus();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await page.keyboard.press("Escape");
    await expect(category).toHaveValue("1");
    await expect(page.locator('[data-part="inspection"]')).toContainText(
      "Sample 02",
    );
    await expect(category).toBeFocused();
    await page.screenshot({
      path: `.artifacts/gap-completion/layout-chart-${framework}.png`,
      fullPage: true,
    });
  });

  for (const kind of ["select", "sheet"]) {
    test(`closing ${kind} survives viewport resize ${framework}`, async ({
      page,
    }) => {
      test.skip(!process.env.STATIC_DIR, "四端发布产物布局回归");
      await page.setViewportSize({ width: 1280, height: 780 });
      await page.goto(`/${framework}/`);
      await page.getByTestId("mode").click();
      // 保留退出过程中的真实 DOM，并停在动画中段，稳定覆盖旧测量与缩屏并存的状态。
      await page.addStyleTag({
        content:
          ":is([data-scope=select],[data-scope=sheet])[data-part=content][data-state=closed]{animation-duration:60s;animation-delay:-30s;animation-play-state:paused}",
      });
      const trigger =
        kind === "select"
          ? page.getByTestId("select")
          : page.getByRole("button", { name: "Open sheet", exact: true });
      if (kind === "select") {
        await trigger.focus();
        await page.keyboard.press("ArrowDown");
        await expect(page.getByRole("listbox")).toBeFocused();
        await page.keyboard.press("Home");
        await page.keyboard.press("Enter");
      } else {
        await trigger.click();
        await expect(page.getByRole("dialog")).toBeVisible();
        await page.keyboard.press("Escape");
      }
      await expect(
        page.locator(`[data-scope="${kind}"][data-part="content"]`),
      ).toHaveAttribute("data-state", "closed");
      await expect(trigger).toBeFocused();
      await page.setViewportSize({ width: 375, height: 780 });
      await page.evaluate(
        () =>
          new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
          ),
      );
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(375);
      await expect(trigger).toBeFocused();
      await page.screenshot({
        path: `.artifacts/gap-completion/layout-${kind}-${framework}.png`,
        fullPage: true,
      });
    });
  }
}
