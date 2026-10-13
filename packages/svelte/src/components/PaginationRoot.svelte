<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticPaginationStyles } from "@loongark/primitives/automatic-styles/pagination";
  registerAutomaticStyles(lkAutomaticPaginationStyles);

  import { Pagination } from "@ark-ui/svelte/pagination";
  import type { PaginationRootProps } from "@ark-ui/svelte/pagination";
  import type {
    PaginationOrientation,
    PaginationSize,
  } from "@loongark/primitives";

  export let size: PaginationSize = "md";
  export let orientation: PaginationOrientation = "horizontal";
  export let count: PaginationRootProps["count"] = undefined;
  export let pageSize: PaginationRootProps["pageSize"] = undefined;
  export let siblingCount: PaginationRootProps["siblingCount"] = undefined;
  export let boundaryCount: PaginationRootProps["boundaryCount"] = undefined;
  export let page: PaginationRootProps["page"] = undefined;
  export let defaultPage: PaginationRootProps["defaultPage"] = undefined;
  export let id: PaginationRootProps["id"] = undefined;
  export let onPageChange: PaginationRootProps["onPageChange"] = undefined;
</script>

<Pagination.Root
  {count}
  {pageSize}
  {siblingCount}
  {boundaryCount}
  {page}
  {defaultPage}
  {id}
  {onPageChange}
  data-scope="pagination"
  data-part="root"
  data-size={size}
  data-orientation={orientation}
  {...$$restProps}
>
  <slot />
</Pagination.Root>
