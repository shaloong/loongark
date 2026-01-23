import { writable } from "svelte/store";
import { createLoongArkTheme } from "@loongark/theme";
import { bootstrapKit } from "@loongark/kit";

// Button
export { default as LoongArkButton } from "./components/Button.svelte";

// Input
export { default as LoongArkInputRoot } from "./components/InputRoot.svelte";
export { default as LoongArkInputLabel } from "./components/InputLabel.svelte";
export { default as LoongArkInputInput } from "./components/InputInput.svelte";
export { default as LoongArkInputHelperText } from "./components/InputHelperText.svelte";
export { default as LoongArkInputErrorText } from "./components/InputErrorText.svelte";

// Dialog
export { default as LoongArkDialogRoot } from "./components/DialogRoot.svelte";
export { default as LoongArkDialogTrigger } from "./components/DialogTrigger.svelte";
export { default as LoongArkDialogOverlay } from "./components/DialogOverlay.svelte";
export { default as LoongArkDialogContent } from "./components/DialogContent.svelte";
export { default as LoongArkDialogTitle } from "./components/DialogTitle.svelte";
export { default as LoongArkDialogDescription } from "./components/DialogDescription.svelte";
export { default as LoongArkDialogCloseTrigger } from "./components/DialogCloseTrigger.svelte";

// Switch
export { default as LoongArkSwitchRoot } from "./components/SwitchRoot.svelte";
export { default as LoongArkSwitchControl } from "./components/SwitchControl.svelte";
export { default as LoongArkSwitchThumb } from "./components/SwitchThumb.svelte";
export { default as LoongArkSwitchLabel } from "./components/SwitchLabel.svelte";

// PinInput
export { default as LoongArkPinInputRoot } from "./components/PinInputRoot.svelte";
export { default as LoongArkPinInputControl } from "./components/PinInputControl.svelte";
export { default as LoongArkPinInputInput } from "./components/PinInputInput.svelte";
export { default as LoongArkPinInputLabel } from "./components/PinInputLabel.svelte";
export { default as LoongArkPinInputHiddenInput } from "./components/PinInputHiddenInput.svelte";

// Number Input
export { default as LoongArkNumberInputRoot } from "./components/NumberInputRoot.svelte";
export { default as LoongArkNumberInputLabel } from "./components/NumberInputLabel.svelte";
export { default as LoongArkNumberInputControl } from "./components/NumberInputControl.svelte";
export { default as LoongArkNumberInputInput } from "./components/NumberInputInput.svelte";
export { default as LoongArkNumberInputIncrementTrigger } from "./components/NumberInputIncrementTrigger.svelte";
export { default as LoongArkNumberInputDecrementTrigger } from "./components/NumberInputDecrementTrigger.svelte";
export { default as LoongArkNumberInputValueText } from "./components/NumberInputValueText.svelte";
export { default as LoongArkNumberInputScrubber } from "./components/NumberInputScrubber.svelte";
export type {
  NumberInputRootProps,
  NumberInputLabelProps,
  NumberInputControlProps,
  NumberInputInputProps,
  NumberInputIncrementTriggerProps,
  NumberInputDecrementTriggerProps,
  NumberInputValueTextProps,
  NumberInputScrubberProps,
} from "./components/number-input.d";


// Checkbox
export { default as LoongArkCheckboxRoot } from "./components/CheckboxRoot.svelte";
export { default as LoongArkCheckboxControl } from "./components/CheckboxControl.svelte";
export { default as LoongArkCheckboxLabel } from "./components/CheckboxLabel.svelte";
export { default as LoongArkCheckboxIndicator } from "./components/CheckboxIndicator.svelte";
export { default as LoongArkCheckboxHiddenInput } from "./components/CheckboxHiddenInput.svelte";

// Radio Group
export { default as LoongArkRadioGroupRoot } from "./components/RadioGroupRoot.svelte";
export { default as LoongArkRadioGroupLabel } from "./components/RadioGroupLabel.svelte";
export { default as LoongArkRadioGroupItem } from "./components/RadioGroupItem.svelte";
export { default as LoongArkRadioGroupItemControl } from "./components/RadioGroupItemControl.svelte";
export { default as LoongArkRadioGroupItemText } from "./components/RadioGroupItemText.svelte";
export { default as LoongArkRadioGroupIndicator } from "./components/RadioGroupIndicator.svelte";
export { default as LoongArkRadioGroupItemHiddenInput } from "./components/RadioGroupItemHiddenInput.svelte";

