import { expect, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";
export async function checkConversationActions(page: Page) {
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  const message = page.getByRole("article", {
    name: "Message from Lin",
    exact: true,
  });
  const save = () =>
    message.getByRole("button", { name: "Save draft", exact: true });
  const saved = page.getByLabel("Saved drafts");
  const feedback = () => message.locator("[data-part=action-feedback]");
  await expect(
    message.getByRole("button", { name: "Archive message", exact: true }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Disable actions", exact: true })
    .click();
  await expect(save()).toBeDisabled();
  await save().evaluate((el: HTMLButtonElement) => el.click());
  await expect(saved).toHaveText("Saved drafts: 0");
  await page
    .getByRole("button", { name: "Enable actions", exact: true })
    .click();
  await save().focus();
  await page.keyboard.press("Space");
  await expect(message).toHaveAttribute("aria-busy", "true");
  await expect(feedback()).toHaveAttribute("role", "status");
  for (const button of await message.getByRole("button").all())
    await expect(button).toBeDisabled();
  await save().evaluate((el: HTMLButtonElement) => el.click());
  await expect(saved).toHaveText("Saved drafts: 1");
  await expect(feedback()).toHaveText("Draft saved");
  await expect(save()).toBeFocused();
  await page
    .getByRole("button", { name: "Use failing save", exact: true })
    .click();
  await save().focus();
  await page.keyboard.press("Enter");
  await expect(message.getByRole("alert")).toHaveText(
    "Action failed. Please try again.",
  );
  await expect(saved).toHaveText("Saved drafts: 1");
  await expect(save()).toBeFocused();
  await page
    .getByRole("button", { name: "Use successful save", exact: true })
    .click();
  await save().click();
  await expect(message).toHaveAttribute("aria-busy", "true");
  await page
    .getByRole("button", { name: "Replace message", exact: true })
    .click();
  await expect(message).not.toHaveAttribute("aria-busy", "true");
  await expect(message.locator("[data-scope=bubble]")).toContainText(
    "updated launch checklist",
  );
  await expect(feedback()).toHaveCount(0);
  // 超过旧操作的延迟，旧完成仍不能更新新消息的业务结果或反馈。
  await page.waitForTimeout(800);
  await expect(saved).toHaveText("Saved drafts: 1");
  await expect(feedback()).toHaveCount(0);
  await save().click();
  await expect(message).toHaveAttribute("aria-busy", "true");
  const disable = page.getByRole("button", {
    name: "Disable actions",
    exact: true,
  });
  await disable.click();
  await expect(saved).toHaveText("Saved drafts: 2");
  await expect(
    page.getByRole("button", { name: "Enable actions", exact: true }),
  ).toBeFocused();
  await expect(save()).toBeDisabled();
  await page
    .getByRole("button", { name: "Enable actions", exact: true })
    .click();
  const note = await message.locator("[data-scope=bubble]").innerText();
  await message.getByRole("button", { name: "Copy note", exact: true }).click();
  await expect(feedback()).toHaveText("Note copied");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(note);
  await page
    .getByRole("button", { name: "Mark message failed", exact: true })
    .click();
  const retry = message.getByRole("button", {
    name: "Retry message",
    exact: true,
  });
  await retry.focus();
  await page.keyboard.press("Space");
  await expect(retry).toBeDisabled();
  await expect(message.locator("[data-part=status]")).toHaveText("Sent");
  await expect(retry).toHaveCount(0);
  await expect(message).toBeFocused();
  const preview = () =>
    page.getByRole("button", { name: "Preview launch-notes.txt", exact: true });
  await preview().click();
  const dialog = page.getByRole("dialog", {
    name: "launch-notes.txt",
    exact: true,
  });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("The launch checklist is ready.");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(preview()).toBeFocused();
  const downloadPromise = page.waitForEvent("download");
  await page
    .getByRole("link", { name: "launch-notes.txt", exact: true })
    .click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("launch-notes.txt");
  const file = await download.path();
  expect(file).not.toBeNull();
  expect(await readFile(file!, "utf8")).toContain(
    "The launch checklist is ready.",
  );
  const attachment = page.getByRole("group", {
    name: "Attachment launch-notes.txt",
    exact: true,
  });
  await attachment
    .getByRole("button", { name: "Remove launch-notes.txt", exact: true })
    .click();
  await expect(attachment).toHaveAttribute("aria-busy", "true");
  await expect(attachment.locator("a")).toHaveCount(0);
  await expect(attachment).toHaveCount(0);
  const restoreFile = page.getByRole("button", {
    name: "Restore file",
    exact: true,
  });
  await expect(restoreFile).toBeFocused();
  await restoreFile.click();
  await expect(preview()).toBeVisible();
  await page.getByRole("button", { name: "Start upload", exact: true }).click();
  const progress = page.getByRole("progressbar", {
    name: "Uploading Review-screenshots.zip",
    exact: true,
  });
  await expect
    .poll(async () => Number(await progress.getAttribute("value")))
    .toBeGreaterThan(0);
  await page
    .getByRole("button", {
      name: "Cancel upload Review-screenshots.zip",
      exact: true,
    })
    .click();
  await expect(
    page.getByText("Upload cancelled.", { exact: true }),
  ).toBeVisible();
  await expect(progress).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Start upload", exact: true }),
  ).toBeFocused();
  await page.waitForTimeout(500);
  await expect(progress).toHaveCount(0);
  await expect(
    page.getByText("Upload cancelled.", { exact: true }),
  ).toBeVisible();
  await message
    .getByRole("button", { name: "Delete message", exact: true })
    .click();
  await expect(message).toHaveCount(0);
  const restoreMessage = page.getByRole("button", {
    name: "Restore message",
    exact: true,
  });
  await expect(restoreMessage).toBeFocused();
  await restoreMessage.click();
  await expect(feedback()).toHaveCount(0);
  await expect(message).not.toHaveAttribute("aria-busy", "true");
  // 页面卸载中止待完成保存；重挂不沿用旧控制器、反馈或业务结果。
  await save().click();
  await expect(message).toHaveAttribute("aria-busy", "true");
  await page.reload();
  await expect(saved).toHaveText("Saved drafts: 0");
  await page.waitForTimeout(800);
  await expect(feedback()).toHaveCount(0);
  await expect(save()).toBeEnabled();
  await save().click();
  await expect(saved).toHaveText("Saved drafts: 1");
  const previous = page.viewportSize();
  await page.setViewportSize({ width: 375, height: 1100 });
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth))
    .toBeLessThanOrEqual(376);
  if (previous) await page.setViewportSize(previous);
}
