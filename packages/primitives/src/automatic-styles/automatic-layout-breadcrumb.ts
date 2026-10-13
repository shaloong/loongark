// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 shared-styles/layout.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-layout-breadcrumb", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-layout-breadcrumb", "\n[data-scope=breadcrumb] [data-part=list] { display:flex; flex-wrap:wrap; align-items:center; gap:var(--lk-control-fieldgap); padding:0; margin:0; list-style:none; color:var(--lk-color-semantic-mutedforeground); font-size:var(--lk-typography-fontsize-md); }\n[data-scope=breadcrumb] [data-part=item] { display:inline-flex; align-items:center; gap:var(--lk-control-fieldgap); }\n[data-scope=breadcrumb] [data-part=link] { color:inherit; text-decoration:none; }\n[data-scope=breadcrumb] [data-part=link]:hover, [data-scope=breadcrumb] [data-part=page] { color:var(--lk-color-semantic-foreground); }\n@keyframes lk-pulse { 50% { opacity:.5; } }\n@keyframes lk-spin { to { transform:rotate(360deg); } }\n@keyframes lk-sheet-in { from { opacity:0; transform:translateX(100%); } to { opacity:1; transform:translateX(0); } }\n@keyframes lk-sheet-out { to { opacity:0; transform:translateX(100%); visibility:hidden; } }"),
  undefined,
);
