import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { checkChart } from "./chartChecks";
for (const mode of ["light", "dark"])
  test(`Chart ${mode} 标签、缺失值、图例和尺寸更新`, async ({ page }) => {
    await page.goto(
      `/iframe.html?id=compositions-chart-overview--basic&globals=mode:${mode}`,
    );
    await expect(page.locator("[data-scope=chart]").first()).toBeVisible();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await checkChart(page);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
test("Chart 极值坐标与本地化空状态", async ({ page }) => {
  await page.goto("/iframe.html?id=components-chart--extreme-values");
  const chart = page.locator("[data-scope=chart]");
  await expect(chart).toBeVisible();
  expect(await chart.innerHTML()).not.toMatch(/NaN|Infinity/);
  const labels = await chart
    .locator("[data-part=value-label]")
    .evaluateAll((nodes) =>
      nodes.map((n) => (n as SVGTextElement).getBBox().x),
    );
  expect(labels.every((x) => x >= 0)).toBe(true);
  await page.goto("/iframe.html?id=components-chart--empty");
  await expect(page.locator("[data-part=empty]")).toHaveText("暂无数据");
  await expect(
    page.getByRole("img", { name: "Revenue", exact: true }),
  ).toHaveAccessibleDescription("暂无数据");
  await expect(page.locator("[data-part=legend]")).toHaveCount(0);
});
