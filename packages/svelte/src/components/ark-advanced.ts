// 高级控制与组合部件保留 Ark 的真实类型；不增加组件族别名。
import { Accordion } from "@ark-ui/svelte/accordion";
export const LoongArkAccordionContext: typeof Accordion.Context =
  Accordion.Context;
export const LoongArkAccordionItemContext: typeof Accordion.ItemContext =
  Accordion.ItemContext;
export const LoongArkAccordionRootProvider: typeof Accordion.RootProvider =
  Accordion.RootProvider;
export { useAccordion } from "@ark-ui/svelte/accordion";
export type {
  UseAccordionProps,
  UseAccordionReturn,
} from "@ark-ui/svelte/accordion";
import { Avatar } from "@ark-ui/svelte/avatar";
export const LoongArkAvatarContext: typeof Avatar.Context = Avatar.Context;
export const LoongArkAvatarRootProvider: typeof Avatar.RootProvider =
  Avatar.RootProvider;
export { useAvatar } from "@ark-ui/svelte/avatar";
export type { UseAvatarProps, UseAvatarReturn } from "@ark-ui/svelte/avatar";
import { Carousel } from "@ark-ui/svelte/carousel";
export const LoongArkCarouselContext: typeof Carousel.Context =
  Carousel.Context;
export const LoongArkCarouselRootProvider: typeof Carousel.RootProvider =
  Carousel.RootProvider;
export { useCarousel } from "@ark-ui/svelte/carousel";
export type {
  UseCarouselProps,
  UseCarouselReturn,
} from "@ark-ui/svelte/carousel";
import { Checkbox } from "@ark-ui/svelte/checkbox";
export const LoongArkCheckboxContext: typeof Checkbox.Context =
  Checkbox.Context;
export const LoongArkCheckboxGroup: typeof Checkbox.Group = Checkbox.Group;
export const LoongArkCheckboxGroupProvider: typeof Checkbox.GroupProvider =
  Checkbox.GroupProvider;
export const LoongArkCheckboxRootProvider: typeof Checkbox.RootProvider =
  Checkbox.RootProvider;
export { useCheckbox } from "@ark-ui/svelte/checkbox";
export type {
  UseCheckboxProps,
  UseCheckboxReturn,
} from "@ark-ui/svelte/checkbox";
import { Clipboard } from "@ark-ui/svelte/clipboard";
export const LoongArkClipboardContext: typeof Clipboard.Context =
  Clipboard.Context;
export const LoongArkClipboardRootProvider: typeof Clipboard.RootProvider =
  Clipboard.RootProvider;
export { useClipboard } from "@ark-ui/svelte/clipboard";
export type {
  UseClipboardProps,
  UseClipboardReturn,
} from "@ark-ui/svelte/clipboard";
import { Collapsible } from "@ark-ui/svelte/collapsible";
export const LoongArkCollapsibleContext: typeof Collapsible.Context =
  Collapsible.Context;
export const LoongArkCollapsibleRootProvider: typeof Collapsible.RootProvider =
  Collapsible.RootProvider;
export { useCollapsible } from "@ark-ui/svelte/collapsible";
export type {
  UseCollapsibleProps,
  UseCollapsibleReturn,
} from "@ark-ui/svelte/collapsible";
import { ColorPicker } from "@ark-ui/svelte/color-picker";
export const LoongArkColorPickerContext: typeof ColorPicker.Context =
  ColorPicker.Context;
export const LoongArkColorPickerRootProvider: typeof ColorPicker.RootProvider =
  ColorPicker.RootProvider;
export { useColorPicker } from "@ark-ui/svelte/color-picker";
export type {
  UseColorPickerProps,
  UseColorPickerReturn,
} from "@ark-ui/svelte/color-picker";
import { Combobox } from "@ark-ui/svelte/combobox";
export const LoongArkComboboxContext: typeof Combobox.Context =
  Combobox.Context;
export const LoongArkComboboxEmpty: typeof Combobox.Empty = Combobox.Empty;
export const LoongArkComboboxItemContext: typeof Combobox.ItemContext =
  Combobox.ItemContext;
export const LoongArkComboboxRootProvider: typeof Combobox.RootProvider =
  Combobox.RootProvider;
