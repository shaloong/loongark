<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher<{ input: Event; change: Event }>();
  import { Field } from "@ark-ui/svelte/field";
  import type { InputPrimitiveProps } from "@loongark/primitives";

  export let size: NonNullable<InputPrimitiveProps["size"]> = "md";
  export let state: NonNullable<InputPrimitiveProps["state"]> = "default";
  export let multiline: boolean = false;
  export let type: string = "text";
  export let placeholder: string | undefined = undefined;
  export let disabled: boolean | undefined = undefined;
  export let readOnly: boolean | undefined = undefined;
  export let required: boolean | undefined = undefined;
  export let name: string | undefined = undefined;
  export let value: string | undefined = undefined;
</script>

{#if multiline}
  <Field.Textarea
    oninput={(event) => dispatch("input", event)}
    onchange={(event) => dispatch("change", event)}
    data-scope="input"
    data-part="control"
    data-size={size}
    data-state={state !== "default" ? state : undefined}
    data-multiline="true"
    {placeholder}
    {...disabled === undefined ? {} : { disabled }}
    {...readOnly === undefined ? {} : { readonly: readOnly }}
    {...required === undefined ? {} : { required }}
    {name}
    bind:value
    {...$$restProps}
  />
{:else}
  <Field.Input
    oninput={(event) => dispatch("input", event)}
    onchange={(event) => dispatch("change", event)}
    data-scope="input"
    data-part="control"
    data-size={size}
    data-state={state !== "default" ? state : undefined}
    {type}
    {placeholder}
    {...disabled === undefined ? {} : { disabled }}
    {...readOnly === undefined ? {} : { readonly: readOnly }}
    {...required === undefined ? {} : { required }}
    {name}
    bind:value
    {...$$restProps}
  />
{/if}
