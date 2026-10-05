import { expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
export async function checkDataTableBatch(page: Page) {
  const form = page.getByRole("form", { name: "Batch edit" });
  const trigger = page.getByRole("button", {
    name: "Edit selected",
    exact: true,
  });
  await expect(trigger).toBeEnabled();
  await trigger.click();
  await expect(page.getByRole("form", { name: "Batch edit" })).toBeVisible();
  await expect(
    page.getByText("Editing 2 selected rows", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("checkbox", { name: "Change Revenue", exact: true })
    .check();
  await page
    .getByRole("checkbox", { name: "Change Owner", exact: true })
    .check();
  await form.getByLabel("Owner", { exact: true }).selectOption("Platform");
  const amount = form.getByLabel("Revenue", { exact: true });
  await amount.fill("-1");
  await amount.press("Control+Enter");
  await expect(page.getByRole("alert")).toContainText(
    "Revenue cannot be negative",
  );
  await expect(
    page.getByRole("cell", { name: "2400", exact: true }),
  ).toBeVisible();
  await expect(amount).toHaveAttribute("aria-invalid", "true");
  await expect(amount).toBeFocused();
  await amount.fill("1250");
  await page
    .getByRole("button", { name: "Apply changes", exact: true })
    .click();
  await expect(page.getByRole("form")).toHaveAttribute("aria-busy", "true");
  await expect(form.getByLabel("Owner", { exact: true })).toBeDisabled();
  await expect(
    page.getByText("Applied batch: 3 cells", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "1250", exact: true }),
  ).toHaveCount(2);
  await expect(
    page.getByRole("cell", { name: "900", exact: true }),
  ).toBeVisible();
  await expect(trigger).toBeFocused();
  const undo = page.getByRole("button", { name: "Undo batch", exact: true });
  await expect(undo).toBeEnabled();
  await undo.click();
  await expect(
    page.getByText("Undid batch: 3 cells", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "2400", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "1800", exact: true }),
  ).toBeVisible();
  await expect(undo).toBeDisabled();
  const redo = page.getByRole("button", { name: "Redo batch", exact: true });
  await expect(redo).toBeEnabled();
  await redo.focus();
  await redo.press("Control+Shift+z");
  await expect(
    page.getByText("Redid batch: 3 cells", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "1250", exact: true }),
  ).toHaveCount(2);
  await trigger.click();
  await page
    .getByRole("checkbox", { name: "Change Project", exact: true })
    .check();
  const project = form.getByLabel("Project", { exact: true });
  await project.fill("Second batch");
  await project.press("End");
  await project.press("x");
  await project.press("Control+z");
  await expect(project).toHaveValue("Second batch");
  await expect(
    page.getByText("Redid batch: 3 cells", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Apply changes", exact: true })
    .click();
  await expect(
    page.getByText("Applied batch: 2 cells", { exact: true }),
  ).toBeVisible();
  await undo.click();
  await expect(
    page.getByText("Undid batch: 2 cells", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "1250", exact: true }),
  ).toHaveCount(2);
  await expect(undo).toBeEnabled();
  await undo.click();
  await expect(
    page.getByText("Undid batch: 3 cells", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "2400", exact: true }),
  ).toBeVisible();
  await expect(undo).toBeDisabled();
  await expect(redo).toBeEnabled();
  await page
    .getByRole("button", { name: "Fail next save", exact: true })
    .click();
  await trigger.click();
  await page
    .getByRole("checkbox", { name: "Change Owner", exact: true })
    .check();
  await form.getByLabel("Owner", { exact: true }).selectOption("Platform");
  await page
    .getByRole("button", { name: "Apply changes", exact: true })
    .click();
  await expect(page.getByRole("alert")).toHaveText(
    "Could not save. Try again.",
  );
  await expect(form.getByLabel("Owner", { exact: true })).toHaveValue(
    "Platform",
  );
  await expect(
    page.getByRole("cell", { name: "Design", exact: true }),
  ).toHaveCount(2);
  await page
    .getByRole("button", { name: "Apply changes", exact: true })
    .click();
  await expect(page.getByRole("form")).toHaveAttribute("aria-busy", "true");
  await page.getByRole("button", { name: "Cancel", exact: true }).click();
  await expect(page.getByRole("form")).toHaveCount(0);
  await expect(
    page.getByText("Cancelled saves: 1", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Design", exact: true }),
  ).toHaveCount(2);
  await trigger.click();
  await page
    .getByRole("checkbox", { name: "Change Owner", exact: true })
    .check();
  await form.getByLabel("Owner", { exact: true }).selectOption("Platform");
  await page
    .getByRole("button", { name: "Apply changes", exact: true })
    .click();
  const outside = page.getByRole("button", {
    name: "Remove first row",
    exact: true,
  });
  await outside.focus();
  await expect(
    page.getByText("Applied batch: 1 cells", { exact: true }),
  ).toBeVisible();
  await expect(outside).toBeFocused();
  await expect(undo).toBeEnabled();
  await page
    .getByRole("button", { name: "Remove first row", exact: true })
    .click();
  await expect(undo).toBeDisabled();
  await trigger.click();
  await expect(
    page.getByText("Editing 1 selected rows", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("checkbox", { name: "Change Project", exact: true })
    .check();
  await form
    .getByLabel("Project", { exact: true })
    .fill("Preserved draft\nMultiple lines");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
  ).toBe(false);
}
