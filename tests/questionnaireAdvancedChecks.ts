import { expect, type Page } from "@playwright/test";
export async function checkQuestionnaireAdvanced(page: Page) {
  const form = page.getByRole("form", { name: "Workspace setup" }),
    next = () => form.getByRole("button", { name: "Next", exact: true }),
    back = () => form.getByRole("button", { name: "Back", exact: true }),
    lock = () =>
      page.getByRole("button", { name: "Lock answer updates", exact: true }),
    unlock = () =>
      page.getByRole("button", { name: "Allow answer updates", exact: true });
  await expect(
    form.getByRole("radio", { name: "Team project", exact: true }),
  ).toBeChecked();
  await expect(form.locator('[data-part="count"]')).toHaveText("1 / 4");
  await lock().click();
  await form
    .getByRole("radio", { name: "Personal project", exact: true })
    .click();
  await expect(
    form.getByRole("radio", { name: "Personal project", exact: true }),
  ).not.toBeChecked();
  await expect(
    form.getByRole("radio", { name: "Team project", exact: true }),
  ).toBeChecked();
  await unlock().click();
  await next().click();
  const team = form.getByRole("textbox", { name: "Team name", exact: true });
  await expect(team).toHaveValue("Shaloong");
  await expect(team).toBeFocused();
  await lock().click();
  await team.fill("Rejected name");
  await expect(team).toHaveValue("Shaloong");
  await team.fill("Rejected twice");
  await expect(team).toHaveValue("Shaloong");
  await unlock().click();
  await team.fill("team");
  await next().click();
  await expect(form.getByRole("alert")).toHaveText("Use a specific team name.");
  await expect(team).toHaveAttribute("aria-invalid", "true");
  await expect(team).toBeFocused();
  await team.fill("Shaloong Labs");
  await next().click();
  const email = form.getByRole("textbox", {
    name: "Contact email",
    exact: true,
  });
  await expect(email).toBeFocused();
  await email.fill("bad-email");
  await next().click();
  await expect(form.getByRole("alert")).toHaveText(
    "Enter a valid email address.",
  );
  await back().click();
  await expect(team).toHaveValue("Shaloong Labs");
  await back().click();
  await form
    .getByRole("radio", { name: "Personal project", exact: true })
    .click();
  await expect(form.locator('[data-part="count"]')).toHaveText("1 / 3");
  await expect(form.locator('input[name="teamName"]')).toHaveCount(0);
  await next().click();
  await expect(email).toHaveValue("bad-email");
  await email.fill("reader@shaloong.dev");
  await next().click();
  const confirm = form.getByRole("textbox", {
    name: "Confirm email",
    exact: true,
  });
  await expect(confirm).toBeFocused();
  await confirm.fill("other@shaloong.dev");
  await form.getByRole("button", { name: "Submit", exact: true }).click();
  await expect(form.getByRole("alert")).toHaveText(
    "Email addresses must match.",
  );
  await expect(page.getByLabel("Saved answers")).toHaveText(
    "No answers saved yet",
  );
  await back().click();
  await back().click();
  await form.getByRole("radio", { name: "Team project", exact: true }).click();
  await next().click();
  await expect(team).toHaveValue("Shaloong Labs");
  // 隐藏必填题即使无效也不能阻止个人分支提交。
  await team.fill("");
  await back().click();
  await form
    .getByRole("radio", { name: "Personal project", exact: true })
    .click();
  await next().click();
  await expect(email).toHaveValue("reader@shaloong.dev");
  await next().click();
  await confirm.fill("reader@shaloong.dev");
  expect(
    await form.evaluate((el: HTMLFormElement) =>
      Object.fromEntries(new FormData(el)),
    ),
  ).toEqual({
    account: "personal",
    email: "reader@shaloong.dev",
    confirmEmail: "reader@shaloong.dev",
  });
  await form.getByRole("button", { name: "Submit", exact: true }).click();
  await expect(form.getByRole("status")).toHaveText(
    "Thank you for your answers.",
  );
  await expect(page.getByLabel("Saved answers")).toHaveText(
    "Personal · reader@shaloong.dev",
  );
  await expect(page.getByLabel("Saved answers")).toHaveAttribute(
    "data-answer-keys",
    "account,email,confirmEmail",
  );
  await expect(
    form.getByRole("button", { name: "Submit", exact: true }),
  ).toHaveCount(0);
  const reset = page.getByRole("button", { name: "Reset survey", exact: true });
  await reset.click();
  await expect(reset).toBeFocused();
  await expect(
    form.getByRole("radio", { name: "Team project", exact: true }),
  ).toBeChecked();
  await expect(form.locator('[data-part="count"]')).toHaveText("1 / 4");
  await expect(page.getByLabel("Saved answers")).toHaveText(
    "No answers saved yet",
  );
}
