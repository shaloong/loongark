import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { checkDataTable } from "./dataTableChecks";
for (const mode of ["light", "dark"])
  test(`DataTable ${mode} 受控选择、删除和分页`, async ({ page }) => {
    await page.goto(
      `/iframe.html?id=compositions-project-tables--basic&globals=mode:${mode}`,
    );
    await expect(page.locator("[data-scope=data-table]").first()).toBeVisible();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await checkDataTable(page);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
test("表格翻页和空状态使用同一套本地化标签", async ({ page }) => {
  await page.goto("/iframe.html?id=components-datatable--localized");
  await page.getByRole("checkbox", { name: "选择当前页", exact: true }).check();
  await expect(page.locator("footer")).toContainText("已选 2 项");
  await page
    .getByRole("button", { name: "下一页", exact: true })
    .press("Enter");
  await expect(
    page.getByRole("table", { name: "项目列表", exact: true }).locator("tbody"),
  ).toContainText("Gamma");
  await page
    .getByRole("textbox", { name: "筛选项目", exact: true })
    .fill("missing");
  await expect(page.getByText("没有匹配的项目", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("checkbox", { name: "选择当前页", exact: true }),
  ).toBeDisabled();
  await expect(
    page.getByRole("button", { name: "上一页", exact: true }),
  ).toBeDisabled();
});
