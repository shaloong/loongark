import {
  useContext,
  useMemo,
  useEffect,
  useLayoutEffect,
  useRef,
  useId,
  createElement,
  ReactNode,
  FC,
} from "react";
import {
  createLoongArkTheme,
  LoongArkTheme,
  type CreateThemeOptions,
} from "@loongark/theme";
import { bootstrapKit } from "@loongark/kit";

import { ThemeContext } from "./theme-context";
const useThemeEffect =
  typeof document === "undefined" ? useEffect : useLayoutEffect;
export { LoongArkPortal } from "./components/portal";

export interface LoongArkProviderProps extends CreateThemeOptions {
  mode?: "light" | "dark" | "high-contrast";
  brand?: string;
  accent?: string;
  overrides?: CreateThemeOptions["overrides"];
  children?: ReactNode;
}

export const LoongArkProvider: FC<LoongArkProviderProps> = ({
  children,
  mode,
  brand,
  accent,
  overrides,
  targetId,
  motionPreference,
}) => {
  const scopeId = useId();
  const theme = useMemo(() => {
    const instance = createLoongArkTheme({
      mode,
      brand,
      accent,
      overrides,
      targetId: targetId ?? scopeId,
      motionPreference,
    });
    return instance;
  }, [mode, brand, accent, overrides, targetId, scopeId, motionPreference]);
  const scope = useRef<HTMLDivElement | null>(null);

  useThemeEffect(() => {
    if (!scope.current) return;
    theme.mount(scope.current);
    bootstrapKit(theme);
    return () => theme.unmount();
  }, [theme]);

  return createElement(
    ThemeContext.Provider,
    { value: theme },
    createElement(
      "div",
      { ref: scope, "data-lk-theme": theme.id, style: { display: "contents" } },
      children,
    ),
  );
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
  LoongArkInputGroup,
  LoongArkInputInput,
  LoongArkInputControl,
  LoongArkTextareaControl,
  LoongArkInputHelperText,
  LoongArkInputErrorText,
  LoongArkInputLabel,
  LoongArkInputPrefix,
  LoongArkInputSuffix,
} from "./components/input";
export {
  LoongArkDialog,
  LoongArkDialogRoot,
  LoongArkDialogPositioner,
  LoongArkDialogPortal,
  LoongArkDialogTrigger,
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
  LoongArkSwitchHiddenInput,
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
export type {
  MenuSize,
  SelectSize,
  TabsSize,
  TabsOrientation,
  SliderSize,
  SliderOrientation,
  ToggleSize,
  ToggleGroupSize,
  ToggleGroupOrientation,
  SegmentGroupSize,
  SegmentGroupOrientation,
  PaginationSize,
  PaginationOrientation,
  ListboxSize,
  ListboxOrientation,
  ComboboxSize,
  NumberInputSize,
  NumberInputState,
  PasswordInputSize,
  PasswordInputState,
  TagsInputSize,
  TagsInputState,
  FileUploadSize,
  ProgressSize,
  ProgressOrientation,
  StepsSize,
  StepsOrientation,
  AvatarSize,
  CarouselSize,
  ClipboardSize,
  ColorPickerSize,
  EditableSize,
  EditableState,
  HoverCardSize,
  ScrollAreaSize,
  RatingGroupSize,
  SplitterSize,
  TreeViewSize,
} from "@loongark/primitives";

export * from "./components/extended";

export * from "./components/layout";

export * from "./components/composed";

export * from "./components/data";

export { createListCollection } from "@ark-ui/react/collection";
export { createTreeCollection } from "@ark-ui/react/collection";
export { parseDate } from "@ark-ui/react/date-picker";
export { parseColor } from "@ark-ui/react/color-picker";
export { TreeViewNodeProvider as LoongArkTreeViewNodeProvider } from "@ark-ui/react/tree-view";

export { LoongArkTextarea } from "./components/textarea";
export type { LoongArkTextareaProps } from "./components/textarea";

export { LoongArkTransferList } from "./components/transfer-list";
export { LoongArkTimePicker } from "./components/time-picker";
export type { LoongArkTransferListProps } from "./components/transfer-list";
export type { LoongArkTimePickerProps } from "./components/time-picker";

export * from "./components/action-media";

export * from "./components/conversation";

export * from "./components/message-scroller";

export * from "./components/questionnaire";

export * from "./components/ark-additions";

export * from "./components/ark-advanced";

export * from "./components/ark-next";
export * from "./components/drawer";
export * from "./components/ark-controls";

export type { Question, QuestionRow, QuestionAnswer, QuestionOption, QuestionnaireOptions, QuestionnaireValue } from "@loongark/kit";

export type { DataTableState, DataTableLabels, DataTableSummary, DataRow, DataColumn, DataSort, DataFilter, DataFilterOperator, DataColumnFilter } from "@loongark/kit";

export type { ChartOptions, ChartSeries, ChartLabels, ChartAxis } from "@loongark/kit";

export type {AttachmentOptions,MessageOptions,ConversationAction,ConversationActionContext,ConversationActionHandler,ConversationActionLabels,ConversationActionState} from "@loongark/kit";

export * from "./components/icon";
export type {IconOptions, IconNode} from "@loongark/kit";

export type { VirtualizationOptions, VirtualRenderDetails } from "@loongark/kit";

export type {ChartRange} from "@loongark/kit";

export { createAsyncCollectionLoader } from "@loongark/kit";
export type { AsyncCollectionSort, AsyncCollectionRequest, AsyncCollectionLoadDetails, AsyncCollectionPage, AsyncCollectionLoaderOptions } from "@loongark/kit";

export type { DataColumnGeometry, DataTableColumnLabels, DataTableColumnOptions } from "@loongark/kit";

export { LoongArkCodeEditor, LoongArkRichTextEditor } from "./components/editors";
export type { CodeEditorProps, CodeEditorLabels, CodeEditorLanguage, CodeEditorLanguageLoader, CodeEditorHandle, RichTextEditorProps, RichTextEditorHandle, RichTextDocument, RichTextMark, RichTextAttribute, RichTextAction } from "@loongark/kit";
