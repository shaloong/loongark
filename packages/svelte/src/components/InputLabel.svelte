<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticInputStyles } from "@loongark/primitives/automatic-styles/input";
  registerAutomaticStyles(lkAutomaticInputStyles);

  import { Field } from "@ark-ui/svelte/field";
</script>

<Field.Label data-scope="input" data-part="label" {...$$restProps}>
  <slot />
</Field.Label>
