import { expect, test } from "@playwright/test";
for (const framework of ["react", "vue", "solid", "svelte"])
  test(`custom validation mode cancels pending ${framework}`, async ({
    page,
  }) => {
    test.skip(!process.env.STATIC_DIR, "四端消费新构建后运行");
    await page.goto(
      `/examples-${framework}/?example=QuestionnaireCustomExample&mode=light`,
    );
    await page.getByText("More controls", { exact: true }).click();
    await page
      .getByRole("button", { name: "Use async validation", exact: true })
      .click();
    const form = page.getByRole("form", { name: "Experience review" });
    const rating = form.getByRole("radiogroup", { name: "Experience rating" });
    await rating.getByRole("radio").nth(0).click();
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    await expect(form.locator('[data-part="validation"]')).toBeVisible();
    await page
      .getByRole("button", { name: "Use synchronous validation", exact: true })
      .click();
    await expect(form.locator('[data-part="validation"]')).toHaveCount(0);
    await page.waitForTimeout(350);
    await expect(
      form.getByText("Choose at least two stars.", { exact: true }),
    ).toHaveCount(0);
    await expect(rating).not.toHaveAttribute("aria-invalid", "true");
    await page.getByRole("button", { name: "Submit", exact: true }).click();
    await expect(
      page.getByRole("status", { name: "Saved rating answers" }),
    ).toHaveText('{"rating":"1"}');
  });
