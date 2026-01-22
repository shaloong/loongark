<script lang="ts">
  import { DatePicker } from "@ark-ui/svelte/date-picker";
  import type { DatePickerRootProps } from "@ark-ui/svelte/date-picker";
  import type { DatePickerSize } from "@loongark/primitives";
  import { createDatePickerSizeContext } from "./datePickerContext";

  export let size: DatePickerSize = "md";
  export let closeOnSelect: DatePickerRootProps["closeOnSelect"] = undefined;
  export let defaultFocusedValue: DatePickerRootProps["defaultFocusedValue"] = undefined;
  export let defaultOpen: DatePickerRootProps["defaultOpen"] = undefined;
  export let defaultValue: DatePickerRootProps["defaultValue"] = undefined;
  export let defaultView: DatePickerRootProps["defaultView"] = undefined;
  export let disabled: DatePickerRootProps["disabled"] = undefined;
  export let fixedWeeks: DatePickerRootProps["fixedWeeks"] = undefined;
  export let focusedValue: DatePickerRootProps["focusedValue"] = undefined;
  export let format: DatePickerRootProps["format"] = undefined;
  export let id: DatePickerRootProps["id"] = undefined;
  export let ids: DatePickerRootProps["ids"] = undefined;
  export let inline: DatePickerRootProps["inline"] = undefined;
  export let invalid: DatePickerRootProps["invalid"] = undefined;
  export let isDateUnavailable: DatePickerRootProps["isDateUnavailable"] = undefined;
  export let locale: DatePickerRootProps["locale"] = undefined;
  export let max: DatePickerRootProps["max"] = undefined;
  export let maxView: DatePickerRootProps["maxView"] = undefined;
  export let min: DatePickerRootProps["min"] = undefined;
  export let minView: DatePickerRootProps["minView"] = undefined;
  export let name: DatePickerRootProps["name"] = undefined;
  export let numOfMonths: DatePickerRootProps["numOfMonths"] = undefined;
  export let onFocusChange: DatePickerRootProps["onFocusChange"] = undefined;
  export let onOpenChange: DatePickerRootProps["onOpenChange"] = undefined;
  export let onValueChange: DatePickerRootProps["onValueChange"] = undefined;
  export let onViewChange: DatePickerRootProps["onViewChange"] = undefined;
  export let open: DatePickerRootProps["open"] = undefined;
  export let outsideDaySelectable: DatePickerRootProps["outsideDaySelectable"] =
    undefined;
  export let parse: DatePickerRootProps["parse"] = undefined;
  export let placeholder: DatePickerRootProps["placeholder"] = undefined;
  export let positioning: DatePickerRootProps["positioning"] = undefined;
  export let readOnly: DatePickerRootProps["readOnly"] = undefined;
  export let required: DatePickerRootProps["required"] = undefined;
  export let selectionMode: DatePickerRootProps["selectionMode"] = undefined;
  export let startOfWeek: DatePickerRootProps["startOfWeek"] = undefined;
  export let timeZone: DatePickerRootProps["timeZone"] = undefined;
  export let translations: DatePickerRootProps["translations"] = undefined;
  export let value: DatePickerRootProps["value"] = undefined;
  export let view: DatePickerRootProps["view"] = undefined;

  const sizeStore = createDatePickerSizeContext(size);
  $: sizeStore.set(size);
</script>

<DatePicker.Root
  {closeOnSelect}
  {defaultFocusedValue}
  {defaultOpen}
  {defaultValue}
  {defaultView}
  {disabled}
  {fixedWeeks}
  {focusedValue}
  {format}
  {id}
  {ids}
  {inline}
  {invalid}
  {isDateUnavailable}
  {locale}
  {max}
  {maxView}
  {min}
  {minView}
  {name}
  {numOfMonths}
  {onFocusChange}
  {onOpenChange}
  {onValueChange}
  {onViewChange}
  {open}
  {outsideDaySelectable}
  {parse}
  {placeholder}
  {positioning}
  {readOnly}
  {required}
  {selectionMode}
  {startOfWeek}
  {timeZone}
  {translations}
  {value}
  {view}
  data-scope="date-picker"
  data-part="root"
  data-size={size}
  {...$$restProps}
>
  <slot />
</DatePicker.Root>
