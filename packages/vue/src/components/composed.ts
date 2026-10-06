import { createMenuContextTrigger } from "./menu";
import { DialogAction, DialogCancel } from "./dialog-actions";
import { Dialog } from "@ark-ui/vue/dialog";
import { Menu } from "@ark-ui/vue/menu";
import { Popover } from "@ark-ui/vue/popover";
import { Collapsible } from "@ark-ui/vue/collapsible";
import { Combobox, createListCollection } from "@ark-ui/vue/combobox";
import { DatePicker } from "@ark-ui/vue/date-picker";
import { LoongArkPortal } from "./portal";
import { defineComponent } from "vue";
import { renderPart } from "../render-part";
const alertRoot = defineComponent({
  inheritAttrs: false,
  setup(_, context) {
    return () =>
      renderPart(
        Dialog.Root,
        {
          role: "alertdialog",
          closeOnInteractOutside: false,
          ...context.attrs,
        },
        context.slots,
      );
  },
});
const content = (scope: "sheet" | "drawer") =>
  defineComponent({
    setup(_, context) {
      return () =>
        renderPart(
          Dialog.Content,
          { ...context.attrs, "data-scope": scope, "data-part": "content" },
          context.slots,
        );
    },
  });
export const LoongArkAlertDialog: Omit<typeof Dialog, "Root" | "Portal"> & {
  Root: typeof alertRoot;
  Portal: typeof LoongArkPortal;
  Overlay: typeof Dialog.Backdrop;
  Action: typeof DialogAction;
  Cancel: typeof DialogCancel;
} = {
  ...Dialog,
  Root: alertRoot,
  Portal: LoongArkPortal,
  Content: Dialog.Content,
  Overlay: Dialog.Backdrop,
  Action: DialogAction,
  Cancel: DialogCancel,
};
export const LoongArkAlertDialogRoot: typeof LoongArkAlertDialog.Root =
  LoongArkAlertDialog.Root;
export const LoongArkAlertDialogTrigger: typeof LoongArkAlertDialog.Trigger =
  LoongArkAlertDialog.Trigger;
export const LoongArkAlertDialogPortal: typeof LoongArkAlertDialog.Portal =
  LoongArkAlertDialog.Portal;
export const LoongArkAlertDialogOverlay: typeof LoongArkAlertDialog.Overlay =
  LoongArkAlertDialog.Overlay;
export const LoongArkAlertDialogPositioner: typeof LoongArkAlertDialog.Positioner =
  LoongArkAlertDialog.Positioner;
export const LoongArkAlertDialogContent: typeof LoongArkAlertDialog.Content =
  LoongArkAlertDialog.Content;
export const LoongArkAlertDialogTitle: typeof LoongArkAlertDialog.Title =
  LoongArkAlertDialog.Title;
export const LoongArkAlertDialogDescription: typeof LoongArkAlertDialog.Description =
  LoongArkAlertDialog.Description;
export const LoongArkAlertDialogCloseTrigger: typeof LoongArkAlertDialog.CloseTrigger =
  LoongArkAlertDialog.CloseTrigger;
export const LoongArkAlertDialogAction: typeof LoongArkAlertDialog.Action =
  LoongArkAlertDialog.Action;
export const LoongArkAlertDialogCancel: typeof LoongArkAlertDialog.Cancel =
  LoongArkAlertDialog.Cancel;
export const LoongArkSheet: Omit<typeof Dialog, "Content" | "Portal"> & {
  Content: ReturnType<typeof content>;
  Portal: typeof LoongArkPortal;
  Overlay: typeof Dialog.Backdrop;
  Action: typeof DialogAction;
  Cancel: typeof DialogCancel;
} = {
  ...Dialog,
  Root: Dialog.Root,
  Portal: LoongArkPortal,
  Content: content("sheet"),
  Overlay: Dialog.Backdrop,
  Action: DialogAction,
  Cancel: DialogCancel,
};
export const LoongArkSheetRoot: typeof LoongArkSheet.Root = LoongArkSheet.Root;
export const LoongArkSheetTrigger: typeof LoongArkSheet.Trigger =
  LoongArkSheet.Trigger;
