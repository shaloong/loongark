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
import {
  createSignal,
  createMemo,
  For,
  Show,
  onMount,
  onCleanup,
} from "solid-js";
export interface LoongArkDataTableProps {
  data: readonly DataRow[];
  columns: readonly DataColumn[];
  pageSize?: number;
  rowKey?: string;
  onSelectionChange?: (ids: string[]) => void;
}
export const LoongArkChart = (props: ChartOptions) => {
  let element!: HTMLDivElement;
  const [measuredWidth, setMeasuredWidth] = createSignal(0);
  onMount(() => {
    const stop = observeChartWidth(element, setMeasuredWidth);
    onCleanup(stop);
  });
  return (
    <div
      ref={element}
      data-scope="chart"
      innerHTML={renderChartSVG({
        ...props,
        width: props.width ?? (measuredWidth() || undefined),
      })}
    />
  );
};
export const LoongArkDataTable = (props: LoongArkDataTableProps) => {
  const [query, setQuery] = createSignal(""),
    [sort, setSort] = createSignal<DataSort>(),
    [page, setPage] = createSignal(1),
    [selected, setSelected] = createSignal<string[]>([]);
  const view = createMemo(() =>
    createDataTableView(props.data, props.columns, {
      query: query(),
      sort: sort(),
      page: page(),
      pageSize: props.pageSize,
      rowKey: props.rowKey,
    }),
  );
  const select = (id: string) => {
    const ids = selected().includes(id)
      ? selected().filter((x) => x !== id)
      : [...selected(), id];
    setSelected(ids);
    props.onSelectionChange?.(ids);
  };
  return (
    <section data-scope="data-table">
      <input
        aria-label="Filter rows"
        placeholder="Filter rows…"
        value={query()}
        onInput={(e) => {
          setQuery(e.currentTarget.value);
          setPage(1);
        }}
      />
      <div data-scope="table" data-part="root">
        <table data-scope="table" data-part="table">
          <thead>
            <tr>
              <th scope="col">Select</th>
              <For each={props.columns}>
                {(c) => (
                  <th
                    scope="col"
                    aria-sort={
                      sort()?.key === c.key
                        ? sort()?.direction === "asc"
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
                        onClick={() => setSort(nextDataSort(sort(), c.key))}
                      >
                        {c.label}
                      </button>
                    )}
                  </th>
                )}
              </For>
            </tr>
          </thead>
          <tbody>
            <For each={view().rows}>
              {({ row, id }) => (
                <tr data-selected={selected().includes(id) || undefined}>
                  <td>
                    <input
                      type="checkbox"
                      aria-label={"Select " + id}
                      checked={selected().includes(id)}
                      onChange={() => select(id)}
                    />
                  </td>
                  <For each={props.columns}>
                    {(c) => <td>{String(row[c.key] ?? "")}</td>}
                  </For>
                </tr>
              )}
            </For>
            <Show when={!view().rows.length}>
              <tr>
                <td colSpan={props.columns.length + 1}>No results</td>
              </tr>
            </Show>
          </tbody>
        </table>
      </div>
      <footer>
        <span aria-live="polite">
          {view().total} rows · {selected().length} selected · {view().page} /{" "}
          {view().pageCount}
        </span>
        <button
          type="button"
          disabled={view().page <= 1}
          onClick={() => setPage(view().page - 1)}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={view().page >= view().pageCount}
          onClick={() => setPage(view().page + 1)}
        >
          Next
        </button>
      </footer>
    </section>
  );
};
