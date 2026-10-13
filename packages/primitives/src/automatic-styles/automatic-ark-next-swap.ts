// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 ark-next.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-ark-next-swap", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-ark-next-swap", "\n[data-scope=swap][data-part=indicator] { align-items:center;justify-content:center;gap:var(--lk-space-component-xs); }\n[data-scope=swap][data-part=indicator][data-state=open] { animation:lk-swap-in var(--lk-motion-duration-fast) var(--lk-motion-easing-entrance); }\n[data-scope=swap][data-part=indicator][data-state=closed] { animation:lk-swap-out var(--lk-motion-duration-fast) var(--lk-motion-easing-exit); }\n@keyframes lk-swap-in { from { opacity:0;transform:translateY(var(--lk-space-component-xs)); } to { opacity:1;transform:translateY(0); } }\n@keyframes lk-swap-out { to { opacity:0;transform:translateY(calc(-1 * var(--lk-space-component-xs))); } }\n@keyframes lk-drawer-out { to { translate:var(--lk-drawer-slide-x) var(--lk-drawer-slide-y); } }"),
  "swap",
);
