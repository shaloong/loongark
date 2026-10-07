import assert from "node:assert/strict";

/** 同一验收使用 Safari W3C 可信按键；布局断言不以程序化聚焦代替 Tab。 */
export async function runNativeSelection(h, framework, mode) {
  const {
    execute,
    session,
    navigate,
    waitFor,
    clickText,
    click,
    type,
    screenshot,
    assertLayout,
    report,
  } = h;
  const press = (value) =>
    session("POST", "/actions", {
      actions: [
        {
          type: "key",
          id: "selection-keyboard",
          actions: [
            { type: "keyDown", value },
            { type: "keyUp", value },
          ],
        },
      ],
    });
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
  await navigate(framework, "SelectionControlsExample", mode);
  await execute(
    `const form=document.querySelector('form');const start=document.createElement('button');start.textContent='Focus start';form.before(start);start.focus();window.__selectionKeys=[];document.addEventListener('keydown',e=>window.__selectionKeys.push({key:e.key,trusted:e.isTrusted}));`,
  );
  for (const scope of ["checkbox", "switch", "radio-group"]) {
    await press("\uE004");
    await waitFor(
      () =>
        execute(
          `const input=document.activeElement;const control=input.parentElement?.querySelector('[data-part=control],[data-part=item-control]');return input.tagName==='INPUT' && input.closest('[data-scope]')?.dataset.scope===arguments[0] && control && getComputedStyle(control).outlineStyle==='solid';`,
          [scope],
        ),
      `可见 ${scope} 原生焦点`,
    );
    await press(scope === "radio-group" ? "\uE014" : " ");
  }
  const values = () =>
    execute(
      "return Object.fromEntries(new FormData(document.querySelector('form')))",
    );
  await waitFor(
    async () =>
      JSON.stringify(await values()) ===
      JSON.stringify({
        agreement: "on",
        notifications: "on",
        density: "comfortable",
        frameworks: "React, Vue, Solid",
      }),
    "原生选择表单值",
  );
  const events = await execute("return window.__selectionKeys");
  assert.equal(events.filter((e) => e.key === "Tab" && e.trusted).length, 3);
  await click("summary");
  const preserved = {
    agreement: "on",
    notifications: "on",
    density: "comfortable",
    frameworks: "React, Vue, Solid",
  };
  const assertValues = () =>
    waitFor(
      async () => JSON.stringify(await values()) === JSON.stringify(preserved),
      "原生受控值保持",
    );
  await clickText("Reject updates");
  await type("[data-scope=tags-input][data-part=input]", "Rejected framework");
  await press("\uE007");
  for (const scope of ["checkbox", "switch", "radio-group"]) {
    await execute(`document.querySelector(arguments[0]).focus()`, [
      scope === "radio-group"
        ? "[data-scope=radio-group] input:checked"
        : `[data-scope=${scope}] input`,
    ]);
    await press(scope === "radio-group" ? "\uE014" : " ");
  }
  await assertValues();
  await execute("document.querySelector('form').reset()");
  await assertValues();
  await clickText("Reject updates");
  await clickText("Read only");
  for (const scope of ["checkbox", "switch"]) {
    await execute(`document.querySelector(arguments[0]).focus()`, [
      `[data-scope=${scope}] input`,
    ]);
    await press(" ");
  }
  await execute(
    "document.querySelector('[data-scope=radio-group] input:checked').focus()",
  );
  await press("\uE014");
  await waitFor(
    () =>
      execute(
        "return document.activeElement?.value==='comfortable' && document.activeElement.checked",
      ),
    "只读单选保留键盘焦点",
  );
  await assertValues();
  await clickText("Read only");
  await clickText("Disabled");
  await waitFor(
    () =>
      execute(
        "return [...document.querySelectorAll('form input')].every(n=>n.disabled) && [...new FormData(document.querySelector('form'))].length===0",
      ),
    "原生禁用控件不提交",
  );
  await clickText("Disabled");
  await clickText("Long descriptions");
  await clickText("Right-to-left");
  await session("POST", "/window/rect", { width: 375, height: 1000 });
  for (const size of ["sm", "md", "lg"]) {
    await clickText(`Size ${size}`);
    await waitFor(
      () =>
        execute(
          `const c=document.querySelector('[data-scope=switch][data-part=control]'),t=c.querySelector('[data-part=thumb]'),a=c.getBoundingClientRect(),b=t.getBoundingClientRect();return getComputedStyle(c).direction==='rtl' && b.left>=a.left && b.right<=a.right && Math.abs(b.left-a.left-parseFloat(getComputedStyle(c).paddingInlineStart))<=1;`,
        ),
      "RTL 滑块位移与对称留白",
    );
    await assertLayout();
  }
  assert.deepEqual(await values(), {
    agreement: "on",
    notifications: "on",
    density: "comfortable",
    frameworks: "React, Vue, Solid",
  });
  await finish("selection-native-focus-form-rtl");
  await session("POST", "/window/rect", { width: 1280, height: 1100 });
  await navigate(framework, "TagsInputExample", mode);
  await execute(
    `const root=document.querySelector('[data-scope=tags-input][data-part=root]');const form=document.createElement('form');root.before(form);form.append(root);`,
  );
  const input = "[data-scope=tags-input][data-part=input]";
  await type(input, "Svelte");
  await press("\uE007");
  await waitFor(
    () =>
      execute(
        `const i=document.querySelector(arguments[0]);return i.value==='' && document.activeElement===i && new FormData(document.querySelector('form')).get('frameworks')==='React, Vue, Solid, Svelte' && getComputedStyle(i).outlineStyle==='none' && getComputedStyle(i.parentElement).outlineStyle==='solid';`,
        [input],
      ),
    "标签外框焦点与原生提交",
  );
  await press("\uE012");
  await press("\uE017");
  await waitFor(
    () =>
      execute(
        "return new FormData(document.querySelector('form')).get('frameworks')==='React, Vue, Solid'",
      ),
    "标签键盘删除",
  );
  await waitFor(
    () =>
      execute(
        `return new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve(document.activeElement===document.querySelector(arguments[0])))));`,
        [input],
      ),
    "删除后输入焦点恢复完成",
  );
  await press("\uE004");
  await waitFor(
    () =>
      execute("return document.activeElement?.dataset.part==='clear-trigger'"),
    "标签清除按钮 Tab 导航",
  );
  await press("\uE007");
  await waitFor(
    () =>
      execute(
        `return new FormData(document.querySelector('form')).get('frameworks')==='' && document.activeElement===document.querySelector(arguments[0]);`,
        [input],
      ),
    "清除后标签值与焦点",
  );
  await finish("tags-native-focus-form-clear");
}
