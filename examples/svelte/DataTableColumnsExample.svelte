<script lang="ts">
  import * as L from "@loongark/svelte";
  import {
    columnLayoutRows,
    columnLayoutDefaultWidths,
    createColumnLayoutDemo,
  } from "../shared/dataTableColumnsDemo";
  let version = $state(0);
  const demo = createColumnLayoutDemo(() => version++);
  const snapshot = $derived.by(() => {
    version;
    return demo.snapshot;
  });
</script>

<L.LoongArkStack gap="md" style="width:100%;max-width:720px">
  <L.LoongArkTypography as="h2">Arrange your columns</L.LoongArkTypography>
  <L.LoongArkTypography variant="muted"
    >Drag a handle or use arrow keys to move a column. Drag an edge to resize.
    Smaller screens scroll within the table.</L.LoongArkTypography
  >
  <L.LoongArkStack orientation="horizontal" gap="sm">
    <L.LoongArkButton variant="outline" on:click={demo.toggleControlled}
      >{snapshot.controlled
        ? "Use uncontrolled columns"
        : "Use controlled columns"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" on:click={demo.toggleReject}
      >{snapshot.reject
        ? "Accept column updates"
        : "Reject column updates"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" on:click={demo.togglePinned}
      >{snapshot.pinned
        ? "Unfreeze columns"
        : "Freeze outer columns"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" on:click={demo.toggleRtl}
      >{snapshot.rtl ? "Use LTR" : "Use RTL"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" on:click={demo.toggleRevenue}
      >{snapshot.hiddenRevenue
        ? "Show revenue"
        : "Hide revenue"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" on:click={demo.toggleExtra}
      >{snapshot.extra
        ? "Remove notes column"
        : "Add notes column"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" on:click={demo.toggleLoading}
      >{snapshot.loading ? "Finish loading" : "Start loading"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" on:click={demo.toggleShown}
      >{snapshot.shown ? "Hide table" : "Show table"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="ghost" on:click={demo.reset}
      >{"Reset columns"}</L.LoongArkButton
    >
  </L.LoongArkStack>
  <div dir={snapshot.rtl ? "rtl" : "ltr"}>
    {#if snapshot.shown}<L.LoongArkDataTable
        label="Arrangeable projects"
        data={columnLayoutRows}
        columns={snapshot.columns}
        columnReorderable
        columnResizable
        columnKeys={snapshot.controlled ? snapshot.keys : undefined}
        columnWidths={snapshot.controlled ? snapshot.widths : undefined}
        defaultColumnWidths={columnLayoutDefaultWidths}
        pinnedColumns={snapshot.pinned
          ? { start: ["name"], end: ["revenue"] }
          : undefined}
        loading={snapshot.loading}
        onColumnKeysChange={demo.order}
        onColumnWidthsChange={demo.resize}
      />{/if}
  </div>
  <output aria-label="Column updates" style="overflow-wrap:anywhere"
    >{snapshot.notice} · {snapshot.count} callbacks</output
  >
  <output aria-label="Configured widths" style="overflow-wrap:anywhere"
    >{JSON.stringify(snapshot.widths)}</output
  >
</L.LoongArkStack>
