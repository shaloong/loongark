import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "./icon";
import {
  dataTableView,
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
  retryDataTable,
  type DataTableState,
  nextDataSort,
  type DataSort,
  type DataTableProps,
  dataTableLabels,
  dataTableSelection,
  dataSelectionState,
  toggleDataSelection,
  setDataSelectionMixed,
  restoreDataSelection,
  renderChartMarkup,
  mountChartControls,
  observeChartWidth,
  type ChartOptions,
} from "@loongark/kit";
import {
  createSignal,
  createUniqueId,
  createMemo,
  createEffect,
  For,
  Show,
  onMount,
  onCleanup,
} from "solid-js";
export type LoongArkDataTableProps = DataTableProps;
export const LoongArkChart = (props: ChartOptions) => {
  let element!: HTMLDivElement;
  const [measuredWidth, setMeasuredWidth] = createSignal(0),
    [internal, setInternal] = createSignal<readonly string[] | undefined>(
      props.defaultSeriesKeys ? [...props.defaultSeriesKeys] : undefined,
    );
  const [internalRange, setInternalRange] = createSignal<ChartOptions["range"]>(
    props.defaultRange,
  );
  const options = () => ({
    ...props,
    range: props.range ?? internalRange(),
    defaultRange: undefined,
    seriesKeys: props.seriesKeys ?? internal(),
    defaultSeriesKeys: undefined,
    width: props.width ?? (measuredWidth() || undefined),
  });
  onMount(() => {
    const widthStop = observeChartWidth(element, setMeasuredWidth);
    const controlsStop = mountChartControls(
      element,
      options,
      (keys) => {
        if (props.seriesKeys === undefined) setInternal(keys);
        props.onSeriesKeysChange?.(keys);
      },
      (range) => {
        if (props.range === undefined) setInternalRange(range);
        props.onRangeChange?.(range);
      },
    );
    onCleanup(() => {
      widthStop();
      controlsStop();
    });
  });
  return (
    <div
      ref={element}
      data-scope="chart"
      innerHTML={renderChartMarkup(options())}
    />
  );
};
export const LoongArkDataTable = (props: LoongArkDataTableProps) => {
  let region!: HTMLDivElement;
  const editId = createUniqueId();
  let batchHost!: HTMLDivElement;
  const batchEditor = createDataTableBatchEditor(
    (value) => setBatch(value),
    () => editor.cancel(),
  );
  const [batch, setBatch] = createSignal(batchEditor.state);
  onMount(() =>
    onCleanup(
      mountDataTableBatch(batchHost, batchEditor, () => props, selected),
    ),
  );
  createEffect(() => {
    batch();
    props.loading;
    batchEditor.sync(props, selected());
  });
  const [edit, setEdit] = createSignal<DataTableEditState>();
  const editor = createDataTableEditor(setEdit);
  onMount(() =>
    onCleanup(
      mountDataTableEditor(
        region,
        editor,
        () => props,
        view,
        () => batchEditor.state.active || batchEditor.state.pending,
      ),
    ),
  );
  // 共享模型不持有框架响应状态；草稿激活后重新订阅 loading 与校验器。
  createEffect(() => {
    edit();
    props.loading;
    editor.sync(props, view());
  });
  onMount(() => onCleanup(mountDataTablePins(region)));
  const [query, setQuery] = createSignal(props.defaultState?.query ?? ""),
    [sort, setSort] = createSignal<DataSort | undefined>(
      props.defaultState?.sort,
    ),
    [page, setPage] = createSignal(props.defaultState?.page ?? 1),
    [internal, setInternal] = createSignal<string[]>([
      ...(props.defaultSelectedIds ?? []),
    ]);
  let pageInput: HTMLInputElement | undefined;
  const labels = () => dataTableLabels(props.labels),
    label = () => props.label ?? "Data table";
  const current = () =>
    props.state ?? { query: query(), sort: sort(), page: page() };
  const changeState = (patch: Partial<DataTableState>) => {
    if (props.loading) return;
    const next = { ...current(), sort: view().sort, ...patch };
    if (props.state === undefined) {
      setQuery(next.query);
      setSort(next.sort);
      setPage(next.page);
    }
    props.onStateChange?.(next);
  };
  const view = createMemo(() => dataTableView(props, current()));
  const virtualizer = createVirtualWindow(
    dataTableVirtualOptions(props, view()),
    (value) => setVirtualState(value),
  );
  const [virtualState, setVirtualState] = createSignal(virtualizer.state);
  createEffect(() =>
    virtualizer.setOptions(dataTableVirtualOptions(props, view())),
  );
  let stopVirtual: (() => void) | undefined;
  createEffect(() => {
    if (region && props.virtualization && !stopVirtual)
      stopVirtual = mountVirtualWindow(
        region,
        virtualizer,
        () => region.querySelector("tbody"),
        () => dataTableVirtualInset(region),
      );
    else if (!props.virtualization && stopVirtual) {
      stopVirtual();
      stopVirtual = undefined;
    }
  });
  onCleanup(() => stopVirtual?.());
  const virtualRows = createMemo(() =>
    dataTableVirtualRows(
      view(),
      props.virtualization ? virtualState() : undefined,
    ),
  );
  const selected = () =>
    dataTableSelection(
      props.selectedIds ?? internal(),
      view().allIds,
      props.mode,
    );
  const pageIds = () => view().rows.map(({ id }) => id),
    pageSelection = () => dataSelectionState(selected(), pageIds());
  createEffect(() => setDataSelectionMixed(pageInput, pageSelection().mixed));
  createEffect(() => {
    if (props.state === undefined) {
      if (page() !== view().page) setPage(view().page);
      if (sort() && !view().sort) setSort(undefined);
    }
    if (
      props.selectedIds === undefined &&
      selected().length !== internal().length
    ) {
      const next = selected();
      setInternal(next);
      props.onSelectionChange?.(next);
    }
  });
  const change = (ids: string[], input: HTMLInputElement, rowId?: string) => {
    if (props.loading) return;
    if (props.selectedIds === undefined) setInternal(ids);
    props.onSelectionChange?.(ids);
    if (props.selectedIds !== undefined)
      restoreDataSelection(input, selected(), pageIds(), rowId);
  };
  return (
    <section
      data-scope="data-table"
      data-part="root"
      aria-busy={props.loading || undefined}
    >
      <input
        aria-label={labels().filter}
        placeholder={labels().filterPlaceholder}
        value={current().query}
        disabled={props.loading}
        onInput={(e) => {
          const input = e.currentTarget;
          changeState({ query: input.value, page: 1 });
          if (props.state !== undefined)
            queueMicrotask(() => {
              if (input.isConnected) input.value = current().query;
            });
        }}
      />
      <Show when={props.loading}>
        <p role="status" data-part="loading">
          {labels().loading}
        </p>
      </Show>
      <Show when={props.error}>
        <div role="alert" data-part="error">
          <span>{props.error}</span>
          <Show when={props.onRetry}>
            <button
              type="button"
              disabled={props.loading}
              onClick={(e) => retryDataTable(e.currentTarget, props.onRetry)}
            >
              {labels().retry}
            </button>
          </Show>
        </div>
      </Show>
      <div
        ref={batchHost}
        data-part="batch-editor"
        hidden={!props.onBatchCommit}
        innerHTML={renderDataTableBatchMarkup(
          props,
          selected(),
          batch(),
          editId,
        )}
      />
      <div
        data-scope="table"
        data-part="root"
        ref={region}
        data-virtualized={props.virtualization ? "true" : undefined}
        style={dataTableVirtualStyle(props)}
        role="region"
        aria-label={label()}
        tabIndex={0}
      >
        <table
          data-scope="table"
          data-part="table"
          aria-label={label()}
          aria-rowcount={
            props.virtualization && view().total > 0
              ? view().total + 1
              : undefined
          }
        >
          <thead>
            <tr>
              <th
                scope="col"
                data-pinned={view().pinSelection ? "start" : undefined}
              >
                <label data-part="selection">
                  <input
                    ref={pageInput}
                    type="checkbox"
                    aria-label={labels().selectPage}
                    aria-checked={
                      pageSelection().mixed ? "mixed" : pageSelection().checked
                    }
                    checked={pageSelection().checked}
                    disabled={props.loading || !pageIds().length}
                    onChange={(e) =>
                      change(
                        toggleDataSelection(
                          selected(),
                          pageIds(),
                          e.currentTarget.checked,
                        ),
                        e.currentTarget,
                      )
                    }
                  />
                </label>
              </th>
              <For each={view().columns}>
                {(c) => (
                  <th
                    scope="col"
                    data-pinned={view().pins.get(c.key)}
                    data-align={c.align}
                    aria-sort={
                      view().sort?.key === c.key
                        ? view().sort?.direction === "asc"
                          ? "ascending"
                          : "descending"
                        : undefined
                    }
                  >
                    {c.sortable === false ? (
                      c.label
                    ) : (
                      <button
                        aria-label={c.label}
                        type="button"
                        disabled={props.loading}
                        onClick={() =>
                          changeState({
                            sort: nextDataSort(view().sort, c.key),
                            page: 1,
                          })
                        }
                      >
                        {c.label}
                        {view().sort?.key === c.key && (
                          <LoongArkIcon
                            icon={
                              view().sort?.direction === "asc"
                                ? controlIcons.arrowUp
                                : controlIcons.arrowDown
                            }
                            size="sm"
                          />
                        )}
                      </button>
                    )}
                  </th>
                )}
              </For>
            </tr>
          </thead>
          <tbody>
            <For each={virtualRows().map((entry) => entry.id)}>
              {(id) => {
                const initial = virtualRows().find((row) => row.id === id)!;
                const entry = () =>
                  virtualRows().find((row) => row.id === id) ?? initial;
                const row = () => entry().row;
                return (
                  <>
                    <Show when={entry().gap > 0}>
                      <tr
                        data-part="virtual-spacer"
                        aria-hidden="true"
                        style={{ height: `${entry().gap}px` }}
                      >
                        <td colSpan={view().columns.length + 1} />
                      </tr>
                    </Show>
                    <tr
                      data-virtual-key={props.virtualization ? id : undefined}
                      aria-rowindex={
                        props.virtualization
                          ? (view().page - 1) * view().pageSize +
                            entry().virtualIndex +
                            2
                          : undefined
                      }
                      data-selected={selected().includes(id) || undefined}
                    >
                      <td
                        data-pinned={view().pinSelection ? "start" : undefined}
                      >
                        <label data-part="selection">
                          <input
                            type="checkbox"
                            disabled={props.loading}
                            aria-label={labels().selectRow(id)}
                            checked={selected().includes(id)}
                            onChange={(e) =>
                              change(
                                toggleDataSelection(
                                  selected(),
                                  [id],
                                  e.currentTarget.checked,
                                ),
                                e.currentTarget,
                                id,
                              )
                            }
                          />
                        </label>
                      </td>
                      <For each={view().columns}>
                        {(c) => (
                          <td
                            data-pinned={view().pins.get(c.key)}
                            data-align={c.align}
                          >
                            {edit()?.rowId === id &&
                            edit()?.columnKey === c.key ? (
                              <div
                                data-part="cell-editor"
                                aria-busy={edit()?.pending || undefined}
                              >
                                {c.editor?.type === "textarea" ? (
                                  <textarea
                                    data-part="cell-input"
                                    value={edit()?.draft ?? ""}
                                    aria-label={labels().editCell(c.label, id)}
                                    aria-invalid={!!edit()?.error || undefined}
                                    aria-describedby={
                                      edit()?.error ? editId : undefined
                                    }
                                    disabled={edit()?.pending}
                                    rows={c.editor.rows ?? 3}
                                  />
                                ) : c.editor?.type === "select" ? (
                                  <select
                                    data-part="cell-input"
                                    value={edit()?.draft ?? ""}
                                    aria-label={labels().editCell(c.label, id)}
                                    aria-invalid={!!edit()?.error || undefined}
                                    aria-describedby={
                                      edit()?.error ? editId : undefined
                                    }
                                    disabled={edit()?.pending}
                                  >
                                    {!(c.editor?.options ?? []).some(
                                      (option) =>
                                        option.value === edit()?.draft,
                                    ) && (
                                      <option
                                        value={edit()?.draft ?? ""}
                                        disabled
                                      >
                                        {edit()?.draft || labels().emptyCell}
                                      </option>
                                    )}
                                    {(c.editor?.options ?? []).map((option) => (
                                      <option
                                        value={option.value}
                                        disabled={option.disabled}
                                      >
                                        {option.label}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  <input
                                    data-part="cell-input"
                                    dir={
                                      c.editor?.type === "number"
                                        ? "ltr"
                                        : undefined
                                    }
                                    type={c.editor?.type ?? "text"}
                                    step="any"
                                    value={edit()?.draft ?? ""}
                                    aria-label={labels().editCell(c.label, id)}
                                    aria-invalid={!!edit()?.error || undefined}
                                    aria-describedby={
                                      edit()?.error ? editId : undefined
                                    }
                                    disabled={edit()?.pending}
                                  />
                                )}
                                <div data-part="cell-actions">
                                  <button
                                    data-part="cell-save"
                                    type="button"
                                    disabled={edit()?.pending}
                                  >
                                    {labels().save}
                                  </button>
                                  <button data-part="cell-cancel" type="button">
                                    {labels().cancel}
                                  </button>
                                </div>
                                {edit()?.pending && (
                                  <span data-part="cell-status" role="status">
                                    {labels().saving}
                                  </span>
                                )}
                                {edit()?.error && (
                                  <span
                                    id={editId}
                                    data-part="cell-error"
                                    role="alert"
                                  >
                                    {edit()?.error}
                                  </span>
                                )}
                              </div>
                            ) : !batch().active &&
                              !batch().pending &&
                              editor.canEdit(props, c) ? (
                              <button
                                data-part="cell-trigger"
                                data-row-id={id}
                                data-column-key={c.key}
                                type="button"
                                aria-label={`${labels().editCell(c.label, id)}: ${dataTableCellText(row(), c) || labels().emptyCell}`}
                                disabled={!!edit()?.pending}
                              >
                                {dataTableCellText(row(), c) ||
                                  labels().emptyCell}
                                <LoongArkIcon
                                  icon={controlIcons.pencil}
                                  size="sm"
                                />
                              </button>
                            ) : (
                              dataTableCellText(row(), c)
                            )}
                          </td>
                        )}
                      </For>
                    </tr>
                  </>
                );
              }}
            </For>
            <Show when={props.virtualization && virtualState().after > 0}>
              <tr
                data-part="virtual-spacer"
                aria-hidden="true"
                style={{ height: `${virtualState().after}px` }}
              >
                <td colSpan={view().columns.length + 1} />
              </tr>
            </Show>
            <Show when={!view().rows.length}>
              <tr>
                <td colSpan={view().columns.length + 1} data-part="empty">
                  <span>
                    {props.loading ? labels().loading : labels().empty}
                  </span>
                </td>
              </tr>
            </Show>
          </tbody>
        </table>
      </div>
      <footer>
        <span aria-live="polite">
          <bdi>
            {labels().summary({
              total: view().total,
              selected: selected().length,
              page: view().page,
              pageCount: view().pageCount,
            })}
          </bdi>
        </span>
        <button
          type="button"
          disabled={props.loading || view().page <= 1}
          onClick={() => changeState({ page: view().page - 1 })}
        >
          {labels().previous}
        </button>
        <button
          type="button"
          disabled={props.loading || view().page >= view().pageCount}
          onClick={() => changeState({ page: view().page + 1 })}
        >
          {labels().next}
        </button>
      </footer>
    </section>
  );
};
