import type { IconNode } from "./icon";
export type SpeedDialDirection = "up" | "down" | "left" | "right";
export interface SpeedDialAction {
  value: string;
  label: string;
  /** 字符串保留兼容，推荐按需导入的 Lucide 节点。 */
  icon?: IconNode | string;
  disabled?: boolean;
}
export interface SpeedDialOptions {
  label: string;
  actions: readonly SpeedDialAction[];
  direction?: SpeedDialDirection;
  disabled?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (details: { open: boolean }) => void;
  onSelect?: (details: { value: string }) => void;
}
export interface FloatingActionButtonOptions {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  extended?: boolean;
}
export function speedDialActions(actions: readonly SpeedDialAction[]) {
  const keys = new Set<string>();
  for (const a of actions) {
    if (!a.value || keys.has(a.value))
      throw Error("SpeedDial requires unique non-empty action values");
    keys.add(a.value);
  }
  return actions.filter((a) => !a.disabled);
}
export function fabAttributes(options: FloatingActionButtonOptions = {}) {
  return {
    "data-scope": "floating-action-button",
    "data-part": "root",
    "data-size": options.size ?? "md",
    "data-variant": options.variant ?? "primary",
    "data-extended": options.extended ? "true" : undefined,
  };
}
export function mountSpeedDial(
  root: HTMLElement,
  requestOpen: (open: boolean) => void,
) {
  const doc = root.ownerDocument,
    trigger = () =>
      root.querySelector<HTMLButtonElement>("[data-part=trigger]"),
    items = () =>
      Array.from(
        root.querySelectorAll<HTMLButtonElement>(
          "[role=menuitem]:not(:disabled)",
        ),
      );
  let frame = 0;
  const focus = (last = false) => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      if (root.isConnected && root.dataset.state === "open") {
        const all = items();
        (last ? all[all.length - 1] : all[0])?.focus();
      }
    });
  };
  const keydown = (e: KeyboardEvent) => {
    if (e.defaultPrevented) return;
    const button = e.target as HTMLElement,
      all = items(),
      index = all.indexOf(button as HTMLButtonElement),
      isTrigger = button === trigger();
    if (e.key === "Escape" && root.dataset.state === "open") {
      e.preventDefault();
      requestOpen(false);
      trigger()?.focus();
    } else if (e.key === "Tab") {
      requestOpen(false);
    } else if (
      [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "Home",
        "End",
      ].includes(e.key) &&
      (isTrigger || index >= 0)
    ) {
      e.preventDefault();
      if (isTrigger) {
        requestOpen(true);
        focus(e.key === "End");
      } else {
        const next =
          e.key === "Home"
            ? 0
            : e.key === "End"
              ? all.length - 1
              : (index +
                  (e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 1) +
                  all.length) %
                all.length;
        all[next]?.focus();
      }
    }
  };
  const outside = (e: PointerEvent) => {
    if (!root.contains(e.target as Node)) requestOpen(false);
  };
  const click = (e: MouseEvent) => {
    if ((e.target as Element).closest('[data-part="trigger"]') === trigger())
      focus();
  };
  const blur = (e: FocusEvent) => {
    if (e.relatedTarget && !root.contains(e.relatedTarget as Node))
      requestOpen(false);
  };
  root.addEventListener("keydown", keydown);
  root.addEventListener("click", click);
  root.addEventListener("focusout", blur);
  doc.addEventListener("pointerdown", outside);
  return () => {
    cancelAnimationFrame(frame);
    root.removeEventListener("keydown", keydown);
    root.removeEventListener("click", click);
    root.removeEventListener("focusout", blur);
    doc.removeEventListener("pointerdown", outside);
  };
}
export { actionMediaCSS } from "./speed-dial-styles";
