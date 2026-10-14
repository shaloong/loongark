<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticPaginationStyles } from "@shaloong/loongark-primitives/automatic-styles/pagination";
  registerAutomaticStyles(lkAutomaticPaginationStyles);

  import { Pagination } from "@ark-ui/svelte/pagination";
  import type { PaginationEllipsisProps } from "@ark-ui/svelte/pagination";

  export let index: PaginationEllipsisProps["index"];
</script>

<Pagination.Ellipsis
  {index}
  data-scope="pagination"
  data-part="ellipsis"
  {...$$restProps}
>
  <slot />
</Pagination.Ellipsis>
