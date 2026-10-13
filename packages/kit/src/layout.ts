import {
  foundationParts,
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
export { layoutCSS } from "@loongark/primitives/shared-styles/layout";
