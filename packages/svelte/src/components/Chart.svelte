<script lang="ts">
  import {
    renderChartMarkup,
    observeChartWidth,
    type ChartOptions,
  } from "@loongark/kit";
  import { onMount } from "svelte";
  let element: HTMLDivElement;
  let measuredWidth = 0;
  onMount(() =>
    observeChartWidth(element, (value) => {
      measuredWidth = value;
    }),
  );
  export let data: ChartOptions["data"];
  export let series: ChartOptions["series"];
  export let labelKey: string;
  export let type: ChartOptions["type"] = "line";
  export let title: ChartOptions["title"] = undefined;
  export let width: ChartOptions["width"] = undefined;
  export let height: ChartOptions["height"] = undefined;
  export let labels: ChartOptions["labels"] = undefined;
  $: svg = renderChartMarkup({
    data,
    series,
    labelKey,
    type,
    title,
    width: width ?? (measuredWidth || undefined),
    height,
    labels,
  });
</script>

<div bind:this={element} data-scope="chart" {...$$restProps}>{@html svg}</div>
