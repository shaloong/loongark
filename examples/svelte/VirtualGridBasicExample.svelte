<script lang="ts">
  import { LoongArkVirtualGrid } from "@loongark/svelte";
</script>

<LoongArkVirtualGrid
  label="数据网格"
  rowKeys={["a", "b", "c"]}
  columnKeys={["name", "amount"]}
  rowSize={48}
  columnSize={160}
  height={200}
>
  {#snippet renderCell({ rowKey, columnKey })}{rowKey +
      " / " +
      columnKey}{/snippet}
</LoongArkVirtualGrid>
