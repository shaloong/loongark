import { test } from "@playwright/test";
import { checkDataTableEditing } from "./dataTableEditChecks";
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`DataTable editing ${mode} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(
        `/iframe.html?id=components-datatable--editing&globals=mode:${mode}`,
      );
      await checkDataTableEditing(page);
    });
