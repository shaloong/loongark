<script lang="ts">
  import {
    fabAttributes,
    type FloatingActionButtonOptions,
  } from "@loongark/kit";
  export let size: FloatingActionButtonOptions["size"] = "md";
  export let variant: FloatingActionButtonOptions["variant"] = "primary";
  export let extended = false;
  export let disabled = false;
  export let type: "button" | "submit" | "reset" = "button";
</script>

<button
  {...fabAttributes({ size, variant, extended })}
  {type}
  {disabled}
  {...$$restProps}
  on:click
  on:keydown
  on:focus
  on:blur><slot /></button
>
