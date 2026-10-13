// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 extended.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-extended-floating-panel", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-extended-floating-panel", "\n[data-scope=floating-panel] [data-part=content] { background:var(--lk-color-semantic-background); color:var(--lk-color-semantic-foreground); border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); border-radius:var(--lk-radius-lg); box-shadow:var(--lk-shadow-xl); overflow:hidden; }\n[data-scope=floating-panel] [data-part=header] { display:flex; align-items:center; justify-content:space-between; padding:var(--lk-space-component-compact) var(--lk-space-component-md); border-bottom:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); }\n[data-scope=floating-panel] [data-part=body] { padding:var(--lk-space-component-md); }"),
  "floating-panel",
);
