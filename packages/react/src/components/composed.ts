"use client";
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticAlertDialogStyles } from "@loongark/primitives/automatic-styles/alert-dialog";
import { styles as lkAutomaticCalendarStyles } from "@loongark/primitives/automatic-styles/calendar";
import { styles as lkAutomaticCommandStyles } from "@loongark/primitives/automatic-styles/command";
import { styles as lkAutomaticContextMenuStyles } from "@loongark/primitives/automatic-styles/context-menu";
import { styles as lkAutomaticMenubarStyles } from "@loongark/primitives/automatic-styles/menubar";
import { styles as lkAutomaticNavigationMenuStyles } from "@loongark/primitives/automatic-styles/navigation-menu";
import { styles as lkAutomaticSheetStyles } from "@loongark/primitives/automatic-styles/sheet";
import { styles as lkAutomaticSidebarStyles } from "@loongark/primitives/automatic-styles/sidebar";


import { createMenuContextTrigger } from "./menu";
import { DialogAction, DialogCancel } from "./dialog-actions";
import { dataProps } from "../data-props";
import { Dialog } from "@ark-ui/react/dialog";
import { Menu } from "@ark-ui/react/menu";
import { Popover } from "@ark-ui/react/popover";
import { Collapsible } from "@ark-ui/react/collapsible";
import { Combobox, createListCollection } from "@ark-ui/react/combobox";
import { DatePicker } from "@ark-ui/react/date-picker";
import { LoongArkPortal } from "./portal";
import {
  createElement,
  forwardRef,
  type ComponentPropsWithoutRef,
} from "react";
const alertRoot = (props: ComponentPropsWithoutRef<typeof Dialog.Root>) =>
  createElement(Dialog.Root, {
    role: "alertdialog",
    closeOnInteractOutside: false,
    ...props,
  });
const content = (scope: "sheet" | "drawer") =>
  forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof Dialog.Content>>(
    (props, ref) =>
      createElement(
        Dialog.Content,
        dataProps({
          ...props,
          ref,
          "data-scope": scope,
          "data-part": "content",
        }),
      ),
  );
export const LoongArkAlertDialog = /*#__PURE__*/ withAutomaticStyles({
  ...Dialog,
  Root: alertRoot,
  Portal: LoongArkPortal,
  Content: Dialog.Content,
  Overlay: Dialog.Backdrop,
  Action: DialogAction,
  Cancel: DialogCancel,
}, lkAutomaticAlertDialogStyles);
export const LoongArkAlertDialogRoot: typeof LoongArkAlertDialog.Root =
  /*#__PURE__*/ withAutomaticStyles(LoongArkAlertDialog.Root, lkAutomaticAlertDialogStyles);
export const LoongArkAlertDialogTrigger: typeof LoongArkAlertDialog.Trigger =
  /*#__PURE__*/ withAutomaticStyles(LoongArkAlertDialog.Trigger, lkAutomaticAlertDialogStyles);
export const LoongArkAlertDialogPortal: typeof LoongArkAlertDialog.Portal =
  /*#__PURE__*/ withAutomaticStyles(LoongArkAlertDialog.Portal, lkAutomaticAlertDialogStyles);
export const LoongArkAlertDialogOverlay: typeof LoongArkAlertDialog.Overlay =
  /*#__PURE__*/ withAutomaticStyles(LoongArkAlertDialog.Overlay, lkAutomaticAlertDialogStyles);
export const LoongArkAlertDialogPositioner: typeof LoongArkAlertDialog.Positioner =
  /*#__PURE__*/ withAutomaticStyles(LoongArkAlertDialog.Positioner, lkAutomaticAlertDialogStyles);
export const LoongArkAlertDialogContent: typeof LoongArkAlertDialog.Content =
  /*#__PURE__*/ withAutomaticStyles(LoongArkAlertDialog.Content, lkAutomaticAlertDialogStyles);
export const LoongArkAlertDialogTitle: typeof LoongArkAlertDialog.Title =
  /*#__PURE__*/ withAutomaticStyles(LoongArkAlertDialog.Title, lkAutomaticAlertDialogStyles);
export const LoongArkAlertDialogDescription: typeof LoongArkAlertDialog.Description =
  /*#__PURE__*/ withAutomaticStyles(LoongArkAlertDialog.Description, lkAutomaticAlertDialogStyles);
export const LoongArkAlertDialogCloseTrigger: typeof LoongArkAlertDialog.CloseTrigger =
  /*#__PURE__*/ withAutomaticStyles(LoongArkAlertDialog.CloseTrigger, lkAutomaticAlertDialogStyles);
