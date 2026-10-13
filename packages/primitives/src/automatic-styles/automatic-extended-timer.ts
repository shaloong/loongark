// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 extended.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-extended-timer", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-extended-timer", "\n[data-scope=timer] [data-part=area], [data-scope=timer] [data-part=control] { display:flex; align-items:center; gap:var(--lk-space-component-sm); }\n[data-scope=timer] [data-part=item] { font-variant-numeric:tabular-nums; font-size:var(--lk-space-component-lg); font-weight:600; }"),
  "timer",
);
