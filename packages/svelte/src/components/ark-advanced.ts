import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticAccordionStyles } from "@shaloong/loongark-primitives/automatic-styles/accordion";
import { styles as lkAutomaticAvatarStyles } from "@shaloong/loongark-primitives/automatic-styles/avatar";
import { styles as lkAutomaticCarouselStyles } from "@shaloong/loongark-primitives/automatic-styles/carousel";
import { styles as lkAutomaticCheckboxStyles } from "@shaloong/loongark-primitives/automatic-styles/checkbox";
import { styles as lkAutomaticClipboardStyles } from "@shaloong/loongark-primitives/automatic-styles/clipboard";
import { styles as lkAutomaticCollapsibleStyles } from "@shaloong/loongark-primitives/automatic-styles/collapsible";
import { styles as lkAutomaticColorPickerStyles } from "@shaloong/loongark-primitives/automatic-styles/color-picker";
import { styles as lkAutomaticComboboxStyles } from "@shaloong/loongark-primitives/automatic-styles/combobox";
import { styles as lkAutomaticDatePickerStyles } from "@shaloong/loongark-primitives/automatic-styles/date-picker";
import { styles as lkAutomaticDialogStyles } from "@shaloong/loongark-primitives/automatic-styles/dialog";
import { styles as lkAutomaticEditableStyles } from "@shaloong/loongark-primitives/automatic-styles/editable";
import { styles as lkAutomaticFieldStyles } from "@shaloong/loongark-primitives/automatic-styles/field";
import { styles as lkAutomaticFileUploadStyles } from "@shaloong/loongark-primitives/automatic-styles/file-upload";
import { styles as lkAutomaticHoverCardStyles } from "@shaloong/loongark-primitives/automatic-styles/hover-card";
import { styles as lkAutomaticListboxStyles } from "@shaloong/loongark-primitives/automatic-styles/listbox";
import { styles as lkAutomaticMenuStyles } from "@shaloong/loongark-primitives/automatic-styles/menu";
import { styles as lkAutomaticNavigationMenuStyles } from "@shaloong/loongark-primitives/automatic-styles/navigation-menu";
import { styles as lkAutomaticNumberInputStyles } from "@shaloong/loongark-primitives/automatic-styles/number-input";
import { styles as lkAutomaticPaginationStyles } from "@shaloong/loongark-primitives/automatic-styles/pagination";
import { styles as lkAutomaticPasswordInputStyles } from "@shaloong/loongark-primitives/automatic-styles/password-input";
import { styles as lkAutomaticPinInputStyles } from "@shaloong/loongark-primitives/automatic-styles/pin-input";
import { styles as lkAutomaticPopoverStyles } from "@shaloong/loongark-primitives/automatic-styles/popover";
import { styles as lkAutomaticProgressStyles } from "@shaloong/loongark-primitives/automatic-styles/progress";
import { styles as lkAutomaticRadioGroupStyles } from "@shaloong/loongark-primitives/automatic-styles/radio-group";
import { styles as lkAutomaticRatingGroupStyles } from "@shaloong/loongark-primitives/automatic-styles/rating-group";
import { styles as lkAutomaticScrollAreaStyles } from "@shaloong/loongark-primitives/automatic-styles/scroll-area";
import { styles as lkAutomaticSegmentGroupStyles } from "@shaloong/loongark-primitives/automatic-styles/segment-group";
import { styles as lkAutomaticSelectStyles } from "@shaloong/loongark-primitives/automatic-styles/select";
import { styles as lkAutomaticSliderStyles } from "@shaloong/loongark-primitives/automatic-styles/slider";
import { styles as lkAutomaticSplitterStyles } from "@shaloong/loongark-primitives/automatic-styles/splitter";
import { styles as lkAutomaticStepsStyles } from "@shaloong/loongark-primitives/automatic-styles/steps";
import { styles as lkAutomaticSwitchStyles } from "@shaloong/loongark-primitives/automatic-styles/switch";
import { styles as lkAutomaticTabsStyles } from "@shaloong/loongark-primitives/automatic-styles/tabs";
import { styles as lkAutomaticTagsInputStyles } from "@shaloong/loongark-primitives/automatic-styles/tags-input";
import { styles as lkAutomaticToastStyles } from "@shaloong/loongark-primitives/automatic-styles/toast";
import { styles as lkAutomaticToggleStyles } from "@shaloong/loongark-primitives/automatic-styles/toggle";
import { styles as lkAutomaticToggleGroupStyles } from "@shaloong/loongark-primitives/automatic-styles/toggle-group";
import { styles as lkAutomaticTooltipStyles } from "@shaloong/loongark-primitives/automatic-styles/tooltip";
import { styles as lkAutomaticTreeViewStyles } from "@shaloong/loongark-primitives/automatic-styles/tree-view";

