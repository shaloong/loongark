import { layoutStyles, type FoundationSpacing } from "./foundations";
export const mediaParts = {
  ImageList: ["div", "image-list", "root"],
  ImageListItem: ["figure", "image-list", "item"],
  ImageListCaption: ["figcaption", "image-list", "caption"],
  Masonry: ["div", "masonry", "root"],
  MasonryItem: ["figure", "masonry", "item"],
} as const;
export type MediaPart = keyof typeof mediaParts;
export interface MediaLayoutOptions {
  columns?: number;
  gap?: FoundationSpacing;
  columnSpan?: number;
  rowSpan?: number;
  rowHeight?: number;
  responsive?: boolean;
}
export const mediaCount = (value: number | undefined, fallback = 1) =>
  Number.isFinite(value)
    ? Math.max(1, Math.min(12, Math.floor(value!)))
    : fallback;
export function mediaAttributes(
  part: MediaPart,
  options: MediaLayoutOptions = {},
) {
  const [, scope, section] = mediaParts[part];
  return {
    "data-scope": scope,
    "data-part": section,
    ...(section === "root"
      ? {
          role: "list" as const,
          "data-responsive": options.responsive === false ? "false" : undefined,
        }
      : section === "item"
        ? { role: "listitem" as const }
        : {}),
  };
}
export function mediaStyles(options: MediaLayoutOptions = {}) {
  const base = layoutStyles({ gap: options.gap });
  return {
    ...base,
    ...(options.columns !== undefined
      ? { "--lk-media-columns": mediaCount(options.columns, 3) }
      : {}),
    "--lk-media-column-span": mediaCount(options.columnSpan),
    "--lk-media-row-span": mediaCount(options.rowSpan),
    ...(Number.isFinite(options.rowHeight)
      ? { "--lk-media-row-height": Math.max(1, options.rowHeight!) + "px" }
      : {}),
  };
}
export const mediaLayoutCSS = `
:is([data-scope=image-list],[data-scope=masonry])[data-part=root] { --lk-media-columns:3;--lk-media-row-height:calc(var(--lk-control-height-lg)*4);--lk-media-column-span:1;--lk-media-row-span:1;--lk-layout-gap:var(--lk-space-component-md);width:100%;min-width:0; }
[data-scope=image-list][data-part=root] { display:grid;grid-template-columns:repeat(var(--lk-media-columns),minmax(0,1fr));grid-auto-rows:var(--lk-media-row-height,calc(var(--lk-control-height-lg)*4));gap:var(--lk-layout-gap); }
:is([data-scope=image-list],[data-scope=masonry])[data-part=item] { margin:0;min-width:0;border-radius:var(--lk-radius-lg);overflow:hidden;background:var(--lk-color-semantic-card);color:var(--lk-color-semantic-cardforeground); }
[data-scope=image-list][data-part=item] { grid-column:span min(var(--lk-media-column-span,1),var(--lk-media-columns));grid-row:span var(--lk-media-row-span,1);display:grid;grid-template-rows:minmax(0,1fr) auto; }
[data-scope=image-list][data-part=item] > img { width:100%;height:100%;min-height:0;object-fit:cover;display:block; }
[data-scope=image-list][data-part=caption] { padding:var(--lk-space-component-sm) var(--lk-space-component-compact);font-size:var(--lk-typography-fontsize-sm);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-top:0;border-radius:0 0 var(--lk-radius-lg) var(--lk-radius-lg); }
[data-scope=masonry][data-part=root] { column-count:var(--lk-media-columns);column-gap:var(--lk-layout-gap); }
[data-scope=masonry][data-part=item] { break-inside:avoid;display:flow-root;margin-bottom:var(--lk-layout-gap); }
[data-scope=masonry] img { width:100%;height:auto;display:block; }
@media(max-width:640px) { [data-scope=image-list][data-part=root]:not([data-responsive=false]) { grid-template-columns:repeat(min(2,var(--lk-media-columns)),minmax(0,1fr)); } [data-scope=image-list]:not([data-responsive=false]) > [data-part=item] { grid-column:span min(var(--lk-media-column-span,1),2,var(--lk-media-columns)); } [data-scope=masonry][data-part=root]:not([data-responsive=false]) { column-count:min(2,var(--lk-media-columns)); } }
@media(max-width:400px) { [data-scope=image-list][data-part=root]:not([data-responsive=false]) { grid-template-columns:minmax(0,1fr); } [data-scope=image-list]:not([data-responsive=false]) > [data-part=item] { grid-column:span 1; } [data-scope=masonry][data-part=root]:not([data-responsive=false]) { column-count:1; } }
`;
