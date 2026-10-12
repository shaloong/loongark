// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 shared-styles/layout.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-layout-typography", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-layout-typography", "\n@keyframes lk-pulse { 50% { opacity:.5; } }\n@keyframes lk-spin { to { transform:rotate(360deg); } }\n[data-scope=typography] { margin:0; line-height:1.75; text-wrap:pretty; }\n[data-scope=typography]:is(h1,h2,h3,h4) { line-height:1.2; font-weight:600; letter-spacing:-.025em; text-wrap:balance; }\nh1[data-scope=typography] { font-size:var(--lk-control-height-md); } h2[data-scope=typography] { font-size:30px; } h3[data-scope=typography] { font-size:var(--lk-space-component-lg); } h4[data-scope=typography] { font-size:20px; }\n@keyframes lk-sheet-in { from { opacity:0; transform:translateX(100%); } to { opacity:1; transform:translateX(0); } }\n@keyframes lk-sheet-out { to { opacity:0; transform:translateX(100%); visibility:hidden; } }"),
  undefined,
);
