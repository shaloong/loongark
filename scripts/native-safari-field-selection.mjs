import assert from "node:assert/strict";
/** 原生 Safari 验证 Field 缺省继承；不将 Linux 协议适配器当作平台通过。 */
export async function runNativeFieldSelection(h, framework, mode) {
  const {
    execute,
    session,
    navigate,
    waitFor,
    clickText,
    click,
    screenshot,
    assertLayout,
    report,
  } = h;
  const press = (value) =>
    session("POST", "/actions", {
      actions: [
        {
          type: "key",
          id: "field-keyboard",
          actions: [
            { type: "keyDown", value },
            { type: "keyUp", value },
          ],
        },
      ],
    });
  const focus = (selector) =>
    execute("document.querySelector(arguments[0]).focus()", [selector]);
  const values = () =>
    execute(
      "return Object.fromEntries(new FormData(document.querySelector('form')))",
    );
  const expected = { density: "compact", frameworks: "React, Vue, Solid" };
  const formValues = (want) =>
    waitFor(async () => {
      assert.deepEqual(await values(), want);
      return true;
    }, "Field 原生表单值");
  await navigate(framework, "FieldSelectionExample", mode);
  await formValues(expected);
  await clickText("Disabled");
  await waitFor(
    () =>
      execute(
        "return [...document.querySelectorAll('form input')].every(n=>n.matches(':disabled'))",
      ),
    "Field 禁用继承",
  );
  await formValues({});
  await clickText("Override Field state");
  await waitFor(
    () =>
      execute(
        "return ['agreement','notifications','frameworks'].every(name=>!document.querySelector('input[name='+name+']').disabled) && document.querySelector('input[name=density]').matches(':disabled')",
      ),
    "显式 false 与原生 Fieldset 禁用契约",
  );
  await formValues({ frameworks: expected.frameworks });
  await clickText("Override Field state");
  await clickText("Disabled");
  await clickText("Read only");
  await waitFor(
    () =>
      execute(
        "return document.querySelector('[data-scope=tags-input][data-part=input]').readOnly && document.querySelector('[role=radiogroup]').getAttribute('aria-readonly')==='true'",
      ),
    "只读状态提交",
  );
  for (const name of ["agreement", "notifications"]) {
    await focus("input[name=" + name + "]");
    await press(" ");
  }
  await focus("input[name=density]:checked");
  await press("\uE014");
  await formValues(expected);
  assert.equal(
    await execute(
      "return document.activeElement?.value==='compact' && document.activeElement.checked",
    ),
    true,
  );
  await clickText("Override Field state");
  await waitFor(
    () =>
      execute(
        "return !document.querySelector('[data-scope=tags-input][data-part=input]').readOnly",
      ),
    "显式可编辑覆盖",
  );
  for (const name of ["agreement", "notifications"]) {
    await focus("input[name=" + name + "]");
    await press(" ");
  }
  await formValues({ agreement: "on", notifications: "on", ...expected });
  await clickText("Override Field state");
  await clickText("Read only");
  await clickText("Required");
  await waitFor(
    () =>
      execute(
        "return ['agreement','notifications','frameworks','density'].every(name=>document.querySelector('input[name='+name+']').required) && document.querySelector('form').checkValidity()",
      ),
    "原生必填继承",
  );
  await focus("input[name=agreement]");
  await press(" ");
  await waitFor(
    () => execute("return !document.querySelector('form').checkValidity()"),
    "原生必填拒绝空值",
  );
  await clickText("Submit preferences");
  await waitFor(
    () =>
      execute(
        "return document.activeElement?.name==='agreement' && document.querySelector('output').textContent==='{}'",
      ),
    "无效提交聚焦且不发送",
  );
  await clickText("Override Field state");
  await clickText("Submit preferences");
  await waitFor(async () => {
    assert.deepEqual(
      await execute(
        "return JSON.parse(document.querySelector('output').textContent)",
      ),
      { notifications: "on", ...expected },
    );
    return true;
  }, "覆盖必填后的真实提交");
  await clickText("Override Field state");
  await clickText("Required");
  await clickText("Invalid");
  await waitFor(
    () =>
      execute(
        `const controls=['input[name=agreement]','input[name=notifications]','[data-scope=tags-input][data-part=input]','[data-testid=field-radio-group]'].map(s=>document.querySelector(s));return controls.every(n=>{const ids=(n.getAttribute('aria-describedby')||'').split(/\\s+/);return ids.some(id=>id.endsWith('helper-text'))&&ids.some(id=>id.endsWith('error-text'))&&ids.every(id=>document.getElementById(id))})`,
      ),
    "可聚焦控件与错误/帮助描述关联",
  );
  await session("POST", "/window/rect", { width: 375, height: 1100 });
  await clickText("Long descriptions");
  await clickText("Right-to-left");
  await waitFor(
    () =>
      execute(
        "return document.querySelector('[data-scope=tags-input][data-part=root]').getAttribute('dir')==='rtl' && document.querySelector('[data-scope=checkbox][data-part=label]').textContent.includes('several lines')",
      ),
    "长描述与 RTL 已提交",
  );
  await focus("[data-scope=tags-input][data-part=input]");
  await press("\uE014");
  await waitFor(
    () =>
      execute(
        "const input=document.querySelector('[data-scope=tags-input][data-part=input]');const control=document.querySelector('[data-scope=tags-input][data-part=control]');return document.activeElement===input && input.matches(':focus-visible') && getComputedStyle(control).outlineStyle==='solid'",
      ),
    "可信键盘焦点绘制在完整控件",
  );
  const layout = await assertLayout();
  await screenshot(`field-native-inheritance-validation-${framework}-${mode}`);
  // 独立重置页面，覆盖仅隐藏标签字段无效时的原生提交焦点。
  await navigate(framework, "FieldSelectionExample", mode);
  await clickText("Required");
  await waitFor(
    () =>
      execute(
        "return document.querySelector('input[name=frameworks]').required",
      ),
    "标签必填状态提交",
  );
  await click("[data-scope=tags-input][data-part=clear-trigger]");
  await waitFor(
    () =>
      execute(
        "return document.querySelector('input[name=frameworks]').value===''",
      ),
    "标签清空",
  );
  await clickText("Submit preferences");
  await waitFor(
    () => execute("return document.activeElement?.name==='agreement'"),
    "多个无效字段保持原生首错顺序",
  );
  await focus("input[name=agreement]");
  await press(" ");
  await focus("input[name=notifications]");
  await press(" ");
  await clickText("Submit preferences");
  await waitFor(
    () =>
      execute(
        "return document.activeElement?.matches('[data-scope=tags-input][data-part=input]') && document.querySelector('output').textContent==='{}'",
      ),
    "无效隐藏字段聚焦可见编辑区",
  );
  await press("A");
  await press("\uE007");
  await waitFor(
    () =>
      execute(
        "return document.querySelector('input[name=frameworks]').value==='A'",
      ),
    "补值恢复原生有效状态",
  );
  await clickText("Submit preferences");
  await formValues({
    agreement: "on",
    notifications: "on",
    density: "compact",
    frameworks: "A",
  });
  report.interactions.push({
    framework,
    mode,
    case: "field-native-inheritance-validation",
    width: layout.width,
  });
  await session("POST", "/window/rect", { width: 1280, height: 1100 });
}
