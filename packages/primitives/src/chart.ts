import { createPrimitive, registerPrimitive } from "./core";
const css = `
[data-scope=chart] { min-width:0;max-width:100%;flex-shrink:0;color:var(--lk-color-semantic-foreground); }
[data-scope=chart] > svg { display:block; }
[data-scope=chart] [data-part=bar] { rx:var(--lk-radius-sm); }
[data-scope=chart] [data-part=legend] { list-style:none;display:flex;flex-wrap:wrap;gap:var(--lk-space-component-sm) var(--lk-space-component-md);margin:var(--lk-space-component-sm) 0 0;padding:0; }
[data-scope=chart] [data-part=legend-item] { display:flex;align-items:center;gap:var(--lk-space-component-sm);min-width:0;max-width:100%;font-size:var(--lk-typography-fontsize-sm);line-height:var(--lk-typography-lineheight-base); }
[data-scope=chart] [data-part=legend-item] svg { width:var(--lk-space-component-lg);height:var(--lk-control-icon-sm);flex-shrink:0; }
[data-scope=chart] [data-part=legend-item] span { overflow-wrap:anywhere; }
[data-scope=chart] [data-part=legend-toggle] { display:flex;align-items:center;gap:var(--lk-space-component-sm);min-width:0;max-width:100%;min-height:var(--lk-control-height-md);padding:var(--lk-space-component-xs) var(--lk-space-component-sm);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-md);background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground);font:inherit;text-align:start;cursor:pointer; }
[data-scope=chart] [data-part=legend-toggle][aria-pressed=true] { background:var(--lk-color-semantic-muted);border-color:var(--lk-color-semantic-foreground); }
[data-scope=chart] [data-part=legend-toggle]:hover:not(:disabled) { background:var(--lk-color-semantic-accent); }
[data-scope=chart] [data-part=legend-toggle]:disabled { opacity:.5;cursor:not-allowed; }
[data-scope=chart] [data-part=data-table] { margin-top:var(--lk-space-component-md);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-lg); }
[data-scope=chart] [data-part=data-table] summary { min-height:var(--lk-control-height-md);padding:var(--lk-space-component-sm) var(--lk-space-component-compact);font-size:var(--lk-typography-fontsize-sm);cursor:pointer;overflow-wrap:anywhere; }
[data-scope=chart] [data-part=data-region] { max-width:100%;overflow:auto;overscroll-behavior-inline:contain; }
[data-scope=chart] [data-part=data-table] table { width:100%;border-collapse:collapse;font-size:var(--lk-typography-fontsize-sm); }
[data-scope=chart] [data-part=data-table] :is(th,td) { padding:var(--lk-space-component-sm) var(--lk-space-component-compact);text-align:start;white-space:nowrap;border-top:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); }
[data-scope=chart] [data-part=data-table] th { font-weight:var(--lk-typography-fontweight-medium); }
[data-scope=chart] [data-part=data-table] caption { padding:var(--lk-space-component-sm) var(--lk-space-component-compact);text-align:start;color:var(--lk-color-semantic-mutedforeground); }

`;
registerPrimitive(
  createPrimitive(
    {
      name: "chart",
      tokens: ["color.semantic.foreground", "color.vi.skyBlue"],
      defaults: {},
    },
    (theme) => theme.mountStyles("chart", css),
  ),
);