// 高级控制与组合部件保留 Ark 的真实类型；不增加组件族别名。
import { Accordion } from "@ark-ui/svelte/accordion";
export const LoongArkAccordionContext: typeof Accordion.Context =
  /*#__PURE__*/ withAutomaticStyles(Accordion.Context, lkAutomaticAccordionStyles);
export const LoongArkAccordionItemContext: typeof Accordion.ItemContext =
  /*#__PURE__*/ withAutomaticStyles(Accordion.ItemContext, lkAutomaticAccordionStyles);
export const LoongArkAccordionRootProvider: typeof Accordion.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(Accordion.RootProvider, lkAutomaticAccordionStyles);
export { useAccordion } from "@ark-ui/svelte/accordion";
export type {
  UseAccordionProps,
  UseAccordionReturn,
} from "@ark-ui/svelte/accordion";
import { Avatar } from "@ark-ui/svelte/avatar";
export const LoongArkAvatarContext: typeof Avatar.Context = /*#__PURE__*/ withAutomaticStyles(Avatar.Context, lkAutomaticAvatarStyles);
export const LoongArkAvatarRootProvider: typeof Avatar.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(Avatar.RootProvider, lkAutomaticAvatarStyles);
export { useAvatar } from "@ark-ui/svelte/avatar";
export type { UseAvatarProps, UseAvatarReturn } from "@ark-ui/svelte/avatar";
import { Carousel } from "@ark-ui/svelte/carousel";
export const LoongArkCarouselContext: typeof Carousel.Context =
  /*#__PURE__*/ withAutomaticStyles(Carousel.Context, lkAutomaticCarouselStyles);
export const LoongArkCarouselRootProvider: typeof Carousel.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(Carousel.RootProvider, lkAutomaticCarouselStyles);
export { useCarousel } from "@ark-ui/svelte/carousel";
export type {
  UseCarouselProps,
  UseCarouselReturn,
} from "@ark-ui/svelte/carousel";
import { Checkbox } from "@ark-ui/svelte/checkbox";
export const LoongArkCheckboxContext: typeof Checkbox.Context =
  /*#__PURE__*/ withAutomaticStyles(Checkbox.Context, lkAutomaticCheckboxStyles);
export const LoongArkCheckboxGroup: typeof Checkbox.Group = /*#__PURE__*/ withAutomaticStyles(Checkbox.Group, lkAutomaticCheckboxStyles);
export const LoongArkCheckboxGroupProvider: typeof Checkbox.GroupProvider =
  /*#__PURE__*/ withAutomaticStyles(Checkbox.GroupProvider, lkAutomaticCheckboxStyles);
export const LoongArkCheckboxRootProvider: typeof Checkbox.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(Checkbox.RootProvider, lkAutomaticCheckboxStyles);
export { useCheckbox } from "@ark-ui/svelte/checkbox";
export type {
  UseCheckboxProps,
  UseCheckboxReturn,
} from "@ark-ui/svelte/checkbox";
import { Clipboard } from "@ark-ui/svelte/clipboard";
export const LoongArkClipboardContext: typeof Clipboard.Context =
  /*#__PURE__*/ withAutomaticStyles(Clipboard.Context, lkAutomaticClipboardStyles);
export const LoongArkClipboardRootProvider: typeof Clipboard.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(Clipboard.RootProvider, lkAutomaticClipboardStyles);
export { useClipboard } from "@ark-ui/svelte/clipboard";
export type {
  UseClipboardProps,
  UseClipboardReturn,
} from "@ark-ui/svelte/clipboard";
import { Collapsible } from "@ark-ui/svelte/collapsible";
export const LoongArkCollapsibleContext: typeof Collapsible.Context =
  /*#__PURE__*/ withAutomaticStyles(Collapsible.Context, lkAutomaticCollapsibleStyles);
