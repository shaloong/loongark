import { onMount, onCleanup } from "solid-js";
import { mountMenubar } from "@loongark/kit";
import { splitProps, type JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import {
  layoutParts,
  layoutAttributes,
  layoutStyles,
  type LayoutPart,
  type LayoutOptions,
} from "@loongark/kit";
export type LoongArkLayoutProps = Omit<JSX.HTMLAttributes<HTMLElement>, "ref"> &
  LayoutOptions & {
    as?:
      | (typeof layoutParts)[LayoutPart][0]
      | "h1"
      | "h2"
      | "h4"
      | "blockquote"
      | "code";
    href?: string;
    target?: JSX.AnchorHTMLAttributes<HTMLAnchorElement>["target"];
    rel?: string;
    download?: string | boolean;
    hreflang?: string;
    referrerpolicy?: JSX.AnchorHTMLAttributes<HTMLAnchorElement>["referrerpolicy"];
    value?: string;
    name?: string;
    form?: string;
    multiple?: boolean;
    required?: boolean;
    htmlFor?: string;
    disabled?: boolean;
    type?: "button" | "reset" | "submit";
    dateTime?: string;
  };
const make = (part: LayoutPart) => (props: LoongArkLayoutProps) => {
  const [local, rest] = splitProps(props, [
    "as",
    "variant",
    "size",
    "orientation",
    "ratio",
    "side",
    "gap",
    "padding",
    "columns",
    "active",
    "style",
  ]);
  const attributes = () => {
    const { type, ...attrs } = layoutAttributes(part, local);
    return attrs;
  };
  const style = () => ({
    ...layoutStyles(local),
    ...(typeof local.style === "object" ? local.style : {}),
  });
  return layoutParts[part][0] === "button" &&
    (!local.as || local.as === "button") ? (
    <button type="button" {...attributes()} {...rest} style={style()} />
  ) : (
    <Dynamic
      component={local.as ?? layoutParts[part][0]}
      {...attributes()}
      {...rest}
      style={style()}
    />
  );
};
export const LoongArkAlert = make("Alert");
export const LoongArkAlertTitle = make("AlertTitle");
export const LoongArkAlertDescription = make("AlertDescription");
export const LoongArkAspectRatio = make("AspectRatio");
export const LoongArkBadge = make("Badge");
export const LoongArkButtonGroup = make("ButtonGroup");
export const LoongArkBreadcrumb = make("Breadcrumb");
export const LoongArkBreadcrumbList = make("BreadcrumbList");
export const LoongArkBreadcrumbItem = make("BreadcrumbItem");
export const LoongArkBreadcrumbLink = make("BreadcrumbLink");
export const LoongArkBreadcrumbPage = make("BreadcrumbPage");
export const LoongArkBreadcrumbSeparator = make("BreadcrumbSeparator");
export const LoongArkBreadcrumbEllipsis = make("BreadcrumbEllipsis");
export const LoongArkCard = make("Card");
export const LoongArkCardHeader = make("CardHeader");
export const LoongArkCardTitle = make("CardTitle");
export const LoongArkCardDescription = make("CardDescription");
export const LoongArkCardContent = make("CardContent");
export const LoongArkCardFooter = make("CardFooter");
export const LoongArkEmpty = make("Empty");
export const LoongArkEmptyHeader = make("EmptyHeader");
export const LoongArkEmptyTitle = make("EmptyTitle");
export const LoongArkEmptyDescription = make("EmptyDescription");
export const LoongArkEmptyMedia = make("EmptyMedia");
export const LoongArkEmptyContent = make("EmptyContent");
export const LoongArkItem = make("Item");
export const LoongArkItemGroup = make("ItemGroup");
export const LoongArkItemSeparator = make("ItemSeparator");
export const LoongArkItemContent = make("ItemContent");
export const LoongArkItemTitle = make("ItemTitle");
export const LoongArkItemDescription = make("ItemDescription");
export const LoongArkItemActions = make("ItemActions");
export const LoongArkItemMedia = make("ItemMedia");
export const LoongArkItemHeader = make("ItemHeader");
export const LoongArkItemFooter = make("ItemFooter");
export const LoongArkKbd = make("Kbd");
export const LoongArkKbdGroup = make("KbdGroup");
/** 原生选择框保留完整 Select 属性和事件目标类型，包括多选 value。 */
export type LoongArkNativeSelectProps = Omit<
  JSX.SelectHTMLAttributes<HTMLSelectElement>, "size"
> & LayoutOptions & { as?: LoongArkLayoutProps["as"] };
export const LoongArkNativeSelect = (props: LoongArkNativeSelectProps) => {
  const [local, rest] = splitProps(props, ["as", "variant", "size", "orientation", "ratio", "side", "gap", "padding", "columns", "active", "style"]);
  return <Dynamic component={local.as ?? "select"} {...layoutAttributes("NativeSelect", local)} {...rest} style={{
    ...layoutStyles(local),
    ...(typeof local.style === "object" ? local.style : {}),
  }} />;
};
export const LoongArkSeparator = make("Separator");
export const LoongArkSkeleton = make("Skeleton");
export const LoongArkSpinner = make("Spinner");
export const LoongArkTable = make("Table");
export const LoongArkTableRoot = make("TableRoot");
export const LoongArkTableHeader = make("TableHeader");
export const LoongArkTableBody = make("TableBody");
export const LoongArkTableFooter = make("TableFooter");
export const LoongArkTableRow = make("TableRow");
export const LoongArkTableHead = make("TableHead");
export const LoongArkTableCell = make("TableCell");
export const LoongArkTableCaption = make("TableCaption");
export const LoongArkTypography = make("Typography");
export const LoongArkDirection = make("Direction");
export const LoongArkLabel = make("Label");
export const LoongArkNavigationMenu = make("NavigationMenu");
export const LoongArkNavigationMenuList = make("NavigationMenuList");
export const LoongArkNavigationMenuItem = make("NavigationMenuItem");
export const LoongArkNavigationMenuLink = make("NavigationMenuLink");
export const LoongArkMenubar = (props: LoongArkLayoutProps) => {
  let element: HTMLDivElement | undefined;
  let release: (() => void) | undefined;
  onMount(() => {
    if (element) release = mountMenubar(element);
  });
  onCleanup(() => release?.());
  return <div {...layoutAttributes("Menubar")} {...props} ref={element} />;
};
export const LoongArkSidebar = make("Sidebar");
export const LoongArkSidebarHeader = make("SidebarHeader");
export const LoongArkSidebarContent = make("SidebarContent");
export const LoongArkSidebarFooter = make("SidebarFooter");
export const LoongArkSidebarGroup = make("SidebarGroup");
export const LoongArkSidebarGroupLabel = make("SidebarGroupLabel");
export const LoongArkSidebarMenu = make("SidebarMenu");
export const LoongArkSidebarMenuItem = make("SidebarMenuItem");
export const LoongArkSidebarMenuButton = make("SidebarMenuButton");
export const LoongArkSidebarInset = make("SidebarInset");

export const LoongArkLink = make("Link");
export const LoongArkChip = make("Chip");
export const LoongArkChipLabel = make("ChipLabel");
export const LoongArkChipRemoveTrigger = make("ChipRemoveTrigger");
export const LoongArkList = make("List");
export const LoongArkListItem = make("ListItem");
export const LoongArkListItemButton = make("ListItemButton");
export const LoongArkListItemLink = make("ListItemLink");
export const LoongArkListItemIcon = make("ListItemIcon");
export const LoongArkListItemText = make("ListItemText");
export const LoongArkListItemDescription = make("ListItemDescription");
export const LoongArkAvatarGroup = make("AvatarGroup");
export const LoongArkAvatarGroupOverflow = make("AvatarGroupOverflow");
export const LoongArkPaper = make("Paper");
export const LoongArkBox = make("Box");
export const LoongArkStack = make("Stack");
export const LoongArkContainer = make("Container");
export const LoongArkGrid = make("Grid");
export const LoongArkTimeline = make("Timeline");
export const LoongArkTimelineItem = make("TimelineItem");
export const LoongArkTimelineIndicator = make("TimelineIndicator");
export const LoongArkTimelineContent = make("TimelineContent");
export const LoongArkTimelineTitle = make("TimelineTitle");
export const LoongArkTimelineDescription = make("TimelineDescription");
export const LoongArkTimelineTime = make("TimelineTime");
export const LoongArkAppBar = make("AppBar");
export const LoongArkToolbar = make("Toolbar");
export const LoongArkBottomNavigation = make("BottomNavigation");
export const LoongArkBottomNavigationItem = make("BottomNavigationItem");
export const LoongArkBottomNavigationIcon = make("BottomNavigationIcon");
export const LoongArkBottomNavigationLabel = make("BottomNavigationLabel");
