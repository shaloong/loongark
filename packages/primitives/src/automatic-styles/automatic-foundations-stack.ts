// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 shared-styles/foundations.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-foundations-stack", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-foundations-stack", "\n:is([data-scope=stack],[data-scope=grid],[data-scope=app-bar]) { --lk-layout-gap:var(--lk-space-component-md); }\n:is([data-scope=box],[data-scope=stack],[data-scope=container],[data-scope=grid]) { --lk-layout-padding:0px; }\n:is([data-scope=paper],[data-scope=box],[data-scope=stack],[data-scope=container],[data-scope=grid]) { min-width:0; max-width:100%; padding:var(--lk-layout-padding,0); }\n[data-scope=stack] { display:flex; gap:var(--lk-layout-gap,var(--lk-space-component-md)); flex-wrap:wrap; }\n[data-scope=stack][data-orientation=vertical] { flex-direction:column; }\n[data-scope=stack][data-orientation=horizontal] { flex-direction:row; align-items:center; }"),
  undefined,
);