export const LoongArkSheetPortal: typeof LoongArkSheet.Portal =
  LoongArkSheet.Portal;
export const LoongArkSheetOverlay: typeof LoongArkSheet.Overlay =
  LoongArkSheet.Overlay;
export const LoongArkSheetPositioner: typeof LoongArkSheet.Positioner =
  LoongArkSheet.Positioner;
export const LoongArkSheetContent: typeof LoongArkSheet.Content =
  LoongArkSheet.Content;
export const LoongArkSheetTitle: typeof LoongArkSheet.Title =
  LoongArkSheet.Title;
export const LoongArkSheetDescription: typeof LoongArkSheet.Description =
  LoongArkSheet.Description;
export const LoongArkSheetCloseTrigger: typeof LoongArkSheet.CloseTrigger =
  LoongArkSheet.CloseTrigger;
export const LoongArkSheetAction: typeof LoongArkSheet.Action =
  LoongArkSheet.Action;
export const LoongArkSheetCancel: typeof LoongArkSheet.Cancel =
  LoongArkSheet.Cancel;
export const LoongArkCommand: typeof Combobox = Combobox;
export { createListCollection as createCommandCollection };
const contextTrigger = createMenuContextTrigger(false);
export const LoongArkContextMenu: Omit<
  typeof Menu,
  "Trigger" | "ContextTrigger"
> & {
  Trigger: typeof contextTrigger;
  ContextTrigger: typeof contextTrigger;
} = { ...Menu, Trigger: contextTrigger, ContextTrigger: contextTrigger };
export const LoongArkCalendar: typeof DatePicker = DatePicker;
export const LoongArkSidebarProvider: typeof Collapsible.Root =
  Collapsible.Root;
export const LoongArkSidebarTrigger: typeof Collapsible.Trigger =
  Collapsible.Trigger;
export const LoongArkSidebarPanel: typeof Collapsible.Content =
  Collapsible.Content;
export const LoongArkCommandRoot: typeof Combobox.Root = Combobox.Root;
export const LoongArkCommandInput: typeof Combobox.Input = Combobox.Input;
export const LoongArkCommandContent: typeof Combobox.Content = Combobox.Content;
export const LoongArkCommandControl: typeof Combobox.Control = Combobox.Control;
export const LoongArkCommandPositioner: typeof Combobox.Positioner =
  Combobox.Positioner;
export const LoongArkCommandItem: typeof Combobox.Item = Combobox.Item;
export const LoongArkCommandItemText: typeof Combobox.ItemText =
  Combobox.ItemText;
export const LoongArkCommandItemGroup: typeof Combobox.ItemGroup =
  Combobox.ItemGroup;
export const LoongArkCommandItemGroupLabel: typeof Combobox.ItemGroupLabel =
  Combobox.ItemGroupLabel;
export const LoongArkCommandLabel: typeof Combobox.Label = Combobox.Label;
export const LoongArkCommandTrigger: typeof Combobox.Trigger = Combobox.Trigger;
export const LoongArkMenubarRoot: typeof Menu.Root = Menu.Root;
export const LoongArkMenubarTrigger: typeof Menu.Trigger = Menu.Trigger;
export const LoongArkMenubarPositioner: typeof Menu.Positioner =
  Menu.Positioner;
export const LoongArkMenubarContent: typeof Menu.Content = Menu.Content;
export const LoongArkMenubarItem: typeof Menu.Item = Menu.Item;
export const LoongArkMenubarItemText: typeof Menu.ItemText = Menu.ItemText;
export const LoongArkMenubarSeparator: typeof Menu.Separator = Menu.Separator;
export const LoongArkNavigationMenuRoot: typeof Popover.Root = Popover.Root;
export const LoongArkNavigationMenuTrigger: typeof Popover.Trigger =
  Popover.Trigger;
export const LoongArkNavigationMenuPositioner: typeof Popover.Positioner =
  Popover.Positioner;
export const LoongArkNavigationMenuContent: typeof Popover.Content =
  Popover.Content;
export const LoongArkNavigationMenuCloseTrigger: typeof Popover.CloseTrigger =
  Popover.CloseTrigger;
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
