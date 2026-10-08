<script lang="ts">
  import { Field } from "@ark-ui/svelte/field";

  export let variant: "default" | "error" | "success" = "default";
</script>

<svelte:component
  this={variant === "error" ? Field.ErrorText : Field.HelperText}
  data-scope="input"
  data-part="helper-text"
  data-variant={variant === "default" ? undefined : variant}
  {...$$restProps}
>
  <slot />
</svelte:component>
