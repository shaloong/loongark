import { DrawerRoot, DrawerRootProvider } from "./drawer-roots";
import { Drawer } from "@ark-ui/react/drawer";
import { DrawerAction, DrawerCancel } from "./drawer-actions";
import { LoongArkPortal } from "./portal";
export const LoongArkDrawer: Omit<typeof Drawer, "Root" | "RootProvider"> & {
  Root: typeof DrawerRoot;
  RootProvider: typeof DrawerRootProvider;
  Portal: typeof LoongArkPortal;
  Overlay: typeof Drawer.Backdrop;
  Action: typeof DrawerAction;
  Cancel: typeof DrawerCancel;
} = {
  ...Drawer,
  Root: DrawerRoot,
  RootProvider: DrawerRootProvider,
  Portal: LoongArkPortal,
  Overlay: Drawer.Backdrop,
  Action: DrawerAction,
  Cancel: DrawerCancel,
};
export const LoongArkDrawerAction: typeof LoongArkDrawer.Action =
  LoongArkDrawer.Action;
export const LoongArkDrawerCancel: typeof LoongArkDrawer.Cancel =
  LoongArkDrawer.Cancel;
export const LoongArkDrawerCloseTrigger: typeof LoongArkDrawer.CloseTrigger =
  LoongArkDrawer.CloseTrigger;
export const LoongArkDrawerContent: typeof LoongArkDrawer.Content =
  LoongArkDrawer.Content;
export const LoongArkDrawerContext: typeof LoongArkDrawer.Context =
  LoongArkDrawer.Context;
export const LoongArkDrawerDescription: typeof LoongArkDrawer.Description =
  LoongArkDrawer.Description;
export const LoongArkDrawerGrabber: typeof LoongArkDrawer.Grabber =
  LoongArkDrawer.Grabber;
export const LoongArkDrawerGrabberIndicator: typeof LoongArkDrawer.GrabberIndicator =
  LoongArkDrawer.GrabberIndicator;
export const LoongArkDrawerIndent: typeof LoongArkDrawer.Indent =
  LoongArkDrawer.Indent;
export const LoongArkDrawerIndentBackground: typeof LoongArkDrawer.IndentBackground =
  LoongArkDrawer.IndentBackground;
export const LoongArkDrawerOverlay: typeof LoongArkDrawer.Overlay =
  LoongArkDrawer.Overlay;
export const LoongArkDrawerPortal: typeof LoongArkDrawer.Portal =
  LoongArkDrawer.Portal;
export const LoongArkDrawerPositioner: typeof LoongArkDrawer.Positioner =
  LoongArkDrawer.Positioner;
export const LoongArkDrawerRoot: typeof LoongArkDrawer.Root =
  LoongArkDrawer.Root;
export const LoongArkDrawerRootProvider: typeof LoongArkDrawer.RootProvider =
  LoongArkDrawer.RootProvider;
export const LoongArkDrawerStack: typeof LoongArkDrawer.Stack =
  LoongArkDrawer.Stack;
export const LoongArkDrawerSwipeArea: typeof LoongArkDrawer.SwipeArea =
  LoongArkDrawer.SwipeArea;
export const LoongArkDrawerTitle: typeof LoongArkDrawer.Title =
  LoongArkDrawer.Title;
export const LoongArkDrawerTrigger: typeof LoongArkDrawer.Trigger =
  LoongArkDrawer.Trigger;
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
