<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticInputStyles } from "@shaloong/loongark-primitives/automatic-styles/input";
  registerAutomaticStyles(lkAutomaticInputStyles);

</script>

<span data-scope="input" data-part="prefix" {...$$restProps}>
  <slot />
</span>
