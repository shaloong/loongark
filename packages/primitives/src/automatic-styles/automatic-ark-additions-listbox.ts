// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 ark-additions.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-ark-additions-listbox", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-ark-additions-listbox", "\n:is([data-scope=combobox],[data-scope=listbox])[data-part=empty] { padding:var(--lk-space-component-md);color:var(--lk-color-semantic-mutedforeground);font-size:var(--lk-typography-fontsize-sm); }\n[data-scope=listbox][data-part=input] { width:100%;min-height:var(--lk-control-height-md);padding:var(--lk-space-component-sm);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-input);border-radius:var(--lk-radius-md);background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground); }"),
  "listbox",
);
