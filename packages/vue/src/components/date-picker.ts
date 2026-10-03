import type { DatePickerRootEmits as NativeDatePickerRootEmits } from "@ark-ui/vue/date-picker";
import type { DatePickerRootProps as NativeDatePickerRootProps } from "@ark-ui/vue/date-picker";
import type { DatePickerPresetTriggerProps as NativeDatePickerPresetTriggerProps } from "@ark-ui/vue/date-picker";
import type { DatePickerTableCellProps as NativeDatePickerTableCellProps } from "@ark-ui/vue/date-picker";
import { renderPart } from "../render-part";
/**
 * Date Picker component - Vue wrapper.
 * Wraps Ark UI Date Picker with data-scope/data-part bindings.
 */
import { defineComponent, h, provide, inject, toRef, type PropType } from "vue";
import {
  DatePickerRoot as ArkDatePickerRoot,
  DatePickerLabel as ArkDatePickerLabel,
  DatePickerControl as ArkDatePickerControl,
  DatePickerInput as ArkDatePickerInput,
  DatePickerTrigger as ArkDatePickerTrigger,
  DatePickerClearTrigger as ArkDatePickerClearTrigger,
  DatePickerPositioner as ArkDatePickerPositioner,
  DatePickerContent as ArkDatePickerContent,
  DatePickerView as ArkDatePickerView,
  DatePickerViewControl as ArkDatePickerViewControl,
  DatePickerViewTrigger as ArkDatePickerViewTrigger,
  DatePickerPrevTrigger as ArkDatePickerPrevTrigger,
  DatePickerNextTrigger as ArkDatePickerNextTrigger,
  DatePickerMonthSelect as ArkDatePickerMonthSelect,
  DatePickerYearSelect as ArkDatePickerYearSelect,
  DatePickerRangeText as ArkDatePickerRangeText,
  DatePickerPresetTrigger as ArkDatePickerPresetTrigger,
  DatePickerTable as ArkDatePickerTable,
  DatePickerTableHead as ArkDatePickerTableHead,
  DatePickerTableBody as ArkDatePickerTableBody,
  DatePickerTableRow as ArkDatePickerTableRow,
  DatePickerTableHeader as ArkDatePickerTableHeader,
  DatePickerTableCell as ArkDatePickerTableCell,
  DatePickerTableCellTrigger as ArkDatePickerTableCellTrigger,
} from "@ark-ui/vue/date-picker";
import type { DatePickerSize } from "@loongark/primitives";

const datePickerSizeKey = Symbol("loongark-date-picker-size");

export const LoongArkDatePickerRoot = defineComponent({
  name: "LoongArkDatePickerRoot",
  props: {
    size: {
      type: String as PropType<DatePickerSize>,
      default: "md",
    },
    closeOnSelect: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    defaultFocusedValue: {
      type: Object as PropType<
        NativeDatePickerRootProps["defaultFocusedValue"]
      >,
    },
    defaultOpen: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    defaultValue: {
      type: Array as PropType<NativeDatePickerRootProps["defaultValue"]>,
    },
    defaultView: {
      type: String as PropType<"day" | "month" | "year">,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    fixedWeeks: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    focusedValue: {
      type: Object as PropType<NativeDatePickerRootProps["focusedValue"]>,
    },
    format: {
      type: Function as PropType<NativeDatePickerRootProps["format"]>,
    },
    id: {
      type: String as PropType<string>,
    },
    ids: {
      type: Object as PropType<NativeDatePickerRootProps["ids"]>,
    },
    inline: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    invalid: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    isDateUnavailable: {
      type: Function as PropType<
        NativeDatePickerRootProps["isDateUnavailable"]
      >,
    },
    locale: {
      type: String as PropType<string>,
    },
    max: {
      type: Object as PropType<NativeDatePickerRootProps["max"]>,
    },
    maxView: {
      type: String as PropType<"day" | "month" | "year">,
    },
    min: {
      type: Object as PropType<NativeDatePickerRootProps["min"]>,
    },
    minView: {
      type: String as PropType<"day" | "month" | "year">,
    },
    name: {
      type: String as PropType<string>,
    },
    numOfMonths: {
      type: Number as PropType<number>,
    },
    onFocusChange: {
      type: Function as PropType<
        (...args: NativeDatePickerRootEmits["focusChange"]) => void
      >,
    },
    onOpenChange: {
      type: Function as PropType<
        (...args: NativeDatePickerRootEmits["openChange"]) => void
      >,
    },
    onValueChange: {
      type: Function as PropType<
        (...args: NativeDatePickerRootEmits["valueChange"]) => void
      >,
    },
    onViewChange: {
      type: Function as PropType<
        (...args: NativeDatePickerRootEmits["viewChange"]) => void
      >,
    },
    open: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    outsideDaySelectable: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    parse: {
      type: Function as PropType<NativeDatePickerRootProps["parse"]>,
    },
    placeholder: {
      type: String as PropType<string>,
    },
    positioning: {
      type: Object as PropType<NativeDatePickerRootProps["positioning"]>,
    },
    readOnly: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    required: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    selectionMode: {
      type: String as PropType<"single" | "multiple" | "range">,
    },
    startOfWeek: {
      type: Number as PropType<number>,
    },
    timeZone: {
      type: String as PropType<string>,
    },
    translations: {
      type: Object as PropType<NativeDatePickerRootProps["translations"]>,
    },
    value: {
      type: Array as PropType<NativeDatePickerRootProps["modelValue"]>,
    },
    view: {
      type: String as PropType<"day" | "month" | "year">,
    },
  },
  setup(props, { slots, attrs }) {
    provide(datePickerSizeKey, toRef(props, "size"));
    return () =>
      renderPart(
        ArkDatePickerRoot,
        {
          ...attrs,
          ...props,
          "data-scope": "date-picker",
          "data-part": "root",
          "data-size": props.size,
        },
        slots,
      );
  },
});

export const LoongArkDatePickerLabel = defineComponent({
  name: "LoongArkDatePickerLabel",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkDatePickerLabel,
        {
          ...attrs,
          "data-scope": "date-picker",
          "data-part": "label",
        },
        slots,
      );
  },
});

