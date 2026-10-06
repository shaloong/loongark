import {
  foundationParts,
  foundationCSS,
  type FoundationOptions,
} from "./foundations";
export { layoutStyles } from "./foundations";
export const layoutParts = {
  ...foundationParts,
  Alert: ["div", "alert", "root"],
  AlertTitle: ["h5", "alert", "title"],
  AlertDescription: ["div", "alert", "description"],
  AspectRatio: ["div", "aspect-ratio", "root"],
  Badge: ["span", "badge", "root"],
  ButtonGroup: ["div", "button-group", "root"],
  Breadcrumb: ["nav", "breadcrumb", "root"],
  BreadcrumbList: ["ol", "breadcrumb", "list"],
  BreadcrumbItem: ["li", "breadcrumb", "item"],
  BreadcrumbLink: ["a", "breadcrumb", "link"],
  BreadcrumbPage: ["span", "breadcrumb", "page"],
  BreadcrumbSeparator: ["li", "breadcrumb", "separator"],
  BreadcrumbEllipsis: ["span", "breadcrumb", "ellipsis"],
  Card: ["article", "card", "root"],
  CardHeader: ["div", "card", "header"],
  CardTitle: ["h3", "card", "title"],
  CardDescription: ["p", "card", "description"],
  CardContent: ["div", "card", "content"],
  CardFooter: ["footer", "card", "footer"],
  Empty: ["div", "empty", "root"],
  EmptyHeader: ["div", "empty", "header"],
  EmptyTitle: ["h3", "empty", "title"],
  EmptyDescription: ["p", "empty", "description"],
  EmptyMedia: ["div", "empty", "media"],
  EmptyContent: ["div", "empty", "content"],
  Item: ["div", "item", "root"],
  ItemGroup: ["div", "item", "group"],
  ItemSeparator: ["hr", "item", "separator"],
  ItemContent: ["div", "item", "content"],
  ItemTitle: ["h3", "item", "title"],
  ItemDescription: ["p", "item", "description"],
  ItemActions: ["div", "item", "actions"],
  ItemMedia: ["div", "item", "media"],
  ItemHeader: ["div", "item", "header"],
  ItemFooter: ["div", "item", "footer"],
  Kbd: ["kbd", "kbd", "root"],
  KbdGroup: ["span", "kbd", "group"],
  NativeSelect: ["select", "native-select", "root"],
  Separator: ["hr", "separator", "root"],
  Skeleton: ["div", "skeleton", "root"],
  Spinner: ["span", "spinner", "root"],
  Table: ["table", "table", "table"],
  TableRoot: ["div", "table", "root"],
  TableHeader: ["thead", "table", "header"],
  TableBody: ["tbody", "table", "body"],
  TableFooter: ["tfoot", "table", "footer"],
  TableRow: ["tr", "table", "row"],
  TableHead: ["th", "table", "head"],
  TableCell: ["td", "table", "cell"],
  TableCaption: ["caption", "table", "caption"],
  Typography: ["p", "typography", "root"],
  Direction: ["div", "direction", "root"],
  Label: ["label", "label", "root"],
  NavigationMenu: ["nav", "navigation-menu", "root"],
  NavigationMenuList: ["ul", "navigation-menu", "list"],
  NavigationMenuItem: ["li", "navigation-menu", "item"],
  NavigationMenuLink: ["a", "navigation-menu", "link"],
  Menubar: ["div", "menubar", "root"],
  Sidebar: ["aside", "sidebar", "root"],
  SidebarHeader: ["header", "sidebar", "header"],
  SidebarContent: ["div", "sidebar", "content"],
  SidebarFooter: ["footer", "sidebar", "footer"],
  SidebarGroup: ["section", "sidebar", "group"],
  SidebarGroupLabel: ["h3", "sidebar", "group-label"],
  SidebarMenu: ["ul", "sidebar", "menu"],
  SidebarMenuItem: ["li", "sidebar", "menu-item"],
  SidebarMenuButton: ["button", "sidebar", "menu-button"],
  SidebarInset: ["main", "sidebar", "inset"],
} as const;
export type LayoutPart = keyof typeof layoutParts;
export interface LayoutOptions extends FoundationOptions {
  variant?: "default" | "secondary" | "destructive" | "outline" | "muted";
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
  ratio?: number;
  side?: "top" | "right" | "bottom" | "left";
}
export const layoutAttributes = (
  part: LayoutPart,
  options: LayoutOptions = {},
) => {
  const [, scope, name] = layoutParts[part];
  return {
    "data-scope": scope,
    "data-part": name,
    "data-variant": options.variant ?? "default",
    "data-size": options.size ?? "md",
    "data-orientation":
      options.orientation ?? (part === "Stack" ? "vertical" : "horizontal"),
    ...(part === "Alert" ? { role: "alert" as const } : {}),
    ...(part === "Spinner"
      ? { role: "status" as const, "aria-label": "Loading" }
      : {}),
    ...(part === "Skeleton" ? { "aria-hidden": true } : {}),
    ...(part === "Breadcrumb" ? { "aria-label": "Breadcrumb" } : {}),
    ...(part === "BreadcrumbPage" ? { "aria-current": "page" as const } : {}),
    ...(part === "BreadcrumbSeparator" || part === "BreadcrumbEllipsis"
      ? { "aria-hidden": true }
      : {}),
    ...(part === "Separator"
      ? {
          role: "separator" as const,
          "aria-orientation": options.orientation ?? "horizontal",
        }
      : {}),
    ...(part === "ButtonGroup" ? { role: "group" as const } : {}),
    ...(layoutParts[part][0] === "button" ? { type: "button" as const } : {}),
    ...(part === "ChipRemoveTrigger" ? { "aria-label": "Remove" } : {}),
    ...(part === "ListItemIcon" ||
    part === "TimelineIndicator" ||
    part === "BottomNavigationIcon"
      ? { "aria-hidden": true }
      : {}),
    ...(part === "BottomNavigation"
      ? { "aria-label": "Primary navigation" }
      : {}),
    ...(part === "BottomNavigationItem" && options.active
      ? { "aria-current": "page" as const }
      : {}),
  };
};
export const layoutCSS =
  foundationCSS +
  `
[data-scope=card][data-part=root] { display:flex; flex-direction:column; gap:var(--lk-space-component-lg); border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); border-radius:var(--lk-radius-lg); background:var(--lk-color-semantic-card); color:var(--lk-color-semantic-cardforeground); padding:var(--lk-space-component-lg) 0; box-shadow:var(--lk-shadow-sm); }
[data-scope=card] :is([data-part=header],[data-part=content],[data-part=footer]) { padding:0 var(--lk-space-component-lg); }
[data-scope=card] [data-part=header] { display:grid; gap:var(--lk-control-fieldgap); }
[data-scope=card] [data-part=title] { margin:0; font-size:var(--lk-space-component-md); line-height:1.2; font-weight:600; }
:is([data-scope=card],[data-scope=empty],[data-scope=item]) [data-part=description] { margin:0; color:var(--lk-color-semantic-mutedforeground); font-size:var(--lk-typography-fontsize-md); }
[data-scope=card] [data-part=footer] { display:flex; align-items:center; gap:var(--lk-space-component-sm); }
[data-scope=alert][data-part=root] { display:grid; gap:var(--lk-space-component-xs); border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); border-radius:var(--lk-radius-lg); padding:var(--lk-space-component-md); background:var(--lk-color-semantic-background); color:var(--lk-color-semantic-foreground); }
[data-scope=alert][data-variant=destructive] { color:var(--lk-color-semantic-destructive); }
[data-scope=alert] [data-part=title] { margin:0; font-size:var(--lk-typography-fontsize-md); font-weight:600; }
[data-scope=alert] [data-part=description] { font-size:var(--lk-typography-fontsize-md); }
[data-scope=badge] { display:inline-flex; align-items:center; gap:var(--lk-space-component-xs); border:var(--lk-control-borderwidth) solid transparent; border-radius:var(--lk-radius-pill); padding:var(--lk-control-focuswidth) var(--lk-space-component-sm); font-size:var(--lk-typography-fontsize-xs); font-weight:600; line-height:var(--lk-space-component-md); background:var(--lk-color-semantic-primary); color:var(--lk-color-semantic-primaryforeground); white-space:nowrap; }
[data-scope=badge][data-variant=secondary] { background:var(--lk-color-semantic-secondary); color:var(--lk-color-semantic-secondaryforeground); }
[data-scope=badge][data-variant=destructive] { background:var(--lk-color-semantic-destructive); color:var(--lk-color-semantic-destructiveforeground); }
[data-scope=badge][data-variant=outline] { border-color:var(--lk-color-semantic-border); color:var(--lk-color-semantic-foreground); background:transparent; }
[data-scope=button-group] { display:inline-flex; align-items:center; }
[data-scope=button-group][data-orientation=vertical] { flex-direction:column; }
[data-scope=button-group]:not([data-orientation=vertical]) > :not(:first-child) { margin-inline-start:calc(-1 * var(--lk-control-borderwidth)); border-start-start-radius:0; border-end-start-radius:0; }
[data-scope=button-group]:not([data-orientation=vertical]) > :not(:last-child) { border-start-end-radius:0; border-end-end-radius:0; }
[data-scope=button-group][data-orientation=vertical] > * { width:100%; }
[data-scope=button-group][data-orientation=vertical] > :not(:first-child) { margin-block-start:calc(-1 * var(--lk-control-borderwidth)); border-start-start-radius:0; border-start-end-radius:0; }
[data-scope=button-group][data-orientation=vertical] > :not(:last-child) { border-end-start-radius:0; border-end-end-radius:0; }
[data-scope=aspect-ratio] { position:relative; aspect-ratio:var(--lk-aspect-ratio,1); overflow:hidden; }
[data-scope=aspect-ratio] > img { width:100%; height:100%; object-fit:cover; }
[data-scope=breadcrumb] [data-part=list] { display:flex; flex-wrap:wrap; align-items:center; gap:var(--lk-control-fieldgap); padding:0; margin:0; list-style:none; color:var(--lk-color-semantic-mutedforeground); font-size:var(--lk-typography-fontsize-md); }
[data-scope=breadcrumb] [data-part=item] { display:inline-flex; align-items:center; gap:var(--lk-control-fieldgap); }
[data-scope=breadcrumb] [data-part=link] { color:inherit; text-decoration:none; }
[data-scope=breadcrumb] [data-part=link]:hover, [data-scope=breadcrumb] [data-part=page] { color:var(--lk-color-semantic-foreground); }
[data-scope=empty][data-part=root] { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:var(--lk-space-component-lg); padding:var(--lk-space-component-spacious) var(--lk-space-component-lg); border:var(--lk-control-borderwidth) dashed var(--lk-color-semantic-border); border-radius:var(--lk-radius-lg); text-align:center; }
[data-scope=empty] [data-part=header] { display:grid; justify-items:center; gap:var(--lk-space-component-sm); max-width:var(--lk-control-dialogwidth-sm); }
[data-scope=empty] [data-part=title] { margin:0; font-size:var(--lk-control-icon-lg); font-weight:600; }
[data-scope=empty] [data-part=media] { display:grid; place-items:center; width:var(--lk-control-height-lg); height:var(--lk-control-height-lg); border-radius:var(--lk-radius-lg); background:var(--lk-color-semantic-muted); }
[data-scope=item][data-part=root] { display:flex; align-items:center; gap:var(--lk-space-component-md); padding:var(--lk-space-component-md); border:var(--lk-control-borderwidth) solid transparent; border-radius:var(--lk-radius-lg); }
[data-scope=item][data-variant=outline] { border-color:var(--lk-color-semantic-border); }
[data-scope=item][data-variant=muted] { background:var(--lk-color-semantic-muted); }
[data-scope=item] [data-part=content] { display:grid; gap:var(--lk-space-component-xs); flex:1; min-width:0; }
[data-scope=item] [data-part=title] { margin:0; font-size:var(--lk-typography-fontsize-md); font-weight:600; }
[data-scope=item] [data-part=actions], [data-scope=item] [data-part=header], [data-scope=item] [data-part=footer] { display:flex; align-items:center; gap:var(--lk-space-component-sm); }
[data-scope=kbd] { display:inline-flex; align-items:center; justify-content:center; border-radius:var(--lk-radius-sm); background:var(--lk-color-semantic-muted); color:var(--lk-color-semantic-mutedforeground); padding:var(--lk-control-focuswidth) var(--lk-control-fieldgap); font-family:inherit; font-size:var(--lk-typography-fontsize-xs); line-height:var(--lk-space-component-md); }
[data-scope=kbd][data-part=group] { background:transparent; gap:var(--lk-space-component-xs); padding:0; }
[data-scope=native-select] { width:100%; height:var(--lk-control-height-md); border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-input); border-radius:var(--lk-radius-md); background:var(--lk-color-semantic-background); color:var(--lk-color-semantic-foreground); padding:0 var(--lk-space-component-compact); font:inherit; box-shadow:var(--lk-shadow-sm); }
[data-scope=separator] { border:0; margin:0; background:var(--lk-color-semantic-border); height:var(--lk-control-borderwidth); width:100%; }
[data-scope=separator][data-orientation=vertical] { width:var(--lk-control-borderwidth); height:100%; align-self:stretch; }
[data-scope=skeleton] { min-height:var(--lk-space-component-md); border-radius:var(--lk-radius-md); background:var(--lk-color-semantic-border); animation:lk-pulse var(--lk-motion-duration-pulse) ease-in-out infinite; }
@keyframes lk-pulse { 50% { opacity:.5; } }
[data-scope=spinner] { display:inline-block; width:var(--lk-space-component-md); height:var(--lk-space-component-md); border:var(--lk-control-focuswidth) solid var(--lk-color-semantic-border); border-top-color:var(--lk-color-semantic-foreground); border-radius:50%; animation:lk-spin var(--lk-motion-duration-spin) linear infinite; }
@keyframes lk-spin { to { transform:rotate(360deg); } }
[data-scope=table][data-part=root] { width:100%; overflow:auto; }
[data-scope=table][data-part=table] { width:100%; border-collapse:collapse; font-size:var(--lk-typography-fontsize-md); }
[data-scope=table] [data-part=row] { border-bottom:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); }
[data-scope=table] [data-part=row]:hover { background:var(--lk-color-semantic-muted); }
[data-scope=table] [data-part=head] { text-align:left; height:var(--lk-control-height-lg); padding:0 var(--lk-space-component-sm); font-weight:600; color:var(--lk-color-semantic-foreground); white-space:nowrap; }
[data-scope=table] [data-part=cell] { padding:var(--lk-space-component-sm); vertical-align:middle; }
[data-scope=table] [data-part=caption] { margin-top:var(--lk-space-component-md); caption-side:bottom; color:var(--lk-color-semantic-mutedforeground); }
[data-scope=typography] { margin:0; line-height:1.75; text-wrap:pretty; }
[data-scope=typography]:is(h1,h2,h3,h4) { line-height:1.2; font-weight:600; letter-spacing:-.025em; text-wrap:balance; }
h1[data-scope=typography] { font-size:var(--lk-control-height-md); } h2[data-scope=typography] { font-size:30px; } h3[data-scope=typography] { font-size:var(--lk-space-component-lg); } h4[data-scope=typography] { font-size:20px; }
[data-scope=label] { display:inline-block; font-weight:600; font-size:var(--lk-typography-fontsize-md); }
[data-scope=navigation-menu] [data-part=list], [data-scope=sidebar] [data-part=menu] { list-style:none; margin:0; padding:0; display:flex; gap:var(--lk-space-component-xs); }
[data-scope=navigation-menu] [data-part=link], [data-scope=sidebar] [data-part=menu-button] { display:flex; align-items:center; gap:var(--lk-space-component-sm); min-height:var(--lk-control-height-md); padding:var(--lk-space-component-sm) var(--lk-space-component-compact); border:0; border-radius:var(--lk-radius-md); color:var(--lk-color-semantic-foreground); text-decoration:none; font:inherit; background:transparent; }
[data-scope=navigation-menu] [data-part=link]:hover, [data-scope=sidebar] [data-part=menu-button]:hover { background:var(--lk-color-semantic-accent); }
[data-scope=menubar] { display:flex; gap:var(--lk-space-component-xs); border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); padding:var(--lk-space-component-xs); border-radius:var(--lk-radius-md); }
[data-scope=sidebar][data-part=root] { display:flex; flex-direction:column; width:256px; max-width:100%; min-height:100%; border-right:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); background:var(--lk-color-semantic-muted); }
[data-scope=sidebar] :is([data-part=header],[data-part=footer],[data-part=group]) { padding:var(--lk-space-component-sm); }
[data-scope=sidebar] :is([data-part=header],[data-part=footer]) { color:var(--lk-color-semantic-foreground); }
[data-scope=sidebar] [data-part=content] { flex:1; overflow:auto; }
[data-scope=sidebar] [data-part=menu] { flex-direction:column; }
[data-scope=sidebar] [data-part=group-label] { padding:var(--lk-space-component-sm); margin:0; color:var(--lk-color-semantic-mutedforeground); font-size:var(--lk-typography-fontsize-xs); }
[data-scope=sidebar] [data-part=menu-button] { width:100%; text-align:left; }
[data-scope=sidebar][data-state=closed] { display:none; }
[data-scope=sidebar][data-part=inset] { flex:1; min-width:0; }
[data-scope=dialog][data-part=positioner]:has(> [data-scope=sheet][data-part=content]) { contain:paint; }
[data-scope=sheet][data-part=content] { position:fixed; z-index:var(--lk-z-index-dialog); background:var(--lk-color-semantic-background); color:var(--lk-color-semantic-foreground); box-shadow:var(--lk-shadow-xl); padding:var(--lk-space-component-lg); display:grid; gap:var(--lk-space-component-md); align-content:start; overflow:auto; max-width:100vw; }
[data-scope=sheet][data-part=content] { inset:0 0 0 auto; width:min(var(--lk-control-dialogwidth-sm),90vw); border-left:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); }
@keyframes lk-sheet-in { from { opacity:0; transform:translateX(100%); } to { opacity:1; transform:translateX(0); } }
@keyframes lk-sheet-out { to { opacity:0; transform:translateX(100%); visibility:hidden; } }
[data-scope=sheet][data-part=content][data-state=open] { animation:lk-sheet-in var(--lk-motion-duration-base) var(--lk-motion-easing-entrance); }
[data-scope=sheet][data-part=content][data-state=closed] { animation:lk-sheet-out var(--lk-motion-duration-exit) var(--lk-motion-easing-exit) forwards; pointer-events:none; }
`;
