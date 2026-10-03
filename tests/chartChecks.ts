import { expect, type Page } from "@playwright/test";
import { auditDirectory } from "./auditDirectory";
export async function checkChart(page: Page, framework?: string) {
  const chart = page.locator("[data-scope=chart]").first(),
    svg = chart.locator(":scope > svg");
  await expect(svg).toHaveAttribute("aria-label", "Regional revenue");
  await expect(svg).toHaveAccessibleDescription(
    /North America — enterprise accounts — Revenue: 12500000/,
  );
  await expect(chart.locator("[data-part=legend-item]")).toHaveCount(3);
  await expect(chart.getByRole("list", { name: "Chart series" })).toContainText(
    "Operating costs",
  );
  await expect(chart.locator("desc")).toContainText(
    "North America — enterprise accounts — Revenue: 12500000",
  );
  await expect(chart.locator("[data-part=bar]")).toHaveCount(24);
  const fills = await chart
    .locator("[data-part=bar]")
    .evaluateAll((nodes) => [
      ...new Set(nodes.map((n) => getComputedStyle(n).fill)),
    ]);
  expect(fills).toHaveLength(3);
  await page.setViewportSize({ width: 375, height: 1100 });
  await expect
    .poll(() => svg.evaluate((el) => el.viewBox.baseVal.width))
    .toBeLessThan(376);
  for (const container of await page.locator("[data-scope=chart]").all()) {
    const bounds = await container.evaluate((el) => {
      const root = el.getBoundingClientRect();
      const content = Array.from(el.children).map(
        (child) => child.getBoundingClientRect().bottom,
      );
      return { bottom: root.bottom, contentBottom: Math.max(...content) };
    });
    expect(bounds.contentBottom).toBeLessThanOrEqual(bounds.bottom + 1);
  }
  const labels = await svg.locator("text").evaluateAll((nodes) =>
    nodes.map((n) => {
      const b = (n as SVGTextElement).getBBox();
      return {
        x: b.x,
        y: b.y,
        width: b.width,
        height: b.height,
        part: n.getAttribute("data-part"),
      };
    }),
  );
  const width = await svg.evaluate((el) => el.viewBox.baseVal.width);
  for (const label of labels) {
    expect(label.x).toBeGreaterThanOrEqual(-1);
    expect(label.x + label.width).toBeLessThanOrEqual(width + 1);
  }
  const categories = labels
    .filter((l) => l.part === "category-label")
    .sort((a, b) => a.x - b.x);
  expect(categories.length).toBeGreaterThan(0);
  expect(categories.length).toBeLessThan(8);
  for (let i = 1; i < categories.length; i++)
    expect(categories[i - 1].x + categories[i - 1].width).toBeLessThanOrEqual(
      categories[i].x - 2,
    );
  await expect(
    svg.locator("[data-part=category-label] title").first(),
  ).toHaveText("North America — enterprise accounts");
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(375);
  if (framework)
    await page.locator("[data-example-content]").screenshot({
      path: auditDirectory("chart") + "/" + framework + "-mobile.png",
      animations: "disabled",
    });
  await page
    .getByRole("button", { name: "Show lines", exact: true })
    .press("Enter");
  await expect(chart.locator("[data-part=line]")).toHaveCount(3);
  const categoryPosition = await chart
    .locator("[data-part=category-label]")
    .first()
    .getAttribute("x");
  const pointPosition = await chart
    .locator("[data-part=point]")
    .first()
    .getAttribute("cx");
  expect(Number(categoryPosition)).toBeCloseTo(Number(pointPosition), 5);
  const dashes = await chart
    .locator("[data-part=line]")
    .evaluateAll((nodes) =>
      nodes.map((n) => n.getAttribute("stroke-dasharray")),
    );
  expect(new Set(dashes).size).toBe(3);
  await expect(chart.locator("[data-part=point] title").first()).toContainText(
    "Revenue: 12500000",
  );
  const gaps = page.locator("[data-scope=chart]").nth(1);
  await expect(gaps.locator(":scope > svg")).toHaveAccessibleDescription(
    /Wednesday — Completed runs: No data/,
  );
  const path = await gaps.locator("[data-part=line]").getAttribute("d");
  expect(path?.match(/M /g)).toHaveLength(2);
  await expect(gaps.locator("[data-part=point]")).toHaveCount(4);
  await page.getByRole("button", { name: "Clear data", exact: true }).click();
  await expect(chart.locator("[data-part=empty]")).toHaveText("No data");
  await expect(svg).toHaveAccessibleDescription("No data");
  await expect(chart.locator("[data-part=legend]")).toHaveCount(0);
  await page.getByRole("button", { name: "Restore data", exact: true }).click();
  await expect(chart.locator("[data-part=line]")).toHaveCount(3);
  await page.getByRole("button", { name: "Show bars", exact: true }).click();
  await expect(chart.locator("[data-part=bar]")).toHaveCount(24);
  await page.setViewportSize({ width: 1280, height: 1100 });
  await expect
    .poll(() => svg.evaluate((el) => el.viewBox.baseVal.width))
    .toBeGreaterThan(500);
}