export const LoongArkAlertDialogAction: typeof LoongArkAlertDialog.Action =
  /*#__PURE__*/ withAutomaticStyles(LoongArkAlertDialog.Action, lkAutomaticAlertDialogStyles);
export const LoongArkAlertDialogCancel: typeof LoongArkAlertDialog.Cancel =
  /*#__PURE__*/ withAutomaticStyles(LoongArkAlertDialog.Cancel, lkAutomaticAlertDialogStyles);
export const LoongArkSheet = /*#__PURE__*/ withAutomaticStyles({
  ...Dialog,
  Root: Dialog.Root,
  Portal: LoongArkPortal,
  Content: content("sheet"),
  Overlay: Dialog.Backdrop,
  Action: DialogAction,
  Cancel: DialogCancel,
}, lkAutomaticSheetStyles);
export const LoongArkSheetRoot: typeof LoongArkSheet.Root = /*#__PURE__*/ withAutomaticStyles(LoongArkSheet.Root, lkAutomaticSheetStyles);
export const LoongArkSheetTrigger: typeof LoongArkSheet.Trigger =
  /*#__PURE__*/ withAutomaticStyles(LoongArkSheet.Trigger, lkAutomaticSheetStyles);
export const LoongArkSheetPortal: typeof LoongArkSheet.Portal =
  /*#__PURE__*/ withAutomaticStyles(LoongArkSheet.Portal, lkAutomaticSheetStyles);
export const LoongArkSheetOverlay: typeof LoongArkSheet.Overlay =
  /*#__PURE__*/ withAutomaticStyles(LoongArkSheet.Overlay, lkAutomaticSheetStyles);
export const LoongArkSheetPositioner: typeof LoongArkSheet.Positioner =
  /*#__PURE__*/ withAutomaticStyles(LoongArkSheet.Positioner, lkAutomaticSheetStyles);
export const LoongArkSheetContent: typeof LoongArkSheet.Content =
  /*#__PURE__*/ withAutomaticStyles(LoongArkSheet.Content, lkAutomaticSheetStyles);
export const LoongArkSheetTitle: typeof LoongArkSheet.Title =
  /*#__PURE__*/ withAutomaticStyles(LoongArkSheet.Title, lkAutomaticSheetStyles);
export const LoongArkSheetDescription: typeof LoongArkSheet.Description =
  /*#__PURE__*/ withAutomaticStyles(LoongArkSheet.Description, lkAutomaticSheetStyles);
export const LoongArkSheetCloseTrigger: typeof LoongArkSheet.CloseTrigger =
  /*#__PURE__*/ withAutomaticStyles(LoongArkSheet.CloseTrigger, lkAutomaticSheetStyles);
export const LoongArkSheetAction: typeof LoongArkSheet.Action =
  /*#__PURE__*/ withAutomaticStyles(LoongArkSheet.Action, lkAutomaticSheetStyles);
export const LoongArkSheetCancel: typeof LoongArkSheet.Cancel =
  /*#__PURE__*/ withAutomaticStyles(LoongArkSheet.Cancel, lkAutomaticSheetStyles);
export const LoongArkCommand = /*#__PURE__*/ withAutomaticStyles(Combobox, lkAutomaticCommandStyles);
export { createListCollection as createCommandCollection };
const contextTrigger = createMenuContextTrigger(false);
export const LoongArkContextMenu = /*#__PURE__*/ withAutomaticStyles({
  ...Menu,
  Trigger: contextTrigger,
  ContextTrigger: contextTrigger,
}, lkAutomaticContextMenuStyles);
export const LoongArkCalendar = /*#__PURE__*/ withAutomaticStyles(DatePicker, lkAutomaticCalendarStyles);
export const LoongArkSidebarProvider: typeof Collapsible.Root =
  /*#__PURE__*/ withAutomaticStyles(Collapsible.Root, lkAutomaticSidebarStyles);
export const LoongArkSidebarTrigger: typeof Collapsible.Trigger =
  /*#__PURE__*/ withAutomaticStyles(Collapsible.Trigger, lkAutomaticSidebarStyles);
export const LoongArkSidebarPanel: typeof Collapsible.Content =
  /*#__PURE__*/ withAutomaticStyles(Collapsible.Content, lkAutomaticSidebarStyles);
