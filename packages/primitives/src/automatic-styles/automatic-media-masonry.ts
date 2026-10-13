// 由 scripts/generate-automatic-styles.mjs 生成；规则来源为 shared-styles/media-layout-styles.ts。
import { createPrimitive } from "../core";
export const style = /*#__PURE__*/ createPrimitive(
  { name: "automatic-media-masonry", tokens: [], defaults: {} },
  (theme) => theme.mountStyles("automatic-media-masonry", "\n:is([data-scope=image-list],[data-scope=masonry])[data-part=root] { --lk-media-columns:3;--lk-media-row-height:calc(var(--lk-control-height-lg)*4);--lk-media-column-span:1;--lk-media-row-span:1;--lk-layout-gap:var(--lk-space-component-md);width:100%;min-width:0; }\n:is([data-scope=image-list],[data-scope=masonry])[data-part=item] { margin:0;min-width:0;border-radius:var(--lk-radius-lg);overflow:hidden;background:var(--lk-color-semantic-card);color:var(--lk-color-semantic-cardforeground); }\n[data-scope=masonry][data-part=root] { column-count:var(--lk-media-columns);column-gap:var(--lk-layout-gap); }\n[data-scope=masonry][data-part=item] { break-inside:avoid;display:flow-root;margin-bottom:var(--lk-layout-gap); }\n[data-scope=masonry] img { width:100%;height:auto;display:block; }\n@media(max-width:640px) { [data-scope=masonry][data-part=root]:not([data-responsive=false]) { column-count:min(2,var(--lk-media-columns)); } }\n@media(max-width:400px) { [data-scope=masonry][data-part=root]:not([data-responsive=false]) { column-count:1; } }"),
  undefined,
);
