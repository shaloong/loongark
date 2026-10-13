// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 shared-styles/layout.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-layout-kbd", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-layout-kbd", "\n[data-scope=kbd] { display:inline-flex; align-items:center; justify-content:center; border-radius:var(--lk-radius-sm); background:var(--lk-color-semantic-muted); color:var(--lk-color-semantic-mutedforeground); padding:var(--lk-control-focuswidth) var(--lk-control-fieldgap); font-family:inherit; font-size:var(--lk-typography-fontsize-xs); line-height:var(--lk-space-component-md); }\n[data-scope=kbd][data-part=group] { background:transparent; gap:var(--lk-space-component-xs); padding:0; }\n@keyframes lk-pulse { 50% { opacity:.5; } }\n@keyframes lk-spin { to { transform:rotate(360deg); } }\n@keyframes lk-sheet-in { from { opacity:0; transform:translateX(100%); } to { opacity:1; transform:translateX(0); } }\n@keyframes lk-sheet-out { to { opacity:0; transform:translateX(100%); visibility:hidden; } }"),
  undefined,
);