// Select
export { default as LoongArkSelectRoot } from "./components/SelectRoot.svelte";
export { default as LoongArkSelectLabel } from "./components/SelectLabel.svelte";
export { default as LoongArkSelectControl } from "./components/SelectControl.svelte";
export { default as LoongArkSelectTrigger } from "./components/SelectTrigger.svelte";
export { default as LoongArkSelectValueText } from "./components/SelectValueText.svelte";
export { default as LoongArkSelectIndicator } from "./components/SelectIndicator.svelte";
export { default as LoongArkSelectClearTrigger } from "./components/SelectClearTrigger.svelte";
export { default as LoongArkSelectPositioner } from "./components/SelectPositioner.svelte";
export { default as LoongArkSelectContent } from "./components/SelectContent.svelte";
export { default as LoongArkSelectList } from "./components/SelectList.svelte";
export { default as LoongArkSelectItemGroup } from "./components/SelectItemGroup.svelte";
export { default as LoongArkSelectItemGroupLabel } from "./components/SelectItemGroupLabel.svelte";
export { default as LoongArkSelectItem } from "./components/SelectItem.svelte";
export { default as LoongArkSelectItemText } from "./components/SelectItemText.svelte";
export { default as LoongArkSelectItemIndicator } from "./components/SelectItemIndicator.svelte";
export { default as LoongArkSelectHiddenSelect } from "./components/SelectHiddenSelect.svelte";
export type { SelectRootProps } from "./components/select.d";

// Popover
export { default as LoongArkPopoverRoot } from "./components/PopoverRoot.svelte";
export { default as LoongArkPopoverTrigger } from "./components/PopoverTrigger.svelte";
export { default as LoongArkPopoverPositioner } from "./components/PopoverPositioner.svelte";
export { default as LoongArkPopoverContent } from "./components/PopoverContent.svelte";
export { default as LoongArkPopoverArrow } from "./components/PopoverArrow.svelte";
export { default as LoongArkPopoverTitle } from "./components/PopoverTitle.svelte";
export { default as LoongArkPopoverDescription } from "./components/PopoverDescription.svelte";
export { default as LoongArkPopoverCloseTrigger } from "./components/PopoverCloseTrigger.svelte";
export type {
  PopoverRootProps,
  PopoverTriggerProps,
  PopoverContentProps,
  PopoverPositionerProps,
  PopoverArrowProps,
  PopoverTitleProps,
  PopoverDescriptionProps,
  PopoverCloseTriggerProps,
} from "./components/popover.d";

// Menu
export { default as LoongArkMenuRoot } from "./components/MenuRoot.svelte";
export { default as LoongArkMenuTrigger } from "./components/MenuTrigger.svelte";
export { default as LoongArkMenuContextTrigger } from "./components/MenuContextTrigger.svelte";
export { default as LoongArkMenuPositioner } from "./components/MenuPositioner.svelte";
export { default as LoongArkMenuContent } from "./components/MenuContent.svelte";
export { default as LoongArkMenuArrow } from "./components/MenuArrow.svelte";
export { default as LoongArkMenuArrowTip } from "./components/MenuArrowTip.svelte";
export { default as LoongArkMenuItem } from "./components/MenuItem.svelte";
export { default as LoongArkMenuTriggerItem } from "./components/MenuTriggerItem.svelte";
export { default as LoongArkMenuCheckboxItem } from "./components/MenuCheckboxItem.svelte";
export { default as LoongArkMenuRadioItem } from "./components/MenuRadioItem.svelte";
export { default as LoongArkMenuRadioItemGroup } from "./components/MenuRadioItemGroup.svelte";
export { default as LoongArkMenuItemGroup } from "./components/MenuItemGroup.svelte";
export { default as LoongArkMenuItemGroupLabel } from "./components/MenuItemGroupLabel.svelte";
export { default as LoongArkMenuItemText } from "./components/MenuItemText.svelte";
export { default as LoongArkMenuItemIndicator } from "./components/MenuItemIndicator.svelte";
export { default as LoongArkMenuIndicator } from "./components/MenuIndicator.svelte";
export { default as LoongArkMenuSeparator } from "./components/MenuSeparator.svelte";
export type {
  MenuRootProps,
  MenuTriggerProps,
  MenuContextTriggerProps,
  MenuPositionerProps,
  MenuContentProps,
  MenuArrowProps,
  MenuArrowTipProps,
  MenuItemProps,
  MenuTriggerItemProps,
  MenuCheckboxItemProps,
  MenuRadioItemProps,
  MenuRadioItemGroupProps,
  MenuItemGroupProps,
  MenuItemGroupLabelProps,
  MenuItemTextProps,
  MenuItemIndicatorProps,
  MenuIndicatorProps,
  MenuSeparatorProps,
} from "./components/menu.d";

