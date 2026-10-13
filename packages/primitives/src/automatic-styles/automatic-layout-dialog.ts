// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 shared-styles/layout.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-layout-dialog", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-layout-dialog", "\n@keyframes lk-pulse { 50% { opacity:.5; } }\n@keyframes lk-spin { to { transform:rotate(360deg); } }\n[data-scope=dialog][data-part=positioner]:has(> [data-scope=sheet][data-part=content]) { position:fixed; inset:0; z-index:var(--lk-z-index-dialog); padding:0; contain:paint; }\n@keyframes lk-sheet-in { from { opacity:0; transform:translateX(100%); } to { opacity:1; transform:translateX(0); } }\n@keyframes lk-sheet-out { to { opacity:0; transform:translateX(100%); visibility:hidden; } }"),
  undefined,
);
