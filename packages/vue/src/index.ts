import { App, Plugin } from "vue";
import { createLoongArkTheme } from "@loongark/theme";
import { bootstrapKit } from "@loongark/kit";

export interface VuePluginOptions {
  mode?: "light" | "dark" | "high-contrast";
  brand?: string;
  accent?: string;
}

export const createLoongArkVuePlugin = (
  options: VuePluginOptions = {}
): Plugin => {
  const theme = createLoongArkTheme({
    mode: options.mode,
    brand: options.brand,
    accent: options.accent,
  });

  return {
    install(app: App) {
      bootstrapKit(theme);
      theme.mount();
      app.provide("loongark-theme", theme);
    },
  };
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
  LoongArkPinInput,
  LoongArkPinInputRoot,
  LoongArkPinInputControl,
  LoongArkPinInputInput,
  LoongArkPinInputLabel,
  LoongArkPinInputHiddenInput,
} from "./components/pinInput";
export {
  LoongArkSwitch,
  LoongArkSwitchRoot,
  LoongArkSwitchControl,
  LoongArkSwitchThumb,
  LoongArkSwitchLabel,
} from "./components/switch";
export {
  LoongArkCheckboxRoot,
  LoongArkCheckboxControl,
  LoongArkCheckboxLabel,
  LoongArkCheckboxIndicator,
  LoongArkCheckboxHiddenInput,
} from "./components/checkbox";
export {
  LoongArkRadioGroupRoot,
  LoongArkRadioGroupLabel,
  LoongArkRadioGroupItem,
  LoongArkRadioGroupItemControl,
  LoongArkRadioGroupItemText,
  LoongArkRadioGroupIndicator,
  LoongArkRadioGroupItemHiddenInput,
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
