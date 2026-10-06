import { createPrimitive, registerPrimitive } from "./core";
const css = `
[data-scope=date-input][data-part=root] { display:grid;gap:var(--lk-space-component-sm);min-width:0; }
[data-scope=date-input][data-part=label] { font-size:var(--lk-typography-fontsize-md);font-weight:var(--lk-typography-fontweight-medium); }
[data-scope=date-input][data-part=control] { display:flex;align-items:center;gap:var(--lk-space-component-sm);flex-wrap:wrap; }
[data-scope=date-input][data-part=segment-group] { display:inline-flex;align-items:center;min-height:var(--lk-field-height);padding:0 var(--lk-space-component-sm);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-input);border-radius:var(--lk-radius-md);background:var(--lk-color-semantic-background);font-size:var(--lk-typography-fontsize-md); }
[data-scope=date-input][data-part=segment-group]:focus-within { outline:var(--lk-control-focuswidth) solid var(--lk-color-semantic-ring);outline-offset:var(--lk-space-component-xs); }
[data-scope=date-input][data-part=segment] { border-radius:var(--lk-radius-sm);padding:var(--lk-space-component-xs);font-variant-numeric:tabular-nums; }
[data-scope=date-input][data-part=segment][data-type=literal] { padding-inline:0; }
[data-scope=date-input][data-part=segment]:focus { outline:none;background:var(--lk-color-semantic-primary);color:var(--lk-color-semantic-primaryforeground); }
[data-scope=date-input][data-part=segment-group][data-disabled] { opacity:.5; }
[data-scope=date-input][data-part=segment-group][data-invalid] { border-color:var(--lk-color-semantic-destructive); }
[data-scope=swap][data-part=indicator] { align-items:center;justify-content:center;gap:var(--lk-space-component-xs); }
[data-scope=swap][data-part=indicator][data-state=open] { animation:lk-swap-in var(--lk-motion-duration-fast) var(--lk-motion-easing-entrance); }
[data-scope=swap][data-part=indicator][data-state=closed] { animation:lk-swap-out var(--lk-motion-duration-fast) var(--lk-motion-easing-exit); }
@keyframes lk-swap-in { from { opacity:0;transform:translateY(var(--lk-space-component-xs)); } to { opacity:1;transform:translateY(0); } }
@keyframes lk-swap-out { to { opacity:0;transform:translateY(calc(-1 * var(--lk-space-component-xs))); } }
[data-scope=toc][data-part=root] { min-width:0;position:relative; }
[data-scope=toc][data-part=title] { font-size:var(--lk-typography-fontsize-md);font-weight:var(--lk-typography-fontweight-semibold);margin:0 0 var(--lk-space-component-sm); }
[data-scope=toc][data-part=list] { position:relative; list-style:none;padding:0;margin:0;display:grid;gap:var(--lk-space-component-xs); }
[data-scope=toc][data-part=item] { padding-inline-start:calc(max(0,var(--depth,2) - 2) * var(--lk-space-component-md)); }
[data-scope=toc][data-part=link] { display:block;padding:var(--lk-space-component-sm);font-size:var(--lk-typography-fontsize-md);color:var(--lk-color-semantic-mutedforeground);text-decoration:none;border-radius:var(--lk-radius-md); }
[data-scope=toc][data-part=link]:hover { background:var(--lk-color-semantic-muted);color:var(--lk-color-semantic-foreground); }
[data-scope=toc][data-part=link][data-active] { background:var(--lk-color-semantic-accent);color:var(--lk-color-semantic-accentforeground); }
[data-scope=toc][data-part=link]:focus-visible { outline:var(--lk-control-focuswidth) solid var(--lk-color-semantic-ring);outline-offset:calc(-1 * var(--lk-control-focuswidth)); }
[data-scope=toc][data-part=indicator] { z-index:1;top:var(--top);left:var(--left);width:var(--lk-control-borderwidth);height:var(--height);background:var(--lk-color-semantic-foreground);pointer-events:none; }
[data-scope=drawer][data-part=backdrop] { position:fixed;inset:0;z-index:calc(var(--lk-z-index-dialog) - 1);background:var(--lk-color-semantic-overlay);opacity:calc(1 - var(--drawer-swipe-progress,0));transition:opacity var(--lk-motion-duration-base) var(--lk-motion-easing-standard); }
[data-scope=drawer][data-part=positioner] { direction:ltr;position:fixed;inset:0;display:flex;align-items:flex-end;justify-content:center;pointer-events:none;z-index:var(--lk-z-index-dialog); }
[data-scope=drawer][data-part=content] { position:relative;width:min(100%,var(--lk-control-dialogwidth-lg));max-height:85dvh;min-width:0;overflow:auto;pointer-events:auto;display:grid;align-content:start;gap:var(--lk-space-component-md);padding:var(--lk-space-component-lg);background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-lg) var(--lk-radius-lg) 0 0;box-shadow:var(--lk-shadow-xl);translate:0 0;transition:transform var(--lk-motion-duration-base) var(--lk-motion-easing-standard),translate var(--lk-motion-duration-base) var(--lk-motion-easing-standard);--lk-drawer-slide-x:0%;--lk-drawer-slide-y:100%; }
[data-scope=drawer][data-part=content][data-dragging] { user-select:none; }
[data-scope=drawer][data-part=positioner][data-swipe-direction=up] { align-items:flex-start; }
[data-scope=drawer][data-part=content][data-swipe-direction=up] { --lk-drawer-slide-y:-100%;border-radius:0 0 var(--lk-radius-lg) var(--lk-radius-lg); }
[data-scope=drawer][data-part=positioner][data-swipe-direction=left] { justify-content:flex-start;align-items:stretch; }
[data-scope=drawer][data-part=positioner][data-swipe-direction=right] { justify-content:flex-end;align-items:stretch; }
[data-scope=drawer][data-part=content]:is([data-swipe-direction=left],[data-swipe-direction=right]) { width:min(90vw,var(--lk-control-dialogwidth-sm));max-height:100dvh;border-radius:0; }
[data-scope=drawer][data-part=content][data-swipe-direction=left] { --lk-drawer-slide-x:-100%;--lk-drawer-slide-y:0%; }
[data-scope=drawer][data-part=content][data-swipe-direction=right] { --lk-drawer-slide-x:100%;--lk-drawer-slide-y:0%; }
@starting-style { [data-scope=drawer][data-part=content][data-state=open] { translate:var(--lk-drawer-slide-x) var(--lk-drawer-slide-y); } }
[data-scope=drawer][data-part=content][data-state=closed] { animation:lk-drawer-out var(--lk-motion-duration-exit) var(--lk-motion-easing-exit) forwards;pointer-events:none; }
@keyframes lk-drawer-out { to { translate:var(--lk-drawer-slide-x) var(--lk-drawer-slide-y); } }
/* 极短退出动画可能早于原生Presence监听，减弱动效直接完成退出。 */
@media(prefers-reduced-motion:reduce) { [data-lk-motion=auto] [data-scope=drawer][data-part=content]:not(:where([data-lk-motion=force],[data-lk-motion=force] *)) { animation-duration:0s !important; } }
[data-scope=drawer][data-part=grabber] { min-height:var(--lk-control-height-sm);display:flex;align-items:center;justify-content:center;cursor:grab; }
[data-scope=drawer][data-part=grabber-indicator] { width:var(--lk-control-height-lg);height:var(--lk-space-component-xs);border-radius:var(--lk-radius-pill);background:var(--lk-color-semantic-mutedforeground); }
/* 物理边缘不随文字方向镜像；手柄留在半开面板的可见自由边。 */
[data-scope=drawer][data-part=content][data-swipe-direction=up] { padding-bottom:calc(var(--lk-space-component-lg) + var(--lk-control-height-sm)); }
[data-scope=drawer][data-part=content][data-swipe-direction=up] > [data-part=grabber] { position:absolute;inset:auto 0 0; }
[data-scope=drawer][data-part=content]:is([data-swipe-direction=left],[data-swipe-direction=right]) > [data-part=grabber] { position:absolute;top:0;bottom:0;width:var(--lk-control-height-sm); }
[data-scope=drawer][data-part=content][data-swipe-direction=left] { padding-right:calc(var(--lk-space-component-lg) + var(--lk-control-height-sm)); }
[data-scope=drawer][data-part=content][data-swipe-direction=right] { padding-left:calc(var(--lk-space-component-lg) + var(--lk-control-height-sm)); }
[data-scope=drawer][data-part=content][data-swipe-direction=left] > [data-part=grabber] { right:0; }
[data-scope=drawer][data-part=content][data-swipe-direction=right] > [data-part=grabber] { left:0; }
[data-scope=drawer][data-part=content]:is([data-swipe-direction=left],[data-swipe-direction=right]) > [data-part=grabber] > [data-part=grabber-indicator] { width:var(--lk-space-component-xs);height:var(--lk-control-height-lg); }
[data-scope=drawer][data-part=title] { margin:0;font-size:var(--lk-typography-fontsize-lg);font-weight:var(--lk-typography-fontweight-semibold); }
[data-scope=drawer][data-part=description] { margin:0;font-size:var(--lk-typography-fontsize-md);color:var(--lk-color-semantic-mutedforeground); }
[data-scope=drawer][data-part=trigger] { min-height:var(--lk-field-height);padding:0 var(--lk-space-component-md);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-md);background:var(--lk-color-semantic-primary);color:var(--lk-color-semantic-primaryforeground);font-size:var(--lk-typography-fontsize-md);cursor:pointer; }
[data-scope=drawer][data-part=trigger]:hover { filter:brightness(0.95); }
[data-scope=drawer]:is([data-part=trigger],[data-part=close-trigger]):focus-visible { outline:var(--lk-control-focuswidth) solid var(--lk-color-semantic-ring);outline-offset:var(--lk-space-component-xs); }
`;
for (const name of ["date-input", "swap", "toc", "drawer"])
  registerPrimitive(
    createPrimitive(
      {
        name,
        tokens: [
          "color.semantic.foreground",
          "color.semantic.background",
          "radius.md",
        ],
        defaults: {},
      },
      (theme) => theme.mountStyles("ark-next", css),
    ),
  );
