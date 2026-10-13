// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 shared-styles/foundations.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-foundations-grid", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-foundations-grid", "\n:is([data-scope=stack],[data-scope=grid],[data-scope=app-bar]) { --lk-layout-gap:var(--lk-space-component-md); }\n:is([data-scope=box],[data-scope=stack],[data-scope=container],[data-scope=grid]) { --lk-layout-padding:0px; }\n[data-scope=grid] { --lk-grid-columns:2; }\n:is([data-scope=paper],[data-scope=box],[data-scope=stack],[data-scope=container],[data-scope=grid]) { min-width:0; max-width:100%; padding:var(--lk-layout-padding,0); }\n[data-scope=grid] { display:grid; width:100%; grid-template-columns:repeat(var(--lk-grid-columns,2),minmax(0,1fr)); gap:var(--lk-layout-gap,var(--lk-space-component-md)); }\n[data-scope=grid] > * { min-width:0; }\n@media(max-width:480px) { [data-scope=grid] { grid-template-columns:minmax(0,1fr); } }"),
  undefined,
);
