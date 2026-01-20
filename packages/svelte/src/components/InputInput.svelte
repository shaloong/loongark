<script lang="ts">
  import { ark } from "@ark-ui/svelte";
  import type { InputPrimitiveProps } from "@loongark/primitives";

  export let size: NonNullable<InputPrimitiveProps["size"]> = "md";
  export let state: NonNullable<InputPrimitiveProps["state"]> = "default";
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
    data-scope="input"
    data-part="control"
    data-size={size}
    data-state={state !== "default" ? state : undefined}
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
    data-scope="input"
    data-part="control"
    data-size={size}
    data-state={state !== "default" ? state : undefined}
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
