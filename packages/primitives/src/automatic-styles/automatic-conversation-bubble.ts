// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 shared-styles/conversation-styles.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-conversation-bubble", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-conversation-bubble", "\n[data-scope=bubble][data-part=root] { max-width:100%;min-width:0;padding:var(--lk-space-component-compact) var(--lk-space-component-md);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-lg);background:var(--lk-color-semantic-card);color:var(--lk-color-semantic-cardforeground);overflow-wrap:anywhere;white-space:pre-wrap;line-height:var(--lk-typography-lineheight-base); }\n[data-scope=bubble][data-side=outgoing] { background:var(--lk-color-semantic-muted);color:var(--lk-color-semantic-foreground); }"),
  undefined,
);
