import { createPrimitive, registerPrimitive } from "./core";
const css = `
[data-scope=data-table][data-part=root] { display:grid;gap:var(--lk-space-component-md);min-width:0; }
[data-scope=data-table] > input { width:min(100%,320px);height:var(--lk-control-height-md);padding:0 var(--lk-space-component-compact);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-input);border-radius:var(--lk-radius-md);background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground);font:inherit; }
[data-scope=data-table] [data-scope=table][data-part=root] { border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-lg);overscroll-behavior-inline:contain; }
[data-scope=data-table] table { width:100%;border-collapse:collapse; }
[data-scope=data-table] tr { border-bottom:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); }
[data-scope=data-table] tbody tr:last-child { border-bottom:0; }
[data-scope=data-table] tbody tr:hover,[data-scope=data-table] tr[data-selected] { background:var(--lk-color-semantic-muted); }
[data-scope=data-table] :is(th,td) { padding:var(--lk-space-component-sm);text-align:start;font-size:var(--lk-typography-fontsize-md);white-space:nowrap; }
[data-scope=data-table] :is(th,td):first-child { width:calc(var(--lk-control-height-sm) + var(--lk-space-component-sm) * 2); }
[data-scope=data-table] th { font-weight:var(--lk-typography-fontweight-semibold);height:var(--lk-control-height-lg); }
[data-scope=data-table] th button { min-height:var(--lk-control-height-sm);margin-inline:calc(-1 * var(--lk-space-component-sm));padding:0 var(--lk-space-component-sm);border:0;border-radius:var(--lk-radius-sm);background:transparent;color:inherit;font:inherit;font-weight:inherit;cursor:pointer; }
[data-scope=data-table] th button:hover { background:var(--lk-color-semantic-muted); }
[data-scope=data-table] th[aria-sort=ascending] button::after { content:' ↑'; }
[data-scope=data-table] th[aria-sort=descending] button::after { content:' ↓'; }
[data-scope=data-table] [data-part=selection] { display:inline-flex;align-items:center;justify-content:center;width:var(--lk-control-height-sm);height:var(--lk-control-height-sm);cursor:pointer; }
[data-scope=data-table] input[type=checkbox] { margin:0;width:var(--lk-control-icon-md);height:var(--lk-control-icon-md);accent-color:var(--lk-color-semantic-primary);cursor:inherit; }
[data-scope=data-table] [data-part=selection]:has(input:disabled) { cursor:not-allowed; }
[data-scope=data-table] [data-part=empty] { height:calc(var(--lk-control-height-lg) * 3);text-align:center;color:var(--lk-color-semantic-mutedforeground); }
[data-scope=data-table] footer { display:flex;align-items:center;justify-content:flex-end;gap:var(--lk-space-component-sm);flex-wrap:wrap; }
[data-scope=data-table] footer span { flex:1 0 auto;max-width:100%;min-width:0;color:var(--lk-color-semantic-mutedforeground);font-size:var(--lk-typography-fontsize-sm);overflow-wrap:anywhere; }
[data-scope=data-table] footer button { min-height:var(--lk-control-height-sm);padding:var(--lk-space-component-xs) var(--lk-space-component-md);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-md);color:var(--lk-color-semantic-foreground);background:var(--lk-color-semantic-background);font:inherit;cursor:pointer; }
[data-scope=data-table] footer button:hover:not(:disabled) { background:var(--lk-color-semantic-muted); }
[data-scope=data-table] footer button:disabled { opacity:.5;cursor:not-allowed; }
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
