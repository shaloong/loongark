import { expect, test } from "@playwright/test";
import { checkQuestionnaireGroups } from "./questionnaireGroupsChecks";
for (const framework of ["react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`repeated groups ${framework} ${mode} ${width}`, async ({
        page,
      }) => {
        test.skip(!process.env.STATIC_DIR, "四端消费新构建后运行");
        const errors: string[] = [];
        page.on("pageerror", (e) => errors.push(e.message));
        await page.setViewportSize({ width, height: 1200 });
        await page.goto(
          `/examples-${framework}/?example=QuestionnaireGroupsExample&mode=${mode}`,
        );
        await expect(
          page.getByRole("form", { name: "Contact review" }),
        ).toBeVisible();
        await page.screenshot({
          path: `.artifacts/gap-completion/groups-default-${framework}-${mode}-${width}.png`,
          fullPage: true,
        });
        await checkQuestionnaireGroups(page);
        expect(errors).toEqual([]);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
        await page.screenshot({
          path: `.artifacts/gap-completion/groups-tested-${framework}-${mode}-${width}.png`,
          fullPage: true,
        });
      });
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`repeated groups Story ${mode} ${width}`, async ({ page }) => {
      test.skip(!!process.env.STATIC_DIR, "Story专项");
      await page.setViewportSize({ width, height: 1200 });
      await page.goto(
        `/iframe.html?id=components-questionnaire--repeated-groups&globals=mode:${mode}`,
      );
      await checkQuestionnaireGroups(page);
    });
