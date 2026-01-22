import type {
  DatePickerRootProps as ArkDatePickerRootProps,
  DatePickerInputProps as ArkDatePickerInputProps,
  DatePickerViewProps as ArkDatePickerViewProps,
  DatePickerTableProps as ArkDatePickerTableProps,
  DatePickerTableCellProps as ArkDatePickerTableCellProps,
  DatePickerPresetTriggerProps as ArkDatePickerPresetTriggerProps,
} from "@ark-ui/svelte/date-picker";
import type { DatePickerSize } from "@loongark/primitives";

export interface DatePickerRootProps extends ArkDatePickerRootProps {
  size?: DatePickerSize;
}

export type DatePickerInputProps = ArkDatePickerInputProps;
export type DatePickerViewProps = ArkDatePickerViewProps;
export type DatePickerTableProps = ArkDatePickerTableProps;
export type DatePickerTableCellProps = ArkDatePickerTableCellProps;
export type DatePickerPresetTriggerProps = ArkDatePickerPresetTriggerProps;
