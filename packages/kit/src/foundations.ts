/** Framework-neutral structure and styling for common native components. */
export const foundationParts = {
  Textarea: ["textarea", "textarea", "root"],
  Link: ["a", "link", "root"],
  Chip: ["span", "chip", "root"],
  ChipLabel: ["span", "chip", "label"],
  ChipRemoveTrigger: ["button", "chip", "remove-trigger"],
  List: ["ul", "list", "root"],
  ListItem: ["li", "list", "item"],
  ListItemButton: ["button", "list", "item-button"],
  ListItemLink: ["a", "list", "item-link"],
  ListItemIcon: ["span", "list", "item-icon"],
  ListItemText: ["span", "list", "item-text"],
  ListItemDescription: ["span", "list", "item-description"],
  AvatarGroup: ["div", "avatar-group", "root"],
  AvatarGroupOverflow: ["span", "avatar-group", "overflow"],
  Paper: ["div", "paper", "root"],
  Box: ["div", "box", "root"],
  Stack: ["div", "stack", "root"],
  Container: ["div", "container", "root"],
  Grid: ["div", "grid", "root"],
  Timeline: ["ol", "timeline", "root"],
  TimelineItem: ["li", "timeline", "item"],
  TimelineIndicator: ["span", "timeline", "indicator"],
  TimelineContent: ["div", "timeline", "content"],
  TimelineTitle: ["h3", "timeline", "title"],
  TimelineDescription: ["p", "timeline", "description"],
  TimelineTime: ["time", "timeline", "time"],
  AppBar: ["header", "app-bar", "root"],
  Toolbar: ["div", "app-bar", "toolbar"],
  BottomNavigation: ["nav", "bottom-navigation", "root"],
  BottomNavigationItem: ["a", "bottom-navigation", "item"],
  BottomNavigationIcon: ["span", "bottom-navigation", "icon"],
  BottomNavigationLabel: ["span", "bottom-navigation", "label"],
} as const;
export type FoundationSpacing =
  "none" | "xs" | "sm" | "compact" | "md" | "lg" | "xl";
export interface FoundationOptions {
  gap?: FoundationSpacing;
  padding?: FoundationSpacing;
  columns?: number;
  active?: boolean;
}
const spacing: Record<FoundationSpacing, string> = {
  none: "0px",
  xs: "var(--lk-space-component-xs)",
  sm: "var(--lk-space-component-sm)",
  compact: "var(--lk-space-component-compact)",
  md: "var(--lk-space-component-md)",
  lg: "var(--lk-space-component-lg)",
  xl: "var(--lk-space-component-xl)",
};
const space = (value: FoundationSpacing) => spacing[value];
export const layoutStyles = (
  options: FoundationOptions & { ratio?: number } = {},
) => ({
  ...(options.ratio !== undefined
    ? { "--lk-aspect-ratio": options.ratio }
    : {}),
  ...(options.gap ? { "--lk-layout-gap": space(options.gap) } : {}),
  ...(options.padding ? { "--lk-layout-padding": space(options.padding) } : {}),
  ...(options.columns !== undefined
    ? {
        "--lk-grid-columns": Number.isFinite(options.columns)
          ? Math.max(1, Math.min(12, Math.floor(options.columns)))
          : 2,
      }
    : {}),
});
export { foundationCSS } from "@loongark/primitives/shared-styles/foundations";
