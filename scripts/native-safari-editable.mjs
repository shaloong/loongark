import assert from "node:assert/strict";

export async function runNativeEditable(h, framework, mode) {
  const {
    execute,
    navigate,
    click,
    type,
    waitFor,
    screenshot,
    assertLayout,
    report,
  } = h;
  await navigate(framework, "EditableStatesExample", mode);
  const row = '[data-demo-state="invalid"]';
  const part = (name) => `${row} [data-part="${name}"]`;
  const text = () =>
    execute("return document.querySelector(arguments[0])?.textContent.trim()", [
      part("preview"),
    ]);
  await waitFor(
    async () => (await text()) === "LoongArk Design System",
    "Editable 初始预览值",
  );
  await click(part("edit-trigger"));
  await waitFor(
    () =>
      execute(
        "return document.activeElement===document.querySelector(arguments[0])",
        [part("input")],
      ),
    "Editable 原生编辑焦点",
  );
  await type(part("input"), "Native project");
  await click(part("submit-trigger"));
  await waitFor(
    async () => (await text()) === "Native project",
    "Editable 原生提交值",
  );
  await waitFor(
    () =>
      execute(
        "return document.activeElement===document.querySelector(arguments[0])",
        [part("edit-trigger")],
      ),
    "Editable 提交恢复焦点",
  );
  assert.equal(
    await execute(
      "return getComputedStyle(document.querySelector(arguments[0])).boxShadow",
      [part("control")],
    ),
    "none",
  );
  assert.notEqual(
    await execute(
      "return getComputedStyle(document.querySelector(arguments[0])).boxShadow",
      [part("preview")],
    ),
    "none",
  );
  assert.equal(
    await execute(
      'return document.querySelector(\'[data-demo-state="disabled"] [data-part="edit-trigger"]\').disabled',
    ),
    true,
  );
  const layout = await assertLayout();
  await screenshot(`editable-states-${framework}-${mode}`);
  report.interactions.push({
    framework,
    mode,
    case: "editable-native-value-focus-states",
    width: layout.width,
  });
}
