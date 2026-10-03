import { expect, type Page } from "@playwright/test";
export async function checkDataTableAdvanced(page: Page) {
  const table = page.getByRole("table", { name: "Remote projects" }),
    root = table.locator('xpath=ancestor::section[@data-scope="data-table"]'),
    filter = root.getByRole("textbox", { name: "Filter rows" });
  const ready = () => expect(root).not.toHaveAttribute("aria-busy", "true");
  await expect(table.getByText("Alpha", { exact: true })).toBeVisible();
  await page
    .getByRole("button", { name: "Lock table updates", exact: true })
    .click();
  await filter.fill("Rejected");
  await expect(filter).toHaveValue("");
  await root.getByRole("button", { name: "Next", exact: true }).click();
  await expect(table.getByText("Alpha", { exact: true })).toBeVisible();
  await table.getByRole("button", { name: "Revenue", exact: true }).click();
  await expect(
    table.getByRole("columnheader", { name: "Revenue", exact: true }),
  ).not.toHaveAttribute("aria-sort", "ascending");
  await page
    .getByRole("button", { name: "Allow table updates", exact: true })
    .click();
  await table.getByRole("checkbox", { name: "Select a", exact: true }).check();
  await root.getByRole("button", { name: "Next", exact: true }).click();
  await ready();
  await expect(table.getByText("Gamma", { exact: true })).toBeVisible();
  await table.getByRole("checkbox", { name: "Select c", exact: true }).check();
  await expect(page.getByLabel("Selected remote projects")).toHaveText("a, c");
  await root.getByRole("button", { name: "Previous", exact: true }).click();
  await ready();
  await expect(
    table.getByRole("checkbox", { name: "Select a", exact: true }),
  ).toBeChecked();
  await page.getByRole("button", { name: "Hide owner", exact: true }).click();
  await expect(
    table.getByRole("columnheader", { name: "Owner", exact: true }),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Move revenue first", exact: true })
    .click();
  await expect(table.getByRole("columnheader").nth(1)).toHaveText("Revenue");
  await table.getByRole("button", { name: "Revenue", exact: true }).click();
  await ready();
  await expect(table.getByText("Zeta", { exact: true })).toBeVisible();
  await expect(
    table.getByRole("columnheader", { name: "Revenue", exact: true }),
  ).toHaveAttribute("aria-sort", "ascending");
  await filter.fill("Gamma");
  await ready();
  await expect(table.getByText("Gamma", { exact: true })).toBeVisible();
  await expect(root.locator("footer")).toContainText("1 rows");
  await page
    .getByRole("button", { name: "Refresh with error", exact: true })
    .click();
  await expect(root).toHaveAttribute("aria-busy", "true");
  await expect(filter).toBeDisabled();
  await expect(
    table.getByRole("button", { name: "Revenue", exact: true }),
  ).toBeDisabled();
  await expect(
    table.getByRole("checkbox", { name: "Select c", exact: true }),
  ).toBeDisabled();
  await expect(root.getByRole("alert")).toContainText(
    "Could not load projects.",
  );
  await ready();
  await root.getByRole("button", { name: "Retry", exact: true }).focus();
  await page.keyboard.press("Enter");
  await ready();
  await expect(root.getByRole("alert")).toHaveCount(0);
  await expect(
    root.getByRole("region", { name: "Remote projects" }),
  ).toBeFocused();
  await page
    .getByRole("button", { name: "Find Gamma slowly", exact: true })
    .click();
  await expect(root).toHaveAttribute("aria-busy", "true");
  await page.getByRole("button", { name: "Find Beta", exact: true }).click();
  await ready();
  await expect(table.getByText("Beta", { exact: true })).toBeVisible();
  // 等待被取消的慢请求原定返回时刻，确保不会覆盖后来的结果。
  await page.waitForTimeout(950);
  await expect(table.getByText("Beta", { exact: true })).toBeVisible();
  await expect(table.getByText("Gamma", { exact: true })).toHaveCount(0);
  await expect(page.getByLabel("Selected remote projects")).toHaveText("a, c");
}
