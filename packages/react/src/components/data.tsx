import {
  createDataTableView,
  nextDataSort,
  type DataSort,
  type DataTableProps,
  dataTableLabels,
  normalizeDataSelection,
  dataSelectionState,
  toggleDataSelection,
  setDataSelectionMixed,
  restoreDataSelection,
  renderChartMarkup,
  observeChartWidth,
  type ChartOptions,
} from "@loongark/kit";
import React, { useState, useRef, useEffect } from "react";
export type LoongArkDataTableProps = DataTableProps;
export const LoongArkChart = (props: ChartOptions) => {
  const element = useRef<HTMLDivElement>(null);
  const [measuredWidth, setMeasuredWidth] = useState(0);
  useEffect(() => {
    if (element.current)
      return observeChartWidth(element.current, setMeasuredWidth);
  }, []);
  return (
    <div
      ref={element}
      data-scope="chart"
      dangerouslySetInnerHTML={{
        __html: renderChartMarkup({
          ...props,
          width: props.width ?? (measuredWidth || undefined),
        }),
      }}
    />
  );
};
export const LoongArkDataTable = (props: LoongArkDataTableProps) => {
  const [query, setQuery] = useState(""),
    [sort, setSort] = useState<DataSort>(),
    [page, setPage] = useState(1),
    [internal, setInternal] = useState<string[]>([
      ...(props.defaultSelectedIds ?? []),
    ]);
  const pageInput = useRef<HTMLInputElement>(null);
  const labels = dataTableLabels(props.labels),
    label = props.label ?? "Data table";
  const view = createDataTableView(props.data, props.columns, {
    query,
    sort,
    page,
    pageSize: props.pageSize,
    rowKey: props.rowKey,
  });
  const selected = normalizeDataSelection(
    props.selectedIds ?? internal,
    view.allIds,
  );
  const pageIds = view.rows.map(({ id }) => id),
    pageSelection = dataSelectionState(selected, pageIds);
  useEffect(() => {
    setDataSelectionMixed(pageInput.current, pageSelection.mixed);
  }, [pageSelection.mixed]);
  useEffect(() => {
    if (page !== view.page) setPage(view.page);
    if (sort && !view.sort) setSort(undefined);
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
    props.selectedIds,
    page,
    sort,
    internal,
  ]);
  const change = (ids: string[], input: HTMLInputElement, rowId?: string) => {
    if (props.selectedIds === undefined) setInternal(ids);
    props.onSelectionChange?.(ids);
    if (props.selectedIds !== undefined)
      restoreDataSelection(input, selected, pageIds, rowId);
  };
  return (
    <section data-scope="data-table" data-part="root">
      <input
        aria-label={labels.filter}
        placeholder={labels.filterPlaceholder}
        value={query}
        onChange={(e) => {
          setQuery(e.currentTarget.value);
          setPage(1);
        }}
      />
      <div
        data-scope="table"
        data-part="root"
        role="region"
        aria-label={label}
        tabIndex={0}
      >
        <table data-scope="table" data-part="table" aria-label={label}>
          <thead>
            <tr>
              <th scope="col">
                <label data-part="selection">
                  <input
                    ref={pageInput}
                    type="checkbox"
                    aria-label={labels.selectPage}
                    aria-checked={
                      pageSelection.mixed ? "mixed" : pageSelection.checked
                    }
                    checked={pageSelection.checked}
                    disabled={!pageIds.length}
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
              {props.columns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
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
                      onClick={() => setSort(nextDataSort(view.sort, c.key))}
                    >
                      {c.label}
                    </button>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {view.rows.map(({ row, id }) => (
              <tr key={id} data-selected={selected.includes(id) || undefined}>
                <td>
                  <label data-part="selection">
                    <input
                      type="checkbox"
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
                {props.columns.map((c) => (
                  <td key={c.key}>{String(row[c.key] ?? "")}</td>
                ))}
              </tr>
            ))}
            {!view.rows.length && (
              <tr>
                <td colSpan={props.columns.length + 1} data-part="empty">
                  {labels.empty}
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
          disabled={view.page <= 1}
          onClick={() => setPage(view.page - 1)}
        >
          {labels.previous}
        </button>
        <button
          type="button"
          disabled={view.page >= view.pageCount}
          onClick={() => setPage(view.page + 1)}
        >
          {labels.next}
        </button>
      </footer>
    </section>
  );
};
