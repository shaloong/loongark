<script lang="ts">
  import InputInput from "./InputInput.svelte";
  import type { InputPrimitiveProps } from "@loongark/primitives";

  export let size: NonNullable<InputPrimitiveProps["size"]> = "md";
  export let state: NonNullable<InputPrimitiveProps["state"]> = "default";
  export let placeholder: string | undefined = undefined;
  export let disabled: boolean = false;
  export let readOnly: boolean = false;
  export let required: boolean = false;
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