// Date Picker
export { default as LoongArkDatePickerRoot } from "./components/DatePickerRoot.svelte";
export { default as LoongArkDatePickerLabel } from "./components/DatePickerLabel.svelte";
export { default as LoongArkDatePickerControl } from "./components/DatePickerControl.svelte";
export { default as LoongArkDatePickerInput } from "./components/DatePickerInput.svelte";
export { default as LoongArkDatePickerTrigger } from "./components/DatePickerTrigger.svelte";
export { default as LoongArkDatePickerClearTrigger } from "./components/DatePickerClearTrigger.svelte";
export { default as LoongArkDatePickerPositioner } from "./components/DatePickerPositioner.svelte";
export { default as LoongArkDatePickerContent } from "./components/DatePickerContent.svelte";
export { default as LoongArkDatePickerView } from "./components/DatePickerView.svelte";
export { default as LoongArkDatePickerViewControl } from "./components/DatePickerViewControl.svelte";
export { default as LoongArkDatePickerViewTrigger } from "./components/DatePickerViewTrigger.svelte";
export { default as LoongArkDatePickerPrevTrigger } from "./components/DatePickerPrevTrigger.svelte";
export { default as LoongArkDatePickerNextTrigger } from "./components/DatePickerNextTrigger.svelte";
export { default as LoongArkDatePickerMonthSelect } from "./components/DatePickerMonthSelect.svelte";
export { default as LoongArkDatePickerYearSelect } from "./components/DatePickerYearSelect.svelte";
export { default as LoongArkDatePickerRangeText } from "./components/DatePickerRangeText.svelte";
export { default as LoongArkDatePickerPresetTrigger } from "./components/DatePickerPresetTrigger.svelte";
export { default as LoongArkDatePickerTable } from "./components/DatePickerTable.svelte";
export { default as LoongArkDatePickerTableHead } from "./components/DatePickerTableHead.svelte";
export { default as LoongArkDatePickerTableBody } from "./components/DatePickerTableBody.svelte";
export { default as LoongArkDatePickerTableRow } from "./components/DatePickerTableRow.svelte";
export { default as LoongArkDatePickerTableHeader } from "./components/DatePickerTableHeader.svelte";
export { default as LoongArkDatePickerTableCell } from "./components/DatePickerTableCell.svelte";
export { default as LoongArkDatePickerTableCellTrigger } from "./components/DatePickerTableCellTrigger.svelte";
export type {
  DatePickerRootProps,
  DatePickerInputProps,
  DatePickerViewProps,
  DatePickerTableProps,
  DatePickerTableCellProps,
  DatePickerPresetTriggerProps,
} from "./components/date-picker.d";

// Accordion
export { default as LoongArkAccordionRoot } from "./components/AccordionRoot.svelte";
export { default as LoongArkAccordionItem } from "./components/AccordionItem.svelte";
export { default as LoongArkAccordionItemTrigger } from "./components/AccordionItemTrigger.svelte";
export { default as LoongArkAccordionItemContent } from "./components/AccordionItemContent.svelte";
export { default as LoongArkAccordionItemIndicator } from "./components/AccordionItemIndicator.svelte";
export type {
  AccordionRootProps,
  AccordionItemProps,
  AccordionItemTriggerProps,
  AccordionItemContentProps,
  AccordionItemIndicatorProps,
} from "./components/accordion.d";

// Avatar
export { default as LoongArkAvatarRoot } from "./components/AvatarRoot.svelte";
export { default as LoongArkAvatarImage } from "./components/AvatarImage.svelte";
export { default as LoongArkAvatarFallback } from "./components/AvatarFallback.svelte";
export type {
  AvatarRootProps,
  AvatarImageProps,
  AvatarFallbackProps,
} from "./components/avatar.d";

// Collapsible
export { default as LoongArkCollapsibleRoot } from "./components/CollapsibleRoot.svelte";
export { default as LoongArkCollapsibleTrigger } from "./components/CollapsibleTrigger.svelte";
export { default as LoongArkCollapsibleContent } from "./components/CollapsibleContent.svelte";
export { default as LoongArkCollapsibleIndicator } from "./components/CollapsibleIndicator.svelte";
export type {
  CollapsibleRootProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps,
  CollapsibleIndicatorProps,
} from "./components/collapsible.d";

