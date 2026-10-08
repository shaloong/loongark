import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { checkConversation } from "./conversationChecks";
for (const mode of ["light", "dark"])
  test(`消息和问卷 ${mode}`, async ({ page }) => {
    await page.goto(
      `/iframe.html?id=compositions-conversation--basic&globals=mode:${mode}`,
    );
    await expect(
      page.locator("[data-scope=questionnaire][data-part=root]"),
    ).toBeVisible();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await checkConversation(page);
    await page.setViewportSize({ width: 375, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
test("前插历史消息保留视口", async ({ page }) => {
  await page.goto("/iframe.html?id=components-messagescroller--basic");
  const viewport = page.locator(
    "[data-part=viewport][data-scope=message-scroller]",
  );
  await viewport.evaluate((el) => (el.scrollTop = 150));
  await expect(
    page.getByRole("button", { name: "Jump to latest" }),
  ).toBeVisible();
  const before = await page
    .locator("[data-scope=message][data-part=root]")
    .first()
    .evaluate((el) => el.getBoundingClientRect().top);
  await page.getByRole("button", { name: "Load earlier" }).click();
  await expect
    .poll(async () =>
      Math.abs(
        (await page
          .locator("[data-scope=message][data-part=root]")
          .nth(1)
          .evaluate((el) => el.getBoundingClientRect().top)) - before,
      ),
    )
    .toBeLessThan(2);
});

test("上传进度语义与消息失败重试", async ({ page }) => {
  await page.goto("/iframe.html?id=components-attachment--uploading");
  const progress = page.getByRole("progressbar");
  await expect(progress).toHaveCount(2);
  await expect(progress.nth(0)).toHaveAttribute("value", "48");
  await expect(progress.nth(1)).not.toHaveAttribute("value");
  await expect(page.getByRole("link")).toHaveCount(0);
  await page.goto("/iframe.html?id=components-message--error");
  await expect(page.getByRole("status")).toHaveText("Could not send");
  await page.getByRole("button", { name: "Retry message" }).press("Enter");
  await expect(page.getByRole("button", { name: "Retry message" })).toHaveCount(
    0,
  );
  await expect(
    page.locator("[data-scope=message][data-part=status]"),
  ).toHaveText("Sent");
});

test("禁用和提交中的问卷阻止输入，空问卷无提交入口", async ({ page }) => {
  await page.goto("/iframe.html?id=components-questionnaire--disabled");
  const form = page.getByRole("form", { name: "Feedback" });
  await expect(form.getByRole("radio").first()).toBeDisabled();
  await expect(form.getByRole("button", { name: "Next" })).toBeDisabled();
  expect(
    await form.evaluate((el) =>
      Array.from(new FormData(el as HTMLFormElement).entries()),
    ),
  ).toEqual([]);
  await page.goto("/iframe.html?id=components-questionnaire--submitting");
  await expect(form).toHaveAttribute("aria-busy", "true");
  await expect(form.getByRole("textbox")).toBeDisabled();
  await expect(
    form.getByRole("button", { name: "Submitting…" }),
  ).toBeDisabled();
  expect(
    await form.evaluate((el) =>
      Array.from(new FormData(el as HTMLFormElement).entries()),
    ),
  ).toEqual([]);
  await page.goto("/iframe.html?id=components-questionnaire--empty");
  await expect(form).toContainText("No questions available.");
  await expect(form.getByRole("button")).toHaveCount(0);
});
