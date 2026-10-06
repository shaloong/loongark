import { createPrimitive, registerPrimitive } from "./core";

const css = `
[data-scope=image-cropper][data-part=root] { min-width:0;width:100%;container-type:inline-size;display:flex;flex-direction:column;gap:var(--lk-space-component-md); }
[data-scope=image-cropper][data-part=viewport] { flex-shrink:0;width:100%;height:min(320px,50cqw);aspect-ratio:2;max-height:320px;overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center;border-radius:var(--lk-radius-lg);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);background:var(--lk-color-semantic-muted);touch-action:none; }
[data-scope=image-cropper][data-part=image] { display:block;max-width:100%;max-height:100%;width:auto;height:auto; }
[data-scope=image-cropper][data-part=selection] { border:var(--lk-control-borderwidth) solid var(--lk-color-white);box-shadow:0 0 0 9999px var(--lk-color-semantic-overlay); }
[data-scope=image-cropper][data-part=selection]:focus-visible { outline:var(--lk-control-focuswidth) solid var(--lk-color-semantic-ring);outline-offset:var(--lk-space-component-xs); }
[data-scope=image-cropper][data-part=handle] { width:var(--lk-control-icon-sm);height:var(--lk-control-icon-sm);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-sm);background:var(--lk-color-white); }
[data-scope=image-cropper][data-part=handle]:is([data-position=n],[data-position=s],[data-position=e],[data-position=w]) { border:0;background:transparent; }
[data-scope=image-cropper][data-part=handle]:is([data-position=n],[data-position=s],[data-position=e],[data-position=w])::after { content:"";position:absolute;left:50%;top:50%;translate:-50% -50%;width:var(--lk-control-icon-sm);height:var(--lk-control-icon-sm);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-sm);background:var(--lk-color-white);pointer-events:none; }
[data-scope=image-cropper][data-part=grid] { border-color:var(--lk-color-white);opacity:0.5; }
[data-scope=image-cropper][data-part=grid][data-axis=horizontal] { border-block:var(--lk-control-borderwidth) solid var(--lk-color-white); }
[data-scope=image-cropper][data-part=grid][data-axis=vertical] { border-inline:var(--lk-control-borderwidth) solid var(--lk-color-white); }
[data-scope=json-tree-view][data-part=root] { width:100%;min-width:0;border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-lg);background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground);padding:var(--lk-space-component-sm);font-size:var(--lk-typography-fontsize-sm); }
[data-scope=json-tree-view][data-part=tree] { overflow:auto;max-height:480px; }
[data-scope=json-tree-view]:is([data-part=branch-control],[data-part=item]) { display:flex;align-items:center;min-height:var(--lk-control-height-sm);padding:var(--lk-space-component-xs) var(--lk-space-component-sm);gap:var(--lk-space-component-sm);border-radius:var(--lk-radius-sm);white-space:nowrap; }
[data-scope=json-tree-view]:is([data-part=branch-control],[data-part=item]):hover { background:var(--lk-color-semantic-muted); }
[data-scope=json-tree-view][data-selected] { background:var(--lk-color-semantic-accent); }
[data-scope=json-tree-view]:is([data-part=branch-control],[data-part=item]):focus-visible { outline:var(--lk-control-focuswidth) solid var(--lk-color-semantic-ring);outline-offset:calc(-1 * var(--lk-control-focuswidth)); }
[data-scope=json-tree-view][data-part=branch-content] { padding-inline-start:var(--lk-space-component-lg); }
[data-scope=json-tree-view][data-part=branch-indicator] { width:var(--lk-control-icon-sm);height:var(--lk-control-icon-sm);display:inline-flex;align-items:center;justify-content:center;transform:rotate(0deg); }
[data-scope=json-tree-view][data-part=branch-indicator][data-state=open] { transform:rotate(90deg); }
[data-scope=json-tree-view] [data-type]:not([data-root]) { color:var(--lk-color-semantic-mutedforeground); }
:is([data-scope=combobox],[data-scope=listbox])[data-part=empty] { padding:var(--lk-space-component-md);color:var(--lk-color-semantic-mutedforeground);font-size:var(--lk-typography-fontsize-sm); }
[data-scope=listbox][data-part=input] { width:100%;min-height:var(--lk-control-height-md);padding:var(--lk-space-component-sm);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-input);border-radius:var(--lk-radius-md);background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground); }
mark { background:var(--lk-color-semantic-accent);color:var(--lk-color-semantic-accentforeground);border-radius:var(--lk-radius-sm); }
`;
for (const name of ["image-cropper", "json-tree-view", "highlight"])
  registerPrimitive(
    createPrimitive(
      {
        name,
        tokens: [
          "color.semantic.foreground",
          "color.semantic.background",
          "radius.lg",
        ],
        defaults: {},
      },
      (theme) => theme.mountStyles("ark-additions", css),
    ),
  );
