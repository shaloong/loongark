import { expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
export async function checkQuestionnaireCustom(
  page: Page,
  screenshotPrefix?: string,
) {
  const form = () => page.getByRole("form", { name: "Experience review" });
  const ratings = () =>
    form().getByRole("radiogroup", { name: "Experience rating" });
  const radio = (group: number, score: number) =>
    ratings()
      .nth(group)
      .getByRole("radio")
      .nth(score - 1);
  const count = () => page.getByRole("status", { name: "Rating updates" });
  const callbacks = async () =>
    Number((await count().textContent())!.split(" ")[0]);
  const entries = () =>
    form().evaluate((node) => [
      ...new FormData(node as HTMLFormElement).entries(),
    ]);
  const click = async (name: string) =>
    page.getByRole("button", { name, exact: true }).click();
  await expect(ratings()).toHaveCount(1);
  await expect(ratings()).toHaveAttribute("aria-required", "true");
  await expect(radio(0, 3)).toHaveAttribute("aria-checked", "true");
  await expect.poll(entries).toEqual([["rating", "3"]]);
  await page.evaluate(() => document.fonts.ready);
  if (screenshotPrefix)
    await page.screenshot({
      path: `${screenshotPrefix}-default.png`,
      fullPage: true,
    });
  const geometry = await ratings()
    .first()
    .getByRole("radio")
    .evaluateAll((nodes) =>
      nodes.map((node) => {
        const r = node.getBoundingClientRect(),
          icon = node.querySelector("svg")!.getBoundingClientRect();
        return {
          y: r.y + r.height / 2,
          icon: icon.y + icon.height / 2,
          height: r.height,
        };
      }),
    );
  expect(
    Math.max(...geometry.map((r) => r.y)) -
      Math.min(...geometry.map((r) => r.y)),
  ).toBeLessThanOrEqual(1);
  expect(
    geometry.every((r) => Math.abs(r.y - r.icon) <= 2 && r.height >= 24),
  ).toBe(true);
  await radio(0, 5).hover();
  await expect(radio(0, 3)).toHaveAttribute("aria-checked", "true");
  await expect(radio(0, 5)).toHaveAttribute("aria-checked", "false");
  await expect.poll(entries).toEqual([["rating", "3"]]);
  await radio(0, 3).focus();
  await page.keyboard.press("ArrowRight");
  await expect(radio(0, 4)).toHaveAttribute("aria-checked", "true");
  await expect(count()).toHaveText("1 callbacks");
  await page.locator("summary").filter({ hasText: "More controls" }).click();
  await click("Reject updates");
  await radio(0, 2).click();
  await expect(radio(0, 4)).toHaveAttribute("aria-checked", "true");
  await expect(count()).toHaveText("2 callbacks");
  await expect.poll(entries).toEqual([["rating", "4"]]);
  await click("Accept updates");
  // 控制回调的到期顺序，不依赖两次真实操作能否在400ms内完成。
  let before = await callbacks();
  await page.clock.install();
  const pauseCallbacks = async () =>
    page.clock.pauseAt(new Date(await page.evaluate(() => Date.now() + 1000)));
  const press = async (name: string) =>
    page.getByRole("button", { name, exact: true }).press("Enter");
  await pauseCallbacks();
  try {
    // 正向对照：仍有效的第三方回调必须实际到期并提交答案。
    await press("Suggest five stars");
    await page.clock.runFor(550);
    await expect(count()).toHaveText(`${before + 1} callbacks`);
    await expect(radio(0, 5)).toHaveAttribute("aria-checked", "true");
    await radio(0, 5).focus();
    await page.keyboard.press("ArrowLeft");
    await expect(radio(0, 4)).toHaveAttribute("aria-checked", "true");
    before = await callbacks();
    await press("Suggest five stars");
    await press("Use compact renderer");
    await expect(
      page.getByRole("button", { name: "Use standard renderer", exact: true }),
    ).toBeVisible();
    await page.clock.runFor(550);
    await expect(count()).toHaveText(`${before} callbacks`);
    await expect(radio(0, 4)).toHaveAttribute("aria-checked", "true");
    await press("Suggest five stars");
    await press("Disable survey");
    await expect(radio(0, 4)).toHaveAttribute("aria-disabled", "true");
    await page.clock.runFor(550);
    await expect(count()).toHaveText(`${before} callbacks`);
    await expect.poll(entries).toEqual([]);
    await press("Enable survey");
    await expect.poll(entries).toEqual([["rating", "4"]]);
    await press("Suggest five stars");
    await press("Hide survey");
    await expect(form()).toHaveCount(0);
    await page.clock.runFor(550);
    await expect(count()).toHaveText(`${before} callbacks`);
    await press("Show survey");
    await expect(radio(0, 4)).toHaveAttribute("aria-checked", "true");
  } finally {
    await page.clock.resume();
  }
  await click("Use async validation");
  await radio(0, 1).click();
  await click("Submit");
  await expect(
    form().getByText("Choose at least two stars.", { exact: true }).first(),
  ).toBeVisible();
  await expect(radio(0, 1)).toBeFocused();
  await expect(ratings()).toHaveAttribute("aria-invalid", "true");
  if (screenshotPrefix)
    await page.screenshot({
      path: `${screenshotPrefix}-error.png`,
      fullPage: true,
    });
  await radio(0, 2).click();
  await click("Submit");
  await expect(
    page.getByRole("status", { name: "Saved rating answers" }),
  ).toHaveText('{"rating":"2"}');
  await click("Reset survey");
  await radio(0, 1).click();
  await click("Submit");
  const outside = page.getByRole("button", {
    name: "Reset survey",
    exact: true,
  });
  await outside.focus();
  await expect(
    form().getByText("Choose at least two stars.", { exact: true }).first(),
  ).toBeVisible();
  await expect(outside).toBeFocused();
  await click("Use nested questions");
  await expect(ratings()).toHaveCount(2);
  await expect(radio(0, 2)).toHaveAttribute("aria-checked", "true");
  await expect(radio(1, 4)).toHaveAttribute("aria-checked", "true");
  await expect.poll(entries).toEqual([
    ["people[alpha][name]", "Alex Chen"],
    ["people[alpha][rating]", "2"],
    ["people[beta][name]", "Morgan Lee"],
    ["people[beta][rating]", "4"],
  ]);
  await radio(0, 5).click();
  const note = form().getByRole("textbox", {
    name: "What worked well?",
    exact: true,
  });
  await expect(note).toBeVisible();
  await note.fill("Helpful support");
  await radio(0, 3).click();
  await expect(radio(0, 3)).toHaveAttribute("aria-checked", "true");
  await expect(note).toHaveCount(0);
  expect(
    (await entries()).some(([name]) => String(name).includes("note")),
  ).toBe(false);
  await radio(0, 5).click();
  await expect(note).toHaveValue("Helpful support");
  await expect(radio(1, 4)).toHaveAttribute("aria-checked", "true");
  // 新实例为空时仍能键盘进入评分；首个无效自定义控件获得焦点。
  await click("Add person");
  const last = form().locator('[data-part="group-instance"]').last();
  await last
    .getByRole("textbox", { name: "Person name", exact: true })
    .fill("New person");
  await click("Submit");
  await expect(last.getByRole("radio").first()).toBeFocused();
  await last.getByRole("radio").nth(2).click();
  await click("Remove person 3");
  await expect(ratings()).toHaveCount(2);
  before = await callbacks();
  await pauseCallbacks();
  try {
    await form()
      .locator('[data-group-instance="alpha"]')
      .getByRole("button", { name: "Suggest five stars", exact: true })
      .press("Enter");
    await press("Remove person 1");
    await expect(ratings()).toHaveCount(1);
    await page.clock.runFor(550);
    await expect(count()).toHaveText(`${before + 1} callbacks`);
    await expect(radio(0, 4)).toHaveAttribute("aria-checked", "true");
  } finally {
    await page.clock.resume();
  }
  await click("Reset survey");
  await radio(0, 1).click();
  await click("Submit");
  await expect(
    form().getByText("Choose at least two stars.", { exact: true }).first(),
  ).toBeVisible();
  await expect(radio(0, 1)).toBeFocused();
  await radio(0, 2).click();
  await page.evaluate(() => document.fonts.ready);
  if (screenshotPrefix)
    await page.screenshot({
      path: `${screenshotPrefix}-nested.png`,
      fullPage: true,
    });
  const accessibility = await new AxeBuilder({ page })
    .include('[data-scope="questionnaire"][data-part="root"]')
    .analyze();
  expect(accessibility.violations).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
}
