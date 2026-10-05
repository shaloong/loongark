import { createPrimitive, registerPrimitive } from "./core";
const css = `
[data-scope=data-table][data-part=root] { display:grid;gap:var(--lk-space-component-md);min-width:0; }
[data-scope=data-table] > input { width:min(100%,320px);height:var(--lk-control-height-md);padding:0 var(--lk-space-component-compact);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-input);border-radius:var(--lk-radius-md);background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground);font:inherit; }
[data-scope=data-table] [data-scope=table][data-part=root] { border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-lg);overscroll-behavior-inline:contain; }
[data-scope=data-table] [data-scope=table][data-part=root] { --lk-data-table-pin-offset:0px;--lk-data-table-viewport-width:100%; }
[data-scope=data-table] table:has(th[data-pinned]) { border-collapse:separate;border-spacing:0; }
[data-scope=data-table] table:has(th[data-pinned]) :is(th,td) { border-bottom:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); }
[data-scope=data-table] table:has(th[data-pinned]) tbody tr:last-child td { border-bottom:0; }
[data-scope=data-table] [data-scope=table][data-part=root]:has(th[data-pinned]) { isolation:isolate; }
[data-scope=data-table] [data-pinned] { position:sticky;background:var(--lk-color-semantic-background);z-index:1; }
[data-scope=data-table] [data-pinned=start] { inset-inline-start:var(--lk-data-table-pin-offset); }
[data-scope=data-table] [data-pinned=end] { inset-inline-end:var(--lk-data-table-pin-offset); }
[data-scope=data-table] [data-pin-edge=start] { box-shadow:inset calc(-1 * var(--lk-control-borderwidth)) 0 var(--lk-color-semantic-border); }
[data-scope=data-table] [data-pin-edge=end] { box-shadow:inset var(--lk-control-borderwidth) 0 var(--lk-color-semantic-border); }
[data-scope=data-table] tbody tr:is(:hover,[data-selected]) [data-pinned] { background:var(--lk-color-semantic-muted); }
[data-scope=data-table] [data-pin-overflow=true] [data-pinned] { position:static;box-shadow:none; }
[data-scope=data-table] table:has(th[data-pinned]) [data-part=empty] > span { display:block;position:sticky;inset-inline-start:var(--lk-space-component-sm);width:calc(var(--lk-data-table-viewport-width) - var(--lk-space-component-sm) * 2);max-width:100%;text-align:center; }
[data-scope=data-table] table { width:100%;border-collapse:collapse; }
[data-scope=data-table] tr { border-bottom:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); }
[data-scope=data-table] tbody tr:last-child { border-bottom:0; }
[data-scope=data-table] tbody tr:hover,[data-scope=data-table] tr[data-selected] { background:var(--lk-color-semantic-muted); }
[data-scope=data-table] :is(th,td) { padding:var(--lk-space-component-sm);text-align:start;font-size:var(--lk-typography-fontsize-md);white-space:nowrap; }
[data-scope=data-table] :is(th,td):first-child { width:calc(var(--lk-control-height-sm) + var(--lk-space-component-sm) * 2); }
[data-scope=data-table] th { font-weight:var(--lk-typography-fontweight-semibold);height:var(--lk-control-height-lg); }
[data-scope=data-table] th button { min-height:var(--lk-control-height-sm);margin-inline:calc(-1 * var(--lk-space-component-sm));padding:0 var(--lk-space-component-sm);border:0;border-radius:var(--lk-radius-sm);background:transparent;color:inherit;font:inherit;font-weight:inherit;cursor:pointer; }
[data-scope=data-table] th button:hover { background:var(--lk-color-semantic-muted); }
[data-scope=data-table] [data-part=selection] { display:inline-flex;align-items:center;justify-content:center;width:var(--lk-control-height-sm);height:var(--lk-control-height-sm);cursor:pointer; }
[data-scope=data-table] input[type=checkbox] { margin:0;width:var(--lk-control-icon-md);height:var(--lk-control-icon-md);accent-color:var(--lk-color-semantic-primary);cursor:inherit; }
[data-scope=data-table] [data-part=selection]:has(input:disabled) { cursor:not-allowed; }
[data-scope=data-table] [data-part=empty] { height:calc(var(--lk-control-height-lg) * 3);text-align:center;color:var(--lk-color-semantic-mutedforeground); }
[data-scope=data-table] footer { display:flex;align-items:center;justify-content:flex-end;gap:var(--lk-space-component-sm);flex-wrap:wrap; }
[data-scope=data-table] footer span { flex:1 0 auto;max-width:100%;min-width:0;color:var(--lk-color-semantic-mutedforeground);font-size:var(--lk-typography-fontsize-sm);overflow-wrap:anywhere; }
[data-scope=data-table] :is(footer,[data-part=error]) button { min-height:var(--lk-control-height-sm);padding:var(--lk-space-component-xs) var(--lk-space-component-md);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-md);color:var(--lk-color-semantic-foreground);background:var(--lk-color-semantic-background);font:inherit;cursor:pointer; }
[data-scope=data-table] :is(footer,[data-part=error]) button:hover:not(:disabled) { background:var(--lk-color-semantic-muted); }
[data-scope=data-table] :is(footer,[data-part=error]) button:disabled { opacity:.5;cursor:not-allowed; }
[data-scope=data-table] [data-part=loading] { margin:0;font-size:var(--lk-typography-fontsize-sm);color:var(--lk-color-semantic-mutedforeground); }
[data-scope=data-table] [data-part=error] { display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:var(--lk-space-component-sm);padding:var(--lk-space-component-compact);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-destructive);border-radius:var(--lk-radius-md);font-size:var(--lk-typography-fontsize-sm);color:var(--lk-color-semantic-destructive);overflow-wrap:anywhere; }
[data-scope=data-table] input:disabled { cursor:not-allowed;opacity:.5; }
[data-scope=data-table] :is(th,td)[data-align=center] { text-align:center; }
[data-scope=data-table] :is(th,td)[data-align=end] { text-align:end; }
[data-scope=data-table] th button { display:inline-flex;align-items:center;gap:var(--lk-space-component-xs); }
[data-scope=data-table] [data-part=cell-trigger] { display:flex;align-items:center;justify-content:flex-start;gap:var(--lk-space-component-sm);width:100%;min-height:var(--lk-control-height-sm);padding:0;border:0;border-radius:var(--lk-radius-sm);background:transparent;color:inherit;font:inherit;text-align:inherit;cursor:pointer; }
[data-scope=data-table] [data-align=center] [data-part=cell-trigger] { justify-content:center; }
[data-scope=data-table] [data-align=end] [data-part=cell-trigger] { justify-content:flex-end; }
[data-scope=data-table] [data-align=end] [data-part=cell-trigger] svg { order:-1; }
[data-scope=data-table] [data-part=cell-trigger] svg { color:var(--lk-color-semantic-mutedforeground); }
[data-scope=data-table] [data-part=cell-trigger]:hover:not(:disabled) { background:var(--lk-color-semantic-muted); }
[data-scope=data-table] [data-part=cell-trigger]:disabled { cursor:not-allowed;opacity:.5; }
[data-scope=data-table] [data-part=cell-editor] { display:grid;gap:var(--lk-space-component-sm);min-width:calc(var(--lk-control-height-md) * 4);max-width:calc(var(--lk-data-table-viewport-width) - var(--lk-space-component-sm) * 2);scroll-margin-inline:var(--lk-space-component-sm); }
[data-scope=data-table] [data-align=end] [data-part=cell-editor] { margin-inline-start:auto; }
[data-scope=data-table] [data-align=center] [data-part=cell-editor] { margin-inline:auto; }
[data-scope=data-table] [data-part=cell-input] { box-sizing:border-box;width:100%;min-width:0;height:var(--lk-control-height-sm);padding:0 var(--lk-space-component-sm);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-input);border-radius:var(--lk-radius-md);background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground);font:inherit;text-align:inherit; }
[data-scope=data-table] [data-part=cell-input][type=number] { text-align:left; }
[data-scope=data-table]:dir(rtl) [data-part=cell-input][type=number] { text-align:right; }
[data-scope=data-table] [data-align=end] [data-part=cell-input][type=number] { text-align:right; }
[data-scope=data-table]:dir(rtl) [data-align=end] [data-part=cell-input][type=number] { text-align:left; }
[data-scope=data-table] [data-align=center] [data-part=cell-input][type=number] { text-align:center; }
[data-scope=data-table] [data-part=cell-input][aria-invalid=true] { border-color:var(--lk-color-semantic-destructive); }
[data-scope=data-table] [data-part=cell-actions] { display:flex;align-items:center;justify-content:flex-end;gap:var(--lk-space-component-sm); }
[data-scope=data-table] [data-part=cell-actions] button { min-height:var(--lk-control-height-sm);padding:var(--lk-space-component-xs) var(--lk-space-component-sm);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-md);background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground);font:inherit;cursor:pointer; }
[data-scope=data-table] button[data-part=cell-save] { background:var(--lk-color-semantic-foreground);color:var(--lk-color-semantic-background);border-color:var(--lk-color-semantic-foreground); }
[data-scope=data-table] [data-part=cell-save]:disabled { opacity:.5;cursor:not-allowed; }
[data-scope=data-table] :is([data-part=cell-error],[data-part=cell-status]) { display:block;max-width:28ch;white-space:normal;overflow-wrap:anywhere;font-size:var(--lk-typography-fontsize-sm); }
[data-scope=data-table] [data-part=cell-error] { color:var(--lk-color-semantic-destructive); }
[data-scope=data-table] [data-part=cell-status] { color:var(--lk-color-semantic-mutedforeground); }
@media(max-width:480px) { [data-scope=data-table] footer span { flex-basis:100%; } }
`;
registerPrimitive(
  createPrimitive(
    {
      name: "data-table",
      tokens: [
        "color.semantic.background",
        "color.semantic.foreground",
        "radius.md",
      ],
      defaults: {},
    },
    (theme) => theme.mountStyles("data-table", css),
  ),
);
