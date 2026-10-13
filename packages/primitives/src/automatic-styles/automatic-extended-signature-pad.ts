// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 extended.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-extended-signature-pad", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-extended-signature-pad", "\n[data-scope=signature-pad] [data-part=control] { min-height:160px; border:var(--lk-control-borderwidth) dashed var(--lk-color-semantic-border); border-radius:var(--lk-radius-md); background:var(--lk-color-semantic-background); }\n[data-scope=signature-pad] [data-part=segment] { stroke:var(--lk-color-semantic-foreground); }\n[data-scope=signature-pad] [data-part=guide] { stroke:var(--lk-color-semantic-border); }"),
  "signature-pad",
);
