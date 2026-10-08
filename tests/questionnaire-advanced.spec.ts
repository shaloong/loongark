import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { checkQuestionnaireAdvanced } from "./questionnaireAdvancedChecks";
for (const mode of ["light", "dark"])
  test(`Questionnaire ${mode} 条件分支、业务校验和受控拒绝`, async ({
    page,
  }) => {
    await page.goto(
      `/iframe.html?id=components-questionnaire--conditional&globals=mode:${mode}`,
    );
    await checkQuestionnaireAdvanced(page);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
test("全部题目隐藏时没有提交入口", async ({ page }) => {
  await page.goto(
    "/iframe.html?id=components-questionnaire--conditional-empty",
  );
  await expect(
    page.getByRole("form", { name: "No applicable questions" }),
  ).toContainText("No questions available.");
  await expect(
    page.getByRole("button", { name: "Submit", exact: true }),
  ).toHaveCount(0);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
