/** 原生输入在点击后先改变 checked；受控调用方可能拒绝该更新。 */
export function mountNativeSelection(
  input: HTMLInputElement,
  read: () => {
    formValue?: string;
    readOnly?: boolean;
    checked?: boolean;
    indeterminate?: boolean;
    radioValue?: string | null;
  },
): () => void {
  const win = input.ownerDocument.defaultView;
  if (!win) return () => {};
  let frame: number | undefined,
    disposed = false;
  const sync = () => {
    frame = undefined;
    if (disposed || !input.isConnected) return;
    const state = read();
    if ("formValue" in state) {
      input.value = state.formValue ?? "";
    } else if ("radioValue" in state) {
      const root = input.closest("[data-scope=radio-group][data-part=root]");
      if (!root) return;
      for (const node of Array.from(
        root.querySelectorAll<HTMLInputElement>("input[type=radio]"),
      )) {
        if (node.closest("[data-scope=radio-group][data-part=root]") === root)
          node.checked = node.value === state.radioValue;
      }
    } else {
      input.checked = !!state.checked;
      input.indeterminate = !!state.indeterminate;
    }
  };
  const schedule = () => {
    if (frame !== undefined) win.cancelAnimationFrame(frame);
    // 等待框架提交，再读取当前 API；不沿用事件发生时的旧值或再次发出 change。
    frame = win.requestAnimationFrame(sync);
  };
  const reset = (event: Event) => {
    if (event.target === input.form) schedule();
  };
  const readonlyKey = (event: KeyboardEvent) => {
    if (
      read().readOnly &&
      [
        " ",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End",
      ].includes(event.key)
    )
      event.preventDefault();
  };
  input.addEventListener("keydown", readonlyKey, true);
  input.ownerDocument.addEventListener("reset", reset, true);
  input.addEventListener("click", schedule);
  input.addEventListener("change", schedule);
  return () => {
    disposed = true;
    if (frame !== undefined) win.cancelAnimationFrame(frame);
    input.removeEventListener("keydown", readonlyKey, true);
    input.ownerDocument.removeEventListener("reset", reset, true);
    input.removeEventListener("click", schedule);
    input.removeEventListener("change", schedule);
  };
}
