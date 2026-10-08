import assert from "node:assert/strict";
import { setupQuestionGroupFocusFixture } from "../tests/questionnaireGroupFocusFixture.ts";

export async function runNativeGroupFocus(h) {
  const {
    session,
    execute,
    click,
    type,
    waitFor,
    screenshot,
    assertLayout,
    report,
  } = h;
  await session("POST", "/url", { url: "http://127.0.0.1:6007/" });
  await execute(
    "window.__safariErrors=[];window.addEventListener('error',event=>window.__safariErrors.push(event.message));window.addEventListener('unhandledrejection',event=>window.__safariErrors.push(String(event.reason)));",
  );
  const setup = await session("POST", "/execute/async", {
    script:
      "const done=arguments[arguments.length-1];(" +
      setupQuestionGroupFocusFixture.toString() +
      ")(false).then(()=>done(null),error=>done({error:String(error)}));",
    args: [],
  });
  assert.equal(setup, null, "实际 Safari 必须加载共享发布模块焦点夹具");
  const origin = 'textarea[aria-label="Retained field"]',
    add = 'button[data-question-group="add"]';
  const isFocused = (selector) =>
    execute(
      "return document.activeElement===document.querySelector(arguments[0])",
      [selector],
    );
  const invoke = (method, value) =>
    execute("window.groupFocusProbe[arguments[0]](arguments[1])", [
      method,
      value,
    ]);
  await type(origin, "Wait for the custom answer");
  await waitFor(() => isFocused(origin), "原生输入结束后保留文本框焦点");
  await click(add);
  const nativeClickFocus = await execute(
    "return window.groupFocusProbe.operationFocus()",
  );
  assert(
    await execute("return window.groupFocusProbe.retainsOperationFocus()"),
    "注册前保留当前操作的焦点",
  );
  await invoke("register");
  await waitFor(
    () =>
      execute(
        'return document.activeElement?.textContent.trim()==="Custom answer group-1"',
      ),
    "Safari 延迟注册首个自定义控件焦点",
  );
  await execute("document.querySelector(arguments[0]).focus()", [origin]);
  await invoke("reject", true);
  await click(add);
  assert(
    await execute("return window.groupFocusProbe.retainsOperationFocus()"),
    "受控拒绝不转移至其他字段",
  );
  assert.equal(
    await execute(
      'return [...document.querySelectorAll("button")].some(node=>node.textContent.trim()==="Custom answer group-2")',
    ),
    false,
  );
  await invoke("reject", false);
  await click(add);
  await click("body > button");
  await execute('document.querySelector("body > button").focus()');
  await invoke("register");
  await waitFor(() => isFocused("body > button"), "外部焦点不被延迟注册抢回");
  await execute("document.querySelector(arguments[0]).focus()", [origin]);
  await click(add);
  await invoke("unmount");
  await invoke("register");
  assert(
    await execute("return window.groupFocusProbe.retainsOperationFocus()"),
    "卸载后延迟注册不抢焦点",
  );
  const layout = await assertLayout();
  await screenshot("group-focus-custom-registration-native");
  report.interactions.push({
    case: "group-focus-custom-registration-controlled-outside-unmount",
    width: layout.width,
    nativeClickFocus,
  });
}
