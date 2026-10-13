// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 shared-styles/foundations.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-foundations-paper", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-foundations-paper", "\n[data-scope=paper] { --lk-layout-padding:var(--lk-space-component-md); }\n:is([data-scope=paper],[data-scope=box],[data-scope=stack],[data-scope=container],[data-scope=grid]) { min-width:0; max-width:100%; padding:var(--lk-layout-padding,0); }\n[data-scope=paper] { border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); border-radius:var(--lk-radius-lg); background:var(--lk-color-semantic-card); color:var(--lk-color-semantic-cardforeground); padding:var(--lk-layout-padding,var(--lk-space-component-md)); box-shadow:var(--lk-shadow-sm); }\n[data-scope=paper][data-variant=muted] { background:var(--lk-color-semantic-muted); color:var(--lk-color-semantic-foreground); box-shadow:none; }"),
  undefined,
);
