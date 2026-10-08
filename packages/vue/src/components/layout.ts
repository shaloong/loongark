import { ref, onMounted, onBeforeUnmount } from "vue";
import { mountMenubar } from "@loongark/kit";
import { defineComponent, h, type PropType } from "vue";
import {
  layoutParts,
  layoutAttributes,
  layoutStyles,
  type LayoutPart,
  type LayoutOptions,
} from "@loongark/kit";
const make = (part: LayoutPart) =>
  defineComponent({
    name: "LoongArk" + part,
    inheritAttrs: false,
    props: {
      as: { type: String, default: layoutParts[part][0] },
      variant: {
        type: String as PropType<LayoutOptions["variant"]>,
        default: "default",
      },
      size: { type: String as PropType<LayoutOptions["size"]>, default: "md" },
      orientation: {
        type: String as PropType<LayoutOptions["orientation"]>,
        default: part === "Stack" ? "vertical" : "horizontal",
      },
      ratio: Number,
      gap: String as PropType<LayoutOptions["gap"]>,
      padding: String as PropType<LayoutOptions["padding"]>,
      columns: Number,
      active: Boolean,
    },
    setup(props, { slots, attrs }) {
      return () =>
        h(
          props.as,
          {
            ...layoutAttributes(part, props),
            ...attrs,
            style: [layoutStyles(props), attrs.style],
          },
          slots.default?.(),
        );
    },
  });
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
export const LoongArkNativeSelect = make("NativeSelect");
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
export const LoongArkMenubar = defineComponent({
  name: "LoongArkMenubar",
  inheritAttrs: false,
  setup(_, context) {
    const element = ref<HTMLElement>();
    let release: (() => void) | undefined;
    onMounted(() => {
      if (element.value) release = mountMenubar(element.value);
    });
    onBeforeUnmount(() => release?.());
    return () =>
      h(
        "div",
        { ...layoutAttributes("Menubar"), ...context.attrs, ref: element },
        context.slots.default?.(),
      );
  },
});
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
