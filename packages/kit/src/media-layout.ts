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
export { mediaLayoutCSS } from "./media-layout-styles";
