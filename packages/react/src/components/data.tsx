import {
  createDataTableView,
  nextDataSort,
  type DataSort,
  type DataRow,
  type DataColumn,
  renderChartSVG,
  observeChartWidth,
  type ChartOptions,
} from "@loongark/kit";
import React, { useState, useRef, useEffect } from "react";
export interface LoongArkDataTableProps {
  data: readonly DataRow[];
  columns: readonly DataColumn[];
  pageSize?: number;
  rowKey?: string;
  onSelectionChange?: (ids: string[]) => void;
}
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
        __html: renderChartSVG({
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
    [selected, setSelected] = useState<string[]>([]);
  const view = createDataTableView(props.data, props.columns, {
    query,
    sort,
    page,
    pageSize: props.pageSize,
    rowKey: props.rowKey,
  });
  const select = (id: string) => {
    const ids = selected.includes(id)
      ? selected.filter((x) => x !== id)
      : [...selected, id];
    setSelected(ids);
    props.onSelectionChange?.(ids);
  };
  return (
    <section data-scope="data-table">
      <input
        aria-label="Filter rows"
        placeholder="Filter rows…"
        value={query}
        onChange={(e) => {
          setQuery(e.currentTarget.value);
          setPage(1);
        }}
      />
      <div data-scope="table" data-part="root">
        <table data-scope="table" data-part="table">
          <thead>
            <tr>
              <th scope="col">Select</th>
              {props.columns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  aria-sort={
                    sort?.key === c.key
                      ? sort.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                >
                  {c.sortable === false ? (
                    c.label
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSort(nextDataSort(sort, c.key))}
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
                  <input
                    type="checkbox"
                    aria-label={"Select " + id}
                    checked={selected.includes(id)}
                    onChange={() => select(id)}
                  />
                </td>
                {props.columns.map((c) => (
                  <td key={c.key}>{String(row[c.key] ?? "")}</td>
                ))}
              </tr>
            ))}
            {!view.rows.length && (
              <tr>
                <td colSpan={props.columns.length + 1}>No results</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <footer>
        <span aria-live="polite">
          {view.total} rows · {selected.length} selected · {view.page} /{" "}
          {view.pageCount}
        </span>
        <button
          type="button"
          disabled={view.page <= 1}
          onClick={() => setPage(view.page - 1)}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={view.page >= view.pageCount}
          onClick={() => setPage(view.page + 1)}
        >
          Next
        </button>
      </footer>
    </section>
  );
};
