import { test, expect } from "@playwright/test";
import { checkComplexEditors } from "./dataTableComplexEditorChecks";
for (const framework of ["react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`${framework} ${mode} ${width} 选择与多行编辑`, async ({ page }) => {
        test.skip(!process.env.STATIC_DIR, "通过四端消费服务器验证");
        await page.setViewportSize({ width, height: 1100 });
        await page.goto(
          `/examples-${framework}/?example=DataTableComplexEditorsExample&mode=${mode}`,
        );
        await checkComplexEditors(page);
        await page
          .getByRole("button", { name: /^Edit Project for alpha: / })
          .click();
        await page.evaluate(() => document.fonts.ready);
        await page
          .locator("[data-example-content]")
          .screenshot({
            path: `.artifacts/advanced-completion/complex-${framework}-${mode}-${width}.png`,
          });
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth > innerWidth + 1,
          ),
        ).toBe(false);
      });
