import { expect, test } from "@playwright/test";
import { setupQuestionGroupFocusFixture } from "./questionnaireGroupFocusFixture";

test("按钮原生默认行为留下body焦点时，延迟注册仍定位目标控件", async ({ page }) => {
  test.skip(!process.env.STATIC_DIR, "共享发布模块消费专项");
  await page.goto("/");
  await page.evaluate(setupQuestionGroupFocusFixture, false);
  const origin = page.getByRole("textbox", { name: "Retained field" });
  const add = page.getByRole("button", { name: "Add person", exact: true });
  // 在真实鼠标操作中安排文本框失焦，覆盖Safari失败帧中的body状态。
  await add.evaluate((node) => {
    node.addEventListener("mousedown", (event) => {
      event.preventDefault();
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur();
    });
  });
  await origin.fill("等待新增答案控件");
  await expect(origin).toBeFocused();
  await add.click();
  expect(
    await page.evaluate(() => ({
      origin: window.groupFocusProbe.operationFocus(),
      retained: window.groupFocusProbe.retainsOperationFocus(),
      body: document.activeElement === document.body,
    })),
  ).toEqual({ origin: "body", retained: true, body: true });
  await page.evaluate(() => window.groupFocusProbe.register());
  await expect(
    page.getByRole("button", { name: "Custom answer group-1", exact: true }),
  ).toBeFocused();
});

test("题组延迟注册保留原生点击实际焦点，拒绝及卸载不转移", async ({ page }) => {
  test.skip(!process.env.STATIC_DIR, "共享发布模块消费专项");
  await page.goto("/");
  await page.evaluate(setupQuestionGroupFocusFixture, false);
  const origin = page.getByRole("textbox", { name: "Retained field" });
  const add = page.getByRole("button", { name: "Add person", exact: true });
  const retained = () =>
    page.evaluate(() => window.groupFocusProbe.retainsOperationFocus());
  await origin.fill("等待自定义控件注册");
  await expect(origin).toBeFocused();
  await add.click();
  await expect.poll(retained).toBe(true);
  await page.evaluate(() => window.groupFocusProbe.register());
  await expect(
    page.getByRole("button", { name: "Custom answer group-1", exact: true }),
  ).toBeFocused();

  await origin.focus();
  await page.evaluate(() => window.groupFocusProbe.reject(true));
  await add.click();
  await expect.poll(retained).toBe(true);
  await expect(
    page.getByRole("button", { name: "Custom answer group-2", exact: true }),
  ).toHaveCount(0);
  await page.evaluate(() => window.groupFocusProbe.reject(false));
  await add.click();
  const outside = page.getByRole("button", { name: "Outside", exact: true });
  await outside.focus();
  await page.evaluate(() => window.groupFocusProbe.register());
  await expect(outside).toBeFocused();

  await origin.focus();
  await add.click();
  await page.evaluate(() => {
    window.groupFocusProbe.unmount();
    window.groupFocusProbe.register();
  });
  await expect.poll(retained).toBe(true);
});
