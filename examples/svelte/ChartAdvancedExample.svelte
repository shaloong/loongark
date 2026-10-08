<script lang="ts">
  import * as L from "@loongark/svelte";
  import {
    insightSeries,
    insightRows,
    insightKeys,
  } from "../shared/chartAdvancedDemo";
  let keys = $state(insightKeys),
    locked = $state(false),
    fixed = $state(false),
    updated = $state(false),
    shown = $state(true);
  const rows = $derived(
    updated
      ? insightRows.map((row, index) =>
          index === 3 ? { ...row, revenue: 72 } : row,
        )
      : insightRows,
  );
</script>

<L.LoongArkStack gap="lg" style="width:100%;max-width:640px">
  <L.LoongArkStack gap="sm"
    ><L.LoongArkTypography as="h2">Quarterly performance</L.LoongArkTypography
    ><L.LoongArkTypography variant="muted"
      >Compare series, focus on a value range and read the original numbers.</L.LoongArkTypography
    ></L.LoongArkStack
  >
  <L.LoongArkStack orientation="horizontal" gap="sm">
    <L.LoongArkButton variant="outline" onclick={() => (locked = !locked)}
      >{locked
        ? "Allow series updates"
        : "Lock series updates"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" onclick={() => (fixed = !fixed)}
      >{fixed ? "Use automatic range" : "Use 0–50 range"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" onclick={() => (updated = !updated)}
      >{updated ? "Restore Q4" : "Update Q4"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="ghost" onclick={() => (shown = !shown)}
      >{shown ? "Hide chart" : "Show chart"}</L.LoongArkButton
    >
  </L.LoongArkStack>
  {#if shown}<L.LoongArkChart
      title="Quarterly metrics"
      data={rows}
      series={insightSeries}
      labelKey="quarter"
      interactive
      seriesKeys={keys}
      onSeriesKeysChange={(next) => {
        if (!locked) keys = next;
      }}
      domain={fixed ? [0, 50] : undefined}
      showDataTable
    />{/if}
  <output aria-label="Visible chart series"
    >{keys.length ? keys.join(", ") : "No series selected"}</output
  >
</L.LoongArkStack>
