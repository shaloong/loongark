/** 将调用方提示与 Field 描述一起保留，避免重复 ID。 */
export function nativeSelectionDescription(
  ...values: Array<string | null | undefined>
): string | undefined {
  const ids = values
    .flatMap((value) => value?.trim().split(/\s+/) ?? [])
    .filter(Boolean);
  return ids.length ? [...new Set(ids)].join(" ") : undefined;
}

/** Field 用 aria-errormessage 管理已挂载错误；复合控件的实际输入也需读到它。 */
export function nativeSelectionFieldDescription(
  own: string | null | undefined,
  field:
    | {
        ariaDescribedby?: string;
        getInputProps: () => { "aria-errormessage"?: unknown };
      }
    | undefined,
  invalid: unknown,
): string | undefined {
  const error =
    invalid === true || invalid === "true"
      ? field?.getInputProps()["aria-errormessage"]
      : undefined;
  return nativeSelectionDescription(
    own,
    field?.ariaDescribedby,
    typeof error === "string" ? error : undefined,
  );
}

/** 省略缺省值以保留 Ark 上下文；显式 false、空字符串和 null 仍由调用方控制。 */
export function nativeSelectionProps<T extends object>(
  props: T,
): Partial<NoInfer<T>> {
  const defined: Partial<T> = {};
  for (const key of Object.keys(props) as Array<keyof T>) {
    if (props[key] !== undefined) defined[key] = props[key];
  }
  return defined;
}

const nativeSelectionReaders = new WeakMap<
  HTMLInputElement,
  () => { readOnly?: boolean }
>();
const nativeReadonlyKeys = new Set([
  " ",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Home",
  "End",
]);

