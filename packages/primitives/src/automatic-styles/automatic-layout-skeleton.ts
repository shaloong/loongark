// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 shared-styles/layout.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-layout-skeleton", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-layout-skeleton", "\n[data-scope=skeleton] { min-height:var(--lk-space-component-md); border-radius:var(--lk-radius-md); background:var(--lk-color-semantic-border); animation:lk-pulse var(--lk-motion-duration-pulse) ease-in-out infinite; }\n@keyframes lk-pulse { 50% { opacity:.5; } }\n@keyframes lk-spin { to { transform:rotate(360deg); } }\n@keyframes lk-sheet-in { from { opacity:0; transform:translateX(100%); } to { opacity:1; transform:translateX(0); } }\n@keyframes lk-sheet-out { to { opacity:0; transform:translateX(100%); visibility:hidden; } }"),
  undefined,
);
