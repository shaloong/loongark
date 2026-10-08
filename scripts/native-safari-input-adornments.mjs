import assert from "node:assert/strict";
export async function runNativeInputAdornments(h, framework, mode) {
  const {
    execute,
    navigate,
    click,
    clickText,
    type,
    waitFor,
    screenshot,
    assertLayout,
    report,
  } = h;
  await navigate(framework, "InputAdornmentsExample", mode);
  const input = 'input[name="search-md"]';
  const clear = 'button[aria-label="Clear search md"]';
  const check = (script, label) => waitFor(() => execute(script), label);
  const finish = async (name) => {
    const layout = await assertLayout();
    await screenshot(`${name}-${framework}-${mode}`);
    report.interactions.push({
      framework,
      mode,
      case: name,
      width: layout.width,
    });
  };
  await type(input, "Native search");
  await click(clear);
  await check(
    `return document.querySelector('${input}').value===''`,
    "原生后缀清除",
  );
  await type(input, "Native search");
  await clickText("Disabled");
  await check(
    `return document.querySelector('${input}').disabled && document.querySelector('${clear}').disabled`,
    "输入与后缀禁用继承",
  );
  await finish("adornments-disabled");
  await clickText("Disabled");
  await clickText("Read only");
  await check(
    `return document.querySelector('${input}').readOnly && document.querySelector('${clear}').disabled`,
    "只读禁止清除",
  );
  await clickText("View instead of clear");
  const view = 'button[aria-label="View search md"]';
  await check(
    `return !document.querySelector('${view}').disabled`,
    "只读允许非编辑操作",
  );
  await click(view);
  await check(
    'return document.querySelector(\'output[aria-label="Viewed search value"]\').textContent==="Native search"',
    "只读查看实际值",
  );
  await clickText("View instead of clear");
  await clickText("Enable suffix explicitly");
  await check(
    `return !document.querySelector('${clear}').disabled`,
    "显式后缀覆盖",
  );
  await click(clear);
  assert.equal(
    await execute(`return document.querySelector('${input}').value`),
    "",
  );
  await clickText("Enable suffix explicitly");
  await clickText("Read only");
  for (const label of ["Invalid", "Long labels", "Right-to-left"])
    await clickText(label);
  await check(
    `return document.querySelector('${input}').getAttribute('aria-invalid')==='true' && document.querySelector('[data-input-adornments]').dir==='rtl'`,
    "错误与 RTL 状态",
  );
  await finish("adornments-invalid-long-rtl");
}
