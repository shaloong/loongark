import { expect, test } from "@playwright/test";

test("Svelte 未初始化选择绑定首次回写及原生 reset 同步父状态", async ({
  page,
}) => {
  test.skip(!process.env.STATIC_DIR, "通过新构建的 Svelte 发布消费服务器运行");
  await page.goto("/svelte/");
  const form = page.getByRole("form", { name: "Fresh selection bindings" });
  const output = page.getByLabel("Bound fresh selections");
  const state = () => output.evaluate((n) => JSON.parse(n.textContent!));
  const values = () =>
    form.evaluate((n) =>
      Object.fromEntries(new FormData(n as HTMLFormElement)),
    );
  await expect(output).toHaveText("{}");
  await form.getByRole("checkbox", { name: "Fresh agreement" }).press("Space");
  await form
    .getByRole("checkbox", { name: "Fresh notifications" })
    .press("Space");
  await form
    .locator("[data-scope=radio-group] input:checked")
    .press("ArrowRight");
  const input = form.getByRole("textbox", { name: "Fresh frameworks" });
  await input.fill("Vue");
  await input.press("Enter");
  await expect.poll(state).toEqual({
    agreement: true,
    notifications: true,
    density: "comfortable",
    frameworks: ["Vue"],
  });
  await expect.poll(values).toEqual({
    "fresh-agreement": "on",
    "fresh-notifications": "on",
    "fresh-density": "comfortable",
    "fresh-frameworks": "Vue",
  });
  await form.evaluate((n) => (n as HTMLFormElement).reset());
  await expect.poll(state).toEqual({
    agreement: false,
    notifications: false,
    density: "compact",
    frameworks: [],
  });
  await expect
    .poll(values)
    .toEqual({ "fresh-density": "compact", "fresh-frameworks": "" });
});
