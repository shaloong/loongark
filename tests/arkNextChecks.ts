import { expect, type Page } from "@playwright/test";
export async function checkDateInput(page: Page) {
  const root = page.locator("[data-scope=date-input][data-part=root]").first(),
    day = root.getByRole("spinbutton", { name: "Day", exact: true });
  await expect(day).toHaveAttribute("aria-valuenow", "3");
  await day.focus();
  await day.press("ArrowUp");
  await expect(day).toHaveAttribute("aria-valuenow", "4");
  await page.getByRole("button", { name: "Submit date", exact: true }).click();
  await expect(page.getByLabel("Submitted date")).toHaveText("10/4/2026");
  await day.focus();
  await day.press("Home");
  await expect(day).toHaveAttribute("aria-valuenow", "1");
  await day.press("End");
  await expect(day).toHaveAttribute("aria-valuenow", "31");
  await day.press("ArrowRight");
  await expect(
    root.getByRole("spinbutton", { name: "Year", exact: true }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Reset date", exact: true }).click();
  await expect(day).toHaveAttribute("aria-valuenow", "3");
  await page.getByRole("button", { name: "Disable date", exact: true }).click();
  await expect(day).toHaveAttribute("aria-disabled", "true");
  await expect(
    page.getByRole("button", { name: "Submit date", exact: true }),
  ).toBeDisabled();
  expect(
    await root
      .locator("input")
      .evaluate((input: HTMLInputElement) =>
        new FormData(input.form!).has("appointment"),
      ),
  ).toBe(false);
  await page.getByRole("button", { name: "Enable date", exact: true }).click();
  const range = page.locator("[data-scope=date-input][data-part=root]").nth(1),
    end = range.getByRole("spinbutton", { name: "Day", exact: true }).nth(1);
  await end.focus();
  await end.press("ArrowUp");
  await expect(range.locator('input[name="trip[1]"]')).toHaveValue("10/8/2026");
  await expect(range.locator('input[name="trip[0]"]')).toHaveValue("10/3/2026");
}
export async function checkToc(page: Page) {
  const guide = page.getByRole("article", { name: "Component guide" }),
    link = page.getByRole("link", { name: "Delivery checklist", exact: true });
  await expect(guide).toBeVisible();
  await expect(
    page.locator("div[data-scope=toc][data-part=root]"),
  ).toHaveAttribute("id", /^toc:(?!undefined|$).+/);
  await expect(
    page.locator("[data-scope=toc][data-part=indicator]"),
  ).toHaveAttribute("id", /^toc:(?!undefined|$).+/);
  await expect(
    page.getByRole("navigation", { name: "On this page" }),
  ).toBeVisible();
  expect(
    await page.locator("[id]").evaluateAll((elements) => {
      const ids = elements.map((e) => e.id);
      return ids.filter((id, index) => ids.indexOf(id) !== index);
    }),
  ).toEqual([]);
  await link.focus();
  await link.press("Enter");
  await expect
    .poll(() => guide.evaluate((el) => el.scrollTop))
    .toBeGreaterThan(300);
  await expect(link).toHaveAttribute("aria-current", "location");
  await expect
    .poll(() =>
      page.locator("[data-scope=toc][data-part=indicator]").evaluate((line) => {
        const active = line.parentElement?.querySelector(
          "[data-part=item][data-active]",
        );
        return active
          ? Math.abs(
              line.getBoundingClientRect().top -
                active.getBoundingClientRect().top,
            )
          : Infinity;
      }),
    )
    .toBeLessThan(2);
  await expect(page.getByLabel("Visible sections")).toContainText("delivery");
  await expect(page.getByLabel("Visible sections")).toHaveAttribute(
    "data-notified-items",
    "delivery",
  );
  await guide.evaluate((el) => {
    el.scrollTop = 0;
  });
  await expect(
    page.getByRole("link", { name: "Overview", exact: true }),
  ).toHaveAttribute("aria-current", "location");
  await expect(page.getByLabel("Visible sections")).toContainText("overview");
  await page
    .getByRole("button", { name: "Pause outline updates", exact: true })
    .click();
  await link.click();
  await expect(page.getByLabel("Visible sections")).toHaveAttribute(
    "data-notified-items",
    "delivery",
  );
  await expect(
    page.getByRole("link", { name: "Overview", exact: true }),
  ).toHaveAttribute("aria-current", "location");
  await expect(link).not.toHaveAttribute("aria-current", "location");
  await page
    .getByRole("button", { name: "Resume outline updates", exact: true })
    .click();
  await guide.evaluate((el) => {
    el.scrollTop = 240;
  });
  await expect(page.getByLabel("Visible sections")).toContainText("keyboard");
  await link.click();
  await expect(link).toHaveAttribute("aria-current", "location");
  await page.getByRole("button", { name: "Hide outline", exact: true }).click();
  await expect(page.getByRole("navigation")).toHaveCount(0);
  await guide.evaluate((el) => {
    el.scrollTop = 400;
  });
  await page.getByRole("button", { name: "Show outline", exact: true }).click();
  await expect(
    page.getByRole("link", { name: "Delivery checklist", exact: true }),
  ).toHaveAttribute("aria-current", "location");
  await page.setViewportSize({ width: 375, height: 1000 });
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth))
    .toBeLessThanOrEqual(375);
  await page.setViewportSize({ width: 1280, height: 720 });
}
export async function checkSwap(page: Page) {
  const show = page.getByRole("button", { name: "Show details", exact: true });
  await expect(show).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Details action", exact: true }),
  ).toHaveCount(0);
  await show.focus();
  await show.press("Enter");
  const hide = page.getByRole("button", { name: "Hide details", exact: true });
  await expect(hide).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("button", { name: "Show details", exact: true }),
  ).toHaveCount(0);
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Details action", exact: true }),
  ).toBeFocused();
  await hide.click();
  await expect(show).toHaveAttribute("aria-expanded", "false");
  await expect(
    page.getByRole("button", { name: "Details action", exact: true }),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Unmount control", exact: true })
    .click();
  await expect(show).toHaveCount(0);
  await page
    .getByRole("button", { name: "Mount control", exact: true })
    .click();
  await expect(show).toBeVisible();
}
async function dragHandle(page: Page, delta: number) {
  const handle = page
      .locator("[data-scope=drawer][data-part=grabber]")
      .filter({ visible: true })
      .first(),
    box = await handle.boundingBox();
  expect(box).not.toBeNull();
  if (!box) return;
  const x = box.x + box.width / 2,
    y = box.y + box.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  for (let step = 1; step <= 12; step++) {
    await page.mouse.move(x, y + (delta * step) / 12);
    await page.waitForTimeout(40);
  }
  await page.mouse.up();
}
export async function checkDrawer(page: Page) {
  await page.setViewportSize({ width: 375, height: 1000 });
  const trigger = page.getByRole("button", {
    name: "Open details drawer",
    exact: true,
  });
  await trigger.click();
  const parent = page.getByRole("dialog", {
    name: "Project details",
    exact: true,
    includeHidden: true,
  });
  await expect(parent).toBeVisible();
  await expect(parent.getByLabel("Drawer snap point")).toHaveText("220px");
  await parent
    .getByRole("button", { name: "Expand drawer", exact: true })
    .click();
  await expect(parent.getByLabel("Drawer snap point")).toHaveText("440px");
  const nestedTrigger = parent.getByRole("button", {
    name: "Open nested drawer",
    exact: true,
  });
  await nestedTrigger.click();
  const nested = page.getByRole("dialog", {
    name: "Nested confirmation",
    exact: true,
  });
  await expect(nested).toBeVisible();
  await expect(parent).toHaveAttribute("data-nested-drawer-open", "");
  await expect(
    nested.getByRole("button", { name: "Confirm nested", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(nested).toHaveCount(0);
  await expect(parent).toBeVisible();
  await expect(nestedTrigger).toBeFocused();
  await dragHandle(page, 180);
  await expect(parent.getByLabel("Drawer snap point")).toHaveText("220px");
  await dragHandle(page, 150);
  await expect(parent).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(parent).toBeVisible();
  await expect(
    parent.getByRole("button", { name: "Expand drawer", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(parent).toBeHidden();
  await expect(trigger).toBeFocused();
  expect(
    await page.evaluate(() => getComputedStyle(document.body).position),
  ).not.toBe("fixed");
  await page.setViewportSize({ width: 1280, height: 720 });
}