// Toggle
export { default as LoongArkToggleRoot } from "./components/ToggleRoot.svelte";
export { default as LoongArkToggleIndicator } from "./components/ToggleIndicator.svelte";
export type {
  ToggleRootProps,
  ToggleIndicatorProps,
} from "./components/toggle.d";

// Toggle Group
export { default as LoongArkToggleGroupRoot } from "./components/ToggleGroupRoot.svelte";
export { default as LoongArkToggleGroupItem } from "./components/ToggleGroupItem.svelte";
export type {
  ToggleGroupRootProps,
  ToggleGroupItemProps,
} from "./components/toggle-group.d";

// Segment Group
export { default as LoongArkSegmentGroupRoot } from "./components/SegmentGroupRoot.svelte";
export { default as LoongArkSegmentGroupItem } from "./components/SegmentGroupItem.svelte";
export type {
  SegmentGroupRootProps,
  SegmentGroupItemProps,
} from "./components/segment-group.d";

// Pagination
export { default as LoongArkPaginationRoot } from "./components/PaginationRoot.svelte";
export { default as LoongArkPaginationList } from "./components/PaginationList.svelte";
export { default as LoongArkPaginationItem } from "./components/PaginationItem.svelte";
export { default as LoongArkPaginationPrevTrigger } from "./components/PaginationPrevTrigger.svelte";
export { default as LoongArkPaginationNextTrigger } from "./components/PaginationNextTrigger.svelte";
export { default as LoongArkPaginationEllipsis } from "./components/PaginationEllipsis.svelte";
export type {
  PaginationRootProps,
  PaginationItemProps,
  PaginationPrevTriggerProps,
  PaginationNextTriggerProps,
  PaginationEllipsisProps,
} from "./components/pagination.d";

// Listbox
export { default as LoongArkListboxRoot } from "./components/ListboxRoot.svelte";
export { default as LoongArkListboxLabel } from "./components/ListboxLabel.svelte";
export { default as LoongArkListboxList } from "./components/ListboxList.svelte";
export { default as LoongArkListboxItemGroup } from "./components/ListboxItemGroup.svelte";
export { default as LoongArkListboxItemGroupLabel } from "./components/ListboxItemGroupLabel.svelte";
export { default as LoongArkListboxItem } from "./components/ListboxItem.svelte";
export { default as LoongArkListboxItemText } from "./components/ListboxItemText.svelte";
export { default as LoongArkListboxItemIndicator } from "./components/ListboxItemIndicator.svelte";
export type {
  ListboxRootProps,
  ListboxLabelProps,
  ListboxListProps,
  ListboxItemGroupProps,
  ListboxItemGroupLabelProps,
  ListboxItemProps,
  ListboxItemTextProps,
  ListboxItemIndicatorProps,
} from "./components/listbox.d";

// Combobox
export { default as LoongArkComboboxRoot } from "./components/ComboboxRoot.svelte";
export { default as LoongArkComboboxLabel } from "./components/ComboboxLabel.svelte";
export { default as LoongArkComboboxControl } from "./components/ComboboxControl.svelte";
export { default as LoongArkComboboxInput } from "./components/ComboboxInput.svelte";
export { default as LoongArkComboboxTrigger } from "./components/ComboboxTrigger.svelte";
export { default as LoongArkComboboxClearTrigger } from "./components/ComboboxClearTrigger.svelte";
export { default as LoongArkComboboxPositioner } from "./components/ComboboxPositioner.svelte";
export { default as LoongArkComboboxContent } from "./components/ComboboxContent.svelte";
export { default as LoongArkComboboxList } from "./components/ComboboxList.svelte";
export { default as LoongArkComboboxItemGroup } from "./components/ComboboxItemGroup.svelte";
export { default as LoongArkComboboxItemGroupLabel } from "./components/ComboboxItemGroupLabel.svelte";
export { default as LoongArkComboboxItem } from "./components/ComboboxItem.svelte";
export { default as LoongArkComboboxItemText } from "./components/ComboboxItemText.svelte";
export { default as LoongArkComboboxItemIndicator } from "./components/ComboboxItemIndicator.svelte";
export type {
  ComboboxRootProps,
  ComboboxLabelProps,
  ComboboxControlProps,
  ComboboxInputProps,
  ComboboxTriggerProps,
  ComboboxClearTriggerProps,
  ComboboxPositionerProps,
  ComboboxContentProps,
  ComboboxListProps,
  ComboboxItemGroupProps,
  ComboboxItemGroupLabelProps,
  ComboboxItemProps,
  ComboboxItemTextProps,
  ComboboxItemIndicatorProps,
} from "./components/combobox.d";

