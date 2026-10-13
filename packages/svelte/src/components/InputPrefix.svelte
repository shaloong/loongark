<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticInputStyles } from "@loongark/primitives/automatic-styles/input";
  registerAutomaticStyles(lkAutomaticInputStyles);

</script>

<span data-scope="input" data-part="prefix" {...$$restProps}>
  <slot />
</span>
