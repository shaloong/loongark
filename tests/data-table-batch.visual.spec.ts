import { test, expect } from "@playwright/test";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`DataTable batch ${mode} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1100 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(
        `/iframe.html?id=components-datatable--batch-editing&globals=mode:${mode}`,
      );
      await page
        .getByRole("button", { name: "Edit selected", exact: true })
        .click();
      const form = page.getByRole("form", { name: "Batch edit" });
      await form
        .getByRole("checkbox", { name: "Change Owner", exact: true })
        .check();
      await form.getByLabel("Owner", { exact: true }).selectOption("Platform");
      await form
        .getByRole("checkbox", { name: "Change Revenue", exact: true })
        .check();
      await form.getByLabel("Revenue", { exact: true }).fill("-1");
      await form.getByLabel("Revenue", { exact: true }).press("Control+Enter");
      await expect(page.getByRole("alert")).toContainText(
        "Revenue cannot be negative",
      );
      await expect(form.getByLabel("Revenue", { exact: true })).toBeFocused();
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("body")).toHaveScreenshot(
        `data-table-batch-${mode}-${width}.png`,
        { animations: "disabled" },
      );
    });
