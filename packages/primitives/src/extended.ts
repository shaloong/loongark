import { createPrimitive, registerPrimitive } from "./core";
export const extendedComponentNames = [
  "field",
  "fieldset",
  "angle-slider",
  "floating-panel",
  "marquee",
  "qr-code",
  "signature-pad",
  "timer",
  "tour",
] as const;
const css =
  "\n[data-scope=field], [data-scope=fieldset] { display:grid; gap:var(--lk-control-fieldgap); }\n:is([data-scope=field],[data-scope=fieldset]) :is([data-part=label],[data-part=legend]) { font-weight:600; }\n[data-scope=field] :is([data-part=input],[data-part=textarea],[data-part=select]) { min-height:var(--lk-control-height-md); width:100%; padding:var(--lk-space-component-sm) var(--lk-space-component-compact); border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-input); border-radius:var(--lk-radius-md); background:var(--lk-color-semantic-background); color:var(--lk-color-semantic-foreground); box-shadow:var(--lk-shadow-sm); }\n:is([data-scope=field],[data-scope=fieldset]) [data-part=error-text] { color:var(--lk-color-semantic-destructive); font-size:var(--lk-typography-fontsize-xs); }\n:is([data-scope=field],[data-scope=fieldset]) [data-part=helper-text] { color:var(--lk-color-semantic-mutedforeground); font-size:var(--lk-typography-fontsize-xs); }\n[data-scope=field] [data-invalid] { border-color:var(--lk-color-semantic-destructive); }\n[data-scope=fieldset][data-part=root] { border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); border-radius:var(--lk-radius-lg); padding:var(--lk-space-component-md); }\n[data-scope=angle-slider] [data-part=control] { width:120px; height:120px; border-radius:50%; background:var(--lk-color-semantic-muted); border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); }\n[data-scope=angle-slider] [data-part=thumb] { width:var(--lk-space-component-md); height:var(--lk-space-component-md); border-radius:50%; background:var(--lk-color-semantic-primary); }\n[data-scope=floating-panel] [data-part=content] { background:var(--lk-color-semantic-background); color:var(--lk-color-semantic-foreground); border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); border-radius:var(--lk-radius-lg); box-shadow:var(--lk-shadow-xl); overflow:hidden; }\n[data-scope=floating-panel] [data-part=header] { display:flex; align-items:center; justify-content:space-between; padding:var(--lk-space-component-compact) var(--lk-space-component-md); border-bottom:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); }\n[data-scope=floating-panel] [data-part=body] { padding:var(--lk-space-component-md); }\n[data-scope=marquee] [data-part=viewport] { overflow:hidden; }\n[data-scope=marquee] [data-part=item] { padding:var(--lk-space-component-sm) var(--lk-space-component-md); }\n[data-scope=qr-code] [data-part=frame] { width:160px; height:160px; background:var(--lk-color-white); color:var(--lk-color-vi-inknight); border-radius:var(--lk-radius-md); padding:var(--lk-space-component-sm); }\n[data-scope=signature-pad] [data-part=control] { min-height:160px; border:var(--lk-control-borderwidth) dashed var(--lk-color-semantic-border); border-radius:var(--lk-radius-md); background:var(--lk-color-semantic-background); }\n[data-scope=signature-pad] [data-part=segment] { stroke:var(--lk-color-semantic-foreground); }\n[data-scope=signature-pad] [data-part=guide] { stroke:var(--lk-color-semantic-border); }\n[data-scope=timer] [data-part=area], [data-scope=timer] [data-part=control] { display:flex; align-items:center; gap:var(--lk-space-component-sm); }\n[data-scope=timer] [data-part=item] { font-variant-numeric:tabular-nums; font-size:var(--lk-space-component-lg); font-weight:600; }\n[data-scope=tour] [data-part=content] { border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); border-radius:var(--lk-radius-lg); background:var(--lk-color-semantic-popover); color:var(--lk-color-semantic-popoverforeground); padding:var(--lk-space-component-lg); box-shadow:var(--lk-shadow-xl); max-width:calc(100vw - var(--lk-space-component-xl)); }\n[data-scope=tour] [data-part=backdrop] { background:var(--lk-color-semantic-overlay); }\n[data-scope=tour] [data-part=title] { font-weight:600; font-size:var(--lk-control-icon-lg); }\n[data-scope=tour] [data-part=description] { color:var(--lk-color-semantic-mutedforeground); }\n";
for (const name of extendedComponentNames)
  registerPrimitive(
    createPrimitive(
      {
        name,
        tokens: [
          "color.semantic.background",
          "color.semantic.foreground",
          "radius.md",
        ],
        defaults: {},
      },
      (theme) => theme.mountStyles("extended", css),
    ),
  );
