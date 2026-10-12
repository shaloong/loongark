
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticDrawerStyles } from "@loongark/primitives/automatic-styles/drawer";
import { DrawerGrabber } from "./drawer-grabber";
import { DrawerRoot, DrawerRootProvider } from "./drawer-roots";
import { Drawer } from "@ark-ui/react/drawer";
import { DrawerAction, DrawerCancel } from "./drawer-actions";
import { LoongArkPortal } from "./portal";
export const LoongArkDrawer: Omit<typeof Drawer, "Root" | "RootProvider" | "Grabber"> & {
  Grabber: typeof DrawerGrabber;
  Root: typeof DrawerRoot;
  RootProvider: typeof DrawerRootProvider;
  Portal: typeof LoongArkPortal;
  Overlay: typeof Drawer.Backdrop;
  Action: typeof DrawerAction;
  Cancel: typeof DrawerCancel;
} = /*#__PURE__*/ withAutomaticStyles({
  ...Drawer,
  Grabber: DrawerGrabber,
  Root: DrawerRoot,
  RootProvider: DrawerRootProvider,
  Portal: LoongArkPortal,
  Overlay: Drawer.Backdrop,
  Action: DrawerAction,
  Cancel: DrawerCancel,
}, lkAutomaticDrawerStyles);
export const LoongArkDrawerAction: typeof LoongArkDrawer.Action =
  /*#__PURE__*/ withAutomaticStyles(LoongArkDrawer.Action, lkAutomaticDrawerStyles);
export const LoongArkDrawerCancel: typeof LoongArkDrawer.Cancel =
  /*#__PURE__*/ withAutomaticStyles(LoongArkDrawer.Cancel, lkAutomaticDrawerStyles);
export const LoongArkDrawerCloseTrigger: typeof LoongArkDrawer.CloseTrigger =
  /*#__PURE__*/ withAutomaticStyles(LoongArkDrawer.CloseTrigger, lkAutomaticDrawerStyles);
export const LoongArkDrawerContent: typeof LoongArkDrawer.Content =
  /*#__PURE__*/ withAutomaticStyles(LoongArkDrawer.Content, lkAutomaticDrawerStyles);
export const LoongArkDrawerContext: typeof LoongArkDrawer.Context =
  /*#__PURE__*/ withAutomaticStyles(LoongArkDrawer.Context, lkAutomaticDrawerStyles);
export const LoongArkDrawerDescription: typeof LoongArkDrawer.Description =
  /*#__PURE__*/ withAutomaticStyles(LoongArkDrawer.Description, lkAutomaticDrawerStyles);
export const LoongArkDrawerGrabber: typeof LoongArkDrawer.Grabber =
  /*#__PURE__*/ withAutomaticStyles(LoongArkDrawer.Grabber, lkAutomaticDrawerStyles);
export const LoongArkDrawerGrabberIndicator: typeof LoongArkDrawer.GrabberIndicator =
  /*#__PURE__*/ withAutomaticStyles(LoongArkDrawer.GrabberIndicator, lkAutomaticDrawerStyles);
export const LoongArkDrawerIndent: typeof LoongArkDrawer.Indent =
  /*#__PURE__*/ withAutomaticStyles(LoongArkDrawer.Indent, lkAutomaticDrawerStyles);
export const LoongArkDrawerIndentBackground: typeof LoongArkDrawer.IndentBackground =
  /*#__PURE__*/ withAutomaticStyles(LoongArkDrawer.IndentBackground, lkAutomaticDrawerStyles);
export const LoongArkDrawerOverlay: typeof LoongArkDrawer.Overlay =
  /*#__PURE__*/ withAutomaticStyles(LoongArkDrawer.Overlay, lkAutomaticDrawerStyles);
export const LoongArkDrawerPortal: typeof LoongArkDrawer.Portal =
  /*#__PURE__*/ withAutomaticStyles(LoongArkDrawer.Portal, lkAutomaticDrawerStyles);
export const LoongArkDrawerPositioner: typeof LoongArkDrawer.Positioner =
  /*#__PURE__*/ withAutomaticStyles(LoongArkDrawer.Positioner, lkAutomaticDrawerStyles);
export const LoongArkDrawerRoot: typeof LoongArkDrawer.Root =
  /*#__PURE__*/ withAutomaticStyles(LoongArkDrawer.Root, lkAutomaticDrawerStyles);
export const LoongArkDrawerRootProvider: typeof LoongArkDrawer.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(LoongArkDrawer.RootProvider, lkAutomaticDrawerStyles);
export const LoongArkDrawerStack: typeof LoongArkDrawer.Stack =
  /*#__PURE__*/ withAutomaticStyles(LoongArkDrawer.Stack, lkAutomaticDrawerStyles);
export const LoongArkDrawerSwipeArea: typeof LoongArkDrawer.SwipeArea =
  /*#__PURE__*/ withAutomaticStyles(LoongArkDrawer.SwipeArea, lkAutomaticDrawerStyles);
export const LoongArkDrawerTitle: typeof LoongArkDrawer.Title =
  /*#__PURE__*/ withAutomaticStyles(LoongArkDrawer.Title, lkAutomaticDrawerStyles);
export const LoongArkDrawerTrigger: typeof LoongArkDrawer.Trigger =
  /*#__PURE__*/ withAutomaticStyles(LoongArkDrawer.Trigger, lkAutomaticDrawerStyles);
export {
  useDrawer,
  useDrawerContext,
  useDrawerStackContext,
} from "@ark-ui/react/drawer";
export type {
  UseDrawerProps,
  UseDrawerReturn,
  DrawerRootProps,
  DrawerOpenChangeDetails,
  DrawerSnapPointChangeDetails,
  DrawerTriggerValueChangeDetails,
} from "@ark-ui/react/drawer";
