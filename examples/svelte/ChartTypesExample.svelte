<script lang="ts">
  import {
    LoongArkChart,
    LoongArkButton,
    LoongArkTypography,
  } from "@loongark/svelte";
  import {
    createChartTypesDemo,
    chartTypeModes,
  } from "../shared/chartTypesDemo";
  let version = $state(0);
  const demo = createChartTypesDemo(() => version++);
  let snapshot = $derived.by(() => {
    version;
    return demo.state;
  });
  let options = $derived.by(() => {
    version;
    return demo.options;
  });
</script>

<div
  dir={snapshot.rtl ? "rtl" : "ltr"}
  style="max-width:900px;display:grid;gap:var(--lk-space-component-md)"
>
  <LoongArkTypography as="h2">Explore chart types</LoongArkTypography
  ><LoongArkTypography variant="muted"
    >Compare distributions, stacks and continuous axes. Missing values remain
    gaps.</LoongArkTypography
  >
  <label style="display:grid;gap:var(--lk-space-component-xs)"
    >Chart type<select
      value={snapshot.mode}
      onchange={(e) => demo.choose(e.currentTarget.value)}
      style="font:inherit;height:var(--lk-control-height-md);background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-md)"
      >{#each chartTypeModes as item}<option value={item.value}
          >{item.label}</option
        >{/each}</select
    ></label
  >
  <div style="display:flex;flex-wrap:wrap;gap:var(--lk-space-component-sm)">
    <LoongArkButton type="button" variant="outline" onclick={demo.toggleReject}
      >{snapshot.reject
        ? "Accept slice changes"
        : "Reject slice changes"}</LoongArkButton
    >
    <LoongArkButton
      type="button"
      variant="outline"
      onclick={demo.toggleControlled}
      >{snapshot.controlled
        ? "Use uncontrolled slices"
        : "Use controlled slices"}</LoongArkButton
    >
    <LoongArkButton
      type="button"
      variant="outline"
      onclick={demo.toggleDisabled}
      >{snapshot.disabled ? "Enable chart" : "Disable chart"}</LoongArkButton
    >
    <LoongArkButton type="button" variant="outline" onclick={demo.toggleEmpty}
      >{snapshot.empty ? "Restore data" : "Clear data"}</LoongArkButton
    >
    <LoongArkButton
      type="button"
      variant="outline"
      onclick={demo.toggleDirection}
      >{snapshot.rtl ? "Use LTR" : "Use RTL"}</LoongArkButton
    >
    <LoongArkButton type="button" variant="outline" onclick={demo.toggleShown}
      >{snapshot.shown ? "Hide chart" : "Show chart"}</LoongArkButton
    >
  </div>
  {#if snapshot.shown}<LoongArkChart {...options} />{/if}<output
    >{snapshot.status}</output
  >
</div>