export { useCombobox } from "@ark-ui/svelte/combobox";
export type {
  UseComboboxProps,
  UseComboboxReturn,
} from "@ark-ui/svelte/combobox";
import { DatePicker } from "@ark-ui/svelte/date-picker";
export const LoongArkDatePickerContext: typeof DatePicker.Context =
  DatePicker.Context;
export const LoongArkDatePickerRootProvider: typeof DatePicker.RootProvider =
  DatePicker.RootProvider;
export { useDatePicker } from "@ark-ui/svelte/date-picker";
export type {
  UseDatePickerProps,
  UseDatePickerReturn,
} from "@ark-ui/svelte/date-picker";
import { Dialog } from "@ark-ui/svelte/dialog";
export const LoongArkDialogContext: typeof Dialog.Context = Dialog.Context;
export const LoongArkDialogRootProvider: typeof Dialog.RootProvider =
  Dialog.RootProvider;
export { useDialog } from "@ark-ui/svelte/dialog";
export type { UseDialogProps, UseDialogReturn } from "@ark-ui/svelte/dialog";
import { Editable } from "@ark-ui/svelte/editable";
export const LoongArkEditableContext: typeof Editable.Context =
  Editable.Context;
export const LoongArkEditableRootProvider: typeof Editable.RootProvider =
  Editable.RootProvider;
export { useEditable } from "@ark-ui/svelte/editable";
export type {
  UseEditableProps,
  UseEditableReturn,
} from "@ark-ui/svelte/editable";
import { FileUpload } from "@ark-ui/svelte/file-upload";
export const LoongArkFileUploadContext: typeof FileUpload.Context =
  FileUpload.Context;
export const LoongArkFileUploadRootProvider: typeof FileUpload.RootProvider =
  FileUpload.RootProvider;
export { useFileUpload } from "@ark-ui/svelte/file-upload";
export type {
  UseFileUploadProps,
  UseFileUploadReturn,
} from "@ark-ui/svelte/file-upload";
import { HoverCard } from "@ark-ui/svelte/hover-card";
export const LoongArkHoverCardContext: typeof HoverCard.Context =
  HoverCard.Context;
export const LoongArkHoverCardRootProvider: typeof HoverCard.RootProvider =
  HoverCard.RootProvider;
export { useHoverCard } from "@ark-ui/svelte/hover-card";
export type {
  UseHoverCardProps,
  UseHoverCardReturn,
} from "@ark-ui/svelte/hover-card";
import { Listbox } from "@ark-ui/svelte/listbox";
export const LoongArkListboxContext: typeof Listbox.Context = Listbox.Context;
export const LoongArkListboxEmpty: typeof Listbox.Empty = Listbox.Empty;
export const LoongArkListboxInput: typeof Listbox.Input = Listbox.Input;
export const LoongArkListboxItemContext: typeof Listbox.ItemContext =
  Listbox.ItemContext;
export const LoongArkListboxRootProvider: typeof Listbox.RootProvider =
  Listbox.RootProvider;
export const LoongArkListboxValueText: typeof Listbox.ValueText =
  Listbox.ValueText;
export { useListbox } from "@ark-ui/svelte/listbox";
export type { UseListboxProps, UseListboxReturn } from "@ark-ui/svelte/listbox";
import { Menu } from "@ark-ui/svelte/menu";
export const LoongArkMenuContext: typeof Menu.Context = Menu.Context;
export const LoongArkMenuItemContext: typeof Menu.ItemContext =
  Menu.ItemContext;
export const LoongArkMenuRootProvider: typeof Menu.RootProvider =
  Menu.RootProvider;
export { useMenu } from "@ark-ui/svelte/menu";
export type { UseMenuProps, UseMenuReturn } from "@ark-ui/svelte/menu";
import { NavigationMenu } from "@ark-ui/svelte/navigation-menu";
export const LoongArkNavigationMenuArrow: typeof NavigationMenu.Arrow =
  NavigationMenu.Arrow;
export const LoongArkNavigationMenuContext: typeof NavigationMenu.Context =
  NavigationMenu.Context;
export const LoongArkNavigationMenuIndicator: typeof NavigationMenu.Indicator =
  NavigationMenu.Indicator;
export const LoongArkNavigationMenuItemIndicator: typeof NavigationMenu.ItemIndicator =
  NavigationMenu.ItemIndicator;
