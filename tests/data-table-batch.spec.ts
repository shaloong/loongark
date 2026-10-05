import { test } from "@playwright/test";
import { checkDataTableBatch } from "./dataTableBatchChecks";
for (const framework of ["react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`batch ${framework} ${mode} ${width}`, async ({ page }) => {
        test.skip(!process.env.STATIC_DIR, "四端消费构建后运行");
        await page.setViewportSize({ width, height: 1100 });
        await page.goto(
          `/examples-${framework}/?example=DataTableBatchExample&mode=${mode}`,
        );
        await checkDataTableBatch(page);
        await page.screenshot({
          path: `.artifacts/advanced-completion/batch-${framework}-${mode}-${width}.png`,
        });
      });

for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`batch Story ${mode} ${width}`, async ({ page }) => {
      test.skip(!!process.env.STATIC_DIR, "Story 服务专项");
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(
        `/iframe.html?id=components-datatable--batch-editing&globals=mode:${mode}`,
      );
      await checkDataTableBatch(page);
    });
