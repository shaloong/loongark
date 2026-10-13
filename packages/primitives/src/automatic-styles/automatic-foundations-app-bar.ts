// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 shared-styles/foundations.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-foundations-app-bar", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-foundations-app-bar", "\n:is([data-scope=stack],[data-scope=grid],[data-scope=app-bar]) { --lk-layout-gap:var(--lk-space-component-md); }\n[data-scope=app-bar][data-part=root] { width:100%; background:var(--lk-color-semantic-background); color:var(--lk-color-semantic-foreground); border-bottom:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); }\n[data-scope=app-bar][data-part=toolbar] { display:flex; align-items:center; flex-wrap:wrap; gap:var(--lk-layout-gap,var(--lk-space-component-md)); min-height:var(--lk-space-layout-section); padding:var(--lk-space-component-sm) var(--lk-space-component-md); }"),
  undefined,
);
