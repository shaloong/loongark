import { expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
export async function checkQuestionnaireRanking(page: Page) {
  const form = page.getByRole("form", { name: "Ranking review" });
  const handle = (key: string) =>
    form.locator(`[data-question-control="rank-drag"][data-key="${key}"]`);
  const order = () =>
    form
      .locator('[data-part="rank-row"]')
      .evaluateAll((nodes) =>
        nodes.map((node) => node.getAttribute("data-key")),
      );
  const count = () =>
    page
      .getByLabel("Ranking updates")
      .innerText()
      .then((text) => Number(/(\d+) callbacks/.exec(text)![1]));
  const reset = async () => {
    await page
      .getByRole("button", { name: "Reset survey", exact: true })
      .click();
    await expect.poll(order).toEqual(["access", "layout", "speed"]);
    await expect.poll(count).toBe(0);
  };
  await expect.poll(order).toEqual(["access", "layout", "speed"]);
  await handle("access").press("Space");
  await expect(handle("access")).toHaveAttribute("aria-pressed", "true");
  await handle("access").press("End");
  await expect.poll(order).toEqual(["layout", "speed", "access"]);
  expect(await count()).toBe(0);
  await expect(handle("access")).toBeFocused();
  await handle("access").press("Escape");
  await expect.poll(order).toEqual(["access", "layout", "speed"]);
  expect(await count()).toBe(0);
  await handle("access").press("Enter");
  await handle("access").press("ArrowDown");
  await expect.poll(order).toEqual(["layout", "access", "speed"]);
  await handle("access").press("Enter");
  await expect.poll(count).toBe(1);
  await expect(handle("access")).toBeFocused();
  const entries = await form.evaluate((node) =>
    Array.from(new FormData(node as HTMLFormElement).getAll("priority")),
  );
  expect(entries).toEqual(["layout", "access", "speed"]);
  await page
    .getByRole("button", { name: "Reject updates", exact: true })
    .click();
  await handle("access").press("Space");
  await handle("access").press("End");
  await handle("access").press("Enter");
  await expect.poll(order).toEqual(["layout", "access", "speed"]);
  await expect(form.locator('[data-part="rank-status"]')).toContainText(
    "Change rejected",
  );
  await expect(handle("access")).toBeFocused();
  await page
    .getByRole("button", { name: "Accept updates", exact: true })
    .click();
  await reset();
  await handle("access").scrollIntoViewIfNeeded();
  const source = (await handle("access").boundingBox())!,
    target = (await form
      .locator('[data-part="rank-row"][data-key="speed"]')
      .boundingBox())!;
  await page.mouse.move(
    source.x + source.width / 2,
    source.y + source.height / 2,
  );
  await page.mouse.down();
  await page.mouse.move(
    source.x + source.width / 2,
    target.y + target.height - 2,
    { steps: 8 },
  );
  await expect.poll(order).toEqual(["layout", "speed", "access"]);
  expect(await count()).toBe(0);
  await page.mouse.up();
  await expect.poll(count).toBe(1);
  await expect(handle("access")).toBeFocused();
  await reset();
  await handle("layout").press("Space");
  await handle("layout").press("Home");
  await page
    .getByRole("button", { name: "Reject updates", exact: true })
    .focus();
  await expect.poll(order).toEqual(["access", "layout", "speed"]);
  expect(await count()).toBe(0);
  await expect(
    page.getByRole("button", { name: "Reject updates", exact: true }),
  ).toBeFocused();
  await handle("speed").press("Space");
  await handle("speed").press("Home");
  await page
    .getByRole("button", { name: "Disable survey", exact: true })
    .click();
  await expect.poll(order).toEqual(["access", "layout", "speed"]);
  await expect(handle("speed")).toBeDisabled();
  expect(await count()).toBe(0);
  await page
    .getByRole("button", { name: "Enable survey", exact: true })
    .click();
  await handle("speed").press("Space");
  await handle("speed").press("Home");
  await page.getByRole("button", { name: "Hide survey", exact: true }).click();
  await expect(form).toHaveCount(0);
  await page.getByRole("button", { name: "Show survey", exact: true }).click();
  await expect.poll(order).toEqual(["access", "layout", "speed"]);
  expect(await count()).toBe(0);
  await handle("speed").press("Space");
  await handle("speed").press("Home");
  // 程序化外部变更不先移动焦点，覆盖拖动中 schema 失效的恢复。
  await page
    .getByRole("button", { name: "Remove final option", exact: true })
    .evaluate((node) => (node as HTMLButtonElement).click());
  await expect.poll(order).toEqual(["access", "layout"]);
  await expect(handle("layout")).toBeFocused();
  expect(await count()).toBe(0);
  await page
    .getByRole("button", { name: "Restore final option", exact: true })
    .click();
  await expect.poll(order).toEqual(["access", "layout", "speed"]);
  await handle("access").press("Space");
  await handle("access").press("End");
  await page
    .getByRole("button", { name: "External order", exact: true })
    .evaluate((node) => (node as HTMLButtonElement).click());
  await expect.poll(order).toEqual(["speed", "layout", "access"]);
  await expect(handle("access")).toBeFocused();
  expect(await count()).toBe(0);
  await reset();
  await handle("access").press("Space");
  await handle("access").press("End");
  await form.getByRole("button", { name: "Submit", exact: true }).click();
  await expect(page.getByLabel("Saved ranking answers")).toContainText(
    '"priority":["access","layout","speed"]',
  );
  await reset();
  await page.evaluate(() => document.fonts.ready);
  const geometry = await form.evaluate((node) => {
    const instructions = node
      .querySelector('[data-part="rank-instructions"]')!
      .getBoundingClientRect();
    const first = node
      .querySelector('[data-part="rank-row"]')!
      .getBoundingClientRect();
    const icons = Array.from(
      node.querySelectorAll('[data-part="rank-handle"]'),
    ).map((button) => {
      const rect = button.getBoundingClientRect(),
        icon = button.querySelector("svg")!.getBoundingClientRect();
      return {
        x: Math.abs(rect.x + rect.width / 2 - icon.x - icon.width / 2),
        y: Math.abs(rect.y + rect.height / 2 - icon.y - icon.height / 2),
      };
    });
    return { gap: first.top - instructions.bottom, icons };
  });
  expect(geometry.gap).toBeGreaterThanOrEqual(6);
  for (const icon of geometry.icons) {
    expect(icon.x).toBeLessThanOrEqual(1);
    expect(icon.y).toBeLessThanOrEqual(1);
  }
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
}
