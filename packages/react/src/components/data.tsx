import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "./icon";
import {
  dataTableView,
  dataColumnWidth,
  reconcileDataColumnOrder,
  reconcileDataColumnWidths,
  dataColumnTableStyle,
  renderDataColumnControls,
  mountDataColumnControls,
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
  nextDataTableSort,
  reconcileDataTableQuery,
  dataFilterError,
  dataFilterSelectValue,
  dataFilterControl,
  dataFilterOperators,
  changeDataFilter,
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
import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useId,
} from "react";
export type LoongArkDataTableProps = DataTableProps;
export const LoongArkChart = (props: ChartOptions) => {
  const element = useRef<HTMLDivElement>(null);
  const [measuredWidth, setMeasuredWidth] = useState(0),
    [internal, setInternal] = useState<readonly string[] | undefined>(() =>
      props.defaultSeriesKeys ? [...props.defaultSeriesKeys] : undefined,
    );
  const [internalRange, setInternalRange] = useState<ChartOptions["range"]>(
    () => props.defaultRange,
  );
  const options = {
    ...props,
    range: props.range ?? internalRange,
    defaultRange: undefined,
    seriesKeys: props.seriesKeys ?? internal,
    defaultSeriesKeys: undefined,
    width: props.width ?? (measuredWidth || undefined),
  };
  const latest = useRef(props),
    resolved = useRef<ChartOptions>(options);
  latest.current = props;
  resolved.current = options;
  useEffect(() => {
    if (!element.current) return;
    const widthStop = observeChartWidth(element.current, setMeasuredWidth);
    const controlsStop = mountChartControls(
      element.current,
      () => resolved.current,
      (keys) => {
        if (latest.current.seriesKeys === undefined) setInternal(keys);
        latest.current.onSeriesKeysChange?.(keys);
      },
      (range) => {
        if (latest.current.range === undefined) setInternalRange(range);
        latest.current.onRangeChange?.(range);
      },
    );
    return () => {
      widthStop();
      controlsStop();
    };
  }, []);
  return (
    <div
      ref={element}
      data-scope="chart"
      dangerouslySetInnerHTML={{ __html: renderChartMarkup(options) }}
    />
  );
};
export const LoongArkDataTable = (props: LoongArkDataTableProps) => {
  const [internalColumnKeys, setColumnKeys] = useState<readonly string[]>();
  const [internalColumnWidths, setColumnWidths] = useState<
    DataTableProps["columnWidths"]
  >(() =>
    props.defaultColumnWidths === undefined
      ? undefined
      : { ...props.defaultColumnWidths },
  );
  const columnProps = {
    ...props,
    columnKeys: props.columnKeys ?? internalColumnKeys,
    columnWidths: props.columnWidths ?? internalColumnWidths,
  };
  useLayoutEffect(() => {
    if (props.columnKeys === undefined)
      setColumnKeys((previous) =>
        reconcileDataColumnOrder(previous, props.columns),
      );
    if (props.columnWidths === undefined)
      setColumnWidths((previous) =>
        reconcileDataColumnWidths(previous, props.columns),
      );
  }, [props.columns, props.columnKeys, props.columnWidths]);
  const columnLatest = useRef(columnProps),
    columnRaw = useRef(props);
  columnLatest.current = columnProps;
  columnRaw.current = props;

  const [query, setQuery] = useState(props.defaultState?.query ?? ""),
    [sort, setSort] = useState<DataSort | undefined>(props.defaultState?.sort),
    [sorts, setSorts] = useState<DataTableState["sorts"]>(
      props.defaultState?.sorts,
    ),
    [filters, setFilters] = useState<DataTableState["filters"]>(
      props.defaultState?.filters,
    ),
    [page, setPage] = useState(props.defaultState?.page ?? 1),
    [internal, setInternal] = useState<string[]>([
      ...(props.defaultSelectedIds ?? []),
    ]);
  const current = props.state ?? { query, sort, sorts, filters, page };
  const view = dataTableView(columnProps, current);
  const region = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!region.current || !(props.columnReorderable || props.columnResizable))
      return;
    return mountDataColumnControls(
      region.current,
      () => columnLatest.current,
      (keys) => {
        if (columnRaw.current.columnKeys === undefined)
          setColumnKeys([...keys]);
        columnRaw.current.onColumnKeysChange?.([...keys]);
      },
      (widths) => {
        if (columnRaw.current.columnWidths === undefined)
          setColumnWidths({ ...widths });
        columnRaw.current.onColumnWidthsChange?.({ ...widths });
      },
    );
  }, [!!(props.columnReorderable || props.columnResizable)]);

  const [virtualizer] = useState(() =>
    createVirtualWindow(dataTableVirtualOptions(props, view), (value) =>
      setVirtualState(value),
    ),
  );
  const [virtualState, setVirtualState] = useState(virtualizer.state);
  const virtualLatest = useRef({ props, view });
  virtualLatest.current = { props, view };
  useLayoutEffect(() =>
    virtualizer.setOptions(
      dataTableVirtualOptions(
        virtualLatest.current.props,
        virtualLatest.current.view,
      ),
    ),
  );
  useEffect(() => {
    if (region.current && props.virtualization) {
      const viewport = region.current;
      return mountVirtualWindow(
        viewport,
        virtualizer,
        () => viewport.querySelector("tbody"),
        () => dataTableVirtualInset(viewport),
      );
    }
  }, [virtualizer, !!props.virtualization]);
  const editId = useId();
  const batchHost = useRef<HTMLDivElement>(null);
  const [batchEditor] = useState(() =>
    createDataTableBatchEditor(
      (value) => setBatch(value),
      () => editor.cancel(),
    ),
  );
  const [batch, setBatch] = useState(batchEditor.state);
  const batchLatest = useRef({ props, selected: [] as string[] });
  useLayoutEffect(() =>
    batchEditor.sync(batchLatest.current.props, batchLatest.current.selected),
  );
  useEffect(() => {
    if (batchHost.current)
      return mountDataTableBatch(
        batchHost.current,
        batchEditor,
        () => batchLatest.current.props,
        () => batchLatest.current.selected,
      );
  }, [batchEditor]);
  const [edit, setEdit] = useState<DataTableEditState>();
  const [editor] = useState(() => createDataTableEditor(setEdit));
  const editLatest = useRef({
    props,
    view,
  });
  editLatest.current = {
    props,
    view,
  };
  useLayoutEffect(() =>
    editor.sync(editLatest.current.props, editLatest.current.view),
  );
  useEffect(() => {
    if (region.current)
      return mountDataTableEditor(
        region.current,
        editor,
        () => editLatest.current.props,
        () => editLatest.current.view,
        () => batchEditor.state.active || batchEditor.state.pending,
      );
  }, [editor]);
  useEffect(() => {
    if (region.current) return mountDataTablePins(region.current);
  }, []);
  const pageInput = useRef<HTMLInputElement>(null);
  const labels = dataTableLabels(props.labels),
    label = props.label ?? "Data table";
  const latest = useRef(current);
  latest.current = current;
  const changeState = (patch: Partial<DataTableState>) => {
    if (props.loading) return;
    const next = { ...current, sort: view.sort, ...patch };
    if (props.state === undefined) {
      setQuery(next.query);
      setSort(next.sort);
      setSorts(next.sorts);
      setFilters(next.filters);
      setPage(next.page);
    }
    props.onStateChange?.(next);
  };
  const selected = dataTableSelection(
    props.selectedIds ?? internal,
    view.allIds,
    props.mode,
  );
  batchLatest.current = { props, selected };
  const pageIds = view.rows.map(({ id }) => id),
    pageSelection = dataSelectionState(selected, pageIds);
  useEffect(() => {
    setDataSelectionMixed(pageInput.current, pageSelection.mixed);
  }, [pageSelection.mixed]);
  useEffect(() => {
    if (props.state === undefined) {
      if (page !== view.page) setPage(view.page);
      const reconciled = reconcileDataTableQuery(current, view);
      if (reconciled !== current) {
        setSort(reconciled.sort);
        setSorts(reconciled.sorts);
        setFilters(reconciled.filters);
      }
    }
    if (
      props.selectedIds === undefined &&
      selected.length !== internal.length
    ) {
      setInternal(selected);
      props.onSelectionChange?.(selected);
    }
  }, [
    props.data,
    props.columns,
    props.rowKey,
    props.pageSize,
    props.state,
    props.columnKeys,
    props.mode,
    props.totalRows,
    props.selectedIds,
    page,
    sort,
    sorts,
    filters,
    internal,
  ]);
  const change = (ids: string[], input: HTMLInputElement, rowId?: string) => {
    if (props.loading) return;
    if (props.selectedIds === undefined) setInternal(ids);
    props.onSelectionChange?.(ids);
    if (props.selectedIds !== undefined)
      restoreDataSelection(input, selected, pageIds, rowId);
  };
  const columnHeading = (c: DataTableProps["columns"][number]) =>
    c.sortable === false ? (
      <span data-part="column-label" title={c.label}>
        {c.label}
      </span>
    ) : (
      <button
        data-part="column-sort"
        aria-label={c.label}
        type="button"
        disabled={props.loading}
        aria-description={labels.sortDescription(
          view.sorts.find((sort) => sort.key === c.key)?.direction,
          view.sorts.findIndex((sort) => sort.key === c.key) + 1,
        )}
        onKeyDown={(event) => {
          // Firefox 的原生键盘 click 不保留 Shift，直接处理组合键。
          if (event.shiftKey && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            if (!event.repeat)
              changeState(nextDataTableSort(view.sorts, c.key, true));
          }
        }}
        onClick={(event) =>
          changeState(nextDataTableSort(view.sorts, c.key, event.shiftKey))
        }
      >
        <span data-part="column-label" title={c.label}>
          {c.label}
        </span>
        {view.sorts.length > 1 &&
          view.sorts.some((sort) => sort.key === c.key) && (
            <span data-part="sort-priority" aria-hidden="true">
              {view.sorts.findIndex((sort) => sort.key === c.key) + 1}
            </span>
          )}
        {view.sorts.some((sort) => sort.key === c.key) && (
          <LoongArkIcon
            icon={
              view.sorts.find((sort) => sort.key === c.key)?.direction === "asc"
                ? controlIcons.arrowUp
                : controlIcons.arrowDown
            }
            size="sm"
          />
        )}
      </button>
    );
  return (
    <section
      data-scope="data-table"
      data-part="root"
      aria-busy={props.loading || undefined}
    >
      <input
        aria-label={labels.filter}
        placeholder={labels.filterPlaceholder}
        value={current.query}
        disabled={props.loading}
        onChange={(e) => {
          const input = e.currentTarget;
          changeState({ query: input.value, page: 1 });
          if (props.state !== undefined)
            queueMicrotask(() => {
              if (input.isConnected) input.value = latest.current.query;
            });
        }}
      />
      {view.columns.some((column) => column.filter) && (
        <div data-part="column-filters">
          {view.columns
            .filter((column) => column.filter)
            .map((column, index) => {
              const control = dataFilterControl(column, current.filters),
                error = dataFilterError(
                  view.filterErrors.get(column.key),
                  labels,
                ),
                errorId = `${editId}-filter-${index}`;
              return (
                <div key={column.key} data-part="column-filter">
                  <label>
                    {column.label}
                    <select
                      aria-label={labels.filterOperator(column.label)}
                      disabled={props.loading}
                      value={control.operator}
                      onChange={(event) => {
                        const target = event.currentTarget;
                        changeState(
                          changeDataFilter(current, column, {
                            operator:
                              dataFilterOperators(column).find(
                                (operator) => operator === target.value,
                              ) ?? control.operator,
                          }),
                        );
                        if (props.state !== undefined)
                          queueMicrotask(() => {
                            if (target.isConnected)
                              target.value = dataFilterControl(
                                column,
                                latest.current.filters,
                              ).operator;
                          });
                      }}
                    >
                      {dataFilterOperators(column).map((operator) => (
                        <option key={operator} value={operator}>
                          {labels.filterOperators[operator]}
                        </option>
                      ))}
                    </select>
                  </label>
                  {!["empty", "not-empty"].includes(control.operator) &&
                    (column.filter?.type === "select" ? (
                      <select
                        aria-label={labels.filterColumn(column.label)}
                        disabled={props.loading}
                        aria-invalid={!!error || undefined}
                        aria-describedby={error ? errorId : undefined}
                        value={dataFilterSelectValue(column, current.filters)}
                        onChange={(event) => {
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
                          if (props.state !== undefined)
                            queueMicrotask(() => {
                              if (target.isConnected)
                                target.value = dataFilterSelectValue(
                                  column,
                                  latest.current.filters,
                                );
                            });
                        }}
                      >
                        <option value="-1">{labels.allOptions}</option>
                        {column.filter?.options?.map((option, index) => (
                          <option
                            key={option.value}
                            value={index}
                            disabled={option.disabled}
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        inputMode={
                          column.filter?.type === "number"
                            ? "decimal"
                            : undefined
                        }
                        aria-label={labels.filterColumn(column.label)}
                        disabled={props.loading}
                        aria-invalid={!!error || undefined}
                        aria-describedby={error ? errorId : undefined}
                        value={String(control.value)}
                        onChange={(event) => {
                          const target = event.currentTarget;
                          changeState(
                            changeDataFilter(current, column, {
                              value: target.value,
                            }),
                          );
                          if (props.state !== undefined)
                            queueMicrotask(() => {
                              if (target.isConnected)
                                target.value = String(
                                  dataFilterControl(
                                    column,
                                    latest.current.filters,
                                  ).value,
                                );
                            });
                        }}
                      />
                    ))}
                  {error && (
                    <p id={errorId} role="alert">
                      {error}
                    </p>
                  )}
                </div>
              );
            })}
        </div>
      )}
      {props.loading && (
        <p role="status" data-part="loading">
          {labels.loading}
        </p>
      )}
      {props.error && (
        <div role="alert" data-part="error">
          <span>{props.error}</span>
          {props.onRetry && (
            <button
              type="button"
              disabled={props.loading}
              onClick={(e) => retryDataTable(e.currentTarget, props.onRetry)}
            >
              {labels.retry}
            </button>
          )}
        </div>
      )}
      <div
        ref={batchHost}
        data-part="batch-editor"
        hidden={!props.onBatchCommit}
        dangerouslySetInnerHTML={{
          __html: renderDataTableBatchMarkup(props, selected, batch, editId),
        }}
      />
      {(props.columnReorderable || props.columnResizable) && (
        <p data-part="column-status" role="status" aria-live="polite" />
      )}
      <div
        data-scope="table"
        data-part="root"
        ref={region}
        data-virtualized={props.virtualization ? "true" : undefined}
        style={dataTableVirtualStyle(columnProps)}
        role="region"
        aria-label={label}
        tabIndex={0}
      >
        <table
          data-scope="table"
          data-part="table"
          data-column-layout={
            props.columnResizable || columnProps.columnWidths !== undefined
              ? "true"
              : undefined
          }
          style={dataColumnTableStyle(columnProps)}
          aria-label={label}
          aria-rowcount={
            props.virtualization && view.total > 0 ? view.total + 1 : undefined
          }
        >
          {(props.columnResizable ||
            columnProps.columnWidths !== undefined) && (
            <colgroup>
              <col
                style={{
                  width:
                    "calc(var(--lk-control-height-sm) + var(--lk-space-component-sm) * 2)",
                }}
              />
              {view.columns.map((column) => (
                <col
                  key={column.key}
                  data-column-key={column.key}
                  style={{
                    width: `${dataColumnWidth(column, columnProps.columnWidths)}px`,
                  }}
                />
              ))}
            </colgroup>
          )}
          <thead>
            <tr>
              <th
                scope="col"
                data-pinned={view.pinSelection ? "start" : undefined}
              >
                <label data-part="selection">
                  <input
                    ref={pageInput}
                    type="checkbox"
                    aria-label={labels.selectPage}
                    aria-checked={
                      pageSelection.mixed ? "mixed" : pageSelection.checked
                    }
                    checked={pageSelection.checked}
                    disabled={props.loading || !pageIds.length}
                    onChange={(e) =>
                      change(
                        toggleDataSelection(
                          selected,
                          pageIds,
                          e.currentTarget.checked,
                        ),
                        e.currentTarget,
                      )
                    }
                  />
                </label>
              </th>
              {view.columns.map((c) => (
                <th
                  key={c.key}
                  data-column-key={c.key}
                  scope="col"
                  data-pinned={view.pins.get(c.key)}
                  data-align={c.align}
                  aria-sort={
                    view.sort?.key === c.key
                      ? view.sort.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : undefined
                  }
                >
                  {props.columnReorderable || props.columnResizable ? (
                    <div data-part="column-header">
                      {columnHeading(c)}
                      <span
                        data-part="column-controls"
                        dangerouslySetInnerHTML={{
                          __html: renderDataColumnControls(columnProps, c),
                        }}
                      />
                    </div>
                  ) : (
                    columnHeading(c)
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataTableVirtualRows(
              view,
              props.virtualization ? virtualState : undefined,
            ).map(({ row, id, virtualIndex, gap }) => (
              <React.Fragment key={id}>
                {gap > 0 && (
                  <tr
                    data-part="virtual-spacer"
                    aria-hidden="true"
                    style={{ height: `${gap}px` }}
                  >
                    <td colSpan={view.columns.length + 1} />
                  </tr>
                )}
                <tr
                  data-virtual-key={props.virtualization ? id : undefined}
                  aria-rowindex={
                    props.virtualization
                      ? (view.page - 1) * view.pageSize + virtualIndex + 2
                      : undefined
                  }
                  data-selected={selected.includes(id) || undefined}
                >
                  <td data-pinned={view.pinSelection ? "start" : undefined}>
                    <label data-part="selection">
                      <input
                        type="checkbox"
                        disabled={props.loading}
                        aria-label={labels.selectRow(id)}
                        checked={selected.includes(id)}
                        onChange={(e) =>
                          change(
                            toggleDataSelection(
                              selected,
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
                  {view.columns.map((c) => (
                    <td
                      key={c.key}
                      data-pinned={view.pins.get(c.key)}
                      data-align={c.align}
                    >
                      {edit?.rowId === id && edit?.columnKey === c.key ? (
                        <div
                          data-part="cell-editor"
                          aria-busy={edit?.pending || undefined}
                        >
                          {c.editor?.type === "textarea" ? (
                            <textarea
                              data-part="cell-input"
                              value={edit?.draft ?? ""}
                              aria-label={labels.editCell(c.label, id)}
                              aria-invalid={!!edit?.error || undefined}
                              aria-describedby={
                                edit?.error ? editId : undefined
                              }
                              disabled={edit?.pending}
                              onChange={() => {}}
                              rows={c.editor.rows ?? 3}
                            />
                          ) : c.editor?.type === "select" ? (
                            <select
                              data-part="cell-input"
                              value={edit?.draft ?? ""}
                              aria-label={labels.editCell(c.label, id)}
                              aria-invalid={!!edit?.error || undefined}
                              aria-describedby={
                                edit?.error ? editId : undefined
                              }
                              disabled={edit?.pending}
                              onChange={() => {}}
                            >
                              {!(c.editor?.options ?? []).some(
                                (option) => option.value === edit?.draft,
                              ) && (
                                <option value={edit?.draft ?? ""} disabled>
                                  {edit?.draft || labels.emptyCell}
                                </option>
                              )}
                              {(c.editor?.options ?? []).map((option) => (
                                <option
                                  key={option.value}
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
                                c.editor?.type === "number" ? "ltr" : undefined
                              }
                              onChange={() => {}}
                              type={c.editor?.type ?? "text"}
                              step="any"
                              value={edit?.draft ?? ""}
                              aria-label={labels.editCell(c.label, id)}
                              aria-invalid={!!edit?.error || undefined}
                              aria-describedby={
                                edit?.error ? editId : undefined
                              }
                              disabled={edit?.pending}
                            />
                          )}
                          <div data-part="cell-actions">
                            <button
                              data-part="cell-save"
                              type="button"
                              disabled={edit?.pending}
                            >
                              {labels.save}
                            </button>
                            <button data-part="cell-cancel" type="button">
                              {labels.cancel}
                            </button>
                          </div>
                          {edit?.pending && (
                            <span data-part="cell-status" role="status">
                              {labels.saving}
                            </span>
                          )}
                          {edit?.error && (
                            <span
                              id={editId}
                              data-part="cell-error"
                              role="alert"
                            >
                              {edit?.error}
                            </span>
                          )}
                        </div>
                      ) : !batch.active &&
                        !batch.pending &&
                        editor.canEdit(props, c) ? (
                        <button
                          data-part="cell-trigger"
                          data-row-id={id}
                          data-column-key={c.key}
                          type="button"
                          aria-label={`${labels.editCell(c.label, id)}: ${dataTableCellText(row, c) || labels.emptyCell}`}
                          disabled={!!edit?.pending}
                        >
                          {dataTableCellText(row, c) || labels.emptyCell}
                          <LoongArkIcon icon={controlIcons.pencil} size="sm" />
                        </button>
                      ) : (
                        dataTableCellText(row, c)
                      )}
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            ))}
            {props.virtualization && virtualState.after > 0 && (
              <tr
                data-part="virtual-spacer"
                aria-hidden="true"
                style={{ height: `${virtualState.after}px` }}
              >
                <td colSpan={view.columns.length + 1} />
              </tr>
            )}
            {!view.rows.length && (
              <tr>
                <td colSpan={view.columns.length + 1} data-part="empty">
                  <span>{props.loading ? labels.loading : labels.empty}</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <footer>
        <span aria-live="polite">
          <bdi>
            {labels.summary({
              total: view.total,
              selected: selected.length,
              page: view.page,
              pageCount: view.pageCount,
            })}
          </bdi>
        </span>
        <button
          type="button"
          disabled={props.loading || view.page <= 1}
          onClick={() => changeState({ page: view.page - 1 })}
        >
          {labels.previous}
        </button>
        <button
          type="button"
          disabled={props.loading || view.page >= view.pageCount}
          onClick={() => changeState({ page: view.page + 1 })}
        >
          {labels.next}
        </button>
      </footer>
    </section>
  );
};
