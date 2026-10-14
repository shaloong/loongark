import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { checkDataTableAdvanced } from "./dataTableAdvancedChecks";
for (const framework of ["react", "vue", "solid", "svelte"])
  test(`${framework} 服务端表格请求生命周期`, async ({ page }) => {
    test.skip(!process.env.STATIC_DIR, "通过四端消费服务器运行");
    await page.goto(
      `/examples-${framework}/?example=DataTableAdvancedExample`,
    );
    await checkDataTableAdvanced(page);
  });
for (const mode of ["light", "dark"])
  test(`DataTable ${mode} 服务端、列控制与受控拒绝`, async ({ page }) => {
    test.skip(Boolean(process.env.STATIC_DIR), "通过 Storybook 服务器运行");
    await page.goto(
      `/iframe.html?id=components-datatable--server&globals=mode:${mode}`,
    );
    await checkDataTableAdvanced(page);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