export const LoongArkCommandRoot: typeof Combobox.Root = /*#__PURE__*/ withAutomaticStyles(Combobox.Root, lkAutomaticCommandStyles);
export const LoongArkCommandInput: typeof Combobox.Input = /*#__PURE__*/ withAutomaticStyles(Combobox.Input, lkAutomaticCommandStyles);
export const LoongArkCommandContent: typeof Combobox.Content = /*#__PURE__*/ withAutomaticStyles(Combobox.Content, lkAutomaticCommandStyles);
export const LoongArkCommandControl: typeof Combobox.Control = /*#__PURE__*/ withAutomaticStyles(Combobox.Control, lkAutomaticCommandStyles);
export const LoongArkCommandPositioner: typeof Combobox.Positioner =
  /*#__PURE__*/ withAutomaticStyles(Combobox.Positioner, lkAutomaticCommandStyles);
export const LoongArkCommandItem: typeof Combobox.Item = /*#__PURE__*/ withAutomaticStyles(Combobox.Item, lkAutomaticCommandStyles);
export const LoongArkCommandItemText: typeof Combobox.ItemText =
  /*#__PURE__*/ withAutomaticStyles(Combobox.ItemText, lkAutomaticCommandStyles);
export const LoongArkCommandItemGroup: typeof Combobox.ItemGroup =
  /*#__PURE__*/ withAutomaticStyles(Combobox.ItemGroup, lkAutomaticCommandStyles);
export const LoongArkCommandItemGroupLabel: typeof Combobox.ItemGroupLabel =
  /*#__PURE__*/ withAutomaticStyles(Combobox.ItemGroupLabel, lkAutomaticCommandStyles);
export const LoongArkCommandLabel: typeof Combobox.Label = /*#__PURE__*/ withAutomaticStyles(Combobox.Label, lkAutomaticCommandStyles);
export const LoongArkCommandTrigger: typeof Combobox.Trigger = /*#__PURE__*/ withAutomaticStyles(Combobox.Trigger, lkAutomaticCommandStyles);
export const LoongArkMenubarRoot: typeof Menu.Root = /*#__PURE__*/ withAutomaticStyles(Menu.Root, lkAutomaticMenubarStyles);
export const LoongArkMenubarTrigger: typeof Menu.Trigger = /*#__PURE__*/ withAutomaticStyles(Menu.Trigger, lkAutomaticMenubarStyles);
export const LoongArkMenubarPositioner: typeof Menu.Positioner =
  /*#__PURE__*/ withAutomaticStyles(Menu.Positioner, lkAutomaticMenubarStyles);
export const LoongArkMenubarContent: typeof Menu.Content = /*#__PURE__*/ withAutomaticStyles(Menu.Content, lkAutomaticMenubarStyles);
export const LoongArkMenubarItem: typeof Menu.Item = /*#__PURE__*/ withAutomaticStyles(Menu.Item, lkAutomaticMenubarStyles);
export const LoongArkMenubarItemText: typeof Menu.ItemText = /*#__PURE__*/ withAutomaticStyles(Menu.ItemText, lkAutomaticMenubarStyles);
export const LoongArkMenubarSeparator: typeof Menu.Separator = /*#__PURE__*/ withAutomaticStyles(Menu.Separator, lkAutomaticMenubarStyles);
export const LoongArkNavigationMenuRoot: typeof Popover.Root = /*#__PURE__*/ withAutomaticStyles(Popover.Root, lkAutomaticNavigationMenuStyles);
export const LoongArkNavigationMenuTrigger: typeof Popover.Trigger =
  /*#__PURE__*/ withAutomaticStyles(Popover.Trigger, lkAutomaticNavigationMenuStyles);
export const LoongArkNavigationMenuPositioner: typeof Popover.Positioner =
  /*#__PURE__*/ withAutomaticStyles(Popover.Positioner, lkAutomaticNavigationMenuStyles);
export const LoongArkNavigationMenuContent: typeof Popover.Content =
  /*#__PURE__*/ withAutomaticStyles(Popover.Content, lkAutomaticNavigationMenuStyles);
export const LoongArkNavigationMenuCloseTrigger: typeof Popover.CloseTrigger =
  /*#__PURE__*/ withAutomaticStyles(Popover.CloseTrigger, lkAutomaticNavigationMenuStyles);
export const filterCommandItems = <T>(
  items: readonly T[],
  query: string,
  itemToString: (item: T) => string,
) =>
  items.filter((item) =>
    itemToString(item)
      .toLocaleLowerCase()
      .includes(query.trim().toLocaleLowerCase()),
  );
