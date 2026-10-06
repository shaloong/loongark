<script lang="ts">
  import {
    renderChartMarkup,
    mountChartControls,
    observeChartWidth,
    type ChartOptions,
  } from "@loongark/kit";
  import { onMount } from "svelte";
  let element: HTMLDivElement;
  let measuredWidth = 0;
  onMount(() => {
    const widthStop = observeChartWidth(
      element,
      (value) => (measuredWidth = value),
    );
    const controlsStop = mountChartControls(
      element,
      () => options,
      (keys) => {
        if (seriesKeys === undefined) internal = keys;
        onSeriesKeysChange?.(keys);
      },
      (next) => {
        if (range === undefined) internalRange = next;
        onRangeChange?.(next);
      },
      (keys) => {
        if (sliceKeys === undefined) internalSlices = keys;
        onSliceKeysChange?.(keys);
      },
    );
    return () => {
      widthStop();
      controlsStop();
    };
  });
  export let data: ChartOptions["data"];
  export let series: ChartOptions["series"];
  export let labelKey: string;
  export let type: ChartOptions["type"] = "line";
  export let stacked = false;
  export let xAxis: ChartOptions["xAxis"] = undefined;
  export let yAxis: ChartOptions["yAxis"] = undefined;
  export let innerRadius: ChartOptions["innerRadius"] = undefined;
  export let sliceKey: ChartOptions["sliceKey"] = undefined;
  export let sliceKeys: ChartOptions["sliceKeys"] = undefined;
  export let defaultSliceKeys: ChartOptions["defaultSliceKeys"] = undefined;
  export let onSliceKeysChange: ChartOptions["onSliceKeysChange"] = undefined;
  export let sliceColors: ChartOptions["sliceColors"] = undefined;
  let internalSlices = defaultSliceKeys ? [...defaultSliceKeys] : undefined;
  export let title: ChartOptions["title"] = undefined;
  export let width: ChartOptions["width"] = undefined;
  export let height: ChartOptions["height"] = undefined;
  export let labels: ChartOptions["labels"] = undefined;
  export let interactive = false;
  export let zoomable = false;
  export let tooltip = false;
  export let range: ChartOptions["range"] = undefined;
  export let defaultRange: ChartOptions["defaultRange"] = undefined;
  export let onRangeChange: ChartOptions["onRangeChange"] = undefined;
  let internalRange = defaultRange;
  export let seriesKeys: ChartOptions["seriesKeys"] = undefined;
  export let defaultSeriesKeys: ChartOptions["defaultSeriesKeys"] = undefined;
  export let onSeriesKeysChange: ChartOptions["onSeriesKeysChange"] = undefined;
  export let disabled = false;
  export let domain: ChartOptions["domain"] = undefined;
  export let showDataTable = false;
  let internal = defaultSeriesKeys ? [...defaultSeriesKeys] : undefined;
  $: options = {
    data,
    series,
    labelKey,
    type,
    stacked,
    xAxis,
    yAxis,
    innerRadius,
    sliceKey,
    sliceColors,
    sliceKeys: sliceKeys ?? internalSlices,
    defaultSliceKeys: undefined,
    title,
    width: width ?? (measuredWidth || undefined),
    height,
    labels,
    interactive,
    zoomable,
    tooltip,
    range: range ?? internalRange,
    defaultRange: undefined,
    seriesKeys: seriesKeys ?? internal,
    defaultSeriesKeys: undefined,
    disabled,
    domain,
    showDataTable,
  };
  $: svg = renderChartMarkup(options);
</script>

<div bind:this={element} data-scope="chart" {...$$restProps}>{@html svg}</div>
