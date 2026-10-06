import { expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
export async function checkQuestionnaireMatrix(page: Page) {
  const form = page.getByRole("form", { name: "Matrix review" });
  const row = (id: string) =>
    form.locator(`[data-part="matrix-row"][data-row="${id}"]`);
  const option = (id: string, name: string) =>
    row(id).getByRole("checkbox", { name, exact: true });
  const next = () =>
    form.getByRole("button", { name: "Next", exact: true }).click();
  await next();
  await expect(option("navigation", "Keyboard interaction")).toBeFocused();
  await option("navigation", "Keyboard interaction").check();
  await option("navigation", "Layout and alignment").check();
  await next();
  await expect(option("content", "Keyboard interaction")).toBeFocused();
  await expect(row("content")).toHaveAttribute("aria-invalid", "true");
  await option("content", "Readable contrast").check();
  await page
    .getByRole("button", { name: "Reject updates", exact: true })
    .click();
  await option("content", "Readable contrast").click();
  await expect(option("content", "Readable contrast")).toBeChecked();
  await option("content", "Keyboard interaction").click();
  await expect(option("content", "Keyboard interaction")).not.toBeChecked();
  await page
    .getByRole("button", { name: "Accept updates", exact: true })
    .click();
  await option("navigation", "Readable contrast").check();
  await next();
  await expect(form.getByRole("alert").first()).toContainText(
    "selected options",
  );
  await expect(option("navigation", "Keyboard interaction")).toBeFocused();
  await option("navigation", "Readable contrast").uncheck();
  await expect(row("retired").getByRole("checkbox").first()).toBeDisabled();
  await expect(option("content", "Unavailable improvement")).toBeDisabled();
  const entries = await form.evaluate((node) =>
    Array.from(new FormData(node as HTMLFormElement).entries()),
  );
  expect(entries.filter(([name]) => name === "review[navigation]")).toEqual([
    ["review[navigation]", "keyboard"],
    ["review[navigation]", "layout"],
  ]);
  expect(entries.filter(([name]) => name === "review[content]")).toEqual([
    ["review[content]", "contrast"],
  ]);
  expect(entries.some(([name]) => name === "review[retired]")).toBe(false);
  // 每个复选框对齐标签首行，覆盖长文本换行和禁用行。
  await page.evaluate(() => document.fonts.ready);
  const alignment = await form
    .locator('[data-part="option"]')
    .evaluateAll((elements) =>
      elements.map((element) => {
        const input = element.querySelector("input")!,
          text = element.querySelector("span")!,
          range = document.createRange();
        range.setStart(text.firstChild!, 0);
        range.setEnd(text.firstChild!, 1);
        const control = input.getBoundingClientRect(),
          line = range.getBoundingClientRect();
        return {
          delta: Math.abs(
            control.y + control.height / 2 - line.y - line.height / 2,
          ),
          margin: getComputedStyle(input).marginInlineStart,
        };
      }),
    );
  for (const item of alignment) {
    expect(item.delta).toBeLessThanOrEqual(1);
    expect(item.margin).toBe("0px");
  }
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await next();
  await expect(
    form.getByRole("textbox", { name: "Additional notes", exact: true }),
  ).toBeFocused();
  await form
    .getByRole("textbox", { name: "Additional notes", exact: true })
    .fill("Reviewed keyboard and layout.");
  await form.getByRole("button", { name: "Submit", exact: true }).click();
  await expect(page.getByLabel("Saved matrix answers")).toContainText(
    '"navigation":["keyboard","layout"]',
  );
  await expect(page.getByLabel("Saved matrix answers")).toContainText(
    '"content":["contrast"]',
  );
  await page.getByRole("button", { name: "Reset survey", exact: true }).click();
  await expect(option("navigation", "Keyboard interaction")).not.toBeChecked();
  await page
    .getByRole("button", { name: "Disable survey", exact: true })
    .click();
  await expect(option("navigation", "Keyboard interaction")).toBeDisabled();
  await page
    .getByRole("button", { name: "Enable survey", exact: true })
    .click();
  await page.getByRole("button", { name: "Hide survey", exact: true }).click();
  await expect(form).toHaveCount(0);
  await page.getByRole("button", { name: "Show survey", exact: true }).click();
  await expect(option("navigation", "Keyboard interaction")).not.toBeChecked();
}
