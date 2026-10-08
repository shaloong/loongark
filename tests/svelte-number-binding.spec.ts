import { expect, test } from "@playwright/test";
test("Svelte 数值绑定从 undefined 回写，外部清空、只读与输入节点卸载保持一致", async ({
  page,
}) => {
  test.skip(!process.env.STATIC_DIR);
  await page.goto("/svelte/");
  const form = page.getByRole("form", { name: "Fresh number binding" }),
    input = form.getByRole("spinbutton", { name: "Bound quantity" });
  const state = () =>
    form
      .getByLabel("Bound number state")
      .evaluate((n) => JSON.parse(n.textContent!));
  await expect(input).toHaveValue("3");
  await expect.poll(state).toEqual({ refReady: true });
  await input.fill("5");
  await expect.poll(state).toEqual({ value: "5", refReady: true });
  await form.getByRole("button", { name: "Clear bound quantity" }).click();
  await expect(input).toHaveValue("");
  await expect.poll(state).toEqual({ value: "", refReady: true });
  await form.getByRole("button", { name: "Read only bound quantity" }).click();
  await expect(input).toHaveJSProperty("readOnly", true);
  await form.getByRole("button", { name: "Focus bound quantity" }).click();
  await expect(input).toBeFocused();
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("4");
  await expect(input).toHaveValue("");
  await form.getByRole("button", { name: "Mount bound quantity" }).click();
  await expect(input).toHaveCount(0);
  await expect.poll(state).toEqual({ value: "", refReady: false });
  await form.getByRole("button", { name: "Mount bound quantity" }).click();
  await expect(input).toHaveValue("");
  await expect.poll(state).toEqual({ value: "", refReady: true });
});
