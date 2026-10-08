import { setupQuestionGroupFocusFixture } from "./questionnaireGroupFocusFixture";
import { expect, test } from "@playwright/test";

test("accepted group operations retain focus ownership until custom registration", async ({
  page,
}) => {
  test.skip(!process.env.STATIC_DIR, "Kit 新发布模块消费回归");
  await page.goto("/");
  await page.evaluate(setupQuestionGroupFocusFixture, true);

  const origin = page.getByRole("textbox", { name: "Retained field" });
  const add = page.getByRole("button", { name: "Add person", exact: true });
  const invoke = (method: string, value?: boolean) =>
    page.evaluate(
      ({ method, value }) => {
        if (method === "reject") window.groupFocusProbe.reject(!!value);
        else if (method === "register") window.groupFocusProbe.register();
        else if (method === "unmount") window.groupFocusProbe.unmount();
      },
      { method, value },
    );
  await origin.fill("Keep my focus until a control is registered");
  await add.click();
  await expect(
    page.getByRole("button", { name: "Custom answer group-1", exact: true }),
  ).toBeVisible();
  await expect(origin).toBeFocused();
  await invoke("register");
  await expect(
    page.getByRole("button", { name: "Custom answer group-1", exact: true }),
  ).toBeFocused();
  await origin.focus();
  await invoke("reject", true);
  await add.click();
  await expect(origin).toBeFocused();
  await expect(
    page.getByText("Custom answer group-2", { exact: true }),
  ).toHaveCount(0);
  await invoke("reject", false);
  await add.click();
  await page.getByRole("button", { name: "Outside", exact: true }).click();
  await invoke("register");
  await expect(
    page.getByRole("button", { name: "Outside", exact: true }),
  ).toBeFocused();
  await origin.focus();
  await add.click();
  await invoke("unmount");
  await invoke("register");
  await expect(origin).toBeFocused();
});
