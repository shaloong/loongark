import { expect, type Page } from "@playwright/test";
export const settleMessageLayout = (page: Page) =>
  page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      ),
  );
export async function checkMessageScrollerAdvanced(page: Page) {
  const viewport = page.getByRole("region", { name: "Workspace discussion" }),
    mode = page.getByLabel("Reading mode");
  const offset = () =>
    page.locator('[data-message-id="reply-4"]').evaluate((row) => {
      const viewport = row.closest('[data-part="content"]')!.parentElement!;
      return (
        row.getBoundingClientRect().top -
        viewport.getBoundingClientRect().top -
        viewport.clientTop
      );
    });
  const atBottom = () =>
    viewport.evaluate((el) => el.scrollHeight - el.clientHeight - el.scrollTop);
  await expect(viewport).toBeVisible();
  await expect.poll(atBottom).toBeLessThan(5);
  await page
    .getByRole("button", { name: "Read earlier replies", exact: true })
    .press("Enter");
  await expect(viewport).toBeFocused();
  await expect(mode).toHaveText("Reading earlier replies");
  const before = await offset();
  await page
    .getByRole("button", { name: "Load shared preview", exact: true })
    .press("Enter");
  await expect(
    page.getByRole("button", { name: "Cancel preview load", exact: true }),
  ).toHaveAttribute("aria-busy", "true");
  await expect(page.locator('[data-message-id="reply-0"] img')).toBeAttached();
  await expect
    .poll(() =>
      page
        .locator('[data-message-id="reply-0"] img')
        .evaluate(
          (el) =>
            (el as HTMLImageElement).complete &&
            (el as HTMLImageElement).naturalHeight > 0,
        ),
    )
    .toBe(true);
  await expect(
    page.getByRole("button", { name: "Hide shared preview", exact: true }),
  ).not.toHaveAttribute("aria-busy");
  await settleMessageLayout(page);
  expect(Math.abs((await offset()) - before)).toBeLessThan(1);
  await page
    .getByRole("button", { name: "Insert history and reply", exact: true })
    .click();
  await expect(page.locator('[data-message-id^="history-"]')).toHaveCount(2);
  await settleMessageLayout(page);
  expect(Math.abs((await offset()) - before)).toBeLessThan(1);
  await page
    .getByRole("button", { name: "Hide shared preview", exact: true })
    .click();
  await settleMessageLayout(page);
  expect(Math.abs((await offset()) - before)).toBeLessThan(1);
  await page.getByRole("button", { name: "Add reply", exact: true }).click();
  await settleMessageLayout(page);
  expect(Math.abs((await offset()) - before)).toBeLessThan(1);
  await page
    .getByRole("button", { name: "Jump to latest", exact: true })
    .press("Enter");
  await expect(viewport).toBeFocused();
  await expect(mode).toHaveText("Following latest replies");
  await page
    .getByRole("button", { name: "Load shared preview", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Hide shared preview", exact: true }),
  ).toBeVisible();
  await settleMessageLayout(page);
  await expect.poll(atBottom).toBeLessThan(5);
  await page.getByRole("button", { name: "Reset thread", exact: true }).click();
  await expect(page.locator("[data-message-id]")).toHaveCount(12);
  await expect(page.locator("[data-message-id] img")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Load shared preview", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Cancel preview load", exact: true })
    .press("Enter");
  await page.waitForTimeout(550);
  await expect(page.locator("[data-message-id] img")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Load shared preview", exact: true })
    .click();
  await page.getByRole("button", { name: "Reset thread", exact: true }).click();
  await page.waitForTimeout(550);
  await expect(page.locator("[data-message-id] img")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Load shared preview", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Hide conversation", exact: true })
    .click();
  await expect(viewport).toHaveCount(0);
  await expect(mode).toHaveText("Conversation hidden");
  await page.waitForTimeout(550);
  await page
    .getByRole("button", { name: "Show conversation", exact: true })
    .click();
  await expect(viewport).toBeVisible();
  await expect.poll(atBottom).toBeLessThan(5);
  await expect(page.locator("[data-message-id] img")).toHaveCount(0);
  await page.setViewportSize({ width: 375, height: 900 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.setViewportSize({ width: 1280, height: 720 });
}