export const LoongArkNavigationMenuRootProvider: typeof NavigationMenu.RootProvider =
  NavigationMenu.RootProvider;
export const LoongArkNavigationMenuViewport: typeof NavigationMenu.Viewport =
  NavigationMenu.Viewport;
export const LoongArkNavigationMenuViewportPositioner: typeof NavigationMenu.ViewportPositioner =
  NavigationMenu.ViewportPositioner;
export { useNavigationMenu } from "@ark-ui/svelte/navigation-menu";
export type {
  UseNavigationMenuProps,
  UseNavigationMenuReturn,
} from "@ark-ui/svelte/navigation-menu";
import { NumberInput } from "@ark-ui/svelte/number-input";
export const LoongArkNumberInputContext: typeof NumberInput.Context =
  NumberInput.Context;
export const LoongArkNumberInputRootProvider: typeof NumberInput.RootProvider =
  NumberInput.RootProvider;
export { useNumberInput } from "@ark-ui/svelte/number-input";
export type {
  UseNumberInputProps,
  UseNumberInputReturn,
} from "@ark-ui/svelte/number-input";
import { Pagination } from "@ark-ui/svelte/pagination";
export const LoongArkPaginationContext: typeof Pagination.Context =
  Pagination.Context;
export const LoongArkPaginationFirstTrigger: typeof Pagination.FirstTrigger =
  Pagination.FirstTrigger;
export const LoongArkPaginationLastTrigger: typeof Pagination.LastTrigger =
  Pagination.LastTrigger;
export const LoongArkPaginationRootProvider: typeof Pagination.RootProvider =
  Pagination.RootProvider;
export { usePagination } from "@ark-ui/svelte/pagination";
export type {
  UsePaginationProps,
  UsePaginationReturn,
} from "@ark-ui/svelte/pagination";
import { PasswordInput } from "@ark-ui/svelte/password-input";
export const LoongArkPasswordInputContext: typeof PasswordInput.Context =
  PasswordInput.Context;
export const LoongArkPasswordInputRootProvider: typeof PasswordInput.RootProvider =
  PasswordInput.RootProvider;
export { usePasswordInput } from "@ark-ui/svelte/password-input";
export type {
  UsePasswordInputProps,
  UsePasswordInputReturn,
} from "@ark-ui/svelte/password-input";
import { PinInput } from "@ark-ui/svelte/pin-input";
export const LoongArkPinInputContext: typeof PinInput.Context =
  PinInput.Context;
export const LoongArkPinInputRootProvider: typeof PinInput.RootProvider =
  PinInput.RootProvider;
export { usePinInput } from "@ark-ui/svelte/pin-input";
export type {
  UsePinInputProps,
  UsePinInputReturn,
} from "@ark-ui/svelte/pin-input";
import { Popover } from "@ark-ui/svelte/popover";
export const LoongArkPopoverAnchor: typeof Popover.Anchor = Popover.Anchor;
export const LoongArkPopoverArrowTip: typeof Popover.ArrowTip =
  Popover.ArrowTip;
export const LoongArkPopoverContext: typeof Popover.Context = Popover.Context;
export const LoongArkPopoverIndicator: typeof Popover.Indicator =
  Popover.Indicator;
export const LoongArkPopoverRootProvider: typeof Popover.RootProvider =
  Popover.RootProvider;
export { usePopover } from "@ark-ui/svelte/popover";
export type { UsePopoverProps, UsePopoverReturn } from "@ark-ui/svelte/popover";
import { Progress } from "@ark-ui/svelte/progress";
export const LoongArkProgressContext: typeof Progress.Context =
  Progress.Context;
export const LoongArkProgressRootProvider: typeof Progress.RootProvider =
  Progress.RootProvider;
export { useProgress } from "@ark-ui/svelte/progress";
export type {
  UseProgressProps,
  UseProgressReturn,
} from "@ark-ui/svelte/progress";
import { RadioGroup } from "@ark-ui/svelte/radio-group";
export const LoongArkRadioGroupContext: typeof RadioGroup.Context =
  RadioGroup.Context;
export const LoongArkRadioGroupItemContext: typeof RadioGroup.ItemContext =
  RadioGroup.ItemContext;
