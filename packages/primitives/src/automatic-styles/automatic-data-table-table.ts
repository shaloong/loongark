// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 data-table.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-data-table-table", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-data-table-table", "\n[data-scope=data-table] [data-scope=table][data-part=root] { border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-lg);overscroll-behavior-inline:contain; }\n[data-scope=data-table] [data-scope=table][data-part=root] { --lk-data-table-pin-offset:0px;--lk-data-table-viewport-width:100%; }\n[data-scope=data-table] [data-scope=table][data-part=root]:has(th[data-pinned]) { isolation:isolate; }"),
  "table",
);
