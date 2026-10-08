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
export const foundationCSS = `
:is([data-scope=stack],[data-scope=grid],[data-scope=app-bar]) { --lk-layout-gap:var(--lk-space-component-md); }
:is([data-scope=box],[data-scope=stack],[data-scope=container],[data-scope=grid]) { --lk-layout-padding:0px; }
[data-scope=paper] { --lk-layout-padding:var(--lk-space-component-md); }
[data-scope=grid] { --lk-grid-columns:2; }
:is([data-scope=paper],[data-scope=box],[data-scope=stack],[data-scope=container],[data-scope=grid]) { min-width:0; max-width:100%; padding:var(--lk-layout-padding,0); }
[data-scope=paper] { border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); border-radius:var(--lk-radius-lg); background:var(--lk-color-semantic-card); color:var(--lk-color-semantic-cardforeground); padding:var(--lk-layout-padding,var(--lk-space-component-md)); box-shadow:var(--lk-shadow-sm); }
[data-scope=paper][data-variant=muted] { background:var(--lk-color-semantic-muted); color:var(--lk-color-semantic-foreground); box-shadow:none; }
[data-scope=stack] { display:flex; gap:var(--lk-layout-gap,var(--lk-space-component-md)); flex-wrap:wrap; }
[data-scope=stack][data-orientation=vertical] { flex-direction:column; }
[data-scope=stack][data-orientation=horizontal] { flex-direction:row; align-items:center; }
[data-scope=container] { width:100%; max-width:var(--lk-control-containerwidth); margin-inline:auto; }
[data-scope=grid] { display:grid; width:100%; grid-template-columns:repeat(var(--lk-grid-columns,2),minmax(0,1fr)); gap:var(--lk-layout-gap,var(--lk-space-component-md)); }
[data-scope=grid] > * { min-width:0; }
[data-scope=textarea] { display:block; width:100%; min-width:0; min-height:calc(var(--lk-control-height-md) * 3); padding:var(--lk-space-component-sm) var(--lk-space-component-compact); border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-input); border-radius:var(--lk-radius-md); font:inherit; font-size:var(--lk-typography-fontsize-md); line-height:1.5; color:var(--lk-color-semantic-foreground); background:var(--lk-color-semantic-background); resize:vertical; box-shadow:var(--lk-shadow-sm); transition:border-color var(--lk-motion-duration-fast) var(--lk-motion-easing-standard),box-shadow var(--lk-motion-duration-fast) var(--lk-motion-easing-standard); }
[data-scope=textarea]::placeholder { color:var(--lk-color-semantic-mutedforeground); opacity:1; }
[data-scope=textarea]:focus-visible { outline:var(--lk-control-focuswidth) solid var(--lk-color-semantic-ring); outline-offset:var(--lk-control-focuswidth); }
[data-scope=textarea]:disabled { opacity:.5; cursor:not-allowed; }
[data-scope=textarea][readonly] { background:var(--lk-color-semantic-muted); }
[data-scope=textarea][aria-invalid=true] { border-color:var(--lk-color-semantic-destructive); outline-color:var(--lk-color-semantic-destructive); }
[data-scope=link] { color:var(--lk-color-semantic-foreground); text-decoration:underline; text-underline-offset:var(--lk-control-focuswidth); border-radius:var(--lk-radius-sm); transition:color var(--lk-motion-duration-fast) var(--lk-motion-easing-standard); }
[data-scope=link]:hover { color:var(--lk-color-semantic-mutedforeground); }
[data-scope=link]:focus-visible { outline:var(--lk-control-focuswidth) solid var(--lk-color-semantic-ring); outline-offset:var(--lk-control-focuswidth); }
[data-scope=chip][data-part=root] { display:inline-flex; align-items:center; gap:var(--lk-space-component-xs); max-width:100%; min-height:var(--lk-control-height-xs); padding:var(--lk-space-component-xs) var(--lk-space-component-sm); border:var(--lk-control-borderwidth) solid transparent; border-radius:var(--lk-radius-pill); background:var(--lk-color-semantic-secondary); color:var(--lk-color-semantic-secondaryforeground); font-size:var(--lk-typography-fontsize-sm); line-height:1.25; }
[data-scope=chip][data-size=lg] { min-height:var(--lk-control-height-md); padding-inline:var(--lk-space-component-compact); }
[data-scope=chip][data-size=sm] { min-height:var(--lk-control-height-xs); font-size:var(--lk-typography-fontsize-xs); }
[data-scope=chip][data-variant=outline] { border-color:var(--lk-color-semantic-border); background:transparent; color:var(--lk-color-semantic-foreground); }
[data-scope=chip][data-variant=destructive] { background:var(--lk-color-semantic-destructive); color:var(--lk-color-semantic-destructiveforeground); }
[data-scope=chip][data-part=label] { font:inherit; min-width:0; overflow-wrap:anywhere; }
[data-scope=chip][data-part=remove-trigger] { display:inline-flex; align-items:center; justify-content:center; flex:none; width:var(--lk-control-height-xs); height:var(--lk-control-height-xs); margin-block:calc(-1 * var(--lk-space-component-xs)); padding:0; border:0; border-radius:50%; background:transparent; color:inherit; font:inherit; cursor:pointer; }
[data-scope=chip][data-part=remove-trigger]:hover { background:var(--lk-color-semantic-border); color:var(--lk-color-semantic-foreground); }
[data-scope=chip][data-part=remove-trigger]:disabled { opacity:.5; cursor:not-allowed; }
[data-scope=list][data-part=root] { list-style:none; margin:0; padding:0; display:grid; gap:var(--lk-space-component-xs); width:100%; }
[data-scope=list][data-part=item] { margin:0; padding:0; min-width:0; }
[data-scope=list] :is([data-part=item-button],[data-part=item-link]) { display:flex; align-items:center; gap:var(--lk-space-component-compact); width:100%; min-height:var(--lk-control-height-lg); padding:var(--lk-space-component-sm) var(--lk-space-component-compact); border:0; border-radius:var(--lk-radius-md); background:transparent; color:var(--lk-color-semantic-foreground); text-align:start; font:inherit; text-decoration:none; cursor:pointer; transition:background-color var(--lk-motion-duration-fast) var(--lk-motion-easing-standard); }
[data-scope=list] :is([data-part=item-button],[data-part=item-link]):is(:hover,[aria-current=page],[aria-pressed=true]) { background:var(--lk-color-semantic-accent); }
[data-scope=list][data-part=item-button]:disabled { opacity:.5; cursor:not-allowed; }
[data-scope=list][data-part=item-text] { display:grid; gap:var(--lk-space-component-xs); min-width:0; }
[data-scope=list][data-part=item-description] { color:var(--lk-color-semantic-mutedforeground); font-size:var(--lk-typography-fontsize-xs); }
:is([data-scope=list][data-part=item-icon],[data-scope=bottom-navigation][data-part=icon]) { display:inline-flex; align-items:center; justify-content:center; flex:none; width:var(--lk-control-icon-lg); height:var(--lk-control-icon-lg); }
[data-scope=avatar-group][data-part=root] { display:flex; align-items:center; flex-wrap:wrap; padding-inline-start:var(--lk-space-component-sm); }
[data-scope=avatar-group][data-part=root] > * { margin-inline-start:calc(-1 * var(--lk-space-component-sm)); outline:var(--lk-control-focuswidth) solid var(--lk-color-semantic-background); }
[data-scope=avatar-group][data-part=overflow] { display:inline-flex; align-items:center; justify-content:center; flex:none; width:var(--lk-control-height-lg); height:var(--lk-control-height-lg); border-radius:var(--lk-radius-pill); background:var(--lk-color-semantic-muted); color:var(--lk-color-semantic-foreground); font-size:var(--lk-typography-fontsize-sm); }
[data-scope=timeline][data-part=root] { list-style:none; margin:0; padding:0; display:grid; gap:var(--lk-space-component-lg); }
[data-scope=timeline][data-part=item] { position:relative; display:grid; grid-template-columns:var(--lk-control-icon-lg) minmax(0,1fr); gap:var(--lk-space-component-compact); min-width:0; }
[data-scope=timeline][data-part=item]:not(:last-child)::before { content:""; position:absolute; inset-inline-start:calc(var(--lk-control-icon-lg) / 2); top:var(--lk-control-icon-lg); bottom:calc(-1 * var(--lk-space-component-lg)); width:var(--lk-control-borderwidth); background:var(--lk-color-semantic-border); }
[data-scope=timeline][data-part=indicator] { z-index:1; width:var(--lk-control-icon-lg); height:var(--lk-control-icon-lg); display:inline-flex; align-items:center; justify-content:center; border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); border-radius:var(--lk-radius-pill); background:var(--lk-color-semantic-background); color:var(--lk-color-semantic-foreground); font-size:var(--lk-typography-fontsize-xs); }
[data-scope=timeline][data-part=content] { display:grid; gap:var(--lk-space-component-xs); padding-block-end:var(--lk-space-component-xs); }
[data-scope=timeline][data-part=title] { margin:0; font-size:var(--lk-typography-fontsize-md); font-weight:600; }
[data-scope=timeline] :is([data-part=description],[data-part=time]) { margin:0; font-size:var(--lk-typography-fontsize-sm); color:var(--lk-color-semantic-mutedforeground); }
[data-scope=app-bar][data-part=root] { width:100%; background:var(--lk-color-semantic-background); color:var(--lk-color-semantic-foreground); border-bottom:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); }
[data-scope=app-bar][data-part=toolbar] { display:flex; align-items:center; flex-wrap:wrap; gap:var(--lk-layout-gap,var(--lk-space-component-md)); min-height:var(--lk-space-layout-section); padding:var(--lk-space-component-sm) var(--lk-space-component-md); }
[data-scope=bottom-navigation][data-part=root] { display:flex; align-items:stretch; width:100%; border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); border-radius:var(--lk-radius-lg); background:var(--lk-color-semantic-background); padding:var(--lk-space-component-xs); gap:var(--lk-space-component-xs); }
[data-scope=bottom-navigation][data-part=item] { flex:1; min-width:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:var(--lk-space-component-xs); min-height:var(--lk-space-layout-section); padding:var(--lk-space-component-sm) var(--lk-space-component-xs); border:0; border-radius:var(--lk-radius-md); background:transparent; color:var(--lk-color-semantic-mutedforeground); text-decoration:none; font:inherit; transition:background-color var(--lk-motion-duration-fast) var(--lk-motion-easing-standard),color var(--lk-motion-duration-fast) var(--lk-motion-easing-standard); }
[data-scope=bottom-navigation][data-part=item]:is(:hover,[aria-current=page]) { background:var(--lk-color-semantic-accent); color:var(--lk-color-semantic-foreground); }
[data-scope=bottom-navigation][data-part=label] { font-size:var(--lk-typography-fontsize-xs); overflow-wrap:anywhere; }
@media(max-width:480px) { [data-scope=grid] { grid-template-columns:minmax(0,1fr); } }
`;
