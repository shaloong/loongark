import {
  createContext,
  useContext,
  useMemo,
  createElement,
  ReactNode,
  FC,
} from "react";
import { createLoongArkTheme, LoongArkTheme } from "@loongark/theme";
import { bootstrapKit } from "@loongark/kit";

const ThemeContext = createContext<LoongArkTheme | null>(null);

export interface LoongArkProviderProps {
  mode?: "light" | "dark" | "high-contrast";
  brand?: string;
  accent?: string;
  children?: ReactNode;
}

export const LoongArkProvider: FC<LoongArkProviderProps> = ({
  children,
  mode,
  brand,
  accent,
}) => {
  const theme = useMemo(() => {
    const instance = createLoongArkTheme({ mode, brand, accent });
    bootstrapKit(instance);
    instance.mount();
    return instance;
  }, [mode, brand, accent]);

  return createElement(ThemeContext.Provider, { value: theme }, children);
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
  LoongArkFilterBar,
  LoongArkFilterBarSearch,
  LoongArkFilterBarFilters,
  LoongArkFilterBarActions,
  LoongArkFilterDivider,
  LoongArkFilterChip,
} from "./components/filter-bar";
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
  type LoongArkRadioGroupRootProps,
  type LoongArkRadioGroupLabelProps,
  type LoongArkRadioGroupItemProps,
  type LoongArkRadioGroupItemControlProps,
  type LoongArkRadioGroupItemTextProps,
  type LoongArkRadioGroupIndicatorProps,
  type LoongArkRadioGroupItemHiddenInputProps,
} from "./components/radio-group";
export {
  SelectRoot as LoongArkSelectRoot,
  SelectLabel as LoongArkSelectLabel,
  SelectControl as LoongArkSelectControl,
  SelectTrigger as LoongArkSelectTrigger,
  SelectValueText as LoongArkSelectValueText,
  SelectIndicator as LoongArkSelectIndicator,
  SelectClearTrigger as LoongArkSelectClearTrigger,
  SelectPositioner as LoongArkSelectPositioner,
  SelectContent as LoongArkSelectContent,
  SelectList as LoongArkSelectList,
  SelectItemGroup as LoongArkSelectItemGroup,
  SelectItemGroupLabel as LoongArkSelectItemGroupLabel,
  SelectItem as LoongArkSelectItem,
  SelectItemText as LoongArkSelectItemText,
  SelectItemIndicator as LoongArkSelectItemIndicator,
  SelectHiddenSelect as LoongArkSelectHiddenSelect,
  type SelectRootProps as LoongArkSelectRootProps,
} from "./components/select";
export {
  LoongArkTooltipRoot,
  LoongArkTooltipTrigger,
  LoongArkTooltipPositioner,
  LoongArkTooltipContent,
  LoongArkTooltipArrow,
  LoongArkTooltipArrowTip,
} from "./components/tooltip";
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
export type { SelectSize } from "@loongark/primitives";
