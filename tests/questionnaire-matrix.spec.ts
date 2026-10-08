import { expect, test } from "@playwright/test";
import { checkQuestionnaireMatrix } from "./questionnaireMatrixChecks";
for (const framework of ["react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`matrix multiple ${framework} ${mode} ${width}`, async ({
        page,
      }) => {
        test.skip(!process.env.STATIC_DIR, "四端消费新构建后运行");
        const errors: string[] = [];
        page.on("pageerror", (e) => errors.push(e.message));
        await page.setViewportSize({ width, height: 1200 });
        await page.goto(
          `/examples-${framework}/?example=QuestionnaireMatrixExample&mode=${mode}`,
        );
        await expect(
          page.getByRole("form", { name: "Matrix review" }),
        ).toBeVisible();
        await page.screenshot({
          path: `.artifacts/gap-completion/matrix-default-${framework}-${mode}-${width}.png`,
          fullPage: true,
        });
        await checkQuestionnaireMatrix(page);
        expect(errors).toEqual([]);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
        await page.screenshot({
          path: `.artifacts/gap-completion/matrix-tested-${framework}-${mode}-${width}.png`,
          fullPage: true,
        });
      });
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`matrix multiple Story ${mode} ${width}`, async ({ page }) => {
      test.skip(!!process.env.STATIC_DIR, "Story专项");
      await page.setViewportSize({ width, height: 1200 });
      await page.goto(
        `/iframe.html?id=components-questionnaire--matrix-multiple&globals=mode:${mode}`,
      );
      await checkQuestionnaireMatrix(page);
    });

for (const framework of ["Story", "react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    test(`matrix resize ${framework} ${mode}`, async ({ page }) => {
      test.skip(
        framework === "Story"
          ? !!process.env.STATIC_DIR
          : !process.env.STATIC_DIR,
      );
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto(
        framework === "Story"
          ? `/iframe.html?id=components-questionnaire--matrix-multiple&globals=mode:${mode}`
          : `/examples-${framework}/?example=QuestionnaireMatrixExample&mode=${mode}`,
      );
      const form = page.getByRole("form", { name: "Matrix review" });
      await expect(form).toBeVisible();
      // 同一份表单由桌面缩到手机再展开，原生 legend 不能撑开页面。
      for (const width of [375, 320, 1280]) {
        await page.setViewportSize({ width, height: 900 });
        await expect
          .poll(() =>
            page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth,
            ),
          )
          .toBe(true);
        for (const legend of await form.locator("legend").all()) {
          const bounds = await legend.boundingBox();
          expect(bounds!.x).toBeGreaterThanOrEqual(0);
          expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
        }
      }
    });
