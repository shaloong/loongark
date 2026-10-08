import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { checkDataTableFrozen } from "./dataTableFrozenChecks";
for (const mode of ["light", "dark"])
  test(`DataTable ${mode} 冻结列、RTL、恢复与焦点`, async ({ page }) => {
    await page.goto(
      `/iframe.html?id=components-datatable--frozen&globals=mode:${mode}`,
    );
    await checkDataTableFrozen(page);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
