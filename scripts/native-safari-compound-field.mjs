import assert from "node:assert/strict";
/** 原生输入、真实表单与动态 Field 状态；Linux 适配器仅诊断协议。 */
export async function runNativeCompoundField(h, framework, mode) {
  const {
    execute,
    session,
    navigate,
    type,
    clickText,
    waitFor,
    screenshot,
    assertLayout,
    report,
  } = h;
  const values = () =>
    execute(
      "return Object.fromEntries(new FormData(document.querySelector('form')))",
    );
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
  const press = (value) =>
    session("POST", "/actions", {
      actions: [
        {
          type: "key",
          id: "compound-keyboard",
          actions: [
            { type: "keyDown", value },
            { type: "keyUp", value },
          ],
        },
      ],
    });
  await navigate(framework, "CompoundFieldExample", mode);
  await clickText("Submit");
  await check(
    "return document.activeElement?.name==='password' && document.querySelector('output').textContent==='No submission yet'",
    "首个无效原生密码输入聚焦",
  );
  await type("input[name=password]", "sample");
  await type("input[name=own-password]", "independent");
  await type("input[name=quantity]", "8");
  await press("\uE004");
  await check(
    "return document.querySelector('input[name=quantity]').value==='8'",
    "受控数值接受",
  );
  await clickText("Reject numeric updates");
  await type("input[name=quantity]", "9");
  await press("\uE004");
  await check(
    "return document.querySelector('input[name=quantity]').value==='8'",
    "拒绝更新恢复接受值",
  );
  await clickText("Reject numeric updates");
  await clickText("Disabled");
  await waitFor(async () => {
    assert.deepEqual(await values(), {
      "own-quantity": "3",
      "own-password": "independent",
    });
    return true;
  }, "禁用字段不提交、显式 false 保留");
  await check(
    "return ['quantity','password'].every(name=>document.querySelector('input[name='+name+']').disabled)",
    "Field 禁用继承",
  );
  await finish("compound-disabled-form");
  await clickText("Disabled");
  await clickText("Read only");
  await check(
    "return ['quantity','password'].every(name=>document.querySelector('input[name='+name+']').readOnly) && ['own-quantity','own-password'].every(name=>!document.querySelector('input[name='+name+']').readOnly)",
    "动态只读与显式可编辑覆盖",
  );
  await execute("document.querySelector('input[name=quantity]').focus()");
  await press("\uE013");
  await check(
    "return document.querySelector('input[name=quantity]').value==='8'",
    "只读阻止步进",
  );
  await finish("compound-readonly-native");
  await clickText("Read only");
  await clickText("Invalid");
  await check(
    "return ['quantity','password'].every(name=>{const n=document.querySelector('input[name='+name+']');const descriptions=(n.getAttribute('aria-describedby')||'').split(/\\s+/).map(id=>document.getElementById(id)?.textContent||'').join(' ');return n.getAttribute('aria-invalid')==='true' && descriptions.includes('before submitting') && descriptions.includes('Disabled inputs are excluded')})",
    "调用方、帮助与错误描述并存",
  );
  await session("POST", "/window/rect", { width: 375, height: 1100 });
  await clickText("Long descriptions");
  await clickText("Right-to-left");
  await check(
    "return document.querySelector('form').dir==='rtl'",
    "RTL 状态已提交",
  );
  await finish("compound-invalid-long-rtl");
  for (const name of ["Right-to-left", "Long descriptions", "Invalid"])
    await clickText(name);
  await clickText("Submit");
  await check(
    "return document.querySelector('output').textContent==='quantity, password, own-quantity, own-password'",
    "原生表单真实提交",
  );
  await clickText("Reset");
  await check(
    "return document.querySelector('input[name=quantity]').value==='3' && document.querySelector('input[name=password]').value===''",
    "原生表单 reset",
  );
}
