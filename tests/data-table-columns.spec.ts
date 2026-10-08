import { test, expect } from "@playwright/test";
import { checkDataTableColumns } from "./dataTableColumnsChecks";
for (const framework of ["react", "vue", "solid", "svelte", "Story"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`column layout ${framework} ${mode} ${width}`, async ({ page }) => {
        test.skip(
          framework === "Story"
            ? !!process.env.STATIC_DIR
            : !process.env.STATIC_DIR,
          "Corresponding fresh consumer build required",
        );
        const errors: string[] = [];
        page.on("pageerror", (e) => errors.push(e.message));
        await page.setViewportSize({ width, height: 1100 });
        await page.goto(
          framework === "Story"
            ? `/iframe.html?id=components-datatable--column-layout&globals=mode:${mode}`
            : `/examples-${framework}/?example=DataTableColumnsExample&mode=${mode}`,
        );
        await checkDataTableColumns(page);
        expect(errors).toEqual([]);
        await page.screenshot({
          path: `.artifacts/advanced-completion/columns-${framework}-${mode}-${width}.png`,
          fullPage: true,
        });
        await page
          .getByRole("button", { name: "Use RTL", exact: true })
          .click();
        await page.screenshot({
          path: `.artifacts/advanced-completion/columns-rtl-${framework}-${mode}-${width}.png`,
          fullPage: true,
        });
      });