export const LoongArkCollapsibleRootProvider: typeof Collapsible.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(Collapsible.RootProvider, lkAutomaticCollapsibleStyles);
export { useCollapsible } from "@ark-ui/svelte/collapsible";
export type {
  UseCollapsibleProps,
  UseCollapsibleReturn,
} from "@ark-ui/svelte/collapsible";
import { ColorPicker } from "@ark-ui/svelte/color-picker";
export const LoongArkColorPickerContext: typeof ColorPicker.Context =
  /*#__PURE__*/ withAutomaticStyles(ColorPicker.Context, lkAutomaticColorPickerStyles);
export const LoongArkColorPickerRootProvider: typeof ColorPicker.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(ColorPicker.RootProvider, lkAutomaticColorPickerStyles);
export { useColorPicker } from "@ark-ui/svelte/color-picker";
export type {
  UseColorPickerProps,
  UseColorPickerReturn,
} from "@ark-ui/svelte/color-picker";
import { Combobox } from "@ark-ui/svelte/combobox";
export const LoongArkComboboxContext: typeof Combobox.Context =
  /*#__PURE__*/ withAutomaticStyles(Combobox.Context, lkAutomaticComboboxStyles);
export const LoongArkComboboxEmpty: typeof Combobox.Empty = /*#__PURE__*/ withAutomaticStyles(Combobox.Empty, lkAutomaticComboboxStyles);
export const LoongArkComboboxItemContext: typeof Combobox.ItemContext =
  /*#__PURE__*/ withAutomaticStyles(Combobox.ItemContext, lkAutomaticComboboxStyles);
export const LoongArkComboboxRootProvider: typeof Combobox.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(Combobox.RootProvider, lkAutomaticComboboxStyles);
export { useCombobox } from "@ark-ui/svelte/combobox";
export type {
  UseComboboxProps,
  UseComboboxReturn,
} from "@ark-ui/svelte/combobox";
import { DatePicker } from "@ark-ui/svelte/date-picker";
export const LoongArkDatePickerContext: typeof DatePicker.Context =
  /*#__PURE__*/ withAutomaticStyles(DatePicker.Context, lkAutomaticDatePickerStyles);
export const LoongArkDatePickerRootProvider: typeof DatePicker.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(DatePicker.RootProvider, lkAutomaticDatePickerStyles);
export { useDatePicker } from "@ark-ui/svelte/date-picker";
export type {
  UseDatePickerProps,
  UseDatePickerReturn,
} from "@ark-ui/svelte/date-picker";
import { Dialog } from "@ark-ui/svelte/dialog";
export const LoongArkDialogContext: typeof Dialog.Context = /*#__PURE__*/ withAutomaticStyles(Dialog.Context, lkAutomaticDialogStyles);
export const LoongArkDialogRootProvider: typeof Dialog.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(Dialog.RootProvider, lkAutomaticDialogStyles);
export { useDialog } from "@ark-ui/svelte/dialog";
export type { UseDialogProps, UseDialogReturn } from "@ark-ui/svelte/dialog";
import { Editable } from "@ark-ui/svelte/editable";
export const LoongArkEditableContext: typeof Editable.Context =
  /*#__PURE__*/ withAutomaticStyles(Editable.Context, lkAutomaticEditableStyles);
export const LoongArkEditableRootProvider: typeof Editable.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(Editable.RootProvider, lkAutomaticEditableStyles);
export { useEditable } from "@ark-ui/svelte/editable";
export type {
  UseEditableProps,
  UseEditableReturn,
} from "@ark-ui/svelte/editable";
import { FileUpload } from "@ark-ui/svelte/file-upload";
export const LoongArkFileUploadContext: typeof FileUpload.Context =
  /*#__PURE__*/ withAutomaticStyles(FileUpload.Context, lkAutomaticFileUploadStyles);
