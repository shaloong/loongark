import { decorativeIconMarkup } from "./icon-markup";
import type { IconNode } from "lucide";
import {
  escapeEditorText as escape,
  type EditorFormOptions,
} from "./editor-form";

export interface EditorToolbarAction {
  key: string;
  label: string;
  icon: IconNode;
}
export function editorIcon(icon: IconNode): string {
  return decorativeIconMarkup(icon, escape);
}
export function renderEditorMarkup(
  props: EditorFormOptions,
  id: string,
  kind: "code" | "rich",
  value: string,
  fallback: string,
  actions: readonly EditorToolbarAction[],
  hint: string,
  inspector = "",
) {
  const label =
    props.label ?? (kind === "code" ? "Code editor" : "Rich text editor");
  return `<div data-part="label" id="${escape(id)}-label">${escape(label)}</div>
    <div data-part="toolbar" role="toolbar" aria-label="${escape(label)} tools">${actions.map((action, index) => `<button type="button" data-action="${escape(action.key)}" aria-label="${escape(action.label)}" title="${escape(action.label)}" tabindex="${index === 0 ? 0 : -1}" ${props.disabled || props.readOnly ? "disabled" : ""}>${editorIcon(action.icon)}</button>`).join("")}</div>
    ${inspector}<div data-part="surface"><div data-part="engine"></div>${fallback ? `<div data-part="fallback">${fallback}</div>` : ""}
    <textarea data-part="form-value" aria-label="${escape(label)}" ${props.name ? `name="${escape(props.name)}"` : ""} ${props.form ? `form="${escape(props.form)}"` : ""} ${props.required ? "required" : ""} ${props.disabled ? "disabled" : ""} ${props.readOnly ? "readonly" : ""}>${escape(value)}</textarea></div>
    <p data-part="description" id="${escape(id)}-description" ${props.description ? "" : "hidden"}>${escape(props.description ?? "")}</p>
    <p data-part="keyboard-hint" id="${escape(id)}-keyboard">${escape(hint)}</p>
    <p data-part="error" id="${escape(id)}-error" role="alert" ${props.error ? "" : "hidden"}>${escape(props.error ?? "")}</p>
    <p data-part="status" role="status" aria-live="polite"></p>`;
}
export function syncEditorMarkup(
  root: HTMLElement,
  props: EditorFormOptions,
  fallbackLabel: string,
) {
  root.dir = props.dir ?? "";
  root.dataset.disabled = String(!!props.disabled);
  root.dataset.readonly = String(!!props.readOnly);
  root.dataset.invalid = String(!!props.error);
  const rows = Number.isFinite(props.minRows)
    ? Math.max(2, Math.min(100, Math.trunc(props.minRows!)))
    : 6;
  root.style.setProperty("--lk-editor-rows", String(rows));
  root
    .querySelector('[data-part="toolbar"]')
    ?.setAttribute("aria-label", `${props.label ?? fallbackLabel} tools`);
  for (const [part, value] of [
    ["label", props.label ?? fallbackLabel],
    ["description", props.description],
    ["error", props.error],
  ] as const) {
    const node = root.querySelector<HTMLElement>(`[data-part="${part}"]`);
    if (node) {
      node.textContent = value ?? "";
      node.hidden = !value;
    }
  }
}
