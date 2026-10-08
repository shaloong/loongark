<script lang="ts">
  import { nativeSelectionProps } from "@loongark/kit";
  import {
    NumberInput,
    useNumberInput,
    type NumberInputRootProps,
  } from "@ark-ui/svelte/number-input";
  import type { NumberInputSize, NumberInputState } from "@loongark/primitives";
  let {
    children,
    ref = $bindable(null),
    value = $bindable(),
    size = "md",
    state = "default",
    onValueChange,
    defaultValue,
    min,
    max,
    step,
    largeStep,
    smallStep,
    pattern,
    disabled,
    readOnly,
    required,
    invalid,
    name,
    form,
    id,
    ids,
    inputMode,
    locale,
    formatOptions,
    translations,
    allowMouseWheel,
    allowOverflow,
    clampValueOnBlur,
    focusInputOnChange,
    spinOnPress,
    onValueInvalid,
    onFocusChange,
    onValueCommit,
    ...dom
  }: NumberInputRootProps & {
    size?: NumberInputSize;
    state?: NumberInputState;
  } = $props();
  const providedId = $props.id();
  const api = useNumberInput(() => ({
    ...nativeSelectionProps({
      value,
      defaultValue,
      min,
      max,
      step,
      largeStep,
      smallStep,
      pattern,
      disabled,
      readOnly,
      required,
      invalid,
      name,
      form,
      ids,
      inputMode,
      locale,
      formatOptions,
      translations,
      allowMouseWheel,
      allowOverflow,
      clampValueOnBlur,
      focusInputOnChange,
      spinOnPress,
      onValueInvalid,
      onFocusChange,
      onValueCommit,
      onValueChange(
        details: Parameters<
          NonNullable<NumberInputRootProps["onValueChange"]>
        >[0],
      ) {
        if (!onValueChange) value = details.value;
        onValueChange?.(details);
      },
    }),
    id: id ?? providedId,
  }));
</script>

<NumberInput.RootProvider
  value={api}
  bind:ref
  {...dom}
  data-scope="number-input"
  data-part="root"
  data-size={size}
  data-state={state !== "default" ? state : undefined}
  {...nativeSelectionProps({
    "data-disabled": disabled === undefined ? undefined : String(disabled),
    "data-readonly": readOnly === undefined ? undefined : String(readOnly),
  })}
>
  {@render children?.()}
</NumberInput.RootProvider>