/** 标签编辑的延迟焦点恢复不能覆盖随后一次原生 Tab 的目的地。 */
function mountTagTabFocus(hiddenInput: HTMLInputElement): () => void {
  const doc = hiddenInput.ownerDocument,
    win = doc.defaultView;
  if (!win) return () => {};
  let stopPending: (() => void) | undefined;
  const onTab = (event: KeyboardEvent) => {
    if (event.key !== "Tab" || event.defaultPrevented) return;
    // Solid 的 ref 在节点接入树之前运行，事件发生时再读取所属控件。
    const root = hiddenInput.closest("[data-scope=tags-input][data-part=root]");
    const input = root?.querySelector<HTMLInputElement>("[data-part=input]");
    if (
      !input ||
      !(event.target instanceof win.Node) ||
      !root?.contains(event.target)
    )
      return;
    stopPending?.();
    let destination: HTMLElement | undefined, frame: number;
    const cleanup = () => {
      win.cancelAnimationFrame(frame);
      doc.removeEventListener("focus", moved, true);
      doc.removeEventListener("focusin", moved, true);
      doc.removeEventListener("keydown", cancel, true);
      doc.removeEventListener("pointerdown", cleanup, true);
      win.removeEventListener("blur", cleanup);
      if (stopPending === cleanup) stopPending = undefined;
    };
    const cancel = (next: KeyboardEvent) => {
      if (next === event) return;
      // 原生只读选择控件拦截这些键，不产生新的焦点请求。
      // 其他按键同步解除保护，允许调用方在处理器内主动聚焦。
      const target = next.target;
      if (
        target instanceof win.HTMLInputElement &&
        !root?.contains(target) &&
        nativeReadonlyKeys.has(next.key) &&
        nativeSelectionReaders.get(target)?.().readOnly
      )
        return;
      cleanup();
    };
    const moved = (next: FocusEvent) => {
      const target = next.target;
      if (!(target instanceof win.HTMLElement)) return;
      if (target !== input) destination = target;
      else if (destination?.isConnected && input.isConnected) {
        // 不把已过期的恢复转发给框架 onFocus，否则状态机会再次安排恢复。
        next.stopImmediatePropagation();
        // 只保留这一 Tab 已产生的实际焦点；不预测顺序或构造新的焦点目标。
        destination.focus({ preventScroll: true });
      }
    };
    stopPending = cleanup;
    doc.addEventListener("focus", moved, true);
    doc.addEventListener("focusin", moved, true);
    doc.addEventListener("keydown", cancel, true);
    doc.addEventListener("pointerdown", cleanup, true);
    win.addEventListener("blur", cleanup);
    frame = win.requestAnimationFrame(() => {
      frame = win.requestAnimationFrame(cleanup);
    });
  };
  const invalid = (event: Event) => {
    if (event.defaultPrevented || !hiddenInput.isConnected) return;
    const input = hiddenInput
      .closest("[data-scope=tags-input][data-part=root]")
      ?.querySelector<HTMLInputElement>("[data-part=input]");
    if (!input || input.disabled) return;
    // 保留隐藏字段的原生校验与提交阻断，将实际焦点转交可见编辑区。
    event.preventDefault();
    const getFirstInvalid = () =>
      Array.from(hiddenInput.form?.elements ?? []).find(
        (control) =>
          "willValidate" in control &&
          (control as HTMLInputElement).willValidate &&
          !(control as HTMLInputElement).validity.valid,
      );
    const firstInvalid = getFirstInvalid();
    if (firstInvalid && firstInvalid !== hiddenInput) return;
    stopPending?.();
    input.focus();
    // 浏览器可能继续聚焦后面的原生错误；仅首个无效字段的代理保留优先级。
    // 后续真实键盘/指针操作取消本次恢复，调用方焦点不在本表单错误上则保留。
    const cleanup = () => {
      win.cancelAnimationFrame(frame);
      doc.removeEventListener("keydown", cleanup, true);
      doc.removeEventListener("pointerdown", cleanup, true);
      win.removeEventListener("blur", cleanup);
      if (stopPending === cleanup) stopPending = undefined;
    };
    stopPending = cleanup;
    doc.addEventListener("keydown", cleanup, true);
    doc.addEventListener("pointerdown", cleanup, true);
    win.addEventListener("blur", cleanup);
    const frame = win.requestAnimationFrame(() => {
      const active = doc.activeElement as HTMLInputElement | null;
      if (
        hiddenInput.isConnected &&
        !!hiddenInput.form &&
        input.isConnected &&
        !input.disabled &&
        getFirstInvalid() === hiddenInput &&
        !hiddenInput.validity.valid &&
        active?.form === hiddenInput.form &&
        active.willValidate &&
        !active.validity.valid
      )
        input.focus();
      cleanup();
    });
  };
  hiddenInput.addEventListener("invalid", invalid);
  doc.addEventListener("keydown", onTab);
  return () => {
    stopPending?.();
    doc.removeEventListener("keydown", onTab);
    hiddenInput.removeEventListener("invalid", invalid);
  };
}

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
  options: { syncOnInput?: boolean } = {},
): () => void {
  const win = input.ownerDocument.defaultView;
  if (!win) return () => {};
  nativeSelectionReaders.set(input, read);
  const stopTagFocus =
    input.dataset.scope === "tags-input" ? mountTagTabFocus(input) : undefined;
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
    if (read().readOnly && nativeReadonlyKeys.has(event.key))
      event.preventDefault();
  };
  input.addEventListener("keydown", readonlyKey, true);
  input.ownerDocument.addEventListener("reset", reset, true);
  input.addEventListener("click", schedule);
  input.addEventListener("change", schedule);
  if (options.syncOnInput) input.addEventListener("input", schedule);
  return () => {
    disposed = true;
    if (nativeSelectionReaders.get(input) === read)
      nativeSelectionReaders.delete(input);
    stopTagFocus?.();
    if (frame !== undefined) win.cancelAnimationFrame(frame);
    input.removeEventListener("keydown", readonlyKey, true);
    input.ownerDocument.removeEventListener("reset", reset, true);
    input.removeEventListener("click", schedule);
    input.removeEventListener("change", schedule);
    if (options.syncOnInput) input.removeEventListener("input", schedule);
  };
}
