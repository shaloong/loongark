// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 extended.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-extended-fieldset", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-extended-fieldset", "\n:is([data-scope=field],[data-scope=fieldset])[data-part=root] { display:grid; gap:var(--lk-control-fieldgap); }\n:is([data-scope=field],[data-scope=fieldset]) :is([data-part=label],[data-part=legend]) { font-weight:600; }\n:is([data-scope=field],[data-scope=fieldset]) [data-part=error-text] { color:var(--lk-color-semantic-destructive); font-size:var(--lk-typography-fontsize-xs); }\n:is([data-scope=field],[data-scope=fieldset]) [data-part=helper-text] { color:var(--lk-color-semantic-mutedforeground); font-size:var(--lk-typography-fontsize-xs); }\n[data-scope=fieldset][data-part=root] { border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); border-radius:var(--lk-radius-lg); padding:var(--lk-space-component-md); }"),
  "fieldset",
);
