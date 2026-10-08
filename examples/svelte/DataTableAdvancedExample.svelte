<script lang="ts">
  import { onMount } from "svelte";
  import * as L from "@loongark/svelte";
  import {
    remoteColumns,
    initialRemoteState,
    remoteSnapshot,
    createProjectSource,
    type RemoteSnapshot,
  } from "../shared/dataTableAdvancedDemo";
  let tableState = $state<L.DataTableState>(initialRemoteState),
    snapshot = $state<RemoteSnapshot>(remoteSnapshot(initialRemoteState)),
    ids = $state<string[]>([]),
    owner = $state(true),
    reversed = $state(false),
    locked = $state(false);
  let source: ReturnType<typeof createProjectSource> | undefined;
  onMount(() => {
    source = createProjectSource((next) => (snapshot = next));
    return () => source?.dispose();
  });
  const keys = $derived(
    (reversed
      ? ["amount", "name", "owner"]
      : ["name", "owner", "amount"]
    ).filter((key) => owner || key !== "owner"),
  );
</script>

<L.LoongArkStack gap="lg" style="width:100%;max-width:800px">
  <L.LoongArkStack gap="sm"
    ><L.LoongArkTypography as="h2">Projects across teams</L.LoongArkTypography
    ><L.LoongArkTypography variant="muted"
      >Choose columns and keep selected projects across pages.</L.LoongArkTypography
    ></L.LoongArkStack
  >
  <L.LoongArkStack orientation="horizontal" gap="sm">
    <L.LoongArkButton variant="outline" onclick={() => (locked = !locked)}
      >{locked ? "Allow table updates" : "Lock table updates"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" onclick={() => (owner = !owner)}
      >{owner ? "Hide owner" : "Show owner"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" onclick={() => (reversed = !reversed)}
      >{reversed
        ? "Restore column order"
        : "Move revenue first"}</L.LoongArkButton
    >
    <L.LoongArkButton
      variant="outline"
      disabled={snapshot.loading}
      onclick={() => source?.request(tableState)}>Refresh rows</L.LoongArkButton
    >
    <L.LoongArkButton
      variant="outline"
      disabled={snapshot.loading}
      onclick={() => source?.request(tableState, true)}
      >Refresh with error</L.LoongArkButton
    >
    <L.LoongArkButton
      variant="ghost"
      onclick={() => {
        const next = { query: "Gamma", page: 1 };
        tableState = next;
        source?.request(next, false, 900);
      }}>Find Gamma slowly</L.LoongArkButton
    >
    <L.LoongArkButton
      variant="ghost"
      onclick={() => {
        const next = { query: "Beta", page: 1 };
        tableState = next;
        source?.request(next);
      }}>Find Beta</L.LoongArkButton
    >
  </L.LoongArkStack>
  <L.LoongArkDataTable
    label="Remote projects"
    mode="server"
    data={snapshot.data}
    columns={remoteColumns}
    totalRows={snapshot.totalRows}
    pageSize={2}
    state={tableState}
    onStateChange={(next) => {
      if (!locked) {
        tableState = next;
        source?.request(next);
      }
    }}
    selectedIds={ids}
    onSelectionChange={(next) => (ids = next)}
    columnKeys={keys}
    loading={snapshot.loading}
    error={snapshot.error}
    onRetry={() => source?.request(tableState)}
  />
  <output aria-label="Selected remote projects"
    >{ids.length ? ids.join(", ") : "No projects selected"}</output
  >
</L.LoongArkStack>
