export const drawerDirections = ["down", "up", "start", "end"] as const;
export type DrawerDirection = (typeof drawerDirections)[number];
export type DrawerTextDirection = "ltr" | "rtl";
export function drawerSnapPoints(direction: DrawerDirection) {
  return direction === "up" || direction === "down"
    ? ["240px", "480px"]
    : ["256px", "320px"];
}

/** 示例的吸附视口缩小时保留焦点与阅读位置，拖动期间不干预滚动。 */
export function mountDrawerViewportFocus(viewport: HTMLElement): () => void {
  const win = viewport.ownerDocument.defaultView;
  if (!win) return () => {};
  let frame = 0;
  let disposed = false;
  let content: Element | null = null;
  const mutation = new win.MutationObserver(schedule);
  function schedule() {
    if (disposed || frame) return;
    frame = win!.requestAnimationFrame(() => {
      frame = 0;
      if (!viewport.isConnected) return;
      if (!content) {
        content = viewport.closest(
          '[data-scope="drawer"][data-part="content"]',
        );
        if (content)
          mutation.observe(content, {
            attributes: true,
            attributeFilter: ["data-dragging", "data-state"],
          });
      }
      if (content?.hasAttribute("data-dragging")) return;
      const focused = viewport.ownerDocument.activeElement;
      if (!focused || !viewport.contains(focused)) return;
      const bounds = viewport.getBoundingClientRect();
      const target = focused.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const top = Math.max(bounds.top, 0);
      const bottom = Math.min(bounds.bottom, win!.innerHeight);
      const left = Math.max(bounds.left, 0);
      const right = Math.min(bounds.right, win!.innerWidth);
      const dy =
        target.top < top
          ? target.top - top
          : Math.max(0, target.bottom - bottom);
      const dx =
        target.left < left
          ? target.left - left
          : Math.max(0, target.right - right);
      if (dx || dy)
        viewport.scrollBy({ top: dy, left: dx, behavior: "instant" });
    });
  }
  const resize = new win.ResizeObserver(schedule);
  resize.observe(viewport);
  viewport.addEventListener("focusin", schedule);
  schedule();
  return () => {
    disposed = true;
    win.cancelAnimationFrame(frame);
    resize.disconnect();
    mutation.disconnect();
    viewport.removeEventListener("focusin", schedule);
  };
}

/** 吸附长度只改变原生可见区域；有界示例内的滚动视口保持控件可见。 */
export const drawerDirectionsCSS = `
[data-drawer-example] > [data-drawer-viewport] { position:absolute;inset:var(--lk-space-component-lg);display:grid;align-content:start;gap:var(--lk-space-component-md);overflow:auto;overscroll-behavior:contain; }
[data-drawer-viewport] :is(button,input):focus-visible { outline-offset:calc(-1 * var(--lk-control-focuswidth)); }
[data-drawer-example][data-swipe-direction=down] > [data-drawer-viewport] { top:calc(var(--lk-space-component-lg) + var(--lk-control-height-sm) + var(--lk-space-component-md));bottom:calc(var(--lk-space-component-lg) + max(0px,var(--drawer-snap-point-offset-y,0px))); }
[data-drawer-example][data-swipe-direction=up] > [data-drawer-viewport] { top:calc(var(--lk-space-component-lg) + max(0px,calc(-1 * var(--drawer-snap-point-offset-y,0px))));bottom:calc(var(--lk-space-component-lg) + var(--lk-control-height-sm)); }
[data-drawer-example][data-swipe-direction=left] > [data-drawer-viewport] { left:calc(var(--lk-space-component-lg) + max(0px,calc(-1 * var(--drawer-snap-point-offset-x,0px))));right:calc(var(--lk-space-component-lg) + var(--lk-control-height-sm)); }
[data-drawer-example][data-swipe-direction=right] > [data-drawer-viewport] { right:calc(var(--lk-space-component-lg) + max(0px,var(--drawer-snap-point-offset-x,0px)));left:calc(var(--lk-space-component-lg) + var(--lk-control-height-sm)); }
`;
