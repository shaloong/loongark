import { expect, test, type Page } from "@playwright/test";
async function checkDismissedPointer(page: Page, onClosed?: () => Promise<void>) {
  const chart = page.locator('[data-scope="chart"]');
  const type = page.getByRole("combobox", { name: "Chart type", exact: true });
  const inspection = chart.locator('[data-part="inspection"]');
  await type.selectOption("scatter");
  const point = chart.locator('[data-part="point"][data-chart-index="5"]').first();
  await expect(point).toBeVisible();
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
  });
  const box = (await point.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await expect(chart.getByRole("tooltip")).toContainText("Zeta");
  await page.keyboard.press("Escape");
  await expect(chart.getByRole("tooltip")).toHaveCount(0);
  await chart.getByRole("combobox", { name: "Inspect category", exact: true }).selectOption("1");
  await expect(inspection).toContainText("Beta");
  await type.selectOption("time");
  await expect(chart.getByRole("img", { name: "Time axis", exact: true })).toBeVisible();
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
  await expect(chart.getByRole("tooltip")).toHaveCount(0);
  await expect(inspection).toContainText("2026-09-03T00:00:00Z");
  await onClosed?.();
  const next = (await point.boundingBox())!;
  // 真正移动指针后恢复悬停，不永久屏蔽提示。
  await page.mouse.move(0, 0);
  await page.mouse.move(next.x + next.width / 2, next.y + next.height / 2);
  await expect(chart.getByRole("tooltip")).toContainText("Zeta");
  await expect(inspection).toContainText("2026-09-19T00:00:00Z");
  const tip = (await chart.getByRole("tooltip").boundingBox())!,
    bounds = (await chart.boundingBox())!;
  expect(tip.x).toBeGreaterThanOrEqual(bounds.x - 1);
  expect(tip.x + tip.width).toBeLessThanOrEqual(bounds.x + bounds.width + 1);
  expect(tip.y + tip.height).toBeLessThanOrEqual(page.viewportSize()!.height + 1);

}
for (const framework of ["react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`dismissed chart ${framework} ${mode} ${width}`, async ({ page }) => {
        test.skip(!process.env.STATIC_DIR, "四端消费构建后运行");
        const errors: string[] = [];
        page.on("pageerror", error => errors.push(error.message));
        await page.setViewportSize({ width, height: 1100 });
        await page.goto(`/examples-${framework}/?example=ChartTypesExample&mode=${mode}`);
        await checkDismissedPointer(page, async () => {
          await page.screenshot({ path: `.artifacts/gap-completion/chart-dismissed-${framework}-${mode}-${width}.png` });
        });
        await page.screenshot({ path: `.artifacts/gap-completion/chart-restored-${framework}-${mode}-${width}.png` });
        expect(errors).toEqual([]);
      });
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`dismissed chart Story ${mode} ${width}`, async ({ page }) => {
      test.skip(!!process.env.STATIC_DIR, "Story 专项");
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(`/iframe.html?id=components-chart--types-and-axes&globals=mode:${mode}`);
      await checkDismissedPointer(page);
    });