// Tabs
export { default as LoongArkTabsRoot } from "./components/TabsRoot.svelte";
export { default as LoongArkTabsList } from "./components/TabsList.svelte";
export { default as LoongArkTabsTrigger } from "./components/TabsTrigger.svelte";
export { default as LoongArkTabsContent } from "./components/TabsContent.svelte";
export { default as LoongArkTabsIndicator } from "./components/TabsIndicator.svelte";
export type {
  TabsRootProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
  TabsIndicatorProps,
} from "./components/tabs.d";

// Slider
export { default as LoongArkSliderRoot } from "./components/SliderRoot.svelte";
export { default as LoongArkSliderLabel } from "./components/SliderLabel.svelte";
export { default as LoongArkSliderValueText } from "./components/SliderValueText.svelte";
export { default as LoongArkSliderControl } from "./components/SliderControl.svelte";
export { default as LoongArkSliderTrack } from "./components/SliderTrack.svelte";
export { default as LoongArkSliderRange } from "./components/SliderRange.svelte";
export { default as LoongArkSliderThumb } from "./components/SliderThumb.svelte";
export { default as LoongArkSliderMarkerGroup } from "./components/SliderMarkerGroup.svelte";
export { default as LoongArkSliderMarker } from "./components/SliderMarker.svelte";
export { default as LoongArkSliderDraggingIndicator } from "./components/SliderDraggingIndicator.svelte";
export { default as LoongArkSliderHiddenInput } from "./components/SliderHiddenInput.svelte";
export type {
  SliderRootProps,
  SliderLabelProps,
  SliderValueTextProps,
  SliderControlProps,
  SliderTrackProps,
  SliderRangeProps,
  SliderThumbProps,
  SliderMarkerGroupProps,
  SliderMarkerProps,
  SliderDraggingIndicatorProps,
  SliderHiddenInputProps,
} from "./components/slider.d";

// Tooltip
export { default as LoongArkTooltipRoot } from "./components/TooltipRoot.svelte";
export { default as LoongArkTooltipTrigger } from "./components/TooltipTrigger.svelte";
export { default as LoongArkTooltipPositioner } from "./components/TooltipPositioner.svelte";
export { default as LoongArkTooltipContent } from "./components/TooltipContent.svelte";
export { default as LoongArkTooltipArrow } from "./components/TooltipArrow.svelte";
export { default as LoongArkTooltipArrowTip } from "./components/TooltipArrowTip.svelte";
export type {
  TooltipRootProps,
  TooltipTriggerProps,
  TooltipContentProps,
  TooltipPositionerProps,
  TooltipArrowProps,
  TooltipArrowTipProps,
} from "./components/tooltip.d";

// Toast
export { default as LoongArkToaster } from "./components/Toaster.svelte";
export { default as LoongArkToastRoot } from "./components/ToastRoot.svelte";
export { default as LoongArkToastTitle } from "./components/ToastTitle.svelte";
export { default as LoongArkToastDescription } from "./components/ToastDescription.svelte";
export { default as LoongArkToastActionTrigger } from "./components/ToastActionTrigger.svelte";
export { default as LoongArkToastCloseTrigger } from "./components/ToastCloseTrigger.svelte";
export { createToaster } from "@ark-ui/svelte/toast";
export type {
  ToasterProps,
  ToastRootProps,
  ToastTitleProps,
  ToastDescriptionProps,
  ToastActionTriggerProps,
  ToastCloseTriggerProps,
  CreateToasterProps,
  CreateToasterReturn,
  ToastOptions,
  ToastPlacement,
  ToastType,
  ToastStatus,
} from "./components/toast.d";

export interface ThemeStoreOptions {
  mode?: "light" | "dark" | "high-contrast";
  brand?: string;
  accent?: string;
}

export const createThemeStore = (options: ThemeStoreOptions = {}) => {
  const theme = createLoongArkTheme({
    mode: options.mode,
    brand: options.brand,
    accent: options.accent,
  });
  bootstrapKit(theme);
  theme.mount();
  return writable(theme);
};
