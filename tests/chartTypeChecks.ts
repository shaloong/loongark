import { expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
export async function checkChartTypes(page: Page) {
  const chart = page.locator('[data-scope="chart"]'),
    type = page.getByRole("combobox", { name: "Chart type", exact: true });
  const capture = async (scene: string, fullPage = false) => {
    const svg = chart.locator('svg[role="img"]');
    await expect
      .poll(
        () =>
          svg.evaluate((node) =>
            Math.abs(
              (node as SVGSVGElement).viewBox.baseVal.width -
                node.getBoundingClientRect().width,
            ),
          ),
        { message: "Chart resolution must settle to its available width" },
      )
      .toBeLessThanOrEqual(1);
    await page.evaluate(async () => {
      await document.fonts.ready;
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      );
    });
    const path = `.artifacts/advanced-completion/chart-types-${await page.evaluate(() => document.documentElement.dataset.chartCapture)}-${scene}.png`;
    if (fullPage)
      await page.screenshot({ path, fullPage: true, animations: "disabled" });
    else await chart.screenshot({ path, animations: "disabled" });
  };
  await expect(chart.locator('[data-part="area"]')).toHaveCount(3);
  expect(
    await chart
      .locator('[data-part="value-label"]')
      .evaluateAll((nodes) =>
        nodes.map((node) => node.firstChild?.textContent),
      ),
  ).toEqual(["-20", "-0.5", "19", "38.5", "58"]);
  await capture("stack", true);
  await type.selectOption("area");
  await expect(chart.locator('[data-part="area"]')).toHaveCount(3);
  await capture("area");
  const primary = chart.getByRole("button", { name: "Primary", exact: true });
  await primary.click();
  await expect(primary).toHaveAttribute("aria-pressed", "false");
  await expect(primary).toBeFocused();
  await expect(chart.locator('[data-part="area"]')).toHaveCount(1);
  await primary.press("Space");
  await expect(primary).toHaveAttribute("aria-pressed", "true");
  await type.selectOption("stacked-bars");
  await expect(chart.locator('[data-part="bar"]')).toHaveCount(11);
  await capture("stacked-bars");
  await type.selectOption("pie");
  await expect(chart.locator('[data-part="slice"]')).toHaveCount(4);
  // 复用一个Chart切换类型时，原系列状态保留且能从分类图例恢复。
  await type.selectOption("area");
  await chart.getByRole("button", { name: "Primary", exact: true }).click();
  await type.selectOption("pie");
  await expect(chart.locator('[data-part="slice"]')).toHaveCount(0);
  const restore = chart.getByRole("button", { name: "Alpha", exact: true });
  await expect(restore).toHaveAttribute("aria-pressed", "false");
  await restore.click();
  await expect(chart.locator('[data-part="slice"]')).toHaveCount(4);
  await expect(restore).toHaveAttribute("aria-pressed", "true");
  await expect(restore).toBeFocused();
  await expect(
    chart.getByRole("button", { name: "Gamma", exact: true }),
  ).toBeDisabled();
  await expect(
    chart.getByRole("button", { name: "Delta", exact: true }),
  ).toBeDisabled();
  await capture("pie");
  await chart.getByText("View chart data", { exact: true }).click();
  await expect(chart.getByRole("row")).toHaveCount(7);
  const alpha = chart.getByRole("button", { name: "Alpha", exact: true });
  await alpha.click();
  await expect(alpha).toHaveAttribute("aria-pressed", "false");
  await expect(alpha).toBeFocused();
  await expect(chart.locator('[data-part="slice"]')).toHaveCount(3);
  await page
    .getByRole("button", { name: "Reject slice changes", exact: true })
    .click();
  await alpha.click();
  await expect(
    page.getByText("Slice change rejected", { exact: true }),
  ).toBeVisible();
  await expect(alpha).toHaveAttribute("aria-pressed", "false");
  await expect(alpha).toBeFocused();
  await expect(chart.locator('[data-part="slice"]')).toHaveCount(3);
  await page
    .getByRole("button", { name: "Accept slice changes", exact: true })
    .click();
  await alpha.click();
  await expect(alpha).toHaveAttribute("aria-pressed", "true");
  await expect(chart.locator('[data-part="slice"]')).toHaveCount(4);
  // 窗口改变不能清除窗口外切片的受控身份。
  await chart.getByRole("button", { name: "Zoom in", exact: true }).click();
  await expect(chart.locator('[data-part="range-status"]')).toHaveText(
    "Categories 2–4 of 6",
  );
  await chart.getByRole("button", { name: "Beta", exact: true }).click();
  await chart.getByRole("button", { name: "Reset zoom", exact: true }).click();
  await expect(alpha).toHaveAttribute("aria-pressed", "true");
  await expect(
    chart.getByRole("button", { name: "Beta", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
  await page
    .getByRole("button", { name: "Use uncontrolled slices", exact: true })
    .click();
  await chart.getByRole("button", { name: "Beta", exact: true }).click();
  await expect(
    chart.getByRole("button", { name: "Beta", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
  await type.selectOption("donut");
  await expect(chart.locator('[data-part="slice"]')).toHaveCount(3);
  await expect(chart.locator("details")).toHaveAttribute("open", "");
  const path = await chart
    .locator('[data-part="slice"]')
    .first()
    .getAttribute("d");
  expect(path).toContain(" A ");
  const slice = chart.locator('[data-part="slice"]').first();
  await slice.scrollIntoViewIfNeeded();
  // 环片包围盒的中心可能是空洞；在实际填充区域移动真实指针。
  const hit = await slice.evaluate((node) => {
    const rect = node.getBoundingClientRect();
    for (let row = 1; row < 20; row++)
      for (let col = 1; col < 20; col++) {
        const x = rect.left + (rect.width * col) / 20,
          y = rect.top + (rect.height * row) / 20;
        const interior = [-6, 0, 6].every((dx) =>
          [-6, 0, 6].every(
            (dy) =>
              node.ownerDocument.elementFromPoint(x + dx, y + dy) === node,
          ),
        );
        if (interior) return { x: Math.round(x), y: Math.round(y) };
      }
    return null;
  });
  expect(hit).not.toBeNull();
  await page.mouse.move(hit!.x, hit!.y);
  await expect(chart.getByRole("tooltip")).toContainText("Alpha");
  await page.keyboard.press("Escape");
  await expect(chart.getByRole("tooltip")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Disable chart", exact: true })
    .click();
  await expect(alpha).toBeDisabled();
  await expect(chart.getByRole("combobox")).toBeDisabled();
  await page.getByRole("button", { name: "Enable chart", exact: true }).click();
  await capture("donut", true);
  await type.selectOption("scatter");
  // 单系列图中恢复选择后状态按该图的有效键归一，回到双系列显式启用次系列。
  const secondary = chart.getByRole("button", {
    name: "Secondary",
    exact: true,
  });
  await expect(secondary).toHaveAttribute("aria-pressed", "false");
  await expect(chart.locator('[data-part="point"]')).toHaveCount(5);
  await secondary.click();
  await expect(secondary).toHaveAttribute("aria-pressed", "true");
  await expect(secondary).toBeFocused();
  await expect(chart.locator('[data-part="point"]')).toHaveCount(11);
  await expect(chart.locator('[data-part="line"]')).toHaveCount(0);
  await expect(
    chart.getByRole("columnheader", { name: "x", exact: true }),
  ).toBeVisible();
  // 标记中心位于域边界时，其外半圆仍须参与真实指针命中。
  const edge = await chart
    .locator('[data-part="point"][data-chart-index="5"]')
    .first()
    .boundingBox();
  expect(edge).not.toBeNull();
  await page.mouse.move(
    edge!.x + edge!.width * 0.85,
    edge!.y + edge!.height / 2,
  );
  await expect(chart.getByRole("tooltip")).toContainText("Zeta");
  await page.keyboard.press("Escape");
  await expect(chart.getByRole("tooltip")).toHaveCount(0);
  await capture("scatter");
  await chart
    .getByRole("combobox", { name: "Inspect category", exact: true })
    .selectOption("1");
  await expect(chart.locator('[data-part="inspection"]')).toContainText("x: 5");
  await type.selectOption("time");
  await expect(
    chart.getByRole("columnheader", { name: "at", exact: true }),
  ).toBeVisible();
  await expect(chart.locator('[data-part="inspection"]')).toContainText(
    "2026-09-03T00:00:00Z",
  );
  const timeLabels = await chart
    .locator('[data-part="category-label"]')
    .evaluateAll((nodes) =>
      nodes.map((node) => ({
        visible: node.firstChild?.textContent,
        complete: node.querySelector("title")?.textContent,
      })),
    );
  expect(timeLabels.every((label) => label.visible === label.complete)).toBe(
    true,
  );
  const points = await chart
    .locator('[data-part="point"]')
    .evaluateAll((nodes) =>
      nodes.map((n) => ({
        index: Number(n.getAttribute("data-chart-index")),
        x: Number(n.getAttribute("cx")),
      })),
    );
  const a = points.find((p) => p.index === 0)!,
    b = points.find((p) => p.index === 1)!,
    d = points.find((p) => p.index === 3)!;
  expect(d.x - b.x).toBeGreaterThan(2 * (b.x - a.x));
  await capture("time", true);
  await type.selectOption("log");
  await expect(chart.locator('[data-part="point"]')).toHaveCount(10);
  expect(await chart.locator('svg[role="img"]').innerHTML()).not.toMatch(
    /NaN|Infinity/,
  );
  await page.getByRole("button", { name: "Clear data", exact: true }).click();
  await expect(chart.locator('[data-part="empty"]')).toHaveText("No data");
  await expect(chart.getByRole("combobox")).toBeDisabled();
  await page.getByRole("button", { name: "Restore data", exact: true }).click();
  await expect(chart.locator('[data-part="point"]')).toHaveCount(10);
  await page.getByRole("button", { name: "Use RTL", exact: true }).click();
  await expect(chart.getByRole("combobox")).toBeVisible();
  await page.getByRole("button", { name: "Hide chart", exact: true }).click();
  await expect(chart).toHaveCount(0);
  await page.getByRole("button", { name: "Show chart", exact: true }).click();
  await expect(chart.locator('[data-part="point"]')).toHaveCount(10);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth + 1,
    ),
  ).toBe(false);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await capture("log", true);
}
