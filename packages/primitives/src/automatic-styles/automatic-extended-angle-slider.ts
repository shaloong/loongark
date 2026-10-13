// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 extended.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-extended-angle-slider", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-extended-angle-slider", "\n[data-scope=angle-slider][data-part=root] { display:grid; gap:var(--lk-control-fieldgap); width:fit-content; }\n[data-scope=angle-slider] [data-part=control] { position:relative; width:120px; height:120px; border-radius:50%; background:var(--lk-color-semantic-muted); border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); }\n[data-scope=angle-slider] [data-part=thumb] { position:absolute; left:50%; top:50%; translate:-50% -50%; transform:translateY(calc(-60px + var(--lk-space-component-md) / 2 + var(--lk-control-borderwidth))); width:var(--lk-space-component-md); height:var(--lk-space-component-md); border-radius:50%; background:var(--lk-color-semantic-primary); }"),
  "angle-slider",
);
