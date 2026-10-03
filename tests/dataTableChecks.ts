import { expect, type Page } from "@playwright/test";
import { auditDirectory } from "./auditDirectory";
export async function checkDataTable(page: Page, framework?: string) {
  const main = page.locator("[data-scope=data-table]").first(),
    queue = page.locator("[data-scope=data-table]").nth(1);
  await expect(main).toBeVisible();
  await expect
    .poll(() =>
      main
        .locator("thead th")
        .first()
        .evaluate((el) => el.getBoundingClientRect().width),
    )
    .toBeLessThanOrEqual(50);
  const heading = page.getByRole("heading", {
    name: "Project access",
    exact: true,
  });
  const intro = page.getByText(
    "Review workspaces, select a page and keep your choices while filtering.",
    { exact: true },
  );
  const colors = await Promise.all([
    heading.evaluate((el) => getComputedStyle(el).color),
    intro.evaluate((el) => getComputedStyle(el).color),
  ]);
  expect(colors[0]).not.toBe(colors[1]);

  await page.setViewportSize({ width: 375, height: 900 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const previous = main.getByRole("button", { name: "Previous", exact: true });
  const next = main.getByRole("button", { name: "Next", exact: true });
  await expect
    .poll(async () =>
      Math.abs(
        (await previous.evaluate((el) => el.getBoundingClientRect().top)) -
          (await next.evaluate((el) => el.getBoundingClientRect().top)),
      ),
    )
    .toBeLessThan(1);
  if (framework)
    await page.locator("[data-example-content]").screenshot({
      path: auditDirectory("data-table") + "/" + framework + "-mobile.png",
      animations: "disabled",
    });
  const header = main.getByRole("checkbox", {
    name: "Select current page",
    exact: true,
  });
  await main.getByRole("checkbox", { name: "Select a", exact: true }).check();
  await expect(header).toHaveAttribute("aria-checked", "mixed");
  await expect
    .poll(() => header.evaluate((el) => (el as HTMLInputElement).indeterminate))
    .toBe(true);
  await page
    .getByRole("button", { name: "Lock selection", exact: true })
    .click();
  await main
    .getByRole("checkbox", { name: "Select b", exact: true })
    .press("Space");
  await expect(
    main.getByRole("checkbox", { name: "Select b", exact: true }),
  ).not.toBeChecked();
  await main
    .getByRole("checkbox", { name: "Select a", exact: true })
    .press("Space");
  await expect(
    main.getByRole("checkbox", { name: "Select a", exact: true }),
  ).toBeChecked();
  await header.press("Space");
  await expect(header).toHaveAttribute("aria-checked", "mixed");
  await expect
    .poll(() => header.evaluate((el) => (el as HTMLInputElement).indeterminate))
    .toBe(true);
  await expect(main.locator("footer")).toContainText("1 selected");
  await page
    .getByRole("button", { name: "Unlock selection", exact: true })
    .click();
  await header.press("Space");
  await expect(main.locator("footer")).toContainText("2 selected");
  await expect(header).toBeChecked();
  await main.getByRole("button", { name: "Next", exact: true }).click();
  await main.getByRole("checkbox", { name: "Select c", exact: true }).check();
  await expect(main.locator("footer")).toContainText("3 selected");
  await header.press("Space");
  await expect(main.locator("footer")).toContainText("4 selected");
  await header.press("Space");
  await expect(main.locator("footer")).toContainText("2 selected");
  await main
    .getByRole("textbox", { name: "Filter rows", exact: true })
    .fill("Alpha");
  await expect(main.locator("tbody tr")).toHaveCount(1);
  await expect(header).toBeChecked();
  await page
    .getByRole("button", { name: "Clear selection", exact: true })
    .click();
  await expect(main.locator("footer")).toContainText("0 selected");
  await expect(header).not.toBeChecked();
  await main
    .getByRole("textbox", { name: "Filter rows", exact: true })
    .fill("missing");
  await expect(header).toBeDisabled();
  await expect(main.getByText("No results", { exact: true })).toBeVisible();
  await main
    .getByRole("textbox", { name: "Filter rows", exact: true })
    .fill("");
  const sort = main.getByRole("button", { name: "Revenue", exact: true });
  await sort.press("Enter");
  await expect(main.locator("th[aria-sort]")).toHaveAttribute(
    "aria-sort",
    "ascending",
  );
  await expect(main.locator("tbody tr").first()).toContainText("Beta");
  await sort.press("Enter");
  await expect(main.locator("th[aria-sort]")).toHaveAttribute(
    "aria-sort",
    "descending",
  );
  await sort.press("Enter");
  await expect(main.locator("th[aria-sort]")).toHaveCount(0);
  await sort.press("Enter");
  await page.getByRole("button", { name: "Hide revenue", exact: true }).click();
  await expect(main.locator("th[aria-sort]")).toHaveCount(0);
  await expect(main.locator("tbody tr").first()).toContainText("Alpha");
  await page.getByRole("button", { name: "Show revenue", exact: true }).click();
  const scroll = main.getByRole("region", {
    name: "Workspace projects",
    exact: true,
  });
  await scroll.focus();
  await scroll.press("ArrowRight");
  await expect
    .poll(() => scroll.evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(0);
  await expect(
    main.getByRole("checkbox", { name: "Select a", exact: true }),
  ).not.toBeChecked();
  await main.getByRole("checkbox", { name: "Select a", exact: true }).check();
  await page
    .getByRole("button", { name: "Remove selected rows", exact: true })
    .click();
  await expect(main.locator("footer")).toContainText("3 rows · 0 selected");
  await expect(
    main.getByRole("checkbox", { name: "Select a", exact: true }),
  ).toHaveCount(0);
  await expect(queue.locator("footer")).toContainText(
    "3 rows · 1 selected · 1 / 2",
  );
  await queue.getByRole("button", { name: "Next", exact: true }).click();
  await page
    .getByRole("button", { name: "Remove queued Alpha", exact: true })
    .click();
  await expect(queue.locator("footer")).toContainText(
    "2 rows · 0 selected · 1 / 1",
  );
  await expect(page.getByTestId("queue-changes")).toHaveText(
    "1 selection changes",
  );
  await page
    .getByRole("button", { name: "Restore queue", exact: true })
    .click();
  await expect(queue.locator("footer")).toContainText(
    "3 rows · 0 selected · 1 / 2",
  );
  await expect(
    queue.getByRole("checkbox", { name: "Select a", exact: true }),
  ).not.toBeChecked();
  await expect(page.getByTestId("queue-changes")).toHaveText(
    "1 selection changes",
  );
  await page.setViewportSize({ width: 1280, height: 900 });
}
