import { expect, test } from "@playwright/test";
import { checkDataTableRange } from "./dataTableRangeChecks";
for (const framework of ["react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`range ${framework} ${mode} ${width}`, async ({ page }) => {
        test.skip(!process.env.STATIC_DIR, "四端消费构建后运行");
        const errors: string[] = [];
        page.on("pageerror", (e) => errors.push(e.message));
        await page.setViewportSize({ width, height: 1200 });
        await page.goto(
          `/examples-${framework}/?example=DataTableRangeExample&mode=${mode}`,
        );
        await checkDataTableRange(page, `${framework}-${mode}-${width}`);
        expect(errors).toEqual([]);
        await page.screenshot({
          path: `.artifacts/advanced-completion/range-${framework}-${mode}-${width}.png`,
          fullPage: true,
        });
      });
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`range Story ${mode} ${width}`, async ({ page }) => {
      test.skip(!!process.env.STATIC_DIR, "Story专项");
      await page.setViewportSize({ width, height: 1200 });
      await page.goto(
        `/iframe.html?id=components-datatable--cell-range-and-paste&globals=mode:${mode}`,
      );
      await checkDataTableRange(page, `story-${mode}-${width}`);
      await page.screenshot({
        path: `.artifacts/advanced-completion/range-story-${mode}-${width}.png`,
        fullPage: true,
      });
    });
