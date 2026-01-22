import { createContext, useContext, createMemo, createEffect } from "solid-js";
import type { ParentComponent } from "solid-js";
import { createLoongArkTheme, LoongArkTheme } from "@loongark/theme";
import { bootstrapKit } from "@loongark/kit";

const ThemeContext = createContext<LoongArkTheme | null>(null);

export interface LoongArkProviderProps {
  mode?: "light" | "dark" | "high-contrast";
  brand?: string;
  accent?: string;
  children?: unknown;
}

export const LoongArkProvider: ParentComponent<LoongArkProviderProps> = (
  props
) => {
  const theme = createMemo(() => {
    const instance = createLoongArkTheme({
      mode: props.mode,
      brand: props.brand,
      accent: props.accent,
    });
    return instance;
  });

  createEffect(() => {
    const instance = theme();
    bootstrapKit(instance);
    instance.mount();
  });

  return ThemeContext.Provider({
    value: theme(),
    get children() {
      return props.children;
    },
  });
};

export const useLoongArkTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("LoongArk theme context is missing");
  }
  return theme;
};

export { LoongArkButton } from "./components/button";
export {
  LoongArkInputRoot,
  LoongArkInputControl,
  LoongArkTextareaControl,
  LoongArkInputHelperText,
  LoongArkInputLabel,
  LoongArkInputPrefix,
  LoongArkInputSuffix,
} from "./components/input";
export {
  LoongArkDialog,
  LoongArkDialogOverlay,
  LoongArkDialogContent,
  LoongArkDialogTitle,
  LoongArkDialogDescription,
  LoongArkDialogFooter,
  LoongArkDialogCloseTrigger,
} from "./components/dialog";
export {
  LoongArkSwitch,
  LoongArkSwitchRoot,
  LoongArkSwitchControl,
  LoongArkSwitchThumb,
  LoongArkSwitchLabel,
} from "./components/switch";
export {
  LoongArkPinInput,
  LoongArkPinInputRoot,
  LoongArkPinInputControl,
  LoongArkPinInputInput,
  LoongArkPinInputLabel,
  LoongArkPinInputHiddenInput,
  type LoongArkPinInputRootProps,
  type LoongArkPinInputControlProps,
  type LoongArkPinInputInputProps,
  type LoongArkPinInputLabelProps,
} from "./components/pinInput";
export {
  LoongArkCheckboxRoot,
  LoongArkCheckboxControl,
  LoongArkCheckboxLabel,
  LoongArkCheckboxIndicator,
  LoongArkCheckboxHiddenInput,
  type LoongArkCheckboxRootProps,
  type LoongArkCheckboxControlProps,
  type LoongArkCheckboxLabelProps,
  type LoongArkCheckboxIndicatorProps,
} from "./components/checkbox";
export {
  LoongArkRadioGroupRoot,
  LoongArkRadioGroupLabel,
  LoongArkRadioGroupItem,
  LoongArkRadioGroupItemControl,
  LoongArkRadioGroupItemText,
  LoongArkRadioGroupIndicator,
  LoongArkRadioGroupItemHiddenInput,
  type RadioGroupRootProps,
  type RadioGroupLabelProps,
  type RadioGroupItemProps,
  type RadioGroupItemControlProps,
  type RadioGroupItemTextProps,
  type RadioGroupIndicatorProps,
  type RadioGroupItemHiddenInputProps,
  type RadioGroupSize,
  type RadioGroupOrientation,
} from "./components/radio-group";
export {
  LoongArkSelectRoot,
  LoongArkSelectLabel,
  LoongArkSelectControl,
  LoongArkSelectTrigger,
  LoongArkSelectValueText,
  LoongArkSelectIndicator,
  LoongArkSelectClearTrigger,
  LoongArkSelectPositioner,
  LoongArkSelectContent,
  LoongArkSelectList,
  LoongArkSelectItemGroup,
  LoongArkSelectItemGroupLabel,
  LoongArkSelectItem,
  LoongArkSelectItemText,
  LoongArkSelectItemIndicator,
  LoongArkSelectHiddenSelect,
  type LoongArkSelectRootProps,
} from "./components/select";
export {
  LoongArkPopoverRoot,
  LoongArkPopoverTrigger,
  LoongArkPopoverPositioner,
  LoongArkPopoverContent,
  LoongArkPopoverArrow,
  LoongArkPopoverTitle,
  LoongArkPopoverDescription,
  LoongArkPopoverCloseTrigger,
} from "./components/popover";
export {
  LoongArkMenuRoot,
  LoongArkMenuTrigger,
  LoongArkMenuContextTrigger,
  LoongArkMenuPositioner,
  LoongArkMenuContent,
  LoongArkMenuArrow,
  LoongArkMenuArrowTip,
  LoongArkMenuItem,
  LoongArkMenuTriggerItem,
  LoongArkMenuCheckboxItem,
  LoongArkMenuRadioItem,
  LoongArkMenuRadioItemGroup,
  LoongArkMenuItemGroup,
  LoongArkMenuItemGroupLabel,
  LoongArkMenuItemText,
  LoongArkMenuItemIndicator,
  LoongArkMenuIndicator,
  LoongArkMenuSeparator,
} from "./components/menu";
export {
  LoongArkDatePickerRoot,
  LoongArkDatePickerLabel,
  LoongArkDatePickerControl,
  LoongArkDatePickerInput,
  LoongArkDatePickerTrigger,
  LoongArkDatePickerClearTrigger,
  LoongArkDatePickerPositioner,
  LoongArkDatePickerContent,
  LoongArkDatePickerView,
  LoongArkDatePickerViewControl,
  LoongArkDatePickerViewTrigger,
  LoongArkDatePickerPrevTrigger,
  LoongArkDatePickerNextTrigger,
  LoongArkDatePickerMonthSelect,
  LoongArkDatePickerYearSelect,
  LoongArkDatePickerRangeText,
  LoongArkDatePickerPresetTrigger,
  LoongArkDatePickerTable,
  LoongArkDatePickerTableHead,
  LoongArkDatePickerTableBody,
  LoongArkDatePickerTableRow,
  LoongArkDatePickerTableHeader,
  LoongArkDatePickerTableCell,
  LoongArkDatePickerTableCellTrigger,
} from "./components/date-picker";
export {
  LoongArkAccordionRoot,
  LoongArkAccordionItem,
  LoongArkAccordionItemTrigger,
  LoongArkAccordionItemContent,
  LoongArkAccordionItemIndicator,
} from "./components/accordion";
export {
  LoongArkAvatarRoot,
  LoongArkAvatarImage,
  LoongArkAvatarFallback,
} from "./components/avatar";
export {
  LoongArkCollapsibleRoot,
  LoongArkCollapsibleTrigger,
  LoongArkCollapsibleContent,
  LoongArkCollapsibleIndicator,
} from "./components/collapsible";
export {
  LoongArkToggleRoot,
  LoongArkToggleIndicator,
} from "./components/toggle";
export {
  LoongArkToggleGroupRoot,
  LoongArkToggleGroupItem,
} from "./components/toggle-group";
export {
  LoongArkTabsRoot,
  LoongArkTabsList,
  LoongArkTabsTrigger,
  LoongArkTabsContent,
  LoongArkTabsIndicator,
} from "./components/tabs";
export {
  LoongArkSliderRoot,
  LoongArkSliderLabel,
  LoongArkSliderValueText,
  LoongArkSliderControl,
  LoongArkSliderTrack,
  LoongArkSliderRange,
  LoongArkSliderThumb,
  LoongArkSliderMarkerGroup,
  LoongArkSliderMarker,
  LoongArkSliderDraggingIndicator,
  LoongArkSliderHiddenInput,
} from "./components/slider";
export {
  LoongArkTooltipRoot,
  LoongArkTooltipTrigger,
  LoongArkTooltipPositioner,
  LoongArkTooltipContent,
  LoongArkTooltipArrow,
  LoongArkTooltipArrowTip,
} from "./components/tooltip";
export {
  LoongArkToaster,
  LoongArkToastRoot,
  LoongArkToastTitle,
  LoongArkToastDescription,
  LoongArkToastActionTrigger,
  LoongArkToastCloseTrigger,
  createToaster,
  type CreateToasterProps,
  type CreateToasterReturn,
  type ToastOptions,
  type ToastPlacement,
  type ToastType,
  type ToastStatus,
} from "./components/toast";
