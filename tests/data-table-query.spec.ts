import { test, expect } from "@playwright/test";
import { checkDataTableQuery } from "./dataTableQueryChecks";
for (const framework of ["react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375]) {
      test(`column query ${framework} ${mode} ${width}`, async ({ page }) => {
        test.skip(!process.env.STATIC_DIR, "四端消费构建后运行");
        const errors: string[] = [];
        page.on("pageerror", (e) => errors.push(e.message));
        await page.setViewportSize({ width, height: 1100 });
        await page.goto(
          `/examples-${framework}/?example=DataTableQueryExample&mode=${mode}`,
        );
        await checkDataTableQuery(page);
        expect(errors).toEqual([]);
        await page.screenshot({
          path: `.artifacts/advanced-completion/query-${framework}-${mode}-${width}.png`,
          fullPage: true,
        });
      });
    }
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`column query Story ${mode} ${width}`, async ({ page }) => {
      test.skip(!!process.env.STATIC_DIR, "Story 专项");
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(
        `/iframe.html?id=components-datatable--column-queries&globals=mode:${mode}`,
      );
      await checkDataTableQuery(page);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: `.artifacts/advanced-completion/query-story-sorted-${mode}-${width}.png`,
        fullPage: true,
      });
      await page
        .getByRole("textbox", { name: "Filter Revenue", exact: true })
        .fill("-");
      await expect(page.getByRole("alert")).toHaveText("Enter a finite number");
      await page.screenshot({
        path: `.artifacts/advanced-completion/query-story-error-${mode}-${width}.png`,
        fullPage: true,
      });
    });
