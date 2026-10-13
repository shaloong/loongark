// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 extended.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-extended-marquee", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-extended-marquee", "\n[data-scope=marquee][data-part=root] { min-width:0;max-width:100%; }\n[data-scope=marquee] [data-part=viewport] { min-width:0;max-width:100%;overflow:hidden; }\n[data-scope=marquee] [data-part=item] { padding:var(--lk-space-component-sm) var(--lk-space-component-md); }"),
  "marquee",
);
