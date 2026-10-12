// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 icon.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-icon-icon", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-icon-icon", "\n[data-scope=icon][data-part=root] { --lk-icon-size:var(--lk-control-icon-md);display:inline-block;flex:none;vertical-align:middle;width:var(--lk-icon-size,var(--lk-control-icon-md));height:var(--lk-icon-size,var(--lk-control-icon-md)); }\n[data-scope=icon][data-part=root][data-mirror-rtl=true]:dir(rtl) { transform:scaleX(-1); }"),
  "icon",
);
