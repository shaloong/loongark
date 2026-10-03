<script lang="ts">
  import { RadioGroup } from "@ark-ui/svelte/radio-group";
  import type {
    RadioGroupSize,
    RadioGroupOrientation,
  } from "@loongark/primitives";

  export let size: RadioGroupSize = "md";
  export let orientation: RadioGroupOrientation = "vertical";
  export let defaultValue: string | undefined = undefined;
  export let value: string | undefined = undefined;
  export let disabled: boolean = false;
  export let readOnly: boolean = false;
  export let name: string | undefined = undefined;
  export let form: string | undefined = undefined;
  export let onValueChange:
    ((details: { value: string | null }) => void) | undefined = undefined;
</script>

<RadioGroup.Root
  {defaultValue}
  {value}
  {disabled}
  {readOnly}
  {name}
  {form}
  {orientation}
  {onValueChange}
  data-size={size}
  data-orientation={orientation}
  {...$$restProps}
>
  <slot />
</RadioGroup.Root>
