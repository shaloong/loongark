<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticFilterBarStyles } from "@shaloong/loongark-primitives/automatic-styles/filter-bar";
  registerAutomaticStyles(lkAutomaticFilterBarStyles);

</script>

<div data-scope="filter-bar" data-part="actions" {...$$restProps}>
  <slot />
</div>
