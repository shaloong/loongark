// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 shared-styles/foundations.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-foundations-link", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-foundations-link", "\n[data-scope=link] { color:var(--lk-color-semantic-foreground); text-decoration:underline; text-underline-offset:var(--lk-control-focuswidth); border-radius:var(--lk-radius-sm); transition:color var(--lk-motion-duration-fast) var(--lk-motion-easing-standard); }\n[data-scope=link]:hover { color:var(--lk-color-semantic-mutedforeground); }\n[data-scope=link]:focus-visible { outline:var(--lk-control-focuswidth) solid var(--lk-color-semantic-ring); outline-offset:var(--lk-control-focuswidth); }"),
  undefined,
);
