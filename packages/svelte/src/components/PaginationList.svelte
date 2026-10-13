<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticPaginationStyles } from "@loongark/primitives/automatic-styles/pagination";
  registerAutomaticStyles(lkAutomaticPaginationStyles);
</script>
<div data-scope="pagination" data-part="list" {...$$restProps}>
  <slot />
</div>