export const LoongArkFileUploadRootProvider: typeof FileUpload.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(FileUpload.RootProvider, lkAutomaticFileUploadStyles);
export { useFileUpload } from "@ark-ui/svelte/file-upload";
export type {
  UseFileUploadProps,
  UseFileUploadReturn,
} from "@ark-ui/svelte/file-upload";
import { HoverCard } from "@ark-ui/svelte/hover-card";
export const LoongArkHoverCardContext: typeof HoverCard.Context =
  /*#__PURE__*/ withAutomaticStyles(HoverCard.Context, lkAutomaticHoverCardStyles);
export const LoongArkHoverCardRootProvider: typeof HoverCard.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(HoverCard.RootProvider, lkAutomaticHoverCardStyles);
export { useHoverCard } from "@ark-ui/svelte/hover-card";
export type {
  UseHoverCardProps,
  UseHoverCardReturn,
} from "@ark-ui/svelte/hover-card";
import { Listbox } from "@ark-ui/svelte/listbox";
export const LoongArkListboxContext: typeof Listbox.Context = /*#__PURE__*/ withAutomaticStyles(Listbox.Context, lkAutomaticListboxStyles);
export const LoongArkListboxEmpty: typeof Listbox.Empty = /*#__PURE__*/ withAutomaticStyles(Listbox.Empty, lkAutomaticListboxStyles);
export const LoongArkListboxInput: typeof Listbox.Input = /*#__PURE__*/ withAutomaticStyles(Listbox.Input, lkAutomaticListboxStyles);
export const LoongArkListboxItemContext: typeof Listbox.ItemContext =
  /*#__PURE__*/ withAutomaticStyles(Listbox.ItemContext, lkAutomaticListboxStyles);
export const LoongArkListboxRootProvider: typeof Listbox.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(Listbox.RootProvider, lkAutomaticListboxStyles);
export const LoongArkListboxValueText: typeof Listbox.ValueText =
  /*#__PURE__*/ withAutomaticStyles(Listbox.ValueText, lkAutomaticListboxStyles);
export { useListbox } from "@ark-ui/svelte/listbox";
export type { UseListboxProps, UseListboxReturn } from "@ark-ui/svelte/listbox";
import { Menu } from "@ark-ui/svelte/menu";
export const LoongArkMenuContext: typeof Menu.Context = /*#__PURE__*/ withAutomaticStyles(Menu.Context, lkAutomaticMenuStyles);
export const LoongArkMenuItemContext: typeof Menu.ItemContext =
  /*#__PURE__*/ withAutomaticStyles(Menu.ItemContext, lkAutomaticMenuStyles);
export const LoongArkMenuRootProvider: typeof Menu.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(Menu.RootProvider, lkAutomaticMenuStyles);
export { useMenu } from "@ark-ui/svelte/menu";
export type { UseMenuProps, UseMenuReturn } from "@ark-ui/svelte/menu";
import { NavigationMenu } from "@ark-ui/svelte/navigation-menu";
export const LoongArkNavigationMenuArrow: typeof NavigationMenu.Arrow =
  /*#__PURE__*/ withAutomaticStyles(NavigationMenu.Arrow, lkAutomaticNavigationMenuStyles);
export const LoongArkNavigationMenuContext: typeof NavigationMenu.Context =
  /*#__PURE__*/ withAutomaticStyles(NavigationMenu.Context, lkAutomaticNavigationMenuStyles);
export const LoongArkNavigationMenuIndicator: typeof NavigationMenu.Indicator =
  /*#__PURE__*/ withAutomaticStyles(NavigationMenu.Indicator, lkAutomaticNavigationMenuStyles);
export const LoongArkNavigationMenuItemIndicator: typeof NavigationMenu.ItemIndicator =
  /*#__PURE__*/ withAutomaticStyles(NavigationMenu.ItemIndicator, lkAutomaticNavigationMenuStyles);
export const LoongArkNavigationMenuRootProvider: typeof NavigationMenu.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(NavigationMenu.RootProvider, lkAutomaticNavigationMenuStyles);
export const LoongArkNavigationMenuViewport: typeof NavigationMenu.Viewport =
  /*#__PURE__*/ withAutomaticStyles(NavigationMenu.Viewport, lkAutomaticNavigationMenuStyles);
export const LoongArkNavigationMenuViewportPositioner: typeof NavigationMenu.ViewportPositioner =
  /*#__PURE__*/ withAutomaticStyles(NavigationMenu.ViewportPositioner, lkAutomaticNavigationMenuStyles);
