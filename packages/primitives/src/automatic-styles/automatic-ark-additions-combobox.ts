// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 ark-additions.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-ark-additions-combobox", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-ark-additions-combobox", "\n:is([data-scope=combobox],[data-scope=listbox])[data-part=empty] { padding:var(--lk-space-component-md);color:var(--lk-color-semantic-mutedforeground);font-size:var(--lk-typography-fontsize-sm); }"),
  "combobox",
);
