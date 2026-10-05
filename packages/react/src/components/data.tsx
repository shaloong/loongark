import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "./icon";
import {
  dataTableView,
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
import React, { useState, useRef, useEffect } from "react";
export type LoongArkDataTableProps = DataTableProps;
export const LoongArkChart = (props: ChartOptions) => {
  const element = useRef<HTMLDivElement>(null);
  const [measuredWidth, setMeasuredWidth] = useState(0),
    [internal, setInternal] = useState<readonly string[] | undefined>(() =>
      props.defaultSeriesKeys ? [...props.defaultSeriesKeys] : undefined,
    );
  const options = {
    ...props,
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
  const [query, setQuery] = useState(props.defaultState?.query ?? ""),
    [sort, setSort] = useState<DataSort | undefined>(props.defaultState?.sort),
    [page, setPage] = useState(props.defaultState?.page ?? 1),
    [internal, setInternal] = useState<string[]>([
      ...(props.defaultSelectedIds ?? []),
    ]);
  const region = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (region.current) return mountDataTablePins(region.current);
  }, []);
  const pageInput = useRef<HTMLInputElement>(null);
  const labels = dataTableLabels(props.labels),
    label = props.label ?? "Data table";
  const current = props.state ?? { query, sort, page };
  const latest = useRef(current);
  latest.current = current;
  const changeState = (patch: Partial<DataTableState>) => {
    if (props.loading) return;
    const next = { ...current, sort: view.sort, ...patch };
    if (props.state === undefined) {
      setQuery(next.query);
      setSort(next.sort);
      setPage(next.page);
    }
    props.onStateChange?.(next);
  };
  const view = dataTableView(props, current);
  const selected = dataTableSelection(
    props.selectedIds ?? internal,
    view.allIds,
    props.mode,
  );
  const pageIds = view.rows.map(({ id }) => id),
    pageSelection = dataSelectionState(selected, pageIds);
  useEffect(() => {
    setDataSelectionMixed(pageInput.current, pageSelection.mixed);
  }, [pageSelection.mixed]);
  useEffect(() => {
    if (props.state === undefined) {
      if (page !== view.page) setPage(view.page);
      if (sort && !view.sort) setSort(undefined);
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
    internal,
  ]);
  const change = (ids: string[], input: HTMLInputElement, rowId?: string) => {
    if (props.loading) return;
    if (props.selectedIds === undefined) setInternal(ids);
    props.onSelectionChange?.(ids);
    if (props.selectedIds !== undefined)
      restoreDataSelection(input, selected, pageIds, rowId);
  };
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
        data-scope="table"
        data-part="root"
        ref={region}
        role="region"
        aria-label={label}
        tabIndex={0}
      >
        <table data-scope="table" data-part="table" aria-label={label}>
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
                  scope="col"
                  data-pinned={view.pins.get(c.key)}
                  aria-sort={
                    view.sort?.key === c.key
                      ? view.sort.direction === "asc"
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
                          sort: nextDataSort(view.sort, c.key),
                          page: 1,
                        })
                      }
                    >
                      {c.label}
                      {view.sort?.key === c.key && (
                        <LoongArkIcon
                          icon={
                            view.sort?.direction === "asc"
                              ? controlIcons.arrowUp
                              : controlIcons.arrowDown
                          }
                          size="sm"
                        />
                      )}
                    </button>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {view.rows.map(({ row, id }) => (
              <tr key={id} data-selected={selected.includes(id) || undefined}>
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
                  <td key={c.key} data-pinned={view.pins.get(c.key)}>
                    {String(row[c.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
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
          {labels.summary({
            total: view.total,
            selected: selected.length,
            page: view.page,
            pageCount: view.pageCount,
          })}
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
