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
