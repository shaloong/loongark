import { expect, test, type Page } from "@playwright/test";
async function checkBounds(page: Page) {
  await page.locator("summary").filter({ hasText: "More controls" }).click();
  const form = page.getByRole("form", { name: "Contact review" }),
    alpha = form.locator('[data-group-instance="alpha"]');
  await form
    .getByRole("button", { name: "Remove contact 2", exact: true })
    .click();
  await alpha
    .getByRole("textbox", { name: "Contact name", exact: true })
    .fill("");
  await page
    .getByRole("button", { name: "Require two contacts", exact: true })
    .click();
  await form.getByRole("button", { name: "Submit", exact: true }).click();
  await expect(
    form.getByRole("button", { name: "Add contact", exact: true }),
  ).toBeFocused();
  await expect(
    form.getByRole("button", { name: "Remove contact 1", exact: true }),
  ).toBeDisabled();
  await form.getByRole("button", { name: "Add contact", exact: true }).click();
  await expect(
    form.getByRole("button", { name: "Remove contact 2", exact: true }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Require one contact", exact: true })
    .click();
  await form
    .getByRole("button", { name: "Remove contact 2", exact: true })
    .click();
  await alpha
    .getByRole("textbox", { name: "Contact name", exact: true })
    .fill("Stable");
  await page
    .getByRole("button", { name: "Show advanced questions", exact: true })
    .click();
  const mail = alpha.getByRole("checkbox", {
    name: "Email updates",
    exact: true,
  });
  await expect(
    alpha.getByRole("checkbox", {
      name: "SMS updates (unavailable)",
      exact: true,
    }),
  ).toBeDisabled();
  await mail.check();
  await expect(mail).toBeChecked();
  await expect(mail.locator("..")).toHaveAttribute("data-selected", "true");
  await page
    .getByRole("button", { name: "Reject updates", exact: true })
    .click();
  await mail.click();
  await expect(mail).toBeChecked();
  await expect(mail.locator("..")).toHaveAttribute("data-selected", "true");
  await page
    .getByRole("button", { name: "Accept updates", exact: true })
    .click();
  await mail.uncheck();
  await expect(mail).not.toBeChecked();
  await expect(mail.locator("..")).not.toHaveAttribute("data-selected", "true");
  await mail.check();
  const entries = await form.evaluate((node) =>
    Array.from(new FormData(node as HTMLFormElement).entries()),
  );
  expect(
    entries.filter(([name]) => name === "contacts[alpha][updates]"),
  ).toEqual([["contacts[alpha][updates]", "email"]]);
  expect(entries.some(([, value]) => value === "sms")).toBe(false);
}
for (const framework of ["react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`group constraints ${framework} ${mode} ${width}`, async ({
        page,
      }) => {
        test.skip(!process.env.STATIC_DIR, "消费新构建");
        await page.setViewportSize({ width, height: 1100 });
        await page.goto(
          `/examples-${framework}/?example=QuestionnaireGroupsExample&mode=${mode}`,
        );
        await checkBounds(page);
      });
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`group constraints Story ${mode} ${width}`, async ({ page }) => {
      test.skip(!!process.env.STATIC_DIR, "Story专项");
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(
        `/iframe.html?id=components-questionnaire--repeated-groups&globals=mode:${mode}`,
      );
      await checkBounds(page);
    });
