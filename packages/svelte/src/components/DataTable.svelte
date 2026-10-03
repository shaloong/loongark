<script lang="ts">
  import { afterUpdate } from "svelte";
  import {
    createDataTableView,
    nextDataSort,
    dataTableLabels,
    normalizeDataSelection,
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
  let query = "",
    sort: DataSort | undefined,
    page = 1;
  let internal = [...defaultSelectedIds],
    pageInput: HTMLInputElement | undefined;
  $: view = createDataTableView(data, columns, {
    query,
    sort,
    page,
    pageSize,
    rowKey,
  });
  $: text = dataTableLabels(labels);
  $: selected = normalizeDataSelection(selectedIds ?? internal, view.allIds);
  $: pageIds = view.rows.map(({ id }) => id);
  $: pageSelection = dataSelectionState(selected, pageIds);
  $: setDataSelectionMixed(pageInput, pageSelection.mixed);
  afterUpdate(() => {
    if (page !== view.page) page = view.page;
    if (sort && !view.sort) sort = undefined;
    if (selectedIds === undefined && selected.length !== internal.length) {
      internal = selected;
      onSelectionChange?.(selected);
    }
  });
  function change(ids: string[], input: HTMLInputElement, rowId?: string) {
    if (selectedIds === undefined) internal = ids;
    onSelectionChange?.(ids);
    if (selectedIds !== undefined)
      restoreDataSelection(input, selected, pageIds, rowId);
  }
</script>

<section data-scope="data-table" data-part="root" {...$$restProps}>
  <input
    aria-label={text.filter}
    placeholder={text.filterPlaceholder}
    bind:value={query}
    on:input={() => (page = 1)}
  />
  <!-- svelte-ignore a11y_no_noninteractive_tabindex (滚动区域需要键盘聚焦以读取横向内容) -->
  <div
    data-scope="table"
    data-part="root"
    role="region"
    aria-label={label}
    tabindex="0"
  >
    <table data-scope="table" data-part="table" aria-label={label}>
      <thead
        ><tr
          ><th scope="col"
            ><label data-part="selection"
              ><input
                bind:this={pageInput}
                type="checkbox"
                aria-label={text.selectPage}
                aria-checked={pageSelection.mixed
                  ? "mixed"
                  : pageSelection.checked}
                checked={pageSelection.checked}
                disabled={!pageIds.length}
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
          {#each columns as c (c.key)}<th
              scope="col"
              aria-sort={view.sort?.key === c.key
                ? view.sort.direction === "asc"
                  ? "ascending"
                  : "descending"
                : undefined}
            >
              {#if c.sortable === false}{c.label}{:else}<button
                  aria-label={c.label}
                  type="button"
                  on:click={() => (sort = nextDataSort(view.sort, c.key))}
                  >{c.label}</button
                >{/if}
            </th>{/each}
        </tr></thead
      >
      <tbody
        >{#each view.rows as { row, id } (id)}<tr
            data-selected={selected.includes(id) || undefined}
          >
            <td
              ><label data-part="selection"
                ><input
                  type="checkbox"
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
            {#each columns as c (c.key)}<td>{String(row[c.key] ?? "")}</td
              >{/each}
          </tr>{:else}<tr
            ><td colspan={columns.length + 1} data-part="empty">{text.empty}</td
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
      disabled={view.page <= 1}
      on:click={() => (page = view.page - 1)}>{text.previous}</button
    >
    <button
      type="button"
      disabled={view.page >= view.pageCount}
      on:click={() => (page = view.page + 1)}>{text.next}</button
    >
  </footer>
</section>
