// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 shared-styles/layout.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-layout-aspect-ratio", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-layout-aspect-ratio", "\n[data-scope=aspect-ratio] { position:relative; aspect-ratio:var(--lk-aspect-ratio,1); overflow:hidden; }\n[data-scope=aspect-ratio] > img { width:100%; height:100%; object-fit:cover; }\n@keyframes lk-pulse { 50% { opacity:.5; } }\n@keyframes lk-spin { to { transform:rotate(360deg); } }\n@keyframes lk-sheet-in { from { opacity:0; transform:translateX(100%); } to { opacity:1; transform:translateX(0); } }\n@keyframes lk-sheet-out { to { opacity:0; transform:translateX(100%); visibility:hidden; } }"),
  undefined,
);
