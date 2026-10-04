<script lang="ts">
  import { afterUpdate, tick, onMount } from "svelte";
  import {
    dataTableView,
    mountDataTablePins,
    type DataTableProps,
    retryDataTable,
    type DataTableState,
    nextDataSort,
    dataTableLabels,
    dataTableSelection,
    dataSelectionState,
    toggleDataSelection,
    setDataSelectionMixed,
    restoreDataSelection,
    type DataSort,
    type DataRow,
    type DataColumn,
    type DataTableLabels,
  } from "@loongark/kit";
  export let data: readonly DataRow[];
  export let columns: readonly DataColumn[];
  export let pageSize = 10;
  export let rowKey = "id";
  export let label = "Data table";
  export let labels: Partial<DataTableLabels> | undefined = undefined;
  export let selectedIds: readonly string[] | undefined = undefined;
  export let defaultSelectedIds: readonly string[] = [];
  export let onSelectionChange: ((ids: string[]) => void) | undefined =
    undefined;
  export let state: DataTableState | undefined = undefined;
  export let defaultState: Partial<DataTableState> = {};
  export let onStateChange: ((state: DataTableState) => void) | undefined =
    undefined;
  export let mode: "client" | "server" = "client";
  export let totalRows: number | undefined = undefined;
  export let columnKeys: readonly string[] | undefined = undefined;
  export let pinnedColumns: DataTableProps["pinnedColumns"] = undefined;
  let region: HTMLDivElement;
  onMount(() => mountDataTablePins(region));
  export let loading = false;
  export let error: string | undefined = undefined;
  export let onRetry: (() => void) | undefined = undefined;
  let query = defaultState.query ?? "",
    sort: DataSort | undefined = defaultState.sort,
    page = defaultState.page ?? 1;
  let internal = [...defaultSelectedIds],
    pageInput: HTMLInputElement | undefined;
  $: current = state ?? { query, sort, page };
  $: view = dataTableView(
    {
      data,
      columns,
      pageSize,
      rowKey,
      mode,
      totalRows,
      columnKeys,
      pinnedColumns,
    },
    current,
  );
  $: text = dataTableLabels(labels);
  $: selected = dataTableSelection(selectedIds ?? internal, view.allIds, mode);
  function changeState(patch: Partial<DataTableState>) {
    if (loading) return;
    const next = { ...current, sort: view.sort, ...patch };
    if (state === undefined) {
      query = next.query;
      sort = next.sort;
      page = next.page;
    }
    onStateChange?.(next);
  }
  $: pageIds = view.rows.map(({ id }) => id);
  $: pageSelection = dataSelectionState(selected, pageIds);
  $: setDataSelectionMixed(pageInput, pageSelection.mixed);
  afterUpdate(() => {
    if (state === undefined) {
      if (page !== view.page) page = view.page;
      if (sort && !view.sort) sort = undefined;
    }
    if (selectedIds === undefined && selected.length !== internal.length) {
      internal = selected;
      onSelectionChange?.(selected);
    }
  });
  function change(ids: string[], input: HTMLInputElement, rowId?: string) {
    if (loading) return;
    if (selectedIds === undefined) internal = ids;
    onSelectionChange?.(ids);
    if (selectedIds !== undefined)
      restoreDataSelection(input, selected, pageIds, rowId);
  }
</script>

<section
  data-scope="data-table"
  data-part="root"
  aria-busy={loading || undefined}
  {...$$restProps}
>
  <input
    aria-label={text.filter}
    placeholder={text.filterPlaceholder}
    value={current.query}
    disabled={loading}
    on:input={(e) => {
      const input = e.currentTarget;
      changeState({ query: input.value, page: 1 });
      if (state !== undefined)
        tick().then(() => {
          if (input.isConnected) input.value = current.query;
        });
    }}
  />
  {#if loading}<p role="status" data-part="loading">{text.loading}</p>{/if}
  {#if error}<div role="alert" data-part="error">
      <span>{error}</span>{#if onRetry}<button
          type="button"
          disabled={loading}
          on:click={(e) => retryDataTable(e.currentTarget, onRetry)}
          >{text.retry}</button
        >{/if}
    </div>{/if}
  <!-- svelte-ignore a11y_no_noninteractive_tabindex (滚动区域需要键盘聚焦以读取横向内容) -->
  <div
    data-scope="table"
    data-part="root"
    bind:this={region}
    role="region"
    aria-label={label}
    tabindex="0"
  >
    <table data-scope="table" data-part="table" aria-label={label}>
      <thead
        ><tr
          ><th scope="col" data-pinned={view.pinSelection ? "start" : undefined}
            ><label data-part="selection"
              ><input
                bind:this={pageInput}
                type="checkbox"
                aria-label={text.selectPage}
                aria-checked={pageSelection.mixed
                  ? "mixed"
                  : pageSelection.checked}
                checked={pageSelection.checked}
                disabled={loading || !pageIds.length}
                on:change={(e) =>
                  change(
                    toggleDataSelection(
                      selected,
                      pageIds,
                      e.currentTarget.checked,
                    ),
                    e.currentTarget,
                  )}
              /></label
            ></th
          >
          {#each view.columns as c (c.key)}<th
              scope="col"
              data-pinned={view.pins.get(c.key)}
              aria-sort={view.sort?.key === c.key
                ? view.sort.direction === "asc"
                  ? "ascending"
                  : "descending"
                : undefined}
            >
              {#if c.sortable === false}{c.label}{:else}<button
                  aria-label={c.label}
                  type="button"
                  disabled={loading}
                  on:click={() =>
                    changeState({
                      sort: nextDataSort(view.sort, c.key),
                      page: 1,
                    })}>{c.label}</button
                >{/if}
            </th>{/each}
        </tr></thead
      >
      <tbody
        >{#each view.rows as { row, id } (id)}<tr
            data-selected={selected.includes(id) || undefined}
          >
            <td data-pinned={view.pinSelection ? "start" : undefined}
              ><label data-part="selection"
                ><input
                  type="checkbox"
                  disabled={loading}
                  aria-label={text.selectRow(id)}
                  checked={selected.includes(id)}
                  on:change={(e) =>
                    change(
                      toggleDataSelection(
                        selected,
                        [id],
                        e.currentTarget.checked,
                      ),
                      e.currentTarget,
                      id,
                    )}
                /></label
              ></td
            >
            {#each view.columns as c (c.key)}<td
                data-pinned={view.pins.get(c.key)}
                >{String(row[c.key] ?? "")}</td
              >{/each}
          </tr>{:else}<tr
            ><td colspan={view.columns.length + 1} data-part="empty"
              ><span>{loading ? text.loading : text.empty}</span></td
            ></tr
          >{/each}</tbody
      >
    </table>
  </div>
  <footer>
    <span aria-live="polite"
      >{text.summary({
        total: view.total,
        selected: selected.length,
        page: view.page,
        pageCount: view.pageCount,
      })}</span
    >
    <button
      type="button"
      disabled={loading || view.page <= 1}
      on:click={() => changeState({ page: view.page - 1 })}
      >{text.previous}</button
    >
    <button
      type="button"
      disabled={loading || view.page >= view.pageCount}
      on:click={() => changeState({ page: view.page + 1 })}>{text.next}</button
    >
  </footer>
</section>
