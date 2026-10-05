import { expect, type Page } from "@playwright/test";
export async function checkQuestionnaireAsync(page: Page) {
  const form = page.getByRole("form", { name: "Async workspace setup" });
  const name = form.getByRole("textbox", {
    name: "Workspace name",
    exact: true,
  });
  const next = () => form.getByRole("button", { name: "Next", exact: true });
  await expect(name).toHaveValue("Shaloong");
  const initialCancelled = Number(
    (await page.getByLabel("Cancelled checks").textContent())?.replace(
      "Cancelled checks: ",
      "",
    ),
  );
  await name.fill("");
  await next().click();
  await expect(form.getByRole("alert")).toHaveText(
    "Please answer this question.",
  );
  await expect(form).not.toHaveAttribute("aria-busy", "true");
  await name.fill("reserved");
  await next().click();
  await expect(form).toHaveAttribute("aria-busy", "true");
  await expect(next()).toBeDisabled();
  await expect(name).toBeEnabled();
  await expect(form.getByRole("status")).toHaveText("Checking answers…");
  await name.fill("Changed answer");
  await expect(form).not.toHaveAttribute("aria-busy", "true");
  await expect(page.getByLabel("Cancelled checks")).toHaveText(
    "Cancelled checks: " + String(initialCancelled + 1),
  );
  await next().click();
  await form
    .getByRole("button", { name: "Cancel validation", exact: true })
    .click();
  await expect(name).toBeFocused();
  await expect(page.getByLabel("Cancelled checks")).toHaveText(
    "Cancelled checks: " + String(initialCancelled + 2),
  );
  await name.fill("reserved");
  await next().click();
  await expect(form.getByRole("alert")).toHaveText(
    "This name is already in use.",
  );
  await expect(name).toHaveAttribute("aria-invalid", "true");
  await expect(name).toBeFocused();
  await next().click();
  await expect(form).toHaveAttribute("aria-busy", "true");
  const outside = page.getByRole("button", {
    name: "Fail next check",
    exact: true,
  });
  await outside.focus();
  await expect(form.getByRole("alert")).toHaveText(
    "This name is already in use.",
  );
  await expect(outside).toBeFocused();
  await name.fill("Shaloong");
  await page
    .getByRole("button", { name: "Fail next check", exact: true })
    .click();
  await next().click();
  await expect(form.getByRole("alert")).toHaveText(
    "Validation failed. Please try again.",
  );
  await next().click();
  await expect(form.getByRole("radio").first()).toBeVisible();
  // 多行标签的原生控件对齐首行，按钮保持同一中心和左右边缘。
  const alignment = await form
    .locator('[data-part="option"]')
    .evaluateAll((elements) =>
      elements.map((el) => {
        const input = el.querySelector("input")!.getBoundingClientRect(),
          text = el.querySelector("span")!,
          range = document.createRange();
        range.setStart(text.firstChild!, 0);
        range.setEnd(text.firstChild!, 1);
        const line = range.getBoundingClientRect();
        return {
          delta: Math.abs(
            input.y + input.height / 2 - line.y - line.height / 2,
          ),
          margin: getComputedStyle(el.querySelector("input")!)
            .marginInlineStart,
        };
      }),
    );
  for (const m of alignment) {
    expect(m.delta).toBeLessThanOrEqual(1);
    expect(m.margin).toBe("0px");
  }
  const buttons = await form
    .locator('[data-part="actions"] button')
    .evaluateAll((elements) =>
      elements.map((e) => {
        const r = e.getBoundingClientRect();
        return r.y + r.height / 2;
      }),
    );
  expect(Math.max(...buttons) - Math.min(...buttons)).toBeLessThanOrEqual(0.5);
  // 最终提交重新执行前题的服务校验；失败需回到前题并显示其错误。
  await page
    .getByRole("button", { name: "Fail next check", exact: true })
    .click();
  await form.getByRole("button", { name: "Submit", exact: true }).click();
  await expect(name).toBeVisible();
  await expect(form.getByRole("alert")).toHaveText(
    "Validation failed. Please try again.",
  );
  await expect(name).toBeFocused();
  await next().click();
  await expect(form.getByRole("radio").first()).toBeVisible();
  await form.getByRole("button", { name: "Submit", exact: true }).click();
  await expect(page.getByLabel("Saved async answers")).toHaveText(
    "Shaloong · team",
  );
}
export async function checkQuestionnaireCancellation(page: Page) {
  const form = page.getByRole("form", { name: "Async workspace setup" });
  await expect(form.getByRole("textbox")).toBeVisible();
  await form.getByRole("button", { name: "Next", exact: true }).click();
  await expect(form).toHaveAttribute("aria-busy", "true");
  const shorter = page.getByRole("button", {
    name: "Use shorter survey",
    exact: true,
  });
  await shorter.click();
  await expect(form.getByRole("radio").first()).toBeVisible();
  await expect(page.getByLabel("Cancelled checks")).toHaveText(
    "Cancelled checks: 1",
  );
  await expect(shorter).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Restore questions", exact: true }),
  ).toBeFocused();
  await page
    .getByRole("button", { name: "Restore questions", exact: true })
    .click();
  await form.getByRole("button", { name: "Next", exact: true }).click();
  await expect(form).toHaveAttribute("aria-busy", "true");
  const hide = page.getByRole("button", { name: "Hide survey", exact: true });
  await hide.click();
  await expect(form).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Show survey", exact: true }),
  ).toBeFocused();
  await expect(page.getByLabel("Cancelled checks")).toHaveText(
    "Cancelled checks: 2",
  );
  await page.getByRole("button", { name: "Show survey", exact: true }).click();
  await expect(form.getByRole("textbox")).toHaveValue("Shaloong");
  await expect(page.getByLabel("Saved async answers")).toHaveText(
    "No answers saved yet",
  );
}
