<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticInputStyles } from "@loongark/primitives/automatic-styles/input";
  registerAutomaticStyles(lkAutomaticInputStyles);

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
