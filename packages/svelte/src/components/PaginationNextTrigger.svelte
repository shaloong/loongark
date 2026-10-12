<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticPaginationStyles } from "@loongark/primitives/automatic-styles/pagination";
  registerAutomaticStyles(lkAutomaticPaginationStyles);

  import { Pagination } from "@ark-ui/svelte/pagination";
  import type { PaginationNextTriggerProps } from "@ark-ui/svelte/pagination";

  export let disabled: PaginationNextTriggerProps["disabled"] = undefined;
</script>

<Pagination.NextTrigger
  {disabled}
  data-scope="pagination"
  data-part="next-trigger"
  {...$$restProps}
>
  <slot />
</Pagination.NextTrigger>