export { useNavigationMenu } from "@ark-ui/svelte/navigation-menu";
export type {
  UseNavigationMenuProps,
  UseNavigationMenuReturn,
} from "@ark-ui/svelte/navigation-menu";
import { NumberInput } from "@ark-ui/svelte/number-input";
export const LoongArkNumberInputContext: typeof NumberInput.Context =
  /*#__PURE__*/ withAutomaticStyles(NumberInput.Context, lkAutomaticNumberInputStyles);
export const LoongArkNumberInputRootProvider: typeof NumberInput.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(NumberInput.RootProvider, lkAutomaticNumberInputStyles);
export { useNumberInput } from "@ark-ui/svelte/number-input";
export type {
  UseNumberInputProps,
  UseNumberInputReturn,
} from "@ark-ui/svelte/number-input";
import { Pagination } from "@ark-ui/svelte/pagination";
export const LoongArkPaginationContext: typeof Pagination.Context =
  /*#__PURE__*/ withAutomaticStyles(Pagination.Context, lkAutomaticPaginationStyles);
export const LoongArkPaginationFirstTrigger: typeof Pagination.FirstTrigger =
  /*#__PURE__*/ withAutomaticStyles(Pagination.FirstTrigger, lkAutomaticPaginationStyles);
export const LoongArkPaginationLastTrigger: typeof Pagination.LastTrigger =
  /*#__PURE__*/ withAutomaticStyles(Pagination.LastTrigger, lkAutomaticPaginationStyles);
export const LoongArkPaginationRootProvider: typeof Pagination.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(Pagination.RootProvider, lkAutomaticPaginationStyles);
export { usePagination } from "@ark-ui/svelte/pagination";
export type {
  UsePaginationProps,
  UsePaginationReturn,
} from "@ark-ui/svelte/pagination";
import { PasswordInput } from "@ark-ui/svelte/password-input";
export const LoongArkPasswordInputContext: typeof PasswordInput.Context =
  /*#__PURE__*/ withAutomaticStyles(PasswordInput.Context, lkAutomaticPasswordInputStyles);
export const LoongArkPasswordInputRootProvider: typeof PasswordInput.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(PasswordInput.RootProvider, lkAutomaticPasswordInputStyles);
export { usePasswordInput } from "@ark-ui/svelte/password-input";
export type {
  UsePasswordInputProps,
  UsePasswordInputReturn,
} from "@ark-ui/svelte/password-input";
import { PinInput } from "@ark-ui/svelte/pin-input";
export const LoongArkPinInputContext: typeof PinInput.Context =
  /*#__PURE__*/ withAutomaticStyles(PinInput.Context, lkAutomaticPinInputStyles);
export const LoongArkPinInputRootProvider: typeof PinInput.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(PinInput.RootProvider, lkAutomaticPinInputStyles);
export { usePinInput } from "@ark-ui/svelte/pin-input";
export type {
  UsePinInputProps,
  UsePinInputReturn,
} from "@ark-ui/svelte/pin-input";
import { Popover } from "@ark-ui/svelte/popover";
export const LoongArkPopoverAnchor: typeof Popover.Anchor = /*#__PURE__*/ withAutomaticStyles(Popover.Anchor, lkAutomaticPopoverStyles);
export const LoongArkPopoverArrowTip: typeof Popover.ArrowTip =
  /*#__PURE__*/ withAutomaticStyles(Popover.ArrowTip, lkAutomaticPopoverStyles);
export const LoongArkPopoverContext: typeof Popover.Context = /*#__PURE__*/ withAutomaticStyles(Popover.Context, lkAutomaticPopoverStyles);
export const LoongArkPopoverIndicator: typeof Popover.Indicator =
  /*#__PURE__*/ withAutomaticStyles(Popover.Indicator, lkAutomaticPopoverStyles);
export const LoongArkPopoverRootProvider: typeof Popover.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(Popover.RootProvider, lkAutomaticPopoverStyles);
export { usePopover } from "@ark-ui/svelte/popover";
export type { UsePopoverProps, UsePopoverReturn } from "@ark-ui/svelte/popover";
import { Progress } from "@ark-ui/svelte/progress";
export const LoongArkProgressContext: typeof Progress.Context =
  /*#__PURE__*/ withAutomaticStyles(Progress.Context, lkAutomaticProgressStyles);
