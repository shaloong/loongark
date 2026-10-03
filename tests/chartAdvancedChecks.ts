import { expect, type Page } from "@playwright/test";
export async function checkChartAdvanced(page: Page) {
  const chart = page.locator('[data-scope="chart"]').first(),
    svg = chart.locator(":scope > svg"),
    revenue = () => chart.getByRole("button", { name: "Revenue", exact: true }),
    costs = () =>
      chart.getByRole("button", { name: "Operating costs", exact: true }),
    margin = () => chart.getByRole("button", { name: "Margin", exact: true }),
    summary = () => chart.locator("summary"),
    details = () => chart.locator("details"),
    table = () =>
      chart.getByRole("table", { name: "Quarterly metrics", exact: true });
  await expect(revenue()).toHaveAttribute("aria-pressed", "true");
  await expect(svg.locator('[data-part="point"]')).toHaveCount(11);
  const marginStroke = await svg
      .locator('[data-part="line"]')
      .nth(2)
      .getAttribute("stroke"),
    marginDash = await svg
      .locator('[data-part="line"]')
      .nth(2)
      .getAttribute("stroke-dasharray");
  await revenue().focus();
  await page.keyboard.press("Space");
  await expect(revenue()).toHaveAttribute("aria-pressed", "false");
  await expect(revenue()).toBeFocused();
  await expect(svg).not.toHaveAccessibleDescription(/Revenue:/);
  await page
    .getByRole("button", { name: "Lock series updates", exact: true })
    .click();
  await revenue().click();
  await expect(revenue()).toHaveAttribute("aria-pressed", "false");
  await expect(revenue()).toBeFocused();
  await page
    .getByRole("button", { name: "Allow series updates", exact: true })
    .click();
  await revenue().focus();
  await page.keyboard.press("Enter");
  await expect(revenue()).toHaveAttribute("aria-pressed", "true");
  await expect(revenue()).toBeFocused();
  await summary().focus();
  await page.keyboard.press("Enter");
  await expect(details()).toHaveAttribute("open", "");
  await expect(table()).toBeVisible();
  const update = page.getByRole("button", { name: "Update Q4", exact: true });
  await update.click();
  await expect(
    table().getByRole("row").filter({ hasText: "Q4" }),
  ).toContainText("72");
  await expect(details()).toHaveAttribute("open", "");
  await expect(
    page.getByRole("button", { name: "Restore Q4", exact: true }),
  ).toBeFocused();
  const region = chart.getByRole("region", {
    name: "Quarterly metrics",
    exact: true,
  });
  await region.focus();
  await page
    .getByRole("button", { name: "Restore Q4", exact: true })
    .evaluate((el: HTMLElement) => el.click());
  await expect(
    table().getByRole("row").filter({ hasText: "Q4" }),
  ).toContainText("58");
  await expect(region).toBeFocused();
  await expect(details()).toHaveAttribute("open", "");
  for (const button of [revenue, costs, margin]) {
    await button().click();
    await expect(button()).toHaveAttribute("aria-pressed", "false");
  }
  await expect(svg.locator('[data-part="empty"]')).toHaveText("No data");
  await expect(chart.locator('[data-part="legend-toggle"]')).toHaveCount(3);
  await expect(page.getByLabel("Visible chart series")).toHaveText(
    "No series selected",
  );
  await margin().focus();
  await page.keyboard.press("Enter");
  await expect(margin()).toBeFocused();
  await expect(svg.locator('[data-part="line"]')).toHaveAttribute(
    "stroke",
    marginStroke!,
  );
  await expect(svg.locator('[data-part="line"]')).toHaveAttribute(
    "stroke-dasharray",
    marginDash!,
  );
  await revenue().click();
  await page
    .getByRole("button", { name: "Use 0–50 range", exact: true })
    .click();
  await expect(svg).toHaveAccessibleDescription(/Visible range: 0 to 50/);
  await expect(svg).toHaveAccessibleDescription(/Q3 — Revenue: 64/);
  await expect(svg.locator('[data-part="plot"]')).toHaveCount(1);
  await expect(svg.locator('[data-part="point"]')).toHaveCount(6);
  await expect(
    table().getByRole("row").filter({ hasText: "Q3" }),
  ).toContainText("64");
  await costs().click();
  await expect(
    table().getByRole("row").filter({ hasText: "Q3" }),
  ).toContainText("No data");
  await expect(details()).toHaveAttribute("open", "");
  await page.getByRole("button", { name: "Hide chart", exact: true }).click();
  await expect(page.locator('[data-scope="chart"]')).toHaveCount(0);
  await page.getByRole("button", { name: "Show chart", exact: true }).click();
  await expect(revenue()).toHaveAttribute("aria-pressed", "true");
  await expect(details()).not.toHaveAttribute("open", "");
  await costs().focus();
  await page.keyboard.press("Enter");
  await expect(costs()).toHaveAttribute("aria-pressed", "false");
  await expect(costs()).toBeFocused();
  const originalViewport = page.viewportSize();
  await page.setViewportSize({ width: 375, height: 1100 });
  await costs().click();
  await summary().click();
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth))
    .toBeLessThanOrEqual(376);
  await expect
    .poll(() => region.evaluate((el) => el.scrollWidth > el.clientWidth))
    .toBe(true);
  await region.focus();
  await page.keyboard.press("ArrowRight");
  await expect
    .poll(() => region.evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(0);
  if (originalViewport) await page.setViewportSize(originalViewport);
}
