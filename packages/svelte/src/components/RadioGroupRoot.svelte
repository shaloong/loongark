<script lang="ts">
  import { nativeSelectionProps } from "@loongark/kit";
  import {
    RadioGroup,
    useRadioGroup,
    type RadioGroupRootProps,
  } from "@ark-ui/svelte/radio-group";
  import type {
    RadioGroupSize,
    RadioGroupOrientation,
  } from "@loongark/primitives";
  let {
    children,
    ref = $bindable(null),
    value = $bindable(),
    size = "md",
    orientation = "vertical",
    defaultValue,
    disabled,
    invalid,
    readOnly,
    required,
    name,
    form,
    id,
    ids,
    onValueChange,
    ...dom
  }: RadioGroupRootProps & {
    size?: RadioGroupSize;
    orientation?: RadioGroupOrientation;
  } = $props();
  const providedId = $props.id();
  const api = useRadioGroup(() => ({
    ...nativeSelectionProps({
      ids,
      value,
      defaultValue,
      disabled,
      invalid,
      readOnly,
      required,
      name,
      form,
      orientation,
      onValueChange(
        details: Parameters<
          NonNullable<RadioGroupRootProps["onValueChange"]>
        >[0],
      ) {
        if (!onValueChange) value = details.value;
        onValueChange?.(details);
      },
    }),
    id: id ?? providedId,
  }));
</script>

<RadioGroup.RootProvider
  value={api}
  bind:ref
  {...dom}
  data-scope="radio-group"
  data-part="root"
  data-size={size}
  data-orientation={orientation}
>
  {@render children?.()}
</RadioGroup.RootProvider>
