export type SpeedDialDirection = "up" | "down" | "left" | "right";
export interface SpeedDialAction {
  value: string;
  label: string;
  icon?: string;
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
export const actionMediaCSS = `
@keyframes lk-speed-dial-in { from {opacity:0;transform:translateY(var(--lk-space-component-xs));} to {opacity:1;transform:none;} }
:is([data-scope=floating-action-button],[data-scope=speed-dial][data-part=trigger]):is(button) { --lk-fab-size:calc(var(--lk-control-height-lg) + var(--lk-space-component-sm));display:inline-flex;align-items:center;justify-content:center;gap:var(--lk-space-component-sm);flex:none;width:var(--lk-fab-size);height:var(--lk-fab-size);padding:var(--lk-space-component-sm);border:var(--lk-control-borderwidth) solid transparent;border-radius:var(--lk-radius-pill);background:var(--lk-color-semantic-primary);color:var(--lk-color-semantic-primaryforeground);font:inherit;font-weight:500;box-shadow:var(--lk-shadow-popover);cursor:pointer;transition:background-color var(--lk-motion-duration-fast) var(--lk-motion-easing-standard),box-shadow var(--lk-motion-duration-fast) var(--lk-motion-easing-standard); }
:is([data-scope=floating-action-button],[data-scope=speed-dial][data-part=trigger]):is(button)[data-size=sm] { --lk-fab-size:var(--lk-control-height-lg); } :is([data-scope=floating-action-button],[data-scope=speed-dial][data-part=trigger]):is(button)[data-size=lg] { --lk-fab-size:calc(var(--lk-control-height-lg) + var(--lk-space-component-md)); }
:is([data-scope=floating-action-button],[data-scope=speed-dial][data-part=trigger]):is(button)[data-extended=true] { width:auto;min-width:var(--lk-fab-size);padding-inline:var(--lk-space-component-lg); }
:is([data-scope=floating-action-button],[data-scope=speed-dial][data-part=trigger]):is(button)[data-variant=secondary] { background:var(--lk-color-semantic-secondary);color:var(--lk-color-semantic-secondaryforeground);border-color:var(--lk-color-semantic-border); }
:is([data-scope=floating-action-button],[data-scope=speed-dial][data-part=trigger]):is(button):hover:not(:disabled) { box-shadow:var(--lk-shadow-xl);background:color-mix(in srgb,var(--lk-color-semantic-primary) 90%,var(--lk-color-semantic-primaryforeground)); }
:is([data-scope=floating-action-button],[data-scope=speed-dial][data-part=trigger]):is(button)[data-variant=secondary]:hover:not(:disabled) { background:var(--lk-color-semantic-accent); }
:is([data-scope=floating-action-button],[data-scope=speed-dial][data-part=trigger]):is(button):disabled { opacity:.5;cursor:not-allowed;box-shadow:none; }
[data-scope=speed-dial][data-part=root] { position:relative;display:inline-flex;max-width:100%; }
[data-scope=speed-dial][data-part=trigger] { --lk-fab-size:calc(var(--lk-control-height-lg) + var(--lk-space-component-sm)); }
[data-scope=speed-dial][data-part=icon] { display:inline-flex;align-items:center;justify-content:center;font-size:var(--lk-typography-fontsize-xl);transition:transform var(--lk-motion-duration-fast) var(--lk-motion-easing-standard); }
[data-scope=speed-dial][data-state=open] [data-part=icon] { transform:rotate(45deg); }
[data-scope=speed-dial][data-part=actions] { position:absolute;z-index:var(--lk-z-index-popover);display:flex;flex-direction:column;gap:var(--lk-space-component-sm);margin:0;padding:0;list-style:none;min-width:max-content;animation:lk-speed-dial-in var(--lk-motion-duration-fast) var(--lk-motion-easing-standard); }
[data-scope=speed-dial][data-part=actions][hidden] { display:none; }
[data-scope=speed-dial][data-direction=up] [data-part=actions] { bottom:calc(100% + var(--lk-space-component-sm));right:0; }
[data-scope=speed-dial][data-direction=down] [data-part=actions] { top:calc(100% + var(--lk-space-component-sm));left:0; }
[data-scope=speed-dial][data-direction=left] [data-part=actions] { right:calc(100% + var(--lk-space-component-sm));top:0;flex-direction:row; }
[data-scope=speed-dial][data-direction=right] [data-part=actions] { left:calc(100% + var(--lk-space-component-sm));top:0;flex-direction:row; }
[data-scope=speed-dial][data-part=action] { display:inline-flex;align-items:center;gap:var(--lk-space-component-sm);min-height:var(--lk-control-height-lg);padding:var(--lk-space-component-sm) var(--lk-space-component-compact);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-md);background:var(--lk-color-semantic-card);color:var(--lk-color-semantic-cardforeground);font:inherit;font-size:var(--lk-typography-fontsize-sm);white-space:nowrap;box-shadow:var(--lk-shadow-sm);cursor:pointer;transition:background-color var(--lk-motion-duration-fast) var(--lk-motion-easing-standard); }
[data-scope=speed-dial][data-part=action]:hover:not(:disabled) { background:var(--lk-color-semantic-accent); }
[data-scope=speed-dial][data-part=action]:disabled { opacity:.5;cursor:not-allowed; }
`;