export const LoongArkProgressRootProvider: typeof Progress.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(Progress.RootProvider, lkAutomaticProgressStyles);
export { useProgress } from "@ark-ui/svelte/progress";
export type {
  UseProgressProps,
  UseProgressReturn,
} from "@ark-ui/svelte/progress";
import { RadioGroup } from "@ark-ui/svelte/radio-group";
export const LoongArkRadioGroupContext: typeof RadioGroup.Context =
  /*#__PURE__*/ withAutomaticStyles(RadioGroup.Context, lkAutomaticRadioGroupStyles);
export const LoongArkRadioGroupItemContext: typeof RadioGroup.ItemContext =
  /*#__PURE__*/ withAutomaticStyles(RadioGroup.ItemContext, lkAutomaticRadioGroupStyles);
export const LoongArkRadioGroupRootProvider: typeof RadioGroup.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(RadioGroup.RootProvider, lkAutomaticRadioGroupStyles);
export { useRadioGroup } from "@ark-ui/svelte/radio-group";
export type {
  UseRadioGroupProps,
  UseRadioGroupReturn,
} from "@ark-ui/svelte/radio-group";
import { RatingGroup } from "@ark-ui/svelte/rating-group";
export const LoongArkRatingGroupContext: typeof RatingGroup.Context =
  /*#__PURE__*/ withAutomaticStyles(RatingGroup.Context, lkAutomaticRatingGroupStyles);
export const LoongArkRatingGroupItemContext: typeof RatingGroup.ItemContext =
  /*#__PURE__*/ withAutomaticStyles(RatingGroup.ItemContext, lkAutomaticRatingGroupStyles);
export const LoongArkRatingGroupRootProvider: typeof RatingGroup.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(RatingGroup.RootProvider, lkAutomaticRatingGroupStyles);
export { useRatingGroup } from "./use-rating.svelte";
export type {
  UseRatingGroupProps,
  UseRatingGroupReturn,
} from "@ark-ui/svelte/rating-group";
import { ScrollArea } from "@ark-ui/svelte/scroll-area";
export const LoongArkScrollAreaContext: typeof ScrollArea.Context =
  /*#__PURE__*/ withAutomaticStyles(ScrollArea.Context, lkAutomaticScrollAreaStyles);
export const LoongArkScrollAreaRootProvider: typeof ScrollArea.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(ScrollArea.RootProvider, lkAutomaticScrollAreaStyles);
export { useScrollArea } from "@ark-ui/svelte/scroll-area";
export type {
  UseScrollAreaProps,
  UseScrollAreaReturn,
} from "@ark-ui/svelte/scroll-area";
import { SegmentGroup } from "@ark-ui/svelte/segment-group";
export const LoongArkSegmentGroupContext: typeof SegmentGroup.Context =
  /*#__PURE__*/ withAutomaticStyles(SegmentGroup.Context, lkAutomaticSegmentGroupStyles);
export const LoongArkSegmentGroupIndicator: typeof SegmentGroup.Indicator =
  /*#__PURE__*/ withAutomaticStyles(SegmentGroup.Indicator, lkAutomaticSegmentGroupStyles);
export const LoongArkSegmentGroupItemContext: typeof SegmentGroup.ItemContext =
  /*#__PURE__*/ withAutomaticStyles(SegmentGroup.ItemContext, lkAutomaticSegmentGroupStyles);
export const LoongArkSegmentGroupItemControl: typeof SegmentGroup.ItemControl =
  /*#__PURE__*/ withAutomaticStyles(SegmentGroup.ItemControl, lkAutomaticSegmentGroupStyles);
export const LoongArkSegmentGroupItemHiddenInput: typeof SegmentGroup.ItemHiddenInput =
  /*#__PURE__*/ withAutomaticStyles(SegmentGroup.ItemHiddenInput, lkAutomaticSegmentGroupStyles);
export const LoongArkSegmentGroupItemText: typeof SegmentGroup.ItemText =
  /*#__PURE__*/ withAutomaticStyles(SegmentGroup.ItemText, lkAutomaticSegmentGroupStyles);
