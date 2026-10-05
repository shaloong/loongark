import AxeBuilder from "@axe-core/playwright";
import { expect, type Page } from "@playwright/test";
export async function checkDataTableEditing(page: Page) {
  const table = page.getByRole("table", { name: "Editable projects" });
  const cell = (column: string, row = "alpha") =>
    page.getByRole("button", {
      name: new RegExp(`^Edit ${column} for ${row}: `),
    });
  const input = page.locator('[data-part="cell-input"]');
  await expect(table).toBeVisible();
  const semantics = await new AxeBuilder({ page })
    .include('[data-scope="data-table"]')
    .withRules(["label-content-name-mismatch"])
    .analyze();
  expect(semantics.violations).toEqual([]);
  await expect(table.locator('[data-part="cell-trigger"]')).toHaveCount(6);
  await cell("Project").click();
  await expect(input).toBeFocused();
  const fieldBounds = await input.evaluate((element) => {
    const region = element.closest('[role="region"]')!.getBoundingClientRect();
    const group = element
      .closest('[data-part="cell-editor"]')!
      .getBoundingClientRect();
    return {
      left: group.left - region.left,
      right: region.right - group.right,
      width: group.width,
      available: region.width,
    };
  });
  expect(fieldBounds.left).toBeGreaterThanOrEqual(7);
  expect(fieldBounds.right).toBeGreaterThanOrEqual(7);
  expect(fieldBounds.width).toBeLessThan(fieldBounds.available);
  const saveBackground = await page
    .getByRole("button", { name: "Save", exact: true })
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  const cancelBackground = await page
    .getByRole("button", { name: "Cancel", exact: true })
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  expect(saveBackground).not.toBe(cancelBackground);
  await input.fill("Draft only");
  await input.dispatchEvent("keydown", { key: "Enter", isComposing: true });
  await expect(input).toBeEnabled();
  await expect(page.locator('[data-part="cell-status"]')).toHaveCount(0);
  await input.press("Tab");
  await expect(
    page.getByRole("button", { name: "Save", exact: true }),
  ).toBeFocused();
  await expect(page.locator("output")).toHaveText("No changes saved");
  await input.focus();
  await input.fill("x");
  await input.press("Enter");
  await expect(page.getByRole("alert")).toHaveText("Use at least 3 characters");
  await expect(input).toHaveAttribute("aria-invalid", "true");
  const errorId = await input.getAttribute("aria-describedby");
  expect(await page.locator(`[id="${errorId}"]`).textContent()).toContain(
    "3 characters",
  );
  await input.fill("reserved");
  await input.press("Enter");
  await expect(page.locator('[data-part="cell-status"]')).toHaveText("Saving…");
  await expect(input).toBeDisabled();
  await page.getByRole("button", { name: "Cancel", exact: true }).click();
  await expect(cell("Project")).toBeFocused();
  await expect(
    page.getByText("Cancelled saves: 1", { exact: true }),
  ).toBeVisible();
  await expect(page.locator("output")).toHaveText("No changes saved");
  await cell("Project").click();
  await input.fill("reserved");
  await input.press("Enter");
  await expect(page.getByRole("alert")).toHaveText(
    "This project name is reserved",
  );
  await expect(input).toBeFocused();
  await input.fill("Alpha updated");
  await input.press("Enter");
  await expect(page.locator("output")).toHaveText(
    "Saved name for alpha: Alpha updated",
  );
  await expect(cell("Project")).toBeFocused();
  await expect(cell("Project")).toHaveText("Alpha updated");
  await cell("Revenue").click();
  await input.fill("-1");
  await input.press("Enter");
  await expect(page.getByRole("alert")).toHaveText(
    "Revenue cannot be negative",
  );
  await page
    .getByRole("button", { name: "Fail next save", exact: true })
    .click();
  await input.fill("44.5");
  await input.press("Enter");
  const outside = page.getByRole("button", { name: "Use RTL", exact: true });
  await outside.focus();
  await expect(page.getByRole("alert")).toHaveText(
    "Could not save. Try again.",
  );
  await expect(outside).toBeFocused();
  await input.press("Enter");
  await expect(page.locator("output")).toHaveText(
    "Saved amount for alpha: 44.5",
  );
  await expect(cell("Revenue")).toBeFocused();
  await cell("Revenue").click();
  await input.fill("99");
  await input.press("Enter");
  await page.getByRole("button", { name: "Hide revenue", exact: true }).click();
  await expect(input).toHaveCount(0);
  await expect(
    page.getByText("Cancelled saves: 2", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Show revenue", exact: true }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Show revenue", exact: true }).click();
  await expect(cell("Revenue")).toHaveText("44.5");
  await cell("Project").click();
  await input.fill("Never saved");
  await input.press("Enter");
  await page
    .getByRole("button", { name: "Remove first row", exact: true })
    .click();
  await expect(cell("Project")).toHaveCount(0);
  await expect(
    page.getByText("Cancelled saves: 3", { exact: true }),
  ).toBeVisible();
  await cell("Project", "beta").click();
  await input.fill("Never mounted");
  await input.press("Enter");
  await page.getByRole("button", { name: "Hide table", exact: true }).click();
  await expect(table).toHaveCount(0);
  await expect(
    page.getByText("Cancelled saves: 4", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Show table", exact: true }).click();
  await expect(cell("Project", "beta")).toHaveText(
    "Accessible component documentation",
  );
  await outside.click();
  await expect(table.locator('th[data-align="end"]')).toHaveCSS(
    "text-align",
    "end",
  );
  await expect(table.locator('td[data-align="center"]').first()).toHaveCSS(
    "text-align",
    "center",
  );
  await cell("Revenue", "beta").click();
  await expect(input).toBeFocused();
  await expect(input).toHaveCSS("text-align", "left");
  await expect(input).toHaveAttribute("dir", "ltr");
  const geometry = await table
    .locator('[data-part="cell-actions"]')
    .evaluate((element) => {
      const buttons = [...element.querySelectorAll("button")].map((button) =>
        button.getBoundingClientRect(),
      );
      return {
        centers: buttons.map((b) => b.y + b.height / 2),
        edge:
          element.getBoundingClientRect().left -
          buttons[buttons.length - 1].left,
      };
    });
  expect(Math.abs(geometry.centers[0] - geometry.centers[1])).toBeLessThan(1);
  expect(Math.abs(geometry.edge)).toBeLessThan(1);
  await input.press("Escape");
  await expect(cell("Revenue", "beta")).toBeFocused();
  await cell("Revenue", "beta").click();
  await input.fill("88");
  await input.press("Enter");
  await page.getByRole("button", { name: "Set loading", exact: true }).click();
  await expect(input).toHaveCount(0);
  await expect(
    page.getByText("Cancelled saves: 5", { exact: true }),
  ).toBeVisible();
  await expect(table).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: "Stop loading", exact: true }),
  ).toBeFocused();
  await expect(
    page.getByRole("textbox", { name: "Filter rows", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Stop loading", exact: true }).click();
  await expect(cell("Revenue", "beta")).toHaveText("1800");
  await cell("Project", "beta").click();
  await page.getByRole("button", { name: "Set loading", exact: true }).click();
  await expect(input).toHaveCount(0);
  await expect(
    page.getByText("Cancelled saves: 5", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Stop loading", exact: true }).click();
}
