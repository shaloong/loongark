import { createPrimitive, registerPrimitive } from "./core";
const css = `
[data-scope="virtual-grid"],[data-scope="virtual-masonry"]{position:relative;overflow:auto;overflow-anchor:none;max-width:100%;min-width:0;border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-md);background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground)}
[data-scope="virtual-grid"] > [data-part="canvas"],[data-scope="virtual-masonry"] > [data-part="canvas"]{position:relative}
[data-scope="virtual-grid"] > [data-part="canvas"] > [data-part="row"]{position:absolute;inset-inline-start:0}
[data-scope="virtual-grid"] > [data-part="canvas"] > [data-part="row"] > [data-part="cell"]{position:absolute;top:0;box-sizing:border-box;display:flex;align-items:center;gap:var(--lk-space-component-sm);padding:var(--lk-space-component-sm) var(--lk-space-component-md);border-inline-end:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-bottom:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);overflow:auto}
[data-scope="virtual-grid"] > [data-part="canvas"] > [data-part="row"] > [data-part="cell"]:focus-visible{outline:var(--lk-control-focuswidth) solid var(--lk-color-semantic-ring);outline-offset:-2px;z-index:1}
[data-scope="virtual-masonry"] > [data-part="canvas"] > [data-part="item"]{position:absolute;box-sizing:border-box}
`;

registerPrimitive(
  createPrimitive(
    {
      name: "VirtualLayout",
      tokens: [
        "color.semantic.border",
        "color.semantic.background",
        "color.semantic.foreground",
        "color.semantic.ring",
        "radius.md",
        "space.component.sm",
        "space.component.md",
      ],
      defaults: {},
    },
    (theme) => theme.mountStyles("virtual-layout", css),
  ),
);