export const LoongArkSegmentGroupLabel: typeof SegmentGroup.Label =
  /*#__PURE__*/ withAutomaticStyles(SegmentGroup.Label, lkAutomaticSegmentGroupStyles);
export const LoongArkSegmentGroupRootProvider: typeof SegmentGroup.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(SegmentGroup.RootProvider, lkAutomaticSegmentGroupStyles);
export { useSegmentGroup } from "@ark-ui/svelte/segment-group";
export type {
  UseSegmentGroupProps,
  UseSegmentGroupReturn,
} from "@ark-ui/svelte/segment-group";
import { Select } from "@ark-ui/svelte/select";
export const LoongArkSelectContext: typeof Select.Context = /*#__PURE__*/ withAutomaticStyles(Select.Context, lkAutomaticSelectStyles);
export const LoongArkSelectItemContext: typeof Select.ItemContext =
  /*#__PURE__*/ withAutomaticStyles(Select.ItemContext, lkAutomaticSelectStyles);
export const LoongArkSelectRootProvider: typeof Select.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(Select.RootProvider, lkAutomaticSelectStyles);
export { useSelect } from "@ark-ui/svelte/select";
export type { UseSelectProps, UseSelectReturn } from "@ark-ui/svelte/select";
import { Slider } from "@ark-ui/svelte/slider";
export const LoongArkSliderContext: typeof Slider.Context = /*#__PURE__*/ withAutomaticStyles(Slider.Context, lkAutomaticSliderStyles);
export const LoongArkSliderRootProvider: typeof Slider.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(Slider.RootProvider, lkAutomaticSliderStyles);
export { useSlider } from "@ark-ui/svelte/slider";
export type { UseSliderProps, UseSliderReturn } from "@ark-ui/svelte/slider";
import { Splitter } from "@ark-ui/svelte/splitter";
export const LoongArkSplitterContext: typeof Splitter.Context =
  /*#__PURE__*/ withAutomaticStyles(Splitter.Context, lkAutomaticSplitterStyles);
export const LoongArkSplitterRootProvider: typeof Splitter.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(Splitter.RootProvider, lkAutomaticSplitterStyles);
export { useSplitter } from "@ark-ui/svelte/splitter";
export type {
  UseSplitterProps,
  UseSplitterReturn,
} from "@ark-ui/svelte/splitter";
import { Steps } from "@ark-ui/svelte/steps";
export const LoongArkStepsContext: typeof Steps.Context = /*#__PURE__*/ withAutomaticStyles(Steps.Context, lkAutomaticStepsStyles);
export const LoongArkStepsItemContext: typeof Steps.ItemContext =
  /*#__PURE__*/ withAutomaticStyles(Steps.ItemContext, lkAutomaticStepsStyles);
export const LoongArkStepsRootProvider: typeof Steps.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(Steps.RootProvider, lkAutomaticStepsStyles);
export { useSteps } from "@ark-ui/svelte/steps";
export type { UseStepsProps, UseStepsReturn } from "@ark-ui/svelte/steps";
import { Switch } from "@ark-ui/svelte/switch";
export const LoongArkSwitchContext: typeof Switch.Context = /*#__PURE__*/ withAutomaticStyles(Switch.Context, lkAutomaticSwitchStyles);
export const LoongArkSwitchRootProvider: typeof Switch.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(Switch.RootProvider, lkAutomaticSwitchStyles);
export { useSwitch } from "@ark-ui/svelte/switch";
export type { UseSwitchProps, UseSwitchReturn } from "@ark-ui/svelte/switch";
import { Tabs } from "@ark-ui/svelte/tabs";
export const LoongArkTabsContext: typeof Tabs.Context = /*#__PURE__*/ withAutomaticStyles(Tabs.Context, lkAutomaticTabsStyles);
export const LoongArkTabsRootProvider: typeof Tabs.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(Tabs.RootProvider, lkAutomaticTabsStyles);
export { useTabs } from "@ark-ui/svelte/tabs";
export type { UseTabsProps, UseTabsReturn } from "@ark-ui/svelte/tabs";
import { TagsInput } from "@ark-ui/svelte/tags-input";
export const LoongArkTagsInputContext: typeof TagsInput.Context =
  /*#__PURE__*/ withAutomaticStyles(TagsInput.Context, lkAutomaticTagsInputStyles);
