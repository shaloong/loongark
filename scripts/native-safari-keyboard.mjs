import assert from "node:assert/strict";

/** 先验证浏览器自身的原生 Tab 设置，避免把系统导航偏好误报为组件焦点回归。 */
export async function runNativeKeyboardPreflight({ session, execute, report }) {
  await session("POST", "/url", { url: "about:blank" });
  await execute(`
    document.body.innerHTML = '<h1>Native keyboard navigation</h1><label>First input<input id="first"></label><button id="button">Native button</button><a id="link" href="#target">Native link</a><label>Last input<input id="last"></label>';
    window.__keyboardPreflight = [];
    document.addEventListener('keydown', event => window.__keyboardPreflight.push({ key:event.key, code:event.code, trusted:event.isTrusted }));
    document.querySelector('#first').focus();
  `);
  report.keyboardPreflight = [];
  for (const expected of ["button", "link", "last"]) {
    await session("POST", "/actions", {
      actions: [
        {
          type: "key",
          id: "keyboard-preflight",
          actions: [
            { type: "keyDown", value: "\uE004" },
            { type: "keyUp", value: "\uE004" },
          ],
        },
      ],
    });
    const state = await execute(
      "return { focused:document.activeElement?.id, event:window.__keyboardPreflight.at(-1) }",
    );
    report.keyboardPreflight.push({ expected, ...state });
    assert.equal(state.event?.key, "Tab", "原生预检必须实际发送 Tab");
    assert.equal(state.event?.trusted, true, "原生预检必须使用可信按键");
    assert.equal(
      state.focused,
      expected,
      "Safari 原生按钮/链接 Tab 导航未启用；请先检查 CI 键盘导航偏好",
    );
  }
}
