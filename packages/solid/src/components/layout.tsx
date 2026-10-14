
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticAlertStyles } from "@shaloong/loongark-primitives/automatic-styles/alert";
import { styles as lkAutomaticAppBarStyles } from "@shaloong/loongark-primitives/automatic-styles/app-bar";
import { styles as lkAutomaticAspectRatioStyles } from "@shaloong/loongark-primitives/automatic-styles/aspect-ratio";
import { styles as lkAutomaticAvatarGroupStyles } from "@shaloong/loongark-primitives/automatic-styles/avatar-group";
import { styles as lkAutomaticBadgeStyles } from "@shaloong/loongark-primitives/automatic-styles/badge";
import { styles as lkAutomaticBottomNavigationStyles } from "@shaloong/loongark-primitives/automatic-styles/bottom-navigation";
import { styles as lkAutomaticBoxStyles } from "@shaloong/loongark-primitives/automatic-styles/box";
import { styles as lkAutomaticBreadcrumbStyles } from "@shaloong/loongark-primitives/automatic-styles/breadcrumb";
import { styles as lkAutomaticButtonGroupStyles } from "@shaloong/loongark-primitives/automatic-styles/button-group";
import { styles as lkAutomaticCardStyles } from "@shaloong/loongark-primitives/automatic-styles/card";
import { styles as lkAutomaticChipStyles } from "@shaloong/loongark-primitives/automatic-styles/chip";
import { styles as lkAutomaticContainerStyles } from "@shaloong/loongark-primitives/automatic-styles/container";
import { styles as lkAutomaticEmptyStyles } from "@shaloong/loongark-primitives/automatic-styles/empty";
import { styles as lkAutomaticGridStyles } from "@shaloong/loongark-primitives/automatic-styles/grid";
import { styles as lkAutomaticItemStyles } from "@shaloong/loongark-primitives/automatic-styles/item";
import { styles as lkAutomaticKbdStyles } from "@shaloong/loongark-primitives/automatic-styles/kbd";
import { styles as lkAutomaticLabelStyles } from "@shaloong/loongark-primitives/automatic-styles/label";
import { styles as lkAutomaticLinkStyles } from "@shaloong/loongark-primitives/automatic-styles/link";
import { styles as lkAutomaticListStyles } from "@shaloong/loongark-primitives/automatic-styles/list";
import { styles as lkAutomaticMenubarStyles } from "@shaloong/loongark-primitives/automatic-styles/menubar";
import { styles as lkAutomaticNativeSelectStyles } from "@shaloong/loongark-primitives/automatic-styles/native-select";
import { styles as lkAutomaticNavigationMenuStyles } from "@shaloong/loongark-primitives/automatic-styles/navigation-menu";
import { styles as lkAutomaticPaperStyles } from "@shaloong/loongark-primitives/automatic-styles/paper";
import { styles as lkAutomaticSeparatorStyles } from "@shaloong/loongark-primitives/automatic-styles/separator";
import { styles as lkAutomaticSidebarStyles } from "@shaloong/loongark-primitives/automatic-styles/sidebar";
import { styles as lkAutomaticSkeletonStyles } from "@shaloong/loongark-primitives/automatic-styles/skeleton";
import { styles as lkAutomaticSpinnerStyles } from "@shaloong/loongark-primitives/automatic-styles/spinner";
import { styles as lkAutomaticStackStyles } from "@shaloong/loongark-primitives/automatic-styles/stack";
import { styles as lkAutomaticTableStyles } from "@shaloong/loongark-primitives/automatic-styles/table";
import { styles as lkAutomaticTimelineStyles } from "@shaloong/loongark-primitives/automatic-styles/timeline";
import { styles as lkAutomaticTypographyStyles } from "@shaloong/loongark-primitives/automatic-styles/typography";
import { onMount, onCleanup } from "solid-js";
import { mountMenubar } from "@shaloong/loongark-kit";
import { splitProps, type JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import {
  layoutParts,
  layoutAttributes,
  layoutStyles,
  type LayoutPart,
  type LayoutOptions,
} from "@shaloong/loongark-kit";
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
export const LoongArkAlert = /*#__PURE__*/ withAutomaticStyles(make("Alert"), lkAutomaticAlertStyles);
export const LoongArkAlertTitle = /*#__PURE__*/ withAutomaticStyles(make("AlertTitle"), lkAutomaticAlertStyles);
export const LoongArkAlertDescription = /*#__PURE__*/ withAutomaticStyles(make("AlertDescription"), lkAutomaticAlertStyles);
export const LoongArkAspectRatio = /*#__PURE__*/ withAutomaticStyles(make("AspectRatio"), lkAutomaticAspectRatioStyles);
export const LoongArkBadge = /*#__PURE__*/ withAutomaticStyles(make("Badge"), lkAutomaticBadgeStyles);
export const LoongArkButtonGroup = /*#__PURE__*/ withAutomaticStyles(make("ButtonGroup"), lkAutomaticButtonGroupStyles);
export const LoongArkBreadcrumb = /*#__PURE__*/ withAutomaticStyles(make("Breadcrumb"), lkAutomaticBreadcrumbStyles);
export const LoongArkBreadcrumbList = /*#__PURE__*/ withAutomaticStyles(make("BreadcrumbList"), lkAutomaticBreadcrumbStyles);
export const LoongArkBreadcrumbItem = /*#__PURE__*/ withAutomaticStyles(make("BreadcrumbItem"), lkAutomaticBreadcrumbStyles);
export const LoongArkBreadcrumbLink = /*#__PURE__*/ withAutomaticStyles(make("BreadcrumbLink"), lkAutomaticBreadcrumbStyles);
export const LoongArkBreadcrumbPage = /*#__PURE__*/ withAutomaticStyles(make("BreadcrumbPage"), lkAutomaticBreadcrumbStyles);
export const LoongArkBreadcrumbSeparator = /*#__PURE__*/ withAutomaticStyles(make("BreadcrumbSeparator"), lkAutomaticBreadcrumbStyles);
export const LoongArkBreadcrumbEllipsis = /*#__PURE__*/ withAutomaticStyles(make("BreadcrumbEllipsis"), lkAutomaticBreadcrumbStyles);
export const LoongArkCard = /*#__PURE__*/ withAutomaticStyles(make("Card"), lkAutomaticCardStyles);
export const LoongArkCardHeader = /*#__PURE__*/ withAutomaticStyles(make("CardHeader"), lkAutomaticCardStyles);
export const LoongArkCardTitle = /*#__PURE__*/ withAutomaticStyles(make("CardTitle"), lkAutomaticCardStyles);
export const LoongArkCardDescription = /*#__PURE__*/ withAutomaticStyles(make("CardDescription"), lkAutomaticCardStyles);
export const LoongArkCardContent = /*#__PURE__*/ withAutomaticStyles(make("CardContent"), lkAutomaticCardStyles);
export const LoongArkCardFooter = /*#__PURE__*/ withAutomaticStyles(make("CardFooter"), lkAutomaticCardStyles);
export const LoongArkEmpty = /*#__PURE__*/ withAutomaticStyles(make("Empty"), lkAutomaticEmptyStyles);
export const LoongArkEmptyHeader = /*#__PURE__*/ withAutomaticStyles(make("EmptyHeader"), lkAutomaticEmptyStyles);
export const LoongArkEmptyTitle = /*#__PURE__*/ withAutomaticStyles(make("EmptyTitle"), lkAutomaticEmptyStyles);
export const LoongArkEmptyDescription = /*#__PURE__*/ withAutomaticStyles(make("EmptyDescription"), lkAutomaticEmptyStyles);
export const LoongArkEmptyMedia = /*#__PURE__*/ withAutomaticStyles(make("EmptyMedia"), lkAutomaticEmptyStyles);
export const LoongArkEmptyContent = /*#__PURE__*/ withAutomaticStyles(make("EmptyContent"), lkAutomaticEmptyStyles);
export const LoongArkItem = /*#__PURE__*/ withAutomaticStyles(make("Item"), lkAutomaticItemStyles);
export const LoongArkItemGroup = /*#__PURE__*/ withAutomaticStyles(make("ItemGroup"), lkAutomaticItemStyles);
export const LoongArkItemSeparator = /*#__PURE__*/ withAutomaticStyles(make("ItemSeparator"), lkAutomaticItemStyles);
export const LoongArkItemContent = /*#__PURE__*/ withAutomaticStyles(make("ItemContent"), lkAutomaticItemStyles);
export const LoongArkItemTitle = /*#__PURE__*/ withAutomaticStyles(make("ItemTitle"), lkAutomaticItemStyles);
export const LoongArkItemDescription = /*#__PURE__*/ withAutomaticStyles(make("ItemDescription"), lkAutomaticItemStyles);
export const LoongArkItemActions = /*#__PURE__*/ withAutomaticStyles(make("ItemActions"), lkAutomaticItemStyles);
export const LoongArkItemMedia = /*#__PURE__*/ withAutomaticStyles(make("ItemMedia"), lkAutomaticItemStyles);
export const LoongArkItemHeader = /*#__PURE__*/ withAutomaticStyles(make("ItemHeader"), lkAutomaticItemStyles);
export const LoongArkItemFooter = /*#__PURE__*/ withAutomaticStyles(make("ItemFooter"), lkAutomaticItemStyles);
export const LoongArkKbd = /*#__PURE__*/ withAutomaticStyles(make("Kbd"), lkAutomaticKbdStyles);
export const LoongArkKbdGroup = /*#__PURE__*/ withAutomaticStyles(make("KbdGroup"), lkAutomaticKbdStyles);
/** 原生选择框保留完整 Select 属性和事件目标类型，包括多选 value。 */
export type LoongArkNativeSelectProps = Omit<
  JSX.SelectHTMLAttributes<HTMLSelectElement>, "size"
> & LayoutOptions & { as?: LoongArkLayoutProps["as"] };
export const LoongArkNativeSelect = /*#__PURE__*/ withAutomaticStyles((props: LoongArkNativeSelectProps) => {
  const [local, rest] = splitProps(props, ["as", "variant", "size", "orientation", "ratio", "side", "gap", "padding", "columns", "active", "style"]);
  return <Dynamic component={local.as ?? "select"} {...layoutAttributes("NativeSelect", local)} {...rest} style={{
    ...layoutStyles(local),
    ...(typeof local.style === "object" ? local.style : {}),
  }} />;
}, lkAutomaticNativeSelectStyles);
export const LoongArkSeparator = /*#__PURE__*/ withAutomaticStyles(make("Separator"), lkAutomaticSeparatorStyles);
export const LoongArkSkeleton = /*#__PURE__*/ withAutomaticStyles(make("Skeleton"), lkAutomaticSkeletonStyles);
export const LoongArkSpinner = /*#__PURE__*/ withAutomaticStyles(make("Spinner"), lkAutomaticSpinnerStyles);
export const LoongArkTable = /*#__PURE__*/ withAutomaticStyles(make("Table"), lkAutomaticTableStyles);
export const LoongArkTableRoot = /*#__PURE__*/ withAutomaticStyles(make("TableRoot"), lkAutomaticTableStyles);
export const LoongArkTableHeader = /*#__PURE__*/ withAutomaticStyles(make("TableHeader"), lkAutomaticTableStyles);
export const LoongArkTableBody = /*#__PURE__*/ withAutomaticStyles(make("TableBody"), lkAutomaticTableStyles);
export const LoongArkTableFooter = /*#__PURE__*/ withAutomaticStyles(make("TableFooter"), lkAutomaticTableStyles);
export const LoongArkTableRow = /*#__PURE__*/ withAutomaticStyles(make("TableRow"), lkAutomaticTableStyles);
export const LoongArkTableHead = /*#__PURE__*/ withAutomaticStyles(make("TableHead"), lkAutomaticTableStyles);
export const LoongArkTableCell = /*#__PURE__*/ withAutomaticStyles(make("TableCell"), lkAutomaticTableStyles);
export const LoongArkTableCaption = /*#__PURE__*/ withAutomaticStyles(make("TableCaption"), lkAutomaticTableStyles);
export const LoongArkTypography = /*#__PURE__*/ withAutomaticStyles(make("Typography"), lkAutomaticTypographyStyles);
export const LoongArkDirection = make("Direction");
export const LoongArkLabel = /*#__PURE__*/ withAutomaticStyles(make("Label"), lkAutomaticLabelStyles);
export const LoongArkNavigationMenu = /*#__PURE__*/ withAutomaticStyles(make("NavigationMenu"), lkAutomaticNavigationMenuStyles);
export const LoongArkNavigationMenuList = /*#__PURE__*/ withAutomaticStyles(make("NavigationMenuList"), lkAutomaticNavigationMenuStyles);
export const LoongArkNavigationMenuItem = /*#__PURE__*/ withAutomaticStyles(make("NavigationMenuItem"), lkAutomaticNavigationMenuStyles);
export const LoongArkNavigationMenuLink = /*#__PURE__*/ withAutomaticStyles(make("NavigationMenuLink"), lkAutomaticNavigationMenuStyles);
export const LoongArkMenubar = /*#__PURE__*/ withAutomaticStyles((props: LoongArkLayoutProps) => {
  let element: HTMLDivElement | undefined;
  let release: (() => void) | undefined;
  onMount(() => {
    if (element) release = mountMenubar(element);
  });
  onCleanup(() => release?.());
  return <div {...layoutAttributes("Menubar")} {...props} ref={element} />;
}, lkAutomaticMenubarStyles);
export const LoongArkSidebar = /*#__PURE__*/ withAutomaticStyles(make("Sidebar"), lkAutomaticSidebarStyles);
export const LoongArkSidebarHeader = /*#__PURE__*/ withAutomaticStyles(make("SidebarHeader"), lkAutomaticSidebarStyles);
export const LoongArkSidebarContent = /*#__PURE__*/ withAutomaticStyles(make("SidebarContent"), lkAutomaticSidebarStyles);
export const LoongArkSidebarFooter = /*#__PURE__*/ withAutomaticStyles(make("SidebarFooter"), lkAutomaticSidebarStyles);
export const LoongArkSidebarGroup = /*#__PURE__*/ withAutomaticStyles(make("SidebarGroup"), lkAutomaticSidebarStyles);
export const LoongArkSidebarGroupLabel = /*#__PURE__*/ withAutomaticStyles(make("SidebarGroupLabel"), lkAutomaticSidebarStyles);
export const LoongArkSidebarMenu = /*#__PURE__*/ withAutomaticStyles(make("SidebarMenu"), lkAutomaticSidebarStyles);
export const LoongArkSidebarMenuItem = /*#__PURE__*/ withAutomaticStyles(make("SidebarMenuItem"), lkAutomaticSidebarStyles);
export const LoongArkSidebarMenuButton = /*#__PURE__*/ withAutomaticStyles(make("SidebarMenuButton"), lkAutomaticSidebarStyles);
export const LoongArkSidebarInset = /*#__PURE__*/ withAutomaticStyles(make("SidebarInset"), lkAutomaticSidebarStyles);

export const LoongArkLink = /*#__PURE__*/ withAutomaticStyles(make("Link"), lkAutomaticLinkStyles);
export const LoongArkChip = /*#__PURE__*/ withAutomaticStyles(make("Chip"), lkAutomaticChipStyles);
export const LoongArkChipLabel = /*#__PURE__*/ withAutomaticStyles(make("ChipLabel"), lkAutomaticChipStyles);
export const LoongArkChipRemoveTrigger = /*#__PURE__*/ withAutomaticStyles(make("ChipRemoveTrigger"), lkAutomaticChipStyles);
export const LoongArkList = /*#__PURE__*/ withAutomaticStyles(make("List"), lkAutomaticListStyles);
export const LoongArkListItem = /*#__PURE__*/ withAutomaticStyles(make("ListItem"), lkAutomaticListStyles);
export const LoongArkListItemButton = /*#__PURE__*/ withAutomaticStyles(make("ListItemButton"), lkAutomaticListStyles);
export const LoongArkListItemLink = /*#__PURE__*/ withAutomaticStyles(make("ListItemLink"), lkAutomaticListStyles);
export const LoongArkListItemIcon = /*#__PURE__*/ withAutomaticStyles(make("ListItemIcon"), lkAutomaticListStyles);
export const LoongArkListItemText = /*#__PURE__*/ withAutomaticStyles(make("ListItemText"), lkAutomaticListStyles);
export const LoongArkListItemDescription = /*#__PURE__*/ withAutomaticStyles(make("ListItemDescription"), lkAutomaticListStyles);
export const LoongArkAvatarGroup = /*#__PURE__*/ withAutomaticStyles(make("AvatarGroup"), lkAutomaticAvatarGroupStyles);
export const LoongArkAvatarGroupOverflow = /*#__PURE__*/ withAutomaticStyles(make("AvatarGroupOverflow"), lkAutomaticAvatarGroupStyles);
export const LoongArkPaper = /*#__PURE__*/ withAutomaticStyles(make("Paper"), lkAutomaticPaperStyles);
export const LoongArkBox = /*#__PURE__*/ withAutomaticStyles(make("Box"), lkAutomaticBoxStyles);
export const LoongArkStack = /*#__PURE__*/ withAutomaticStyles(make("Stack"), lkAutomaticStackStyles);
export const LoongArkContainer = /*#__PURE__*/ withAutomaticStyles(make("Container"), lkAutomaticContainerStyles);
export const LoongArkGrid = /*#__PURE__*/ withAutomaticStyles(make("Grid"), lkAutomaticGridStyles);
export const LoongArkTimeline = /*#__PURE__*/ withAutomaticStyles(make("Timeline"), lkAutomaticTimelineStyles);
export const LoongArkTimelineItem = /*#__PURE__*/ withAutomaticStyles(make("TimelineItem"), lkAutomaticTimelineStyles);
export const LoongArkTimelineIndicator = /*#__PURE__*/ withAutomaticStyles(make("TimelineIndicator"), lkAutomaticTimelineStyles);
export const LoongArkTimelineContent = /*#__PURE__*/ withAutomaticStyles(make("TimelineContent"), lkAutomaticTimelineStyles);
export const LoongArkTimelineTitle = /*#__PURE__*/ withAutomaticStyles(make("TimelineTitle"), lkAutomaticTimelineStyles);
export const LoongArkTimelineDescription = /*#__PURE__*/ withAutomaticStyles(make("TimelineDescription"), lkAutomaticTimelineStyles);
export const LoongArkTimelineTime = /*#__PURE__*/ withAutomaticStyles(make("TimelineTime"), lkAutomaticTimelineStyles);
export const LoongArkAppBar = /*#__PURE__*/ withAutomaticStyles(make("AppBar"), lkAutomaticAppBarStyles);
export const LoongArkToolbar = /*#__PURE__*/ withAutomaticStyles(make("Toolbar"), lkAutomaticAppBarStyles);
export const LoongArkBottomNavigation = /*#__PURE__*/ withAutomaticStyles(make("BottomNavigation"), lkAutomaticBottomNavigationStyles);
export const LoongArkBottomNavigationItem = /*#__PURE__*/ withAutomaticStyles(make("BottomNavigationItem"), lkAutomaticBottomNavigationStyles);
export const LoongArkBottomNavigationIcon = /*#__PURE__*/ withAutomaticStyles(make("BottomNavigationIcon"), lkAutomaticBottomNavigationStyles);
export const LoongArkBottomNavigationLabel = /*#__PURE__*/ withAutomaticStyles(make("BottomNavigationLabel"), lkAutomaticBottomNavigationStyles);
