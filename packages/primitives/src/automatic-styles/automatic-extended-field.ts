// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 extended.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-extended-field", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-extended-field", "\n:is([data-scope=field],[data-scope=fieldset])[data-part=root] { display:grid; gap:var(--lk-control-fieldgap); }\n:is([data-scope=field],[data-scope=fieldset]) :is([data-part=label],[data-part=legend]) { font-weight:600; }\n[data-scope=field]:is([data-part=input],[data-part=textarea],[data-part=select]) { min-height:var(--lk-control-height-md); width:100%; padding:var(--lk-space-component-sm) var(--lk-space-component-compact); border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-input); border-radius:var(--lk-radius-md); background:var(--lk-color-semantic-background); color:var(--lk-color-semantic-foreground); box-shadow:var(--lk-shadow-sm); }\n:is([data-scope=field],[data-scope=fieldset]) [data-part=error-text] { color:var(--lk-color-semantic-destructive); font-size:var(--lk-typography-fontsize-xs); }\n:is([data-scope=field],[data-scope=fieldset]) [data-part=helper-text] { color:var(--lk-color-semantic-mutedforeground); font-size:var(--lk-typography-fontsize-xs); }\n[data-scope=field] [data-invalid] { border-color:var(--lk-color-semantic-destructive); }"),
  "field",
);
