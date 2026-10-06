import { expect, test, type Page } from "@playwright/test";
async function checkNested(page: Page) {
  await page.locator("summary").filter({ hasText: "More controls" }).click();
  const form = page.getByRole("form", { name: "Contact review" });
  await page
    .getByRole("button", { name: "Show advanced questions", exact: true })
    .click();
  const alpha = form.locator('[data-group-instance="alpha"]'),
    beta = form.locator('[data-group-instance="beta"]');
  const option = (root: typeof alpha, row: string, label: string) =>
    root
      .locator(`[data-part=matrix-row][data-row="${row}"]`)
      .getByRole("checkbox", { name: label, exact: true });
  await expect(option(alpha, "mornings", "Monday")).toBeChecked();
  await expect(option(beta, "mornings", "Tuesday")).toBeChecked();
  await option(alpha, "mornings", "Wednesday").check();
  await expect(option(beta, "mornings", "Wednesday")).not.toBeChecked();
  await expect(
    page.getByRole("status", { name: "Contact updates" }),
  ).toHaveText("1 callbacks");
  const handle = alpha.getByRole("button", {
    name: "Reorder: Clarity",
    exact: true,
  });
  await handle.focus();
  await page.keyboard.press("Space");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(handle).toBeFocused();
  await expect(
    page.getByRole("status", { name: "Contact updates" }),
  ).toHaveText("2 callbacks");
  const entries = await form.evaluate((node) =>
    Array.from(new FormData(node as HTMLFormElement).entries()),
  );
  expect(
    entries
      .filter(([name]) => name === "contacts[alpha][priorities]")
      .map(([, value]) => value),
  ).toEqual(["speed", "clarity", "quality"]);
  expect(
    entries
      .filter(([name]) => name === "contacts[beta][priorities]")
      .map(([, value]) => value),
  ).toEqual(["quality", "clarity", "speed"]);
  expect(
    entries
      .filter(([name]) => name === "contacts[alpha][availability][mornings]")
      .map(([, value]) => value),
  ).toEqual(["mon", "wed"]);
  await expect(
    alpha.getByRole("checkbox", {
      name: "SMS updates (unavailable)",
      exact: true,
    }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Require clarity first", exact: true })
    .click();
  await form.getByRole("button", { name: "Submit", exact: true }).click();
  await expect(
    alpha.getByRole("button", { name: "Reorder: Speed", exact: true }),
  ).toBeFocused();
  await expect(
    alpha.getByText("Put clarity first.", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Allow any priority order", exact: true })
    .click();
  await alpha
    .getByRole("combobox", { name: "Preferred channel", exact: true })
    .selectOption("other");
  await expect(
    alpha.getByRole("textbox", { name: "Contact address", exact: true }),
  ).toHaveCount(0);
  await expect(
    alpha.getByRole("textbox", { name: "Other channel details", exact: true }),
  ).toHaveValue("Retained private note");
  await expect(
    beta.getByRole("textbox", { name: "Contact address", exact: true }),
  ).toHaveValue("555 0102");
  await alpha
    .getByRole("combobox", { name: "Preferred channel", exact: true })
    .selectOption("email");
  await expect(
    alpha.getByRole("textbox", { name: "Contact address", exact: true }),
  ).toHaveValue("alex@example.com");
  const name = alpha.getByRole("textbox", {
    name: "Contact name",
    exact: true,
  });
  await name.focus();
  await name.evaluate((el) =>
    (el as HTMLTextAreaElement).setSelectionRange(4, 4),
  );
  await page.keyboard.type("XYZ");
  await expect(name).toHaveValue("AlexXYZ Chen");
  await expect(name).toBeFocused();
  expect(
    await name.evaluate((el) => (el as HTMLTextAreaElement).selectionStart),
  ).toBe(7);
  await page
    .getByRole("button", { name: "Use async validation", exact: true })
    .click();
  await form.getByRole("button", { name: "Submit", exact: true }).click();
  await expect(
    form.getByRole("button", { name: "Cancel validation", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Hide survey", exact: true }).click();
  await expect(form).toHaveCount(0);
  await page.getByRole("button", { name: "Show survey", exact: true }).click();
  await expect(form).toBeVisible();
  await expect(
    page.getByRole("status", { name: "Saved contact answers" }),
  ).toHaveText("No answers saved");
}
for (const framework of ["react", "vue", "solid", "svelte"])
  for (const mode of ["light", "dark"])
    for (const width of [1280, 375])
      test(`nested isolation ${framework} ${mode} ${width}`, async ({
        page,
      }) => {
        test.skip(!process.env.STATIC_DIR, "消费新构建");
        await page.setViewportSize({ width, height: 1100 });
        await page.goto(
          `/examples-${framework}/?example=QuestionnaireGroupsExample&mode=${mode}`,
        );
        await checkNested(page);
        await page.screenshot({
          path: `.artifacts/gap-completion/groups-nested-${framework}-${mode}-${width}.png`,
          fullPage: true,
        });
      });
for (const mode of ["light", "dark"])
  for (const width of [1280, 375])
    test(`nested isolation Story ${mode} ${width}`, async ({ page }) => {
      test.skip(!!process.env.STATIC_DIR, "Story专项");
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(
        `/iframe.html?id=components-questionnaire--repeated-groups&globals=mode:${mode}`,
      );
      await checkNested(page);
    });
