export interface EditorFormOptions {
  id?: string;
  dir?: "ltr" | "rtl";
  minRows?: number;
  name?: string;
  form?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  label?: string;
  description?: string;
  error?: string;
  requiredMessage?: string;
}

/** 序列化控件留在原生表单中，客户端 invalid 交给可见编辑区。 */
export function mountEditorForm(
  root: HTMLElement,
  get: () => EditorFormOptions,
  focus: () => void,
  reset: () => void,
) {
  const field = root.querySelector<HTMLTextAreaElement>(
    "textarea[data-part=form-value]",
  );
  if (!field) throw new Error("Editor form field missing");
  let form: HTMLFormElement | null = null,
    disposed = false,
    attempted = false;
  const invalid = (event: Event) => {
    event.preventDefault();
    attempted = true;
    root.dataset.invalid = "true";
    root
      .querySelector('[role="textbox"]')
      ?.setAttribute("aria-invalid", "true");
    const error = root.querySelector<HTMLElement>('[data-part="error"]');
    if (error) {
      error.hidden = false;
      error.textContent = field.validationMessage;
    }
    if (!get().disabled) focus();
  };
  const onReset = (event: Event) => {
    // reset 事件先于浏览器重置控件值；尊重业务对事件的取消。
    queueMicrotask(() => {
      if (!disposed && !event.defaultPrevented) reset();
    });
  };
  field.addEventListener("invalid", invalid);
  const sync = (
    serialized: string,
    empty: boolean,
    requiredMessage: string,
  ) => {
    const props = get();
    field.value = serialized;
    field.name = props.name ?? "";
    field.disabled = !!props.disabled;
    field.readOnly = !!props.readOnly;
    field.required = !!props.required;
    if (props.form) field.setAttribute("form", props.form);
    else field.removeAttribute("form");
    field.setCustomValidity(
      props.error || (props.required && empty ? requiredMessage : ""),
    );
    const message =
      props.error || (props.required && empty ? requiredMessage : "");
    if (!message) attempted = false;
    const invalid = !!props.error || (attempted && !!message);
    root.dataset.invalid = String(invalid);
    root
      .querySelector('[role="textbox"]')
      ?.setAttribute("aria-invalid", String(invalid));
    const error = root.querySelector<HTMLElement>('[data-part="error"]');
    if (error) {
      error.hidden = !invalid;
      error.textContent = invalid ? message : "";
    }
    const current = field.form;
    if (current !== form) {
      form?.removeEventListener("reset", onReset);
      current?.addEventListener("reset", onReset);
      form = current;
    }
  };
  return {
    sync,
    destroy() {
      disposed = true;
      form?.removeEventListener("reset", onReset);
      field.removeEventListener("invalid", invalid);
    },
  };
}

export function escapeEditorText(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );
}

/** 工具条原生按钮保留焦点顺序，方向键只在该工具条内处理。 */
export function mountEditorToolbar(toolbar: HTMLElement) {
  const win = toolbar.ownerDocument.defaultView;
  if (!win) return () => {};
  const buttons = () =>
    Array.from(
      toolbar.querySelectorAll<HTMLButtonElement>(
        "button:not(:disabled):not([hidden])",
      ),
    );
  const onFocus = (event: FocusEvent) => {
    if (!(event.target instanceof win.HTMLButtonElement)) return;
    for (const button of buttons())
      button.tabIndex = button === event.target ? 0 : -1;
  };
  const onKey = (event: KeyboardEvent) => {
    const active = toolbar.ownerDocument.activeElement;
    if (!(active instanceof win.HTMLButtonElement)) return;
    const items = buttons(),
      index = items.indexOf(active);
    if (index < 0 || !items.length) return;
    const rtl = win.getComputedStyle(toolbar).direction === "rtl";
    let next: number;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else if (event.key === "ArrowRight")
      next = (index + (rtl ? -1 : 1) + items.length) % items.length;
    else if (event.key === "ArrowLeft")
      next = (index + (rtl ? 1 : -1) + items.length) % items.length;
    else return;
    event.preventDefault();
    items[next].focus();
  };
  toolbar.addEventListener("focusin", onFocus);
  toolbar.addEventListener("keydown", onKey);
  syncEditorToolbar(toolbar);
  return () => {
    toolbar.removeEventListener("focusin", onFocus);
    toolbar.removeEventListener("keydown", onKey);
  };
}

export function syncEditorToolbar(toolbar: HTMLElement) {
  const all = Array.from(toolbar.querySelectorAll<HTMLButtonElement>("button"));
  const enabled = all.filter((button) => !button.disabled && !button.hidden);
  const entry = enabled.find((button) => button.tabIndex === 0) ?? enabled[0];
  for (const button of all) button.tabIndex = button === entry ? 0 : -1;
}
