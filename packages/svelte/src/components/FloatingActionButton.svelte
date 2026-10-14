<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticFloatingActionButtonStyles } from "@shaloong/loongark-primitives/automatic-styles/floating-action-button";
  registerAutomaticStyles(lkAutomaticFloatingActionButtonStyles);

  import {
    fabAttributes,
    type FloatingActionButtonOptions,
  } from "@shaloong/loongark-kit";
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
