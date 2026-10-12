// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 virtual-layout.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-virtual-layout-virtual-masonry", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-virtual-layout-virtual-masonry", "\n[data-scope=\"virtual-grid\"],[data-scope=\"virtual-masonry\"]{position:relative;overflow:auto;overflow-anchor:none;max-width:100%;min-width:0;border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-md);background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground)}\n[data-scope=\"virtual-grid\"] > [data-part=\"canvas\"],[data-scope=\"virtual-masonry\"] > [data-part=\"canvas\"]{position:relative}\n[data-scope=\"virtual-masonry\"] > [data-part=\"canvas\"] > [data-part=\"item\"]{position:absolute;box-sizing:border-box}"),
  "VirtualLayout",
);
