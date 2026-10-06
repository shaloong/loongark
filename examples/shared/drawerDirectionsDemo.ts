export const drawerDirections = ["down", "up", "start", "end"] as const;
export type DrawerDirection = (typeof drawerDirections)[number];
export type DrawerTextDirection = "ltr" | "rtl";
export function drawerSnapPoints(direction: DrawerDirection) {
  return direction === "up" || direction === "down"
    ? ["240px", "480px"]
    : ["256px", "320px"];
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
