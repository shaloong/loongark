<script lang="ts">
  import { controlIcons } from "@loongark/kit";
  import Icon from "./Icon.svelte";
  import { afterUpdate, tick, onMount, onDestroy } from "svelte";
  import {
    dataTableView,
    renderDataTableRowPrefix,
    dataTableGroupText,
    mountDataTableStructure,
    dataColumnWidth,
    dataColumnTableStyle,
    renderDataColumnControls,
    mountDataColumnControls,
    reconcileDataColumnOrder,
    reconcileDataColumnWidths,
    createVirtualWindow,
    mountVirtualWindow,
    dataTableVirtualOptions,
    dataTableVirtualRows,
    dataTableVirtualStyle,
    dataTableVirtualInset,
    createDataTableBatchEditor,
    renderDataTableBatchMarkup,
    mountDataTableBatch,
    dataTableCellText,
    createDataTableEditor,
    mountDataTableEditor,
    type DataTableEditState,
    mountDataTablePins,
    type DataTableProps,
    retryDataTable,
    type DataTableState,
    nextDataTableSort,
    reconcileDataTableQuery,
    dataFilterError,
    dataFilterSelectValue,
    dataFilterControl,
    dataFilterOperators,
    changeDataFilter,
    dataTableLabels,
    dataTableSelection,
    dataSelectionState,
    toggleDataSelection,
    setDataSelectionMixed,
    restoreDataSelection,
    type DataSort,
    type DataRow,
    type DataColumn,
  } from "@loongark/kit";
  export let data: readonly DataRow[];
  export let columns: readonly DataColumn[];
  export let pageSize = 10;
  export let rowKey = "id";
  export let label = "Data table";
  export let labels: DataTableProps["labels"] = undefined;
  export let selectedIds: readonly string[] | undefined = undefined;
  export let defaultSelectedIds: readonly string[] = [];
  export let onSelectionChange: ((ids: string[]) => void) | undefined =
    undefined;
  export let state: DataTableState | undefined = undefined;
  export let defaultState: Partial<DataTableState> = {};
  export let onStateChange: ((state: DataTableState) => void) | undefined =
    undefined;
  export let mode: "client" | "server" = "client";
  export let virtualization: DataTableProps["virtualization"] = undefined;
  const virtualizer = createVirtualWindow(
    { keys: [], height: 320 },
    (value) => {
      virtualState = value;
    },
  );
  let virtualState = virtualizer.state;
  let stopVirtual: (() => void) | undefined;
  $: virtualizer.setOptions(
    dataTableVirtualOptions({ ...editProps, virtualization }, view),
  );
  $: virtualRows = dataTableVirtualRows(
    view,
    virtualization ? virtualState : undefined,
  );
  afterUpdate(() => {
    if (virtualization && !stopVirtual)
      stopVirtual = mountVirtualWindow(
        region,
        virtualizer,
        () => region.querySelector("tbody"),
        () => dataTableVirtualInset(region),
      );
    else if (!virtualization && stopVirtual) {
      stopVirtual();
      stopVirtual = undefined;
    }
  });
  onDestroy(() => stopVirtual?.());
  export let groupBy: DataTableProps["groupBy"] = undefined;
  export let aggregations: DataTableProps["aggregations"] = undefined;
  export let tree: DataTableProps["tree"] = undefined;
  export let expandedRowIds: DataTableProps["expandedRowIds"] = undefined;
  export let defaultExpandedRowIds: DataTableProps["defaultExpandedRowIds"] =
    undefined;
  export let onExpandedRowIdsChange: DataTableProps["onExpandedRowIdsChange"] =
    undefined;
  let internalExpanded =
    defaultExpandedRowIds === undefined
      ? undefined
      : [...defaultExpandedRowIds];
  onMount(() =>
    mountDataTableStructure(
      region,
      () => ({ props: editProps, view }),
      (ids) => {
        if (expandedRowIds === undefined) internalExpanded = [...ids];
        onExpandedRowIdsChange?.([...ids]);
      },
    ),
  );
  export let totalRows: number | undefined = undefined;
  export let columnKeys: readonly string[] | undefined = undefined;
  export let columnWidths: DataTableProps["columnWidths"] = undefined;
  export let defaultColumnWidths: DataTableProps["defaultColumnWidths"] =
    undefined;
  export let columnReorderable = false;
  export let columnResizable = false;
  export let onColumnKeysChange: DataTableProps["onColumnKeysChange"] =
    undefined;
  export let onColumnWidthsChange: DataTableProps["onColumnWidthsChange"] =
    undefined;
  let internalColumnKeys: readonly string[] | undefined;
  let internalColumnWidths =
    defaultColumnWidths === undefined ? undefined : { ...defaultColumnWidths };
  let stopColumns: (() => void) | undefined;
  $: if (columnKeys === undefined)
    internalColumnKeys = reconcileDataColumnOrder(internalColumnKeys, columns);
  $: if (columnWidths === undefined)
    internalColumnWidths = reconcileDataColumnWidths(
      internalColumnWidths,
      columns,
    );
  afterUpdate(() => {
    if ((columnReorderable || columnResizable) && !stopColumns)
      stopColumns = mountDataColumnControls(
        region,
        () => editProps,
        (keys) => {
          if (columnKeys === undefined) internalColumnKeys = [...keys];
          onColumnKeysChange?.([...keys]);
        },
        (widths) => {
          if (columnWidths === undefined) internalColumnWidths = { ...widths };
          onColumnWidthsChange?.({ ...widths });
        },
      );
    else if (!(columnReorderable || columnResizable) && stopColumns) {
      stopColumns();
      stopColumns = undefined;
    }
  });
  onDestroy(() => stopColumns?.());

  export let pinnedColumns: DataTableProps["pinnedColumns"] = undefined;
  let region: HTMLDivElement;
  onMount(() => mountDataTablePins(region));
  export let loading = false;
  export let error: string | undefined = undefined;
  export let onRetry: (() => void) | undefined = undefined;
  export let onBatchCommit: DataTableProps["onBatchCommit"] = undefined;
  export let historyLimit: number | undefined = undefined;
  let batchHost: HTMLDivElement;
  const batchEditor = createDataTableBatchEditor(
    (value) => {
      batch = value;
    },
    () => editor.cancel(),
  );
  let batch = batchEditor.state;
  $: {
    batch;
    batchEditor.sync(editProps, selected);
  }
  onMount(() =>
    mountDataTableBatch(
      batchHost,
      batchEditor,
      () => editProps,
      () => selected,
    ),
  );
  export let onCellCommit: DataTableProps["onCellCommit"] = undefined;
  let edit: DataTableEditState | undefined;
  const editor = createDataTableEditor((value) => {
    edit = value;
  });
  export let instanceId: string;
  $: editId = `lk-data-cell-${instanceId}`;
  $: editProps = {
    data,
    columns,
    pageSize,
    rowKey,
    mode,
    totalRows,
    groupBy,
    aggregations,
    tree,
    expandedRowIds: expandedRowIds ?? internalExpanded,
    defaultExpandedRowIds: undefined,
    columnKeys: columnKeys ?? internalColumnKeys,
    columnWidths: columnWidths ?? internalColumnWidths,
    columnReorderable,
    columnResizable,
    pinnedColumns,
    loading,
    labels,
    onCellCommit,
    onBatchCommit,
    historyLimit,
  };
  $: editor.sync(editProps, view);
  onMount(() =>
    mountDataTableEditor(
      region,
      editor,
      () => editProps,
      () => view,
      () => batchEditor.state.active || batchEditor.state.pending,
    ),
  );
  let query = defaultState.query ?? "",
    sort: DataSort | undefined = defaultState.sort,
    sorts: DataTableState["sorts"] = defaultState.sorts,
    filters: DataTableState["filters"] = defaultState.filters,
    page = defaultState.page ?? 1;
  let internal = [...defaultSelectedIds],
    pageInput: HTMLInputElement | undefined;
  $: current = state ?? { query, sort, sorts, filters, page };
  $: view = dataTableView(editProps, current);
  $: columnStyle = dataColumnTableStyle(editProps);
  $: text = dataTableLabels(labels);
  $: selected = dataTableSelection(selectedIds ?? internal, view.allIds, mode);
  function changeState(patch: Partial<DataTableState>) {
    if (loading) return;
    const next = { ...current, sort: view.sort, ...patch };
    if (state === undefined) {
      query = next.query;
      sort = next.sort;
      sorts = next.sorts;
      filters = next.filters;
      page = next.page;
    }
    onStateChange?.(next);
  }
  $: pageIds = view.rows
    .filter((entry) => entry.structure?.kind !== "group")
    .map(({ id }) => id);
  $: pageSelection = dataSelectionState(selected, pageIds);
  $: setDataSelectionMixed(pageInput, pageSelection.mixed);
  afterUpdate(() => {
    if (state === undefined) {
      if (page !== view.page) page = view.page;
      const reconciled = reconcileDataTableQuery(current, view);
      if (reconciled !== current) {
        sort = reconciled.sort;
        sorts = reconciled.sorts;
        filters = reconciled.filters;
      }
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

{#snippet columnHeading(c: DataColumn)}
  {#if c.sortable === false}<span data-part="column-label" title={c.label}
      >{c.label}</span
    >{:else}<button
      data-part="column-sort"
      aria-label={c.label}
      type="button"
      disabled={loading}
      {...{
        "aria-description": text.sortDescription(
          view.sorts.find((sort) => sort.key === c.key)?.direction,
          view.sorts.findIndex((sort) => sort.key === c.key) + 1,
        ),
      }}
      on:keydown={(event) => {
        if (event.shiftKey && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          if (!event.repeat)
            changeState(nextDataTableSort(view.sorts, c.key, true));
        }
      }}
      on:click={(event) =>
        changeState(nextDataTableSort(view.sorts, c.key, event.shiftKey))}
      ><span data-part="column-label" title={c.label}>{c.label}</span
      >{#if view.sorts.length > 1 && view.sorts.some((sort) => sort.key === c.key)}<span
          data-part="sort-priority"
          aria-hidden="true"
          >{view.sorts.findIndex((sort) => sort.key === c.key) + 1}</span
        >{/if}{#if view.sorts.some((sort) => sort.key === c.key)}<Icon
          icon={view.sorts.find((sort) => sort.key === c.key)?.direction ===
          "asc"
            ? controlIcons.arrowUp
            : controlIcons.arrowDown}
          size="sm"
        />{/if}</button
    >{/if}
{/snippet}

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
  {#if view.columns.some((column) => column.filter)}
    <div data-part="column-filters">
      {#each view.columns.filter((column) => column.filter) as column, index (column.key)}
        {@const control = dataFilterControl(column, current.filters)}
        {@const error = dataFilterError(
          view.filterErrors.get(column.key),
          text,
        )}
        {@const errorId = `${editId}-filter-${index}`}
        <div data-part="column-filter">
          <label
            >{column.label}<select
              aria-label={text.filterOperator(column.label)}
              disabled={loading}
              value={control.operator}
              on:change={(event) => {
                const target = event.currentTarget;
                changeState(
                  changeDataFilter(current, column, {
                    operator:
                      dataFilterOperators(column).find(
                        (operator) => operator === target.value,
                      ) ?? control.operator,
                  }),
                );
                if (state !== undefined)
                  tick().then(() => {
                    if (target.isConnected)
                      target.value = dataFilterControl(
                        column,
                        current.filters,
                      ).operator;
                  });
              }}
              >{#each dataFilterOperators(column) as operator}<option
                  value={operator}
                  selected={control.operator === operator}
                  >{text.filterOperators[operator]}</option
                >{/each}</select
            ></label
          >
          {#if !["empty", "not-empty"].includes(control.operator)}
            {#if column.filter?.type === "select"}
              <select
                aria-label={text.filterColumn(column.label)}
                disabled={loading}
                aria-invalid={!!error || undefined}
                aria-describedby={error ? errorId : undefined}
                value={dataFilterSelectValue(column, current.filters)}
                on:change={(event) => {
                  const target = event.currentTarget,
                    index = Number(target.value);
                  changeState(
                    changeDataFilter(current, column, {
                      value:
                        index < 0
                          ? undefined
                          : column.filter?.options?.[index]?.value,
                    }),
                  );
                  if (state !== undefined)
                    tick().then(() => {
                      if (target.isConnected)
                        target.value = dataFilterSelectValue(
                          column,
                          current.filters,
                        );
                    });
                }}
                ><option
                  value="-1"
                  selected={dataFilterSelectValue(column, current.filters) ===
                    "-1"}>{text.allOptions}</option
                >{#each column.filter.options ?? [] as option, index}<option
                    value={index}
                    selected={dataFilterSelectValue(column, current.filters) ===
                      String(index)}
                    disabled={option.disabled}>{option.label}</option
                  >{/each}</select
              >
            {:else}
              <input
                type="text"
                inputmode={column.filter?.type === "number"
                  ? "decimal"
                  : undefined}
                aria-label={text.filterColumn(column.label)}
                disabled={loading}
                aria-invalid={!!error || undefined}
                aria-describedby={error ? errorId : undefined}
                value={String(control.value)}
                on:input={(event) => {
                  const target = event.currentTarget;
                  changeState(
                    changeDataFilter(current, column, { value: target.value }),
                  );
                  if (state !== undefined)
                    tick().then(() => {
                      if (target.isConnected)
                        target.value = String(
                          dataFilterControl(column, current.filters).value,
                        );
                    });
                }}
              />
            {/if}
          {/if}
          {#if error}<p id={errorId} role="alert">{error}</p>{/if}
        </div>
      {/each}
    </div>
  {/if}
  {#if loading}<p role="status" data-part="loading">{text.loading}</p>{/if}
  {#if error}<div role="alert" data-part="error">
      <span>{error}</span>{#if onRetry}<button
          type="button"
          disabled={loading}
          on:click={(e) => retryDataTable(e.currentTarget, onRetry)}
          >{text.retry}</button
        >{/if}
    </div>{/if}
  <div bind:this={batchHost} data-part="batch-editor" hidden={!onBatchCommit}>
    {@html renderDataTableBatchMarkup(editProps, selected, batch, editId)}
  </div>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex (滚动区域需要键盘聚焦以读取横向内容) -->
  {#if columnReorderable || columnResizable}<p
      data-part="column-status"
      role="status"
      aria-live="polite"
    ></p>{/if}
  <div
    data-scope="table"
    data-part="root"
    bind:this={region}
    data-virtualized={virtualization ? "true" : undefined}
    style:height={virtualization
      ? dataTableVirtualStyle({ ...editProps, virtualization })?.height
      : undefined}
    style:--lk-data-table-column-count={virtualization
      ? dataTableVirtualStyle({ ...editProps, virtualization })?.[
          "--lk-data-table-column-count"
        ]
      : undefined}
    style:--lk-data-table-structure-depth={virtualization
      ? dataTableVirtualStyle({ ...editProps, virtualization }, view)?.[
          "--lk-data-table-structure-depth"
        ]
      : undefined}
    role="region"
    aria-label={label}
    tabindex="0"
  >
    <table
      data-scope="table"
      data-part="table"
      data-column-layout={columnResizable ||
      editProps.columnWidths !== undefined
        ? "true"
        : undefined}
      style:table-layout={columnStyle.tableLayout}
      style:width={columnStyle.width}
      aria-label={label}
      aria-rowcount={virtualization && view.total > 0
        ? (tree || groupBy?.length ? view.rows.length : view.total) + 1
        : undefined}
    >
      {#if columnResizable || editProps.columnWidths !== undefined}<colgroup
          ><col
            style:width={"calc(var(--lk-control-height-sm) + var(--lk-space-component-sm) * 2)"}
          />{#each view.columns as column (column.key)}<col
              data-column-key={column.key}
              style:width={`${dataColumnWidth(column, editProps.columnWidths)}px`}
            />{/each}</colgroup
        >{/if}
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
              data-column-key={c.key}
              data-pinned={view.pins.get(c.key)}
              data-align={c.align}
              aria-sort={view.sort?.key === c.key
                ? view.sort.direction === "asc"
                  ? "ascending"
                  : "descending"
                : undefined}
            >
              {#if columnReorderable || columnResizable}<div
                  data-part="column-header"
                >
                  {@render columnHeading(c)}<span data-part="column-controls"
                    >{@html renderDataColumnControls(editProps, c)}</span
                  >
                </div>{:else}{@render columnHeading(c)}{/if}
            </th>{/each}
        </tr></thead
      >
      <tbody
        >{#each virtualRows as { row, id, virtualIndex, gap, structure } (id)}
          {#if gap > 0}<tr
              data-part="virtual-spacer"
              aria-hidden="true"
              style:height={`${gap}px`}
              ><td colspan={view.columns.length + 1}></td></tr
            >{/if}
          <tr
            data-virtual-key={virtualization ? id : undefined}
            aria-rowindex={virtualization
              ? (tree || groupBy?.length
                  ? 0
                  : (view.page - 1) * view.pageSize) +
                virtualIndex +
                2
              : undefined}
            data-row-id={id}
            data-row-kind={structure?.kind}
            data-selected={(structure?.kind !== "group" &&
              selected.includes(id)) ||
              undefined}
          >
            <td data-pinned={view.pinSelection ? "start" : undefined}
              >{#if structure && !view.columns.length}<div
                  data-part="cell-layout"
                  data-structured="true"
                  style={`--lk-row-depth:${Math.min(structure.depth, 8)}`}
                >
                  <span
                    >{@html renderDataTableRowPrefix(
                      { row, id, index: virtualIndex, structure },
                      editProps,
                      view,
                      text,
                    )}</span
                  >{#if structure.kind === "group"}<div data-part="cell-value">
                      {dataTableGroupText(
                        { row, id, index: virtualIndex, structure },
                        { key: "", label: "" },
                        true,
                        text,
                        editProps,
                      )}
                    </div>{/if}
                </div>{/if}{#if structure?.kind !== "group"}<label
                  data-part="selection"
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
                >{/if}</td
            >
            {#each view.columns as c, columnIndex (c.key)}<td
                data-pinned={view.pins.get(c.key)}
                data-align={c.align}
                ><div
                  data-part="cell-layout"
                  data-structured={(!!structure && columnIndex === 0) ||
                    undefined}
                  style={`--lk-row-depth:${Math.min(structure?.depth ?? 0, 8)}`}
                >
                  {#if structure && columnIndex === 0}<span
                      >{@html renderDataTableRowPrefix(
                        { row, id, index: virtualIndex, structure },
                        editProps,
                        view,
                        text,
                      )}</span
                    >{/if}
                  <div data-part="cell-value">
                    {#if structure?.kind === "group"}{dataTableGroupText(
                        { row, id, index: virtualIndex, structure },
                        c,
                        columnIndex === 0,
                        text,
                        editProps,
                      )}{:else if edit?.rowId === id && edit?.columnKey === c.key}
                      <div
                        data-part="cell-editor"
                        aria-busy={edit?.pending || undefined}
                      >
                        {#if c.editor?.type === "textarea"}<textarea
                            data-part="cell-input"
                            value={edit?.draft ?? ""}
                            aria-label={text.editCell(c.label, id)}
                            aria-invalid={!!edit?.error || undefined}
                            aria-describedby={edit?.error ? editId : undefined}
                            disabled={edit?.pending}
                            rows={c.editor.rows ?? 3}></textarea>
                        {:else if c.editor?.type === "select"}<select
                            data-part="cell-input"
                            value={edit?.draft ?? ""}
                            aria-label={text.editCell(c.label, id)}
                            aria-invalid={!!edit?.error || undefined}
                            aria-describedby={edit?.error ? editId : undefined}
                            disabled={edit?.pending}
                          >
                            {#if !(c.editor.options ?? []).some((option) => option.value === edit?.draft)}<option
                                value={edit?.draft ?? ""}
                                disabled>{edit?.draft || text.emptyCell}</option
                              >{/if}
                            {#each c.editor.options ?? [] as option}<option
                                value={option.value}
                                disabled={option.disabled}
                                >{option.label}</option
                              >{/each}
                          </select>{:else}<input
                            data-part="cell-input"
                            dir={c.editor?.type === "number"
                              ? "ltr"
                              : undefined}
                            type={c.editor?.type ?? "text"}
                            step="any"
                            value={edit?.draft ?? ""}
                            aria-label={text.editCell(c.label, id)}
                            aria-invalid={!!edit?.error || undefined}
                            aria-describedby={edit?.error ? editId : undefined}
                            disabled={edit?.pending}
                          />{/if}
                        <div data-part="cell-actions">
                          <button
                            data-part="cell-save"
                            type="button"
                            disabled={edit?.pending}>{text.save}</button
                          ><button data-part="cell-cancel" type="button"
                            >{text.cancel}</button
                          >
                        </div>
                        {#if edit?.pending}<span
                            data-part="cell-status"
                            role="status">{text.saving}</span
                          >{/if}
                        {#if edit?.error}<span
                            id={editId}
                            data-part="cell-error"
                            role="alert">{edit.error}</span
                          >{/if}
                      </div>
                    {:else if !batch.active && !batch.pending && editor.canEdit(editProps, c)}
                      <button
                        data-part="cell-trigger"
                        data-row-id={id}
                        data-column-key={c.key}
                        type="button"
                        aria-label={`${text.editCell(c.label, id)}: ${dataTableCellText(row, c) || text.emptyCell}`}
                        disabled={!!edit?.pending}
                      >
                        {dataTableCellText(row, c) || text.emptyCell}<Icon
                          icon={controlIcons.pencil}
                          size="sm"
                        />
                      </button>
                    {:else}{dataTableCellText(row, c)}{/if}
                  </div>
                </div></td
              >{/each}
          </tr>{:else}<tr
            ><td colspan={view.columns.length + 1} data-part="empty"
              ><span>{loading ? text.loading : text.empty}</span></td
            ></tr
          >
        {/each}
        {#if virtualization && virtualState.after > 0}<tr
            data-part="virtual-spacer"
            aria-hidden="true"
            style:height={`${virtualState.after}px`}
            ><td colspan={view.columns.length + 1}></td></tr
          >{/if}
      </tbody>
    </table>
  </div>
  <footer>
    <span aria-live="polite"
      ><bdi
        >{text.summary({
          total: view.total,
          selected: selected.length,
          page: view.page,
          pageCount: view.pageCount,
        })}</bdi
      ></span
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
