<script lang="ts">
  import { onDestroy } from "svelte";
  import {
    LoongArkChart,
    LoongArkButton,
    LoongArkTypography,
  } from "@loongark/svelte";
  import { createChartInteractionDemo } from "../shared/chartInteractionDemo";
  let version = $state(0);
  const demo = createChartInteractionDemo(() => version++);
  onDestroy(() => demo.dispose());
  let snapshot = $derived.by(() => {
    version;
    return demo.state;
  });
</script>

<div style="max-width:900px;display:grid;gap:var(--lk-space-component-md)">
  <LoongArkTypography as="h2">Explore changing data</LoongArkTypography
  ><LoongArkTypography variant="muted"
    >Zoom or adjust the category window. Inspect values with a pointer or the
    category selector.</LoongArkTypography
  >
  <div style="display:flex;flex-wrap:wrap;gap:var(--lk-space-component-sm)">
    <LoongArkButton type="button" variant="outline" onclick={demo.append}
      >Append point</LoongArkButton
    ><LoongArkButton
      type="button"
      variant="outline"
      onclick={demo.toggleControlled}
      >{snapshot.controlled
        ? "Use uncontrolled range"
        : "Use controlled range"}</LoongArkButton
    ><LoongArkButton type="button" variant="outline" onclick={demo.trim}
      >Trim data</LoongArkButton
    ><LoongArkButton type="button" variant="outline" onclick={demo.toggleData}
      >{snapshot.data.length ? "Clear data" : "Restore data"}</LoongArkButton
    ><LoongArkButton type="button" variant="outline" onclick={demo.toggleReject}
      >{snapshot.reject
        ? "Accept range changes"
        : "Reject range changes"}</LoongArkButton
    ><LoongArkButton
      type="button"
      variant="outline"
      onclick={demo.toggleDisabled}
      >{snapshot.disabled ? "Enable chart" : "Disable chart"}</LoongArkButton
    ><LoongArkButton type="button" variant="outline" onclick={demo.toggleType}
      >{snapshot.type === "line" ? "Use bars" : "Use lines"}</LoongArkButton
    ><LoongArkButton type="button" variant="outline" onclick={demo.toggleShown}
      >{snapshot.shown ? "Hide chart" : "Show chart"}</LoongArkButton
    ><LoongArkButton type="button" variant="outline" onclick={demo.toggleStream}
      >{snapshot.streaming
        ? "Stop live updates"
        : "Start live updates"}</LoongArkButton
    >
  </div>
  {#if snapshot.shown}<LoongArkChart
      data={snapshot.data}
      series={demo.series}
      labelKey="label"
      title="Changing samples"
      type={snapshot.type}
      zoomable
      tooltip
      interactive
      showDataTable
      range={snapshot.controlled ? snapshot.range : undefined}
      onRangeChange={demo.onRangeChange}
      disabled={snapshot.disabled}
    />{/if}<output>{snapshot.status}</output><output
    >{snapshot.data.length} samples</output
  >
</div>
