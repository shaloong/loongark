<script lang="ts">
  import * as L from "@loongark/svelte";
  import {
    projectRows,
    projectColumns,
    queueRows,
    queueColumns,
  } from "../shared/dataTableDemo";
  let locked = $state(false);
  let rows = $state(projectRows),
    ids = $state<string[]>([]),
    revenue = $state(true),
    queue = $state(queueRows),
    changes = $state(0);
</script>

<L.LoongArkStack gap="lg" style="width:100%;max-width:800px">
  <L.LoongArkStack gap="sm"
    ><L.LoongArkTypography
      as="h1"
      style="font-size:var(--lk-typography-fontsize-xl)"
      >Project access</L.LoongArkTypography
    ><L.LoongArkTypography variant="muted"
      >Review workspaces, select a page and keep your choices while filtering.</L.LoongArkTypography
    ></L.LoongArkStack
  >
  <L.LoongArkStack gap="md">
    <L.LoongArkStack orientation="horizontal" gap="sm">
      <L.LoongArkButton
        variant="outline"
        disabled={!ids.length}
        onclick={() => (ids = [])}>Clear selection</L.LoongArkButton
      >
      <L.LoongArkButton
        variant="outline"
        disabled={!ids.length}
        onclick={() => {
          rows = rows.filter((r) => !ids.includes(String(r.id)));
          ids = [];
        }}>Remove selected rows</L.LoongArkButton
      >
      <L.LoongArkButton
        variant="ghost"
        onclick={() => {
          rows = projectRows;
          ids = [];
        }}>Restore projects</L.LoongArkButton
      >
      <L.LoongArkButton variant="ghost" onclick={() => (revenue = !revenue)}
        >{revenue ? "Hide revenue" : "Show revenue"}</L.LoongArkButton
      >
      <L.LoongArkButton variant="ghost" onclick={() => (locked = !locked)}
        >{locked ? "Unlock selection" : "Lock selection"}</L.LoongArkButton
      >
    </L.LoongArkStack>
    <L.LoongArkDataTable
      label="Workspace projects"
      data={rows}
      columns={revenue
        ? projectColumns
        : projectColumns.filter((c) => c.key !== "amount")}
      pageSize={2}
      selectedIds={ids}
      onSelectionChange={(next) => {
        if (!locked) ids = next;
      }}
    />
  </L.LoongArkStack>
  <L.LoongArkStack gap="md">
    <L.LoongArkTypography
      as="h2"
      style="font-size:var(--lk-typography-fontsize-lg)"
      >Live queue</L.LoongArkTypography
    >
    <L.LoongArkStack orientation="horizontal" gap="sm">
      <L.LoongArkButton
        variant="outline"
        onclick={() => (queue = queueRows.filter((r) => r.id !== "a"))}
        >Remove queued Alpha</L.LoongArkButton
      >
      <L.LoongArkButton variant="ghost" onclick={() => (queue = queueRows)}
        >Restore queue</L.LoongArkButton
      >
    </L.LoongArkStack>
    <L.LoongArkDataTable
      label="Live queue"
      data={queue}
      columns={queueColumns}
      pageSize={2}
      defaultSelectedIds={["a"]}
      onSelectionChange={() => changes++}
    />
    <L.LoongArkTypography variant="muted"
      ><output data-testid="queue-changes">{changes} selection changes</output
      ></L.LoongArkTypography
    >
  </L.LoongArkStack>
</L.LoongArkStack>
