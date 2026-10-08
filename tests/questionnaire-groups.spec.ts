import { expect, test } from "@playwright/test";
import { checkQuestionnaireGroups } from "./questionnaireGroupsChecks";
for (const framework of ["Story", "react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    test(`long group labels resize ${framework} ${mode}`, async ({
      page,
      browserName,
    }) => {
      test.skip(
        framework === "Story"
          ? !!process.env.STATIC_DIR
          : !process.env.STATIC_DIR,
      );
      await page.setViewportSize({ width: 1280, height: 1200 });
      await page.goto(
        framework === "Story"
          ? `/iframe.html?id=components-questionnaire--repeated-groups&globals=mode:${mode}`
          : `/examples-${framework}/?example=QuestionnaireGroupsExample&mode=${mode}`,
      );
      const form = page.getByRole("form", { name: "Contact review" });
      await expect(form).toBeVisible();
      await page
        .locator("summary")
        .filter({ hasText: "More controls" })
        .click();
      await page
        .getByRole("button", { name: "Use long labels", exact: true })
        .click();
      await page
        .getByRole("button", { name: "Show advanced questions", exact: true })
        .click();
      const contact = form.locator('[data-group-instance="alpha"]');
      await contact
        .getByRole("button", { name: "Add backup", exact: true })
        .click();
      const name = contact.getByRole("textbox", { name: /^Contact name/ });
      await name.fill("Long label contact");
      const entries = () =>
        form.evaluate((node) =>
          Array.from(new FormData(node as HTMLFormElement).entries()),
        );
      const before = await entries();
      // 标签来自真实 schema 更新，覆盖顶层、嵌套实例和矩阵；缩屏不能丢答案或改变表单路径。
      for (const width of [375, 320, 1280]) {
        await page.setViewportSize({ width, height: 1200 });
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
        await expect(name).toHaveValue("Long label contact");
        expect(await entries()).toEqual(before);
        await page.evaluate(
          () =>
            new Promise<void>((resolve) =>
              requestAnimationFrame(() =>
                requestAnimationFrame(() => resolve()),
              ),
            ),
        );
        await page.screenshot({
          path: `.artifacts/p0-consistency/long-labels-${browserName}-${framework}-${mode}-${width}.png`,
          fullPage: true,
        });
      }
      await page
        .getByRole("button", { name: "Use short labels", exact: true })
        .click();
      await expect(
        contact.getByRole("textbox", { name: "Contact name", exact: true }),
      ).toHaveValue("Long label contact");
      expect(await entries()).toEqual(before);
    });
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