export const LoongArkRadioGroupRootProvider: typeof RadioGroup.RootProvider =
  RadioGroup.RootProvider;
export { useRadioGroup } from "@ark-ui/svelte/radio-group";
export type {
  UseRadioGroupProps,
  UseRadioGroupReturn,
} from "@ark-ui/svelte/radio-group";
import { RatingGroup } from "@ark-ui/svelte/rating-group";
export const LoongArkRatingGroupContext: typeof RatingGroup.Context =
  RatingGroup.Context;
export const LoongArkRatingGroupItemContext: typeof RatingGroup.ItemContext =
  RatingGroup.ItemContext;
export const LoongArkRatingGroupRootProvider: typeof RatingGroup.RootProvider =
  RatingGroup.RootProvider;
export { useRatingGroup } from "./use-rating.svelte";
export type {
  UseRatingGroupProps,
  UseRatingGroupReturn,
} from "@ark-ui/svelte/rating-group";
import { ScrollArea } from "@ark-ui/svelte/scroll-area";
export const LoongArkScrollAreaContext: typeof ScrollArea.Context =
  ScrollArea.Context;
export const LoongArkScrollAreaRootProvider: typeof ScrollArea.RootProvider =
  ScrollArea.RootProvider;
export { useScrollArea } from "@ark-ui/svelte/scroll-area";
export type {
  UseScrollAreaProps,
  UseScrollAreaReturn,
} from "@ark-ui/svelte/scroll-area";
import { SegmentGroup } from "@ark-ui/svelte/segment-group";
export const LoongArkSegmentGroupContext: typeof SegmentGroup.Context =
  SegmentGroup.Context;
export const LoongArkSegmentGroupIndicator: typeof SegmentGroup.Indicator =
  SegmentGroup.Indicator;
export const LoongArkSegmentGroupItemContext: typeof SegmentGroup.ItemContext =
  SegmentGroup.ItemContext;
export const LoongArkSegmentGroupItemControl: typeof SegmentGroup.ItemControl =
  SegmentGroup.ItemControl;
export const LoongArkSegmentGroupItemHiddenInput: typeof SegmentGroup.ItemHiddenInput =
  SegmentGroup.ItemHiddenInput;
export const LoongArkSegmentGroupItemText: typeof SegmentGroup.ItemText =
  SegmentGroup.ItemText;
export const LoongArkSegmentGroupLabel: typeof SegmentGroup.Label =
  SegmentGroup.Label;
export const LoongArkSegmentGroupRootProvider: typeof SegmentGroup.RootProvider =
  SegmentGroup.RootProvider;
export { useSegmentGroup } from "@ark-ui/svelte/segment-group";
export type {
  UseSegmentGroupProps,
  UseSegmentGroupReturn,
} from "@ark-ui/svelte/segment-group";
import { Select } from "@ark-ui/svelte/select";
export const LoongArkSelectContext: typeof Select.Context = Select.Context;
export const LoongArkSelectItemContext: typeof Select.ItemContext =
  Select.ItemContext;
export const LoongArkSelectRootProvider: typeof Select.RootProvider =
  Select.RootProvider;
export { useSelect } from "@ark-ui/svelte/select";
export type { UseSelectProps, UseSelectReturn } from "@ark-ui/svelte/select";
import { Slider } from "@ark-ui/svelte/slider";
export const LoongArkSliderContext: typeof Slider.Context = Slider.Context;
export const LoongArkSliderRootProvider: typeof Slider.RootProvider =
  Slider.RootProvider;
export { useSlider } from "@ark-ui/svelte/slider";
export type { UseSliderProps, UseSliderReturn } from "@ark-ui/svelte/slider";
import { Splitter } from "@ark-ui/svelte/splitter";
export const LoongArkSplitterContext: typeof Splitter.Context =
  Splitter.Context;
export const LoongArkSplitterRootProvider: typeof Splitter.RootProvider =
  Splitter.RootProvider;
export { useSplitter } from "@ark-ui/svelte/splitter";
export type {
  UseSplitterProps,
  UseSplitterReturn,
} from "@ark-ui/svelte/splitter";
import { Steps } from "@ark-ui/svelte/steps";
export const LoongArkStepsContext: typeof Steps.Context = Steps.Context;
export const LoongArkStepsItemContext: typeof Steps.ItemContext =
  Steps.ItemContext;
