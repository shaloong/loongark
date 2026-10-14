<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticPaginationStyles } from "@shaloong/loongark-primitives/automatic-styles/pagination";
  registerAutomaticStyles(lkAutomaticPaginationStyles);
</script>
<div data-scope="pagination" data-part="list" {...$$restProps}>
  <slot />
</div>
