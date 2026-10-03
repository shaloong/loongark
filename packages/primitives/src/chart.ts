import { createPrimitive, registerPrimitive } from "./core";
const css = `
[data-scope=chart] { min-width:0;flex-shrink:0;color:var(--lk-color-semantic-foreground); }
[data-scope=chart] > svg { display:block; }
[data-scope=chart] [data-part=bar] { rx:var(--lk-radius-sm); }
[data-scope=chart] [data-part=legend] { list-style:none;display:flex;flex-wrap:wrap;gap:var(--lk-space-component-sm) var(--lk-space-component-md);margin:var(--lk-space-component-sm) 0 0;padding:0; }
[data-scope=chart] [data-part=legend-item] { display:flex;align-items:center;gap:var(--lk-space-component-sm);min-width:0;max-width:100%;font-size:var(--lk-typography-fontsize-sm);line-height:var(--lk-typography-lineheight-base); }
[data-scope=chart] [data-part=legend-item] svg { width:var(--lk-space-component-lg);height:var(--lk-control-icon-sm);flex-shrink:0; }
[data-scope=chart] [data-part=legend-item] span { overflow-wrap:anywhere; }
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
