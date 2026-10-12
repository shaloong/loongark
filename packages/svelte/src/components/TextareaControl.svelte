<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticTextareaStyles } from "@loongark/primitives/automatic-styles/input";
  registerAutomaticStyles(lkAutomaticTextareaStyles);

  import InputInput from "./InputInput.svelte";
  import type { InputPrimitiveProps } from "@loongark/primitives";

  export let size: NonNullable<InputPrimitiveProps["size"]> = "md";
  export let state: NonNullable<InputPrimitiveProps["state"]> = "default";
  export let placeholder: string | undefined = undefined;
  export let disabled: boolean | undefined = undefined;
  export let readOnly: boolean | undefined = undefined;
  export let required: boolean | undefined = undefined;
  export let name: string | undefined = undefined;
  export let value: string | undefined = undefined;
</script>

<InputInput
  {size}
  {state}
  multiline
  {placeholder}
  {disabled}
  {readOnly}
  {required}
  {name}
  {value}
  {...$$restProps}
/>