export const LoongArkStepsRootProvider: typeof Steps.RootProvider =
  Steps.RootProvider;
export { useSteps } from "@ark-ui/svelte/steps";
export type { UseStepsProps, UseStepsReturn } from "@ark-ui/svelte/steps";
import { Switch } from "@ark-ui/svelte/switch";
export const LoongArkSwitchContext: typeof Switch.Context = Switch.Context;
export const LoongArkSwitchRootProvider: typeof Switch.RootProvider =
  Switch.RootProvider;
export { useSwitch } from "@ark-ui/svelte/switch";
export type { UseSwitchProps, UseSwitchReturn } from "@ark-ui/svelte/switch";
import { Tabs } from "@ark-ui/svelte/tabs";
export const LoongArkTabsContext: typeof Tabs.Context = Tabs.Context;
export const LoongArkTabsRootProvider: typeof Tabs.RootProvider =
  Tabs.RootProvider;
export { useTabs } from "@ark-ui/svelte/tabs";
export type { UseTabsProps, UseTabsReturn } from "@ark-ui/svelte/tabs";
import { TagsInput } from "@ark-ui/svelte/tags-input";
export const LoongArkTagsInputContext: typeof TagsInput.Context =
  TagsInput.Context;
export const LoongArkTagsInputItemContext: typeof TagsInput.ItemContext =
  TagsInput.ItemContext;
export const LoongArkTagsInputRootProvider: typeof TagsInput.RootProvider =
  TagsInput.RootProvider;
export { useTagsInput } from "@ark-ui/svelte/tags-input";
export type {
  UseTagsInputProps,
  UseTagsInputReturn,
} from "@ark-ui/svelte/tags-input";
import { Toast } from "@ark-ui/svelte/toast";
export const LoongArkToastContext: typeof Toast.Context = Toast.Context;
import { Toggle } from "@ark-ui/svelte/toggle";
export const LoongArkToggleContext: typeof Toggle.Context = Toggle.Context;
import { ToggleGroup } from "@ark-ui/svelte/toggle-group";
export const LoongArkToggleGroupContext: typeof ToggleGroup.Context =
  ToggleGroup.Context;
export const LoongArkToggleGroupRootProvider: typeof ToggleGroup.RootProvider =
  ToggleGroup.RootProvider;
export { useToggleGroup } from "@ark-ui/svelte/toggle-group";
export type {
  UseToggleGroupProps,
  UseToggleGroupReturn,
} from "@ark-ui/svelte/toggle-group";
import { Tooltip } from "@ark-ui/svelte/tooltip";
export const LoongArkTooltipContext: typeof Tooltip.Context = Tooltip.Context;
export const LoongArkTooltipRootProvider: typeof Tooltip.RootProvider =
  Tooltip.RootProvider;
export { useTooltip } from "@ark-ui/svelte/tooltip";
export type { UseTooltipProps, UseTooltipReturn } from "@ark-ui/svelte/tooltip";
import { TreeView } from "@ark-ui/svelte/tree-view";
export const LoongArkTreeViewContext: typeof TreeView.Context =
  TreeView.Context;
export const LoongArkTreeViewNodeContext: typeof TreeView.NodeContext =
  TreeView.NodeContext;
export const LoongArkTreeViewRootProvider: typeof TreeView.RootProvider =
  TreeView.RootProvider;
export { useTreeView } from "@ark-ui/svelte/tree-view";
export type {
  UseTreeViewProps,
  UseTreeViewReturn,
} from "@ark-ui/svelte/tree-view";

import { DatePicker as NewDatePicker } from "@ark-ui/svelte/date-picker";
export const LoongArkDatePickerValueText: typeof NewDatePicker.ValueText =
  NewDatePicker.ValueText;
export const LoongArkDatePickerWeekNumberHeaderCell: typeof NewDatePicker.WeekNumberHeaderCell =
  NewDatePicker.WeekNumberHeaderCell;
export const LoongArkDatePickerWeekNumberCell: typeof NewDatePicker.WeekNumberCell =
  NewDatePicker.WeekNumberCell;
import { Field as NewField } from "@ark-ui/svelte/field";
export const LoongArkFieldItem: typeof NewField.Item = NewField.Item;
