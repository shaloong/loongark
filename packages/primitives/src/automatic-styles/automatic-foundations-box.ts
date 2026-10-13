// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 shared-styles/foundations.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-foundations-box", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-foundations-box", "\n:is([data-scope=box],[data-scope=stack],[data-scope=container],[data-scope=grid]) { --lk-layout-padding:0px; }\n:is([data-scope=paper],[data-scope=box],[data-scope=stack],[data-scope=container],[data-scope=grid]) { min-width:0; max-width:100%; padding:var(--lk-layout-padding,0); }"),
  undefined,
);
