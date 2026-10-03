import { expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
export async function checkActionMedia(page: Page) {
  const trigger = page.getByRole("button", {
      name: "Quick actions",
      exact: true,
    }),
    menu = page.getByRole("menu", { name: "Quick actions", exact: true });
  await expect(menu).toBeHidden();
  await expect(trigger).toHaveCSS("border-radius", "999px");
  await expect(trigger).toHaveCSS("height", "48px");
  const primaryColor = await page
    .getByRole("button", { name: "Create workspace", exact: true })
    .evaluate((el) => getComputedStyle(el).color);
  await expect(trigger).toHaveCSS("color", primaryColor);
  await expect(
    page.getByRole("button", { name: "Unavailable action", exact: true }),
  ).toBeDisabled();
  await trigger.press("ArrowUp");
  await expect(
    page.getByRole("menuitem", { name: "New note", exact: true }),
  ).toBeFocused();
  await expect(
    page.getByRole("menuitem", { name: "Archive", exact: true }),
  ).toBeDisabled();
  await page.keyboard.press("ArrowDown");
  await expect(
    page.getByRole("menuitem", { name: "Share workspace", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(
    page.getByRole("menuitem", { name: "New note", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("End");
  await expect(
    page.getByRole("menuitem", { name: "Share workspace", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Home");
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("action-value")).toHaveText("Action: note");
  await expect(menu).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.press("ArrowRight");
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(
    page.getByRole("menuitem", { name: "New note", exact: true }),
  ).toBeFocused();
  expect(
    (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze())
      .violations,
  ).toEqual([]);
  await page
    .getByRole("button", { name: "Create workspace", exact: true })
    .click();
  await expect(menu).toBeHidden();
  await expect(page.getByTestId("action-value")).toHaveText(
    "Action: workspace",
  );
  await page
    .getByRole("button", { name: "Import files", exact: true })
    .press("Enter");
  await expect(page.getByTestId("action-value")).toHaveText("Action: import");
  await expect(page.getByTestId("action-submitted")).toHaveText("0");
  const images = page.getByRole("list", {
      name: "Image collection",
      exact: true,
    }),
    masonry = page.getByRole("list", {
      name: "Masonry collection",
      exact: true,
    });
  await expect(images.getByRole("listitem")).toHaveCount(4);
  await expect(masonry.getByRole("listitem")).toHaveCount(6);
  expect(
    await images
      .getByRole("listitem")
      .first()
      .evaluate((el) => el.getBoundingClientRect().height),
  ).toBeGreaterThan(300);
  await expect
    .poll(() => masonry.evaluate((el) => getComputedStyle(el).columnCount))
    .toBe("3");
  for (const img of await page.locator("img").all()) {
    await expect
      .poll(() => img.evaluate((el) => (el as HTMLImageElement).naturalWidth))
      .toBe(400);
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await expect
    .poll(() => masonry.evaluate((el) => getComputedStyle(el).columnCount))
    .toBe("1");
  await expect
    .poll(() =>
      images.evaluate(
        (el) => getComputedStyle(el).gridTemplateColumns.split(" ").length,
      ),
    )
    .toBe(1);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(376);
  await trigger.press("ArrowDown");
  expect(
    (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze())
      .violations,
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect(page.getByTestId("action-submitted")).toHaveText("0");
}
