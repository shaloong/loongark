// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 shared-styles/layout.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-layout-alert", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-layout-alert", "\n[data-scope=alert][data-part=root] { display:grid; gap:var(--lk-space-component-xs); border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); border-radius:var(--lk-radius-lg); padding:var(--lk-space-component-md); background:var(--lk-color-semantic-background); color:var(--lk-color-semantic-foreground); }\n[data-scope=alert][data-variant=destructive] { color:var(--lk-color-semantic-destructive); }\n[data-scope=alert] [data-part=title] { margin:0; font-size:var(--lk-typography-fontsize-md); font-weight:600; }\n[data-scope=alert] [data-part=description] { font-size:var(--lk-typography-fontsize-md); }\n@keyframes lk-pulse { 50% { opacity:.5; } }\n@keyframes lk-spin { to { transform:rotate(360deg); } }\n@keyframes lk-sheet-in { from { opacity:0; transform:translateX(100%); } to { opacity:1; transform:translateX(0); } }\n@keyframes lk-sheet-out { to { opacity:0; transform:translateX(100%); visibility:hidden; } }"),
  undefined,
);
