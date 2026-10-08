import { expect, type Page } from "@playwright/test";
export const settleFrozenTable = (page: Page) =>
  page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      ),
  );
export async function checkDataTableFrozen(page: Page) {
  const table = page.getByRole("table", { name: "Release projects" }),
    region = page.getByRole("region", { name: "Release projects" }),
    project = table.getByRole("columnheader", { name: "Project", exact: true }),
    revenue = table.getByRole("columnheader", { name: "Revenue", exact: true });
  await expect(table).toBeVisible();
  await settleFrozenTable(page);
  const bounds = () =>
    region.evaluate((el) => {
      const r = el.getBoundingClientRect();
      return {
        left: r.left + el.clientLeft,
        right: r.left + el.clientLeft + el.clientWidth,
      };
    });
  const verifyPins = async () => {
    await expect(region).not.toHaveAttribute("data-pin-overflow", "true");
    const initial = await project.boundingBox();
    await region.evaluate(
      (el) =>
        (el.scrollLeft = getComputedStyle(el).direction === "rtl" ? -200 : 200),
    );
    await settleFrozenTable(page);
    const after = await project.boundingBox();
    expect(Math.abs(after!.x - initial!.x)).toBeLessThan(1);
    const box = await revenue.boundingBox(),
      viewport = await bounds();
    expect(box!.x).toBeGreaterThanOrEqual(viewport.left - 1);
    expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.right + 1);
  };
  // 未排序时标题没有箭头，冻结区更窄：仍须为排序按钮保留可见空间。
  await page.setViewportSize({ width: 375, height: 1100 });
  await page.getByRole("button", { name: "Freeze owner", exact: true }).click();
  await expect(region).toHaveAttribute("data-pin-overflow", "true");
  await page
    .getByRole("button", { name: "Unfreeze owner", exact: true })
    .click();
  await page.setViewportSize({ width: 1280, height: 900 });
  await settleFrozenTable(page);
  await verifyPins();
  await table.getByRole("checkbox", { name: "Select a", exact: true }).focus();
  await page.keyboard.press("Space");
  await expect(page.getByLabel("Selected release projects")).toHaveText("a");
  await table.getByRole("button", { name: "Revenue", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(revenue).toHaveAttribute("aria-sort", "ascending");
  await page.getByRole("button", { name: "Freeze owner", exact: true }).click();
  await settleFrozenTable(page);
  await expect(
    table.getByRole("columnheader", { name: "Owner", exact: true }),
  ).toHaveAttribute("data-pinned", "start");
  await page.getByRole("button", { name: "Hide owner", exact: true }).click();
  await expect(
    table.getByRole("columnheader", { name: "Owner", exact: true }),
  ).toHaveCount(0);
  await verifyPins();
  await page
    .getByRole("button", { name: "Move notes first", exact: true })
    .click();
  await expect(table.getByRole("columnheader").nth(2)).toHaveText(
    "Release notes",
  );
  await page.getByRole("button", { name: "Use RTL", exact: true }).click();
  await region.evaluate((el) => (el.scrollLeft = 0));
  await settleFrozenTable(page);
  await verifyPins();
  // 真实手机宽度、动态恢复隐藏列与冻结列组合，不只检查 sticky 属性。
  await page.setViewportSize({ width: 375, height: 1100 });
  await settleFrozenTable(page);
  await verifyPins();
  await page.getByRole("button", { name: "Show owner", exact: true }).click();
  await expect(region).toHaveAttribute("data-pin-overflow", "true");
  const before = await project.boundingBox();
  await region.evaluate((el) => (el.scrollLeft = -160));
  await settleFrozenTable(page);
  const after = await project.boundingBox();
  expect(Math.abs(after!.x - before!.x)).toBeGreaterThan(30);
  await page
    .getByRole("button", { name: "Unfreeze owner", exact: true })
    .click();
  await expect(region).not.toHaveAttribute("data-pin-overflow", "true");
  await region.evaluate((el) => (el.scrollLeft = 0));
  await verifyPins();
  const status = table.getByRole("button", { name: "Status", exact: true });
  await status.focus();
  await settleFrozenTable(page);
  const statusBox = await status.boundingBox(),
    projectBox = await project.boundingBox(),
    revenueBox = await revenue.boundingBox();
  expect(statusBox!.x).toBeGreaterThanOrEqual(
    revenueBox!.x + revenueBox!.width - 1,
  );
  expect(statusBox!.x + statusBox!.width).toBeLessThanOrEqual(
    projectBox!.x + 1,
  );
  await page.keyboard.press("Enter");
  await expect(
    table.getByRole("columnheader", { name: "Status", exact: true }),
  ).toHaveAttribute("aria-sort", "ascending");
  await page.getByRole("button", { name: "Hide table", exact: true }).click();
  await expect(table).toHaveCount(0);
  await page.getByRole("button", { name: "Show table", exact: true }).click();
  await expect(
    table.getByRole("checkbox", { name: "Select a", exact: true }),
  ).toBeChecked();
  await settleFrozenTable(page);
  await verifyPins();
  await page
    .getByRole("textbox", { name: "Filter rows", exact: true })
    .fill("Missing release");
  await expect(
    table.getByRole("cell", { name: "No results", exact: true }),
  ).toHaveAttribute("colspan", "6");
  await expect(
    table.getByRole("checkbox", { name: "Select current page", exact: true }),
  ).toBeDisabled();
  await expect(page.getByLabel("Selected release projects")).toHaveText("a");
  await settleFrozenTable(page);
  const emptyBox = await table
    .getByRole("cell", { name: "No results", exact: true })
    .locator("span")
    .boundingBox();
  const emptyBounds = await bounds();
  expect(
    Math.abs(
      emptyBox!.x +
        emptyBox!.width / 2 -
        (emptyBounds.left + emptyBounds.right) / 2,
    ),
  ).toBeLessThan(2);

  await page
    .getByRole("button", { name: "Unfreeze columns", exact: true })
    .click();
  await expect(table.locator("[data-pinned]")).toHaveCount(0);
  await expect
    .poll(() =>
      region.evaluate(
        (el) => el.querySelector('[style*="pin-offset"]') === null,
      ),
    )
    .toBe(true);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.setViewportSize({ width: 1280, height: 900 });
}
