<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticFilterBarStyles } from "@loongark/primitives/automatic-styles/filter-bar";
  registerAutomaticStyles(lkAutomaticFilterBarStyles);

</script>

<div data-scope="filter-bar" data-part="search" {...$$restProps}>
  <slot />
</div>
