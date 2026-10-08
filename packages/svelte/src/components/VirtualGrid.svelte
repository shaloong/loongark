<script module lang="ts">
  import type { Snippet } from "svelte";
  import type {
    VirtualGridOptions,
    VirtualGridCellDetails,
  } from "@loongark/kit";
  export interface VirtualGridProps extends VirtualGridOptions {
    renderCell: Snippet<[VirtualGridCellDetails]>;
  }
</script>

<script lang="ts">
  import { onMount, untrack } from "svelte";
  import { createVirtualGrid, mountVirtualGrid } from "@loongark/kit";
  let {
    renderCell,
    ...rest
  }: VirtualGridOptions & { renderCell: Snippet<[VirtualGridCellDetails]> } =
    $props();
  let revision = $state(0),
    root: HTMLDivElement;
  const model = untrack(() =>
    createVirtualGrid(rest, () => untrack(() => revision++)),
  );
  const rows = $derived.by(() => {
      revision;
      return model.rows.state;
    }),
    columns = $derived.by(() => {
      revision;
      return model.columns.state;
    });
  const cursor = $derived.by(() => {
    revision;
    return model.cursor;
  });
  $effect(() => model.sync(rest));
  onMount(() => mountVirtualGrid(root, model));
</script>

<div
  bind:this={root}
  data-scope="virtual-grid"
  role="grid"
  aria-label={rest.label ?? "Data grid"}
  aria-rowcount={rest.rowKeys.length}
  aria-colcount={rest.columnKeys.length}
  dir={rest.dir}
  tabindex={rows.count && columns.count ? -1 : 0}
  style:height="{rest.height ?? 320}px"
>
  <div
    data-part="canvas"
    style:height="{rows.total}px"
    style:width="{columns.total}px"
  >
    {#each rows.entries as row (row.key)}
      <div
        role="row"
        aria-rowindex={row.index + 1}
        data-part="row"
        style:top="{row.offset}px"
        style:height="{row.size}px"
        style:width="{columns.total}px"
      >
        {#each columns.entries as column (column.key)}
          <div
            role="gridcell"
            data-part="cell"
            data-row-key={row.key}
            data-column-key={column.key}
            aria-colindex={column.index + 1}
            tabindex={row.key === cursor.rowKey &&
            column.key === cursor.columnKey
              ? 0
              : -1}
            style:inset-inline-start="{column.offset}px"
            style:width="{column.size}px"
            style:height="{row.size}px"
          >
            {@render renderCell({
              rowKey: row.key,
              columnKey: column.key,
              rowIndex: row.index,
              columnIndex: column.index,
            })}
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>
