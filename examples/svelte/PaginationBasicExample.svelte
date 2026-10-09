<script lang="ts">
  import {
    LoongArkPaginationRoot,
    LoongArkPaginationPrevTrigger,
    LoongArkPaginationItem,
    LoongArkPaginationNextTrigger,
  } from "@loongark/svelte";
</script>

<LoongArkPaginationRoot count={50} pageSize={10}>
  <LoongArkPaginationPrevTrigger>上一页</LoongArkPaginationPrevTrigger>
  <LoongArkPaginationItem type="page" value={1}>1</LoongArkPaginationItem>
  <LoongArkPaginationItem type="page" value={2}>2</LoongArkPaginationItem>
  <LoongArkPaginationNextTrigger>下一页</LoongArkPaginationNextTrigger>
</LoongArkPaginationRoot>
