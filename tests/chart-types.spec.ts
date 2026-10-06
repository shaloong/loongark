import { test } from "@playwright/test";
import { checkChartTypes } from "./chartTypeChecks";
for (const framework of ["react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`chart types ${framework} ${mode} ${width}`, async ({ page }) => {
        test.skip(!process.env.STATIC_DIR, "四端消费构建后运行");
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.setViewportSize({ width, height: 1100 });
        await page.goto(
          `/examples-${framework}/?example=ChartTypesExample&mode=${mode}`,
        );
        await page.evaluate(
          (key) => (document.documentElement.dataset.chartCapture = key),
          `${framework}-${mode}-${width}`,
        );
        await checkChartTypes(page);
        if (errors.length) throw Error(errors.join("\n"));
      });
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`chart types Story ${mode} ${width}`, async ({ page }) => {
      test.skip(!!process.env.STATIC_DIR, "Story专项");
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(
        `/iframe.html?id=components-chart--types-and-axes&globals=mode:${mode}`,
      );
      await page.evaluate(
        (key) => (document.documentElement.dataset.chartCapture = key),
        `Story-${mode}-${width}`,
      );
      await checkChartTypes(page);
    });
