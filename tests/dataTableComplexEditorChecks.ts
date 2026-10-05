import { expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
export async function checkComplexEditors(page: Page) {
  const field = page.locator('[data-part="cell-input"]');
  const trigger = (column: string) =>
    page.getByRole("button", {
      name: new RegExp(`^Edit ${column} for alpha: `),
    });
  await trigger("Project").click();
  await expect(field).toBeFocused();
  await expect(field).toHaveJSProperty("tagName", "TEXTAREA");
  await field.fill("First line\nSecond line");
  await field.press("Enter");
  await expect(field).toHaveValue("First line\nSecond line\n");
  await expect(field).toBeEnabled();
  await field.press("Control+Enter");
  await expect(field).toBeDisabled();
  await expect(page.locator("output")).toContainText(
    "Saved name for alpha: First line",
  );
  await expect(trigger("Project")).toBeFocused();
  await trigger("Owner").click();
  await expect(field).toHaveJSProperty("tagName", "SELECT");
  await expect(field.locator('option[value="Archived"]')).toBeDisabled();
  await field.selectOption("Platform");
  await expect(field).toBeEnabled();
  await field.press("Tab");
  await expect(
    page.getByRole("button", { name: "Save", exact: true }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.locator("output")).toHaveText(
    "Saved owner for alpha: Platform",
  );
  await expect(trigger("Owner")).toBeFocused();
  await trigger("Owner").click();
  await field.selectOption("Design");
  await field.press("Escape");
  await expect(field).toHaveCount(0);
  await expect(trigger("Owner")).toHaveText("Platform");
  await trigger("Project").click();
  await field.fill("x");
  await field.press("Meta+Enter");
  await expect(page.getByRole("alert")).toHaveText("Use at least 3 characters");
  await expect(field).toBeFocused();
  await expect(field).toHaveAttribute("aria-describedby", /./);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await field.press("Escape");
  await trigger("Owner").click();
  await field.selectOption("Design");
  await field.press("Control+Enter");
  await expect(field).toBeDisabled();
  await page.getByRole("button", { name: "Cancel", exact: true }).click();
  await expect(field).toHaveCount(0);
  await expect(trigger("Owner")).toHaveText("Platform");
  await expect(
    page.getByText("Cancelled saves: 1", { exact: true }),
  ).toBeVisible();
}
