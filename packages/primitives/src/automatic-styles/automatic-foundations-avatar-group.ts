// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 shared-styles/foundations.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-foundations-avatar-group", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-foundations-avatar-group", "\n[data-scope=avatar-group][data-part=root] { display:flex; align-items:center; flex-wrap:wrap; padding-inline-start:var(--lk-space-component-sm); }\n[data-scope=avatar-group][data-part=root] > * { margin-inline-start:calc(-1 * var(--lk-space-component-sm)); outline:var(--lk-control-focuswidth) solid var(--lk-color-semantic-background); }\n[data-scope=avatar-group][data-part=overflow] { display:inline-flex; align-items:center; justify-content:center; flex:none; width:var(--lk-control-height-lg); height:var(--lk-control-height-lg); border-radius:var(--lk-radius-pill); background:var(--lk-color-semantic-muted); color:var(--lk-color-semantic-foreground); font-size:var(--lk-typography-fontsize-sm); }"),
  undefined,
);
