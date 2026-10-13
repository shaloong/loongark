// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 shared-styles/selection-styles.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-selection-textarea", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-selection-textarea", "\n[data-scope=textarea][data-autosize=true] { min-height:0;resize:none; }"),
  undefined,
);
