<script lang="ts">
  import { ark } from "@ark-ui/svelte";
  import type { InputPrimitiveProps } from "@loongark/primitives";

  export let size: NonNullable<InputPrimitiveProps["size"]> = "md";
  export let multiline: boolean = false;
  export let type: string = "text";
  export let placeholder: string | undefined = undefined;
  export let disabled: boolean = false;
  export let readOnly: boolean = false;
  export let required: boolean = false;
  export let name: string | undefined = undefined;
  export let value: string | undefined = undefined;
</script>

{#if multiline}
  <ark.textarea
    data-lk-input=""
    data-size={size}
    data-multiline="true"
    {placeholder}
    {disabled}
    {readOnly}
    {required}
    {name}
    {value}
    {...$$restProps}
  />
{:else}
  <ark.input
    data-lk-input=""
    data-size={size}
    {type}
    {placeholder}
    {disabled}
    {readOnly}
    {required}
    {name}
    {value}
    {...$$restProps}
  />
{/if}