export const LoongArkTagsInputItemContext: typeof TagsInput.ItemContext =
  /*#__PURE__*/ withAutomaticStyles(TagsInput.ItemContext, lkAutomaticTagsInputStyles);
export const LoongArkTagsInputRootProvider: typeof TagsInput.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(TagsInput.RootProvider, lkAutomaticTagsInputStyles);
export { useTagsInput } from "@ark-ui/svelte/tags-input";
export type {
  UseTagsInputProps,
  UseTagsInputReturn,
} from "@ark-ui/svelte/tags-input";
import { Toast } from "@ark-ui/svelte/toast";
export const LoongArkToastContext: typeof Toast.Context = /*#__PURE__*/ withAutomaticStyles(Toast.Context, lkAutomaticToastStyles);
import { Toggle } from "@ark-ui/svelte/toggle";
export const LoongArkToggleContext: typeof Toggle.Context = /*#__PURE__*/ withAutomaticStyles(Toggle.Context, lkAutomaticToggleStyles);
import { ToggleGroup } from "@ark-ui/svelte/toggle-group";
export const LoongArkToggleGroupContext: typeof ToggleGroup.Context =
  /*#__PURE__*/ withAutomaticStyles(ToggleGroup.Context, lkAutomaticToggleGroupStyles);
export const LoongArkToggleGroupRootProvider: typeof ToggleGroup.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(ToggleGroup.RootProvider, lkAutomaticToggleGroupStyles);
export { useToggleGroup } from "@ark-ui/svelte/toggle-group";
export type {
  UseToggleGroupProps,
  UseToggleGroupReturn,
} from "@ark-ui/svelte/toggle-group";
import { Tooltip } from "@ark-ui/svelte/tooltip";
export const LoongArkTooltipContext: typeof Tooltip.Context = /*#__PURE__*/ withAutomaticStyles(Tooltip.Context, lkAutomaticTooltipStyles);
export const LoongArkTooltipRootProvider: typeof Tooltip.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(Tooltip.RootProvider, lkAutomaticTooltipStyles);
export { useTooltip } from "@ark-ui/svelte/tooltip";
export type { UseTooltipProps, UseTooltipReturn } from "@ark-ui/svelte/tooltip";
import { TreeView } from "@ark-ui/svelte/tree-view";
export const LoongArkTreeViewContext: typeof TreeView.Context =
  /*#__PURE__*/ withAutomaticStyles(TreeView.Context, lkAutomaticTreeViewStyles);
export const LoongArkTreeViewNodeContext: typeof TreeView.NodeContext =
  /*#__PURE__*/ withAutomaticStyles(TreeView.NodeContext, lkAutomaticTreeViewStyles);
export const LoongArkTreeViewRootProvider: typeof TreeView.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(TreeView.RootProvider, lkAutomaticTreeViewStyles);
export { useTreeView } from "@ark-ui/svelte/tree-view";
export type {
  UseTreeViewProps,
  UseTreeViewReturn,
} from "@ark-ui/svelte/tree-view";

import { DatePicker as NewDatePicker } from "@ark-ui/svelte/date-picker";
export const LoongArkDatePickerValueText: typeof NewDatePicker.ValueText =
  /*#__PURE__*/ withAutomaticStyles(NewDatePicker.ValueText, lkAutomaticDatePickerStyles);
export const LoongArkDatePickerWeekNumberHeaderCell: typeof NewDatePicker.WeekNumberHeaderCell =
  /*#__PURE__*/ withAutomaticStyles(NewDatePicker.WeekNumberHeaderCell, lkAutomaticDatePickerStyles);
export const LoongArkDatePickerWeekNumberCell: typeof NewDatePicker.WeekNumberCell =
  /*#__PURE__*/ withAutomaticStyles(NewDatePicker.WeekNumberCell, lkAutomaticDatePickerStyles);
import { Field as NewField } from "@ark-ui/svelte/field";
export const LoongArkFieldItem: typeof NewField.Item = /*#__PURE__*/ withAutomaticStyles(NewField.Item, lkAutomaticFieldStyles);
