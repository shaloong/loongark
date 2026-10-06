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
