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
  LoongArkNumberInputRoot,
  LoongArkNumberInputLabel,
  LoongArkNumberInputControl,
  LoongArkNumberInputInput,
  LoongArkNumberInputIncrementTrigger,
  LoongArkNumberInputDecrementTrigger,
  LoongArkNumberInputValueText,
  LoongArkNumberInputScrubber,
} from "./components/number-input";
export {
  LoongArkPasswordInputRoot,
  LoongArkPasswordInputLabel,
  LoongArkPasswordInputControl,
  LoongArkPasswordInputInput,
  LoongArkPasswordInputIndicator,
  LoongArkPasswordInputVisibilityTrigger,
} from "./components/password-input";
export {
  LoongArkTagsInputRoot,
  LoongArkTagsInputLabel,
  LoongArkTagsInputControl,
  LoongArkTagsInputInput,
  LoongArkTagsInputItem,
  LoongArkTagsInputItemPreview,
  LoongArkTagsInputItemText,
  LoongArkTagsInputItemInput,
  LoongArkTagsInputItemDeleteTrigger,
  LoongArkTagsInputClearTrigger,
  LoongArkTagsInputHiddenInput,
} from "./components/tags-input";
export {
  LoongArkFileUploadRoot,
  LoongArkFileUploadLabel,
  LoongArkFileUploadDropzone,
  LoongArkFileUploadTrigger,
  LoongArkFileUploadHiddenInput,
  LoongArkFileUploadItemGroup,
  LoongArkFileUploadItem,
  LoongArkFileUploadItemPreview,
  LoongArkFileUploadItemPreviewImage,
  LoongArkFileUploadItemName,
  LoongArkFileUploadItemSizeText,
  LoongArkFileUploadItemDeleteTrigger,
  LoongArkFileUploadClearTrigger,
} from "./components/file-upload";
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
  LoongArkSegmentGroupRoot,
  LoongArkSegmentGroupItem,
} from "./components/segment-group";
export {
  LoongArkProgressRoot,
  LoongArkProgressLabel,
  LoongArkProgressTrack,
  LoongArkProgressRange,
  LoongArkProgressValueText,
  LoongArkProgressView,
  LoongArkProgressCircle,
  LoongArkProgressCircleTrack,
  LoongArkProgressCircleRange,
} from "./components/progress";
export {
  LoongArkStepsRoot,
  LoongArkStepsList,
  LoongArkStepsItem,
  LoongArkStepsIndicator,
  LoongArkStepsSeparator,
  LoongArkStepsTrigger,
  LoongArkStepsContent,
  LoongArkStepsCompletedContent,
  LoongArkStepsProgress,
  LoongArkStepsNextTrigger,
  LoongArkStepsPrevTrigger,
} from "./components/steps";
export {
  LoongArkPaginationRoot,
  LoongArkPaginationList,
  LoongArkPaginationItem,
  LoongArkPaginationPrevTrigger,
  LoongArkPaginationNextTrigger,
  LoongArkPaginationEllipsis,
} from "./components/pagination";
export {
  LoongArkListboxRoot,
  LoongArkListboxLabel,
  LoongArkListboxList,
  LoongArkListboxItemGroup,
  LoongArkListboxItemGroupLabel,
  LoongArkListboxItem,
  LoongArkListboxItemText,
  LoongArkListboxItemIndicator,
} from "./components/listbox";
export {
  LoongArkComboboxRoot,
  LoongArkComboboxLabel,
  LoongArkComboboxControl,
  LoongArkComboboxInput,
  LoongArkComboboxTrigger,
  LoongArkComboboxClearTrigger,
  LoongArkComboboxPositioner,
  LoongArkComboboxContent,
  LoongArkComboboxList,
  LoongArkComboboxItemGroup,
  LoongArkComboboxItemGroupLabel,
  LoongArkComboboxItem,
  LoongArkComboboxItemText,
  LoongArkComboboxItemIndicator,
} from "./components/combobox";
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

