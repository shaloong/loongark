import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const framework of ["react", "vue", "solid", "svelte"])
  test(`DataTable custom search ${framework}`, async ({ page }, info) => {
    await page.setViewportSize({ width: 375, height: 900 });
    await page.goto(
      `/examples-${framework}/?example=DataTableSearchExample&mode=dark`,
    );
    const external = page.getByRole("searchbox", { name: "外部搜索" });
    const internal = page.getByRole("textbox", {
      name: "Filter rows",
      exact: true,
    });
    const toggle = page.getByRole("button", { name: "切换内置搜索" });
    const table = page.getByRole("table", { name: "搜索示例", exact: true });
    await expect(internal).toHaveCount(0);
    await expect(
      table.getByRole("cell", { name: "Alpha", exact: true }),
    ).toBeVisible();
    await expect(
      table.getByRole("cell", { name: "Beta", exact: true }),
    ).toHaveCount(0);
    await external.fill("Beta");
    await expect(
      table.getByRole("cell", { name: "Beta", exact: true }),
    ).toBeVisible();
    await toggle.click();
    await expect(internal).toHaveValue("Beta");
    await internal.fill("Alpha");
    await expect(external).toHaveValue("Alpha");
    await toggle.click();
    await expect(internal).toHaveCount(0);
    await expect(
      table.getByRole("cell", { name: "Alpha", exact: true }),
    ).toBeVisible();
    await external.fill("");
    const sort = table.getByRole("button", { name: /项目/ });
    await sort.click();
    await sort.click();
    await expect(table.locator("tbody tr")).toHaveText([/Beta/, /Alpha/]);
    await toggle.click();
    await expect(internal).toHaveValue("");
    await expect(table.locator("tbody tr")).toHaveText([/Beta/, /Alpha/]);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.screenshot({
      path: `.artifacts/data-table-search/${info.project.name}/${framework}-dark-375.png`,
    });
    await page.goto(
      `/examples-${framework}/?example=DataTableBasicExample&mode=dark`,
    );
    await expect(internal).toBeVisible();
  });
