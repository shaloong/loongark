import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { checkDataTableAdvanced } from "./dataTableAdvancedChecks";
for (const mode of ["light", "dark"])
  test(`DataTable ${mode} 服务端、列控制与受控拒绝`, async ({ page }) => {
    await page.goto(
      `/iframe.html?id=components-datatable--server&globals=mode:${mode}`,
    );
    await checkDataTableAdvanced(page);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