export const LoongArkDatePickerControl = defineComponent({
  name: "LoongArkDatePickerControl",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkDatePickerControl,
        {
          ...attrs,
          "data-scope": "date-picker",
          "data-part": "control",
        },
        slots,
      );
  },
});

export const LoongArkDatePickerInput = defineComponent({
  name: "LoongArkDatePickerInput",
  props: {
    index: {
      type: Number as PropType<number>,
      default: 0,
    },
    fixOnBlur: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
  },
  setup(props, { attrs }) {
    return () =>
      renderPart(ArkDatePickerInput, {
        ...attrs,
        index: props.index,
        fixOnBlur: props.fixOnBlur,
        "data-scope": "date-picker",
        "data-part": "input",
      });
  },
});

export const LoongArkDatePickerTrigger = defineComponent({
  name: "LoongArkDatePickerTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkDatePickerTrigger,
        {
          ...attrs,
          "data-scope": "date-picker",
          "data-part": "trigger",
        },
        slots,
      );
  },
});

export const LoongArkDatePickerClearTrigger = defineComponent({
  name: "LoongArkDatePickerClearTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkDatePickerClearTrigger,
        {
          ...attrs,
          "data-scope": "date-picker",
          "data-part": "clear-trigger",
        },
        slots,
      );
  },
});

export const LoongArkDatePickerPositioner = defineComponent({
  name: "LoongArkDatePickerPositioner",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkDatePickerPositioner,
        {
          ...attrs,
          "data-scope": "date-picker",
          "data-part": "positioner",
        },
        slots,
      );
  },
});

export const LoongArkDatePickerContent = defineComponent({
  name: "LoongArkDatePickerContent",
  setup(_, { slots, attrs }) {
    const size = inject(datePickerSizeKey, { value: "md" as DatePickerSize });
    return () =>
      renderPart(
        ArkDatePickerContent,
        {
          ...attrs,
          "data-scope": "date-picker",
          "data-part": "content",
          "data-size": size.value,
        },
        slots,
      );
  },
});

export const LoongArkDatePickerView = defineComponent({
  name: "LoongArkDatePickerView",
  props: {
    view: {
      type: String as PropType<"day" | "month" | "year">,
      default: "day",
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkDatePickerView,
        {
          ...attrs,
          view: props.view,
          "data-scope": "date-picker",
          "data-part": "view",
        },
        slots,
      );
  },
});

export const LoongArkDatePickerViewControl = defineComponent({
  name: "LoongArkDatePickerViewControl",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkDatePickerViewControl,
        {
          ...attrs,
          "data-scope": "date-picker",
          "data-part": "view-control",
        },
        slots,
      );
  },
});

export const LoongArkDatePickerViewTrigger = defineComponent({
  name: "LoongArkDatePickerViewTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkDatePickerViewTrigger,
        {
          ...attrs,
          "data-scope": "date-picker",
          "data-part": "view-trigger",
        },
        slots,
      );
  },
});

