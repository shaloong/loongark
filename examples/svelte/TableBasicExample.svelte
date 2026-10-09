<script lang="ts">
  import {
    LoongArkTable,
    LoongArkTableCaption,
    LoongArkTableHeader,
    LoongArkTableRow,
    LoongArkTableHead,
    LoongArkTableBody,
    LoongArkTableCell,
  } from "@loongark/svelte";
</script>

<LoongArkTable>
  <LoongArkTableCaption>发布组件</LoongArkTableCaption>
  <LoongArkTableHeader>
    <LoongArkTableRow>
      <LoongArkTableHead>框架</LoongArkTableHead>
      <LoongArkTableHead>状态</LoongArkTableHead>
    </LoongArkTableRow>
  </LoongArkTableHeader>
  <LoongArkTableBody>
    <LoongArkTableRow>
      <LoongArkTableCell>React / Vue / Solid / Svelte</LoongArkTableCell>
      <LoongArkTableCell>支持</LoongArkTableCell>
    </LoongArkTableRow>
  </LoongArkTableBody>
</LoongArkTable>
