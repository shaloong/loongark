// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 shared-styles/layout.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-layout-spinner", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-layout-spinner", "\n@keyframes lk-pulse { 50% { opacity:.5; } }\n[data-scope=spinner] { display:inline-block; width:var(--lk-space-component-md); height:var(--lk-space-component-md); border:var(--lk-control-focuswidth) solid var(--lk-color-semantic-border); border-top-color:var(--lk-color-semantic-foreground); border-radius:50%; animation:lk-spin var(--lk-motion-duration-spin) linear infinite; }\n@keyframes lk-spin { to { transform:rotate(360deg); } }\n@keyframes lk-sheet-in { from { opacity:0; transform:translateX(100%); } to { opacity:1; transform:translateX(0); } }\n@keyframes lk-sheet-out { to { opacity:0; transform:translateX(100%); visibility:hidden; } }"),
  undefined,
);
