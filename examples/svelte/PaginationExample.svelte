<script lang="ts">
  import {
    LoongArkPaginationRoot,
    LoongArkPaginationList,
    LoongArkPaginationItem,
    LoongArkPaginationPrevTrigger,
    LoongArkPaginationNextTrigger,
  } from "@loongark/svelte";
  import type {
    PaginationOrientation,
    PaginationSize,
  } from "@loongark/primitives";

  export let size: PaginationSize = "md";
  export let orientation: PaginationOrientation = "horizontal";

  let page = 1;
  const totalPages = 6;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const selectPage = (value: number) => {
    page = value;
  };
</script>

<LoongArkPaginationRoot {size} {orientation}>
  <LoongArkPaginationPrevTrigger
    disabled={page === 1}
    on:click={() => selectPage(Math.max(1, page - 1))}
  >
    Prev
  </LoongArkPaginationPrevTrigger>
  <LoongArkPaginationList>
    {#each pages as value}
      <LoongArkPaginationItem
        aria-current={page === value ? "page" : undefined}
        data-selected={page === value ? "true" : undefined}
        on:click={() => selectPage(value)}
      >
        {value}
      </LoongArkPaginationItem>
    {/each}
  </LoongArkPaginationList>
  <LoongArkPaginationNextTrigger
    disabled={page === totalPages}
    on:click={() => selectPage(Math.min(totalPages, page + 1))}
  >
    Next
  </LoongArkPaginationNextTrigger>
</LoongArkPaginationRoot>