export const LoongArkDatePickerPrevTrigger = defineComponent({
  name: "LoongArkDatePickerPrevTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkDatePickerPrevTrigger,
        {
          ...attrs,
          "data-scope": "date-picker",
          "data-part": "prev-trigger",
        },
        slots,
      );
  },
});

export const LoongArkDatePickerNextTrigger = defineComponent({
  name: "LoongArkDatePickerNextTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkDatePickerNextTrigger,
        {
          ...attrs,
          "data-scope": "date-picker",
          "data-part": "next-trigger",
        },
        slots,
      );
  },
});

export const LoongArkDatePickerMonthSelect = defineComponent({
  name: "LoongArkDatePickerMonthSelect",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkDatePickerMonthSelect,
        {
          ...attrs,
          "data-scope": "date-picker",
          "data-part": "month-select",
        },
        slots,
      );
  },
});

export const LoongArkDatePickerYearSelect = defineComponent({
  name: "LoongArkDatePickerYearSelect",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkDatePickerYearSelect,
        {
          ...attrs,
          "data-scope": "date-picker",
          "data-part": "year-select",
        },
        slots,
      );
  },
});

export const LoongArkDatePickerRangeText = defineComponent({
  name: "LoongArkDatePickerRangeText",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkDatePickerRangeText,
        {
          ...attrs,
          "data-scope": "date-picker",
          "data-part": "range-text",
        },
        slots,
      );
  },
});

export const LoongArkDatePickerPresetTrigger = defineComponent({
  name: "LoongArkDatePickerPresetTrigger",
  props: {
    value: {
      type: [String, Array, Object] as PropType<
        NativeDatePickerPresetTriggerProps["value"]
      >,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkDatePickerPresetTrigger,
        {
          ...attrs,
          value: props.value,
          "data-scope": "date-picker",
          "data-part": "preset-trigger",
        },
        slots,
      );
  },
});

export const LoongArkDatePickerTable = defineComponent({
  name: "LoongArkDatePickerTable",
  props: {
    columns: {
      type: Number as PropType<number>,
    },
    id: {
      type: String as PropType<string>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkDatePickerTable,
        {
          ...attrs,
          columns: props.columns,
          id: props.id,
          "data-scope": "date-picker",
          "data-part": "table",
        },
        slots,
      );
  },
});

export const LoongArkDatePickerTableHead = defineComponent({
  name: "LoongArkDatePickerTableHead",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkDatePickerTableHead,
        {
          ...attrs,
          "data-scope": "date-picker",
          "data-part": "table-head",
        },
        slots,
      );
  },
});

export const LoongArkDatePickerTableBody = defineComponent({
  name: "LoongArkDatePickerTableBody",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkDatePickerTableBody,
        {
          ...attrs,
          "data-scope": "date-picker",
          "data-part": "table-body",
        },
        slots,
      );
  },
});

export const LoongArkDatePickerTableRow = defineComponent({
  name: "LoongArkDatePickerTableRow",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkDatePickerTableRow,
        {
          ...attrs,
          "data-scope": "date-picker",
          "data-part": "table-row",
        },
        slots,
      );
  },
});

export const LoongArkDatePickerTableHeader = defineComponent({
  name: "LoongArkDatePickerTableHeader",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkDatePickerTableHeader,
        {
          ...attrs,
          "data-scope": "date-picker",
          "data-part": "table-header",
        },
        slots,
      );
  },
});

export const LoongArkDatePickerTableCell = defineComponent({
  name: "LoongArkDatePickerTableCell",
  props: {
    value: {
      type: Object as PropType<NativeDatePickerTableCellProps["value"]>,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    columns: {
      type: Number as PropType<number>,
    },
    visibleRange: {
      type: Object as PropType<NativeDatePickerTableCellProps["visibleRange"]>,
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      renderPart(
        ArkDatePickerTableCell,
        {
          ...attrs,
          value: props.value,
          disabled: props.disabled,
          columns: props.columns,
          visibleRange: props.visibleRange,
          "data-scope": "date-picker",
          "data-part": "table-cell",
        },
        slots,
      );
  },
});

export const LoongArkDatePickerTableCellTrigger = defineComponent({
  name: "LoongArkDatePickerTableCellTrigger",
  setup(_, { slots, attrs }) {
    return () =>
      renderPart(
        ArkDatePickerTableCellTrigger,
        {
          ...attrs,
          "data-scope": "date-picker",
          "data-part": "table-cell-trigger",
        },
        slots,
      );
  },
});
