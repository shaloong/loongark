<script lang="ts">
  import {
    mediaAttributes,
    mediaStyles,
    type MediaLayoutOptions,
  } from "@loongark/kit";
  export let columns: number | undefined = undefined;
  export let gap: MediaLayoutOptions["gap"] = undefined;
  export let columnSpan: number | undefined = undefined;
  export let rowSpan: number | undefined = undefined;
  export let rowHeight: number | undefined = undefined;
  export let responsive = true;
  $: vars = mediaStyles({ columns, gap, columnSpan, rowSpan, rowHeight });
</script>

<figure
  {...mediaAttributes("MasonryItem", { responsive })}
  {...$$restProps}
  style:--lk-layout-gap={vars["--lk-layout-gap"]}
  style:--lk-media-columns={vars["--lk-media-columns"]}
  style:--lk-media-column-span={vars["--lk-media-column-span"]}
  style:--lk-media-row-span={vars["--lk-media-row-span"]}
  style:--lk-media-row-height={vars["--lk-media-row-height"]}
>
  <slot />
</figure>
