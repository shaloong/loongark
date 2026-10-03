import { expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
export async function checkSelectionInputs(page: Page) {
  const available = page.getByRole("group", { name: "Available", exact: true }),
    selected = page.getByRole("group", { name: "Selected", exact: true });
  await expect(
    available.getByRole("checkbox", { name: "Support", exact: true }),
  ).toBeDisabled();
  await available
    .getByRole("checkbox", { name: "Design", exact: true })
    .press("Space");
  await page
    .getByRole("button", { name: "Move selected to Selected", exact: true })
    .press("Enter");
  await expect(
    selected.getByRole("checkbox", { name: "Design", exact: true }),
  ).toBeFocused();
  expect(
    await page
      .locator("form")
      .evaluate((el) => new FormData(el as HTMLFormElement).getAll("members")),
  ).toEqual(["design", "dev"]);
  await selected.getByRole("checkbox", { name: "Design", exact: true }).check();
  await page
    .getByRole("button", { name: "Move selected to Available", exact: true })
    .press("Enter");
  await expect(
    available.getByRole("checkbox", { name: "Design", exact: true }),
  ).toBeFocused();
  await available
    .getByRole("button", { name: "Select all in Available", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Move selected to Selected", exact: true })
    .click();
  expect(
    await page
      .locator("form")
      .evaluate((el) => new FormData(el as HTMLFormElement).getAll("members")),
  ).toEqual(["design", "docs", "dev"]);
  await expect(
    available.getByRole("button", {
      name: "Select all in Available",
      exact: true,
    }),
  ).toBeDisabled();
  await selected
    .getByRole("button", { name: "Select all in Selected", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Move selected to Available", exact: true })
    .click();
  await expect(selected.getByText("No items", { exact: true })).toBeVisible();
  await expect(page.getByTestId("selection-submitted")).toHaveText("0");
  const input = page.getByLabel("Meeting time", { exact: true });
  await expect(input).toHaveValue("08:30");
  await input.fill("07:15");
  await expect(input).toHaveAttribute("aria-invalid", "true");
  await input.fill("09:30");
  await expect(input).not.toHaveAttribute("aria-invalid", "true");
  const trigger = page.getByRole("button", {
    name: "Choose time",
    exact: true,
  });
  await trigger.press("Enter");
  const hours = page.getByRole("combobox", { name: "Hours", exact: true }),
    minutes = page.getByRole("combobox", { name: "Minutes", exact: true });
  await expect(hours).toBeFocused();
  await expect(hours.locator('option[value="7"]')).toHaveAttribute(
    "disabled",
    "",
  );
  expect(
    await hours
      .locator('option[value="7"]')
      .evaluate((el) => (el as HTMLOptionElement).disabled),
  ).toBe(true);
  await hours.press("Home");
  await expect(hours).toHaveValue("8");
  await hours.selectOption("14");
  await minutes.selectOption("45");
  await expect(input).toHaveValue("14:45");
  await expect(page.getByTestId("time-value")).toHaveText("14:45");
  expect(
    await page
      .locator("form")
      .evaluate((el) => new FormData(el as HTMLFormElement).get("meeting")),
  ).toBe("14:45");
  expect(
    (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze())
      .violations,
  ).toEqual([]);
  await minutes.press("Escape");
  await expect(hours).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.getByRole("button", { name: "Done", exact: true }).press("Enter");
  await expect(hours).toBeHidden();
  const textarea = page.getByRole("textbox", { name: "Notes", exact: true }),
    height = () => textarea.evaluate((el) => el.getBoundingClientRect().height);
  await expect
    .poll(() => textarea.evaluate((el) => getComputedStyle(el).resize))
    .toBe("none");
  const initial = await height();
  await page
    .getByRole("button", { name: "Insert long note", exact: true })
    .click();
  await expect.poll(height).toBeGreaterThan(initial + 30);
  await expect
    .poll(() => textarea.evaluate((el) => getComputedStyle(el).overflowY))
    .toBe("auto");
  expect(
    await textarea.evaluate((el) => el.scrollHeight > el.clientHeight),
  ).toBe(true);
  const cap = await textarea.evaluate((el) =>
    parseFloat(getComputedStyle(el).maxHeight),
  );
  expect(await height()).toBeLessThanOrEqual(cap + 1);
  await page.getByRole("button", { name: "Clear notes", exact: true }).click();
  await expect.poll(height).toBeLessThanOrEqual(initial + 1);
  await textarea.fill("W".repeat(65));
  await expect.poll(height).toBeGreaterThan(initial);
  const wide = await height();
  await page.setViewportSize({ width: 375, height: 812 });
  await expect.poll(height).toBeGreaterThan(wide);
  await page
    .getByRole("checkbox", { name: "Automatic height", exact: true })
    .uncheck();
  await expect
    .poll(() => textarea.evaluate((el) => getComputedStyle(el).resize))
    .toBe("vertical");
  await page
    .getByRole("checkbox", { name: "Automatic height", exact: true })
    .check();
  await expect
    .poll(() => textarea.evaluate((el) => getComputedStyle(el).resize))
    .toBe("none");
  await page.getByRole("button", { name: "Clear notes", exact: true }).click();
  await expect.poll(height).toBeLessThanOrEqual(initial + 1);
  expect(
    (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze())
      .violations,
  ).toEqual([]);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(376);
  await expect(page.getByTestId("selection-submitted")).toHaveText("0");
}
