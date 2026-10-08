<script lang="ts">
  import * as L from "@loongark/svelte";
  import { createStructureDemo } from "../shared/dataTableStructureDemo";
  let version = $state(0);
  const demo = createStructureDemo(() => version++);
  const snapshot = $derived.by(() => {
    version;
    return demo.snapshot;
  });
</script>

<L.LoongArkStack
  gap="md"
  style="width:100%;max-width:850px"
  dir={snapshot.rtl ? "rtl" : "ltr"}
>
  <L.LoongArkTypography as="h2"
    >Explore teams and project hierarchy</L.LoongArkTypography
  >
  <L.LoongArkTypography variant="muted"
    >Group budgets by team or expand parent projects. Filters keep matching
    descendants in context.</L.LoongArkTypography
  >
  <L.LoongArkStack orientation="horizontal" gap="sm"
    ><L.LoongArkButton variant="outline" on:click={demo.toggleKind}
      >{snapshot.kind === "group"
        ? "Show tree rows"
        : "Show grouped rows"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" on:click={demo.toggleReject}
      >{snapshot.reject
        ? "Allow expansion"
        : "Reject expansion"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" on:click={demo.toggleControlled}
      >{snapshot.controlled
        ? "Use internal expansion"
        : "Use controlled expansion"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" on:click={demo.toggleLoading}
      >{snapshot.loading ? "Finish loading" : "Start loading"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" on:click={demo.toggleVirtual}
      >{snapshot.virtual
        ? "Disable virtualization"
        : "Enable virtualization"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" on:click={demo.toggleRtl}
      >{snapshot.rtl ? "Use LTR" : "Use RTL"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" on:click={demo.toggleShown}
      >{snapshot.shown ? "Hide table" : "Show table"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" on:click={demo.collapseAll}
      >{"Collapse all"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" on:click={demo.expandAll}
      >{"Expand all"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" on:click={demo.removeChild}
      >{"Remove token row"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" on:click={demo.reset}
      >{"Reset data"}</L.LoongArkButton
    ></L.LoongArkStack
  >
  {#if snapshot.shown}<L.LoongArkDataTable
      {...demo.tableProps(snapshot)}
    />{/if}
  <output aria-label="Expansion state"
    >Expanded rows: {snapshot.expanded.length} · Changes: {snapshot.changes}</output
  >
  <output aria-label="Selected rows"
    >Selected: {snapshot.selected.join(", ") || "none"}</output
  >
</L.LoongArkStack>