export {
  LoongArkCarouselRoot,
  LoongArkCarouselItemGroup,
  LoongArkCarouselItem,
  LoongArkCarouselControl,
  LoongArkCarouselNextTrigger,
  LoongArkCarouselPrevTrigger,
  LoongArkCarouselIndicatorGroup,
  LoongArkCarouselIndicator,
  LoongArkCarouselAutoplayTrigger,
  LoongArkCarouselProgressText,
  LoongArkCarouselAutoplayIndicator,
} from "./components/carousel";
export {
  LoongArkClipboardRoot,
  LoongArkClipboardLabel,
  LoongArkClipboardControl,
  LoongArkClipboardInput,
  LoongArkClipboardTrigger,
  LoongArkClipboardIndicator,
  LoongArkClipboardValueText,
} from "./components/clipboard";
export {
  LoongArkColorPickerRoot,
  LoongArkColorPickerLabel,
  LoongArkColorPickerControl,
  LoongArkColorPickerTrigger,
  LoongArkColorPickerPositioner,
  LoongArkColorPickerContent,
  LoongArkColorPickerView,
  LoongArkColorPickerArea,
  LoongArkColorPickerAreaBackground,
  LoongArkColorPickerAreaThumb,
  LoongArkColorPickerChannelSlider,
  LoongArkColorPickerChannelSliderLabel,
  LoongArkColorPickerChannelSliderTrack,
  LoongArkColorPickerChannelSliderThumb,
  LoongArkColorPickerChannelSliderValueText,
  LoongArkColorPickerChannelInput,
  LoongArkColorPickerSwatchGroup,
  LoongArkColorPickerSwatchTrigger,
  LoongArkColorPickerSwatchIndicator,
  LoongArkColorPickerSwatch,
  LoongArkColorPickerTransparencyGrid,
  LoongArkColorPickerValueText,
  LoongArkColorPickerValueSwatch,
  LoongArkColorPickerEyeDropperTrigger,
  LoongArkColorPickerFormatTrigger,
  LoongArkColorPickerFormatSelect,
  LoongArkColorPickerHiddenInput,
} from "./components/color-picker";
export {
  LoongArkEditableRoot,
  LoongArkEditableLabel,
  LoongArkEditableArea,
  LoongArkEditableControl,
  LoongArkEditableInput,
  LoongArkEditablePreview,
  LoongArkEditableEditTrigger,
  LoongArkEditableSubmitTrigger,
  LoongArkEditableCancelTrigger,
} from "./components/editable";
export {
  LoongArkHoverCardRoot,
  LoongArkHoverCardTrigger,
  LoongArkHoverCardPositioner,
  LoongArkHoverCardContent,
  LoongArkHoverCardArrow,
  LoongArkHoverCardArrowTip,
} from "./components/hover-card";
export {
  LoongArkScrollAreaRoot,
  LoongArkScrollAreaViewport,
  LoongArkScrollAreaContent,
  LoongArkScrollAreaScrollbar,
  LoongArkScrollAreaThumb,
  LoongArkScrollAreaCorner,
} from "./components/scroll-area";
export {
  LoongArkRatingGroupRoot,
  LoongArkRatingGroupLabel,
  LoongArkRatingGroupControl,
  LoongArkRatingGroupItem,
  LoongArkRatingGroupHiddenInput,
} from "./components/rating-group";
export {
  LoongArkSplitterRoot,
  LoongArkSplitterPanel,
  LoongArkSplitterResizeTrigger,
  LoongArkSplitterResizeTriggerIndicator,
} from "./components/splitter";
export {
  LoongArkTreeViewRoot,
  LoongArkTreeViewLabel,
  LoongArkTreeViewTree,
  LoongArkTreeViewItem,
  LoongArkTreeViewItemIndicator,
  LoongArkTreeViewItemText,
  LoongArkTreeViewBranch,
  LoongArkTreeViewBranchContent,
  LoongArkTreeViewBranchControl,
  LoongArkTreeViewBranchTrigger,
  LoongArkTreeViewBranchIndicator,
  LoongArkTreeViewBranchText,
  LoongArkTreeViewBranchIndentGuide,
  LoongArkTreeViewNodeCheckbox,
  LoongArkTreeViewNodeCheckboxIndicator,
  LoongArkTreeViewNodeRenameInput,
} from "./components/tree-view";
