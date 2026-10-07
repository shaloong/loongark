<script lang="ts">
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
    disabled = false,
    invalid,
    readOnly = false,
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
    id: id ?? providedId,
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
    onValueChange(details) {
      if (!onValueChange) value = details.value;
      onValueChange?.(details);
    },
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
