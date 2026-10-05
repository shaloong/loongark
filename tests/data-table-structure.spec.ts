import { expect, test } from "@playwright/test";
import { checkDataTableStructure } from "./dataTableStructureChecks";
for (const framework of ["react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`structure ${framework} ${mode} ${width}`, async ({ page }) => {
        test.skip(!process.env.STATIC_DIR, "四端消费构建后运行");
        const errors: string[] = [];
        page.on("pageerror", (e) => errors.push(e.message));
        await page.setViewportSize({ width, height: 1200 });
        await page.goto(
          `/examples-${framework}/?example=DataTableStructureExample&mode=${mode}`,
        );
        await checkDataTableStructure(page, `${framework}-${mode}-${width}`);
        expect(errors).toEqual([]);
        await page.screenshot({
          path: `.artifacts/advanced-completion/structure-${framework}-${mode}-${width}.png`,
          fullPage: true,
        });
      });
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`structure Story ${mode} ${width}`, async ({ page }) => {
      test.skip(!!process.env.STATIC_DIR, "Story专项");
      await page.setViewportSize({ width, height: 1200 });
      await page.goto(
        `/iframe.html?id=components-datatable--grouping-and-tree&globals=mode:${mode}`,
      );
      await checkDataTableStructure(page, `story-${mode}-${width}`);
      await page.screenshot({
        path: `.artifacts/advanced-completion/structure-story-${mode}-${width}.png`,
        fullPage: true,
      });
    });
