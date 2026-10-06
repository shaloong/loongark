import LoongArkMenuContextTrigger from "./MenuContextTrigger.svelte";
import DialogAction from "./DialogAction.svelte";
import DialogCancel from "./DialogCancel.svelte";
import { Dialog } from "@ark-ui/svelte/dialog";
import { Menu } from "@ark-ui/svelte/menu";
import { Popover } from "@ark-ui/svelte/popover";
import { Collapsible } from "@ark-ui/svelte/collapsible";
import { Combobox, createListCollection } from "@ark-ui/svelte/combobox";
import { DatePicker } from "@ark-ui/svelte/date-picker";
import LoongArkPortal from "./Portal.svelte";
import SheetContent from "./SheetContent.svelte";
import alertRoot from "./AlertDialogRoot.svelte";
export const LoongArkAlertDialog = {
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
export const LoongArkSheet = {
  ...Dialog,
  Root: Dialog.Root,
  Portal: LoongArkPortal,
  Content: SheetContent,
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
export const LoongArkCommand = Combobox;
export { createListCollection as createCommandCollection };
export const LoongArkContextMenu = {
  ...Menu,
  Trigger: LoongArkMenuContextTrigger,
  ContextTrigger: LoongArkMenuContextTrigger,
};
export const LoongArkCalendar = DatePicker;
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
