import { expect, test } from "@playwright/test";
import { verifyNativeCodeHistory } from "./nativeCodeHistoryChecks";

for (const framework of ["react", "vue", "solid", "svelte"])
  test(`代码原生逐键输入历史 ${framework}`, async ({ page }) => {
    test.skip(!process.env.STATIC_DIR, "四端发布消费专项");
    await page.goto(`/examples-${framework}/?example=CodeEditorExample`);
    const root = page.locator('[data-scope="editor"][data-kind="code"]');
    await expect(root).toHaveAttribute("data-mounted", "true");
    const field = root.locator('textarea[data-part="form-value"]');
    const input = root.locator(".cm-content");
    const initial = await field.inputValue();
    const source = 'const message = "native Safari";\nconsole.log(message);';
    await input.click();
    await page.keyboard.press("ControlOrMeta+A");
    await page.keyboard.press("Backspace");
    await input.pressSequentially(source.split("\n")[0]);
    await input.press("Enter");
    await input.pressSequentially(source.split("\n")[1]);
    await expect(field).toHaveValue(source);
    const history = await verifyNativeCodeHistory({
      initial,
      source,
      read: () => field.inputValue(),
      canUndo: () => root.locator('[data-action="undo"]').isEnabled(),
      undo: () => root.locator('[data-action="undo"]').click(),
      redo: () => root.locator('[data-action="redo"]').click(),
      waitFor: async (check, label) => {
        await expect.poll(check, { message: label }).toBe(true);
      },
    });
    expect(history.undoSteps).toBeGreaterThan(0);
    await page
      .getByRole("button", { name: "Submit document", exact: true })
      .click();
    await expect(
      page.getByLabel("Submitted value", { exact: true }),
    ).toContainText(source);
  });
