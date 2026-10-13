// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 shared-styles/layout.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-layout-separator", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-layout-separator", "\n[data-scope=separator] { border:0; margin:0; background:var(--lk-color-semantic-border); height:var(--lk-control-borderwidth); width:100%; }\n[data-scope=separator][data-orientation=vertical] { width:var(--lk-control-borderwidth); height:100%; align-self:stretch; }\n@keyframes lk-pulse { 50% { opacity:.5; } }\n@keyframes lk-spin { to { transform:rotate(360deg); } }\n@keyframes lk-sheet-in { from { opacity:0; transform:translateX(100%); } to { opacity:1; transform:translateX(0); } }\n@keyframes lk-sheet-out { to { opacity:0; transform:translateX(100%); visibility:hidden; } }"),
  undefined,
);
