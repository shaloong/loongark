<script lang="ts">
  import * as L from "@loongark/svelte";
  import {
    queryColumns,
    queryRows,
    createDataTableQueryDemo,
  } from "../shared/dataTableQueryDemo";
  let version = $state(0);
  const demo = createDataTableQueryDemo(() => version++);
  const snapshot = $derived.by(() => {
    version;
    return demo.snapshot;
  });
</script>

<L.LoongArkStack gap="md" style="width:100%;max-width:800px">
  <L.LoongArkTypography as="h2">Find and compare projects</L.LoongArkTypography>
  <L.LoongArkTypography variant="muted"
    >Combine column filters. Hold Shift when sorting another column to add a
    priority.</L.LoongArkTypography
  >
  <L.LoongArkStack orientation="horizontal" gap="sm">
    <L.LoongArkButton variant="outline" on:click={demo.toggleLocked}
      >{snapshot.locked
        ? "Allow query updates"
        : "Reject query updates"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" on:click={demo.toggleLoading}
      >{snapshot.loading ? "Finish loading" : "Start loading"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" on:click={demo.toggleShown}
      >{snapshot.shown ? "Hide table" : "Show table"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="ghost" on:click={demo.reset}
      >Reset query</L.LoongArkButton
    >
  </L.LoongArkStack>
  {#if snapshot.shown}<L.LoongArkDataTable
      label="Queryable projects"
      data={queryRows}
      columns={queryColumns}
      pageSize={3}
      state={snapshot.state}
      loading={snapshot.loading}
      onStateChange={demo.change}
    />{/if}
  <output aria-label="Query state" style="overflow-wrap:anywhere"
    >{JSON.stringify(snapshot.state)}</output
  >
</L.LoongArkStack>
