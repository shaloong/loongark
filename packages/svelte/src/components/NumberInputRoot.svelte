<script lang="ts">
  import { NumberInput } from "@ark-ui/svelte/number-input";
  import type { NumberInputRootProps } from "@ark-ui/svelte/number-input";
  import type { NumberInputSize, NumberInputState } from "@loongark/primitives";

  export let size: NumberInputSize = "md";
  export let state: NumberInputState = "default";
  export let value: NumberInputRootProps["value"] = undefined;
  export let defaultValue: NumberInputRootProps["defaultValue"] = undefined;
  export let min: NumberInputRootProps["min"] = undefined;
  export let max: NumberInputRootProps["max"] = undefined;
  export let step: NumberInputRootProps["step"] = undefined;
  export let disabled: NumberInputRootProps["disabled"] = undefined;
  export let readOnly: NumberInputRootProps["readOnly"] = undefined;
  export let required: NumberInputRootProps["required"] = undefined;
  export let invalid: NumberInputRootProps["invalid"] = undefined;
  export let name: NumberInputRootProps["name"] = undefined;
  export let form: NumberInputRootProps["form"] = undefined;
  export let id: NumberInputRootProps["id"] = undefined;
  export let ids: NumberInputRootProps["ids"] = undefined;
  export let inputMode: NumberInputRootProps["inputMode"] = undefined;
  export let locale: NumberInputRootProps["locale"] = undefined;
  export let formatOptions: NumberInputRootProps["formatOptions"] = undefined;
  export let translations: NumberInputRootProps["translations"] = undefined;
  export let allowMouseWheel: NumberInputRootProps["allowMouseWheel"] = undefined;
  export let allowOverflow: NumberInputRootProps["allowOverflow"] = undefined;
  export let clampValueOnBlur: NumberInputRootProps["clampValueOnBlur"] = undefined;
  export let focusInputOnChange: NumberInputRootProps["focusInputOnChange"] = undefined;
  export let spinOnPress: NumberInputRootProps["spinOnPress"] = undefined;
  export let onValueChange: NumberInputRootProps["onValueChange"] = undefined;
  export let onValueInvalid: NumberInputRootProps["onValueInvalid"] = undefined;
  export let onFocusChange: NumberInputRootProps["onFocusChange"] = undefined;
</script>

<NumberInput.Root
  {value}
  {defaultValue}
  {min}
  {max}
  {step}
  {disabled}
  {readOnly}
  {required}
  {invalid}
  {name}
  {form}
  {id}
  {ids}
  {inputMode}
  {locale}
  {formatOptions}
  {translations}
  {allowMouseWheel}
  {allowOverflow}
  {clampValueOnBlur}
  {focusInputOnChange}
  {spinOnPress}
  {onValueChange}
  {onValueInvalid}
  {onFocusChange}
  data-scope="number-input"
  data-part="root"
  data-size={size}
  data-state={state !== "default" ? state : undefined}
  data-disabled={disabled ? "true" : undefined}
  data-readonly={readOnly ? "true" : undefined}
  {...$$restProps}
>
  <slot />
</NumberInput.Root>
