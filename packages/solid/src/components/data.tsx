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
import {
  createSignal,
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
  const [measuredWidth, setMeasuredWidth] = createSignal(0);
  onMount(() => {
    const stop = observeChartWidth(element, setMeasuredWidth);
    onCleanup(stop);
  });
  return (
    <div
      ref={element}
      data-scope="chart"
      innerHTML={renderChartMarkup({
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
    [internal, setInternal] = createSignal<string[]>([
      ...(props.defaultSelectedIds ?? []),
    ]);
  let pageInput: HTMLInputElement | undefined;
  const labels = () => dataTableLabels(props.labels),
    label = () => props.label ?? "Data table";
  const view = createMemo(() =>
    createDataTableView(props.data, props.columns, {
      query: query(),
      sort: sort(),
      page: page(),
      pageSize: props.pageSize,
      rowKey: props.rowKey,
    }),
  );
  const selected = () =>
    normalizeDataSelection(props.selectedIds ?? internal(), view().allIds);
  const pageIds = () => view().rows.map(({ id }) => id),
    pageSelection = () => dataSelectionState(selected(), pageIds());
  createEffect(() => setDataSelectionMixed(pageInput, pageSelection().mixed));
  createEffect(() => {
    if (page() !== view().page) setPage(view().page);
    if (sort() && !view().sort) setSort(undefined);
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
    if (props.selectedIds === undefined) setInternal(ids);
    props.onSelectionChange?.(ids);
    if (props.selectedIds !== undefined)
      restoreDataSelection(input, selected(), pageIds(), rowId);
  };
  return (
    <section data-scope="data-table" data-part="root">
      <input
        aria-label={labels().filter}
        placeholder={labels().filterPlaceholder}
        value={query()}
        onInput={(e) => {
          setQuery(e.currentTarget.value);
          setPage(1);
        }}
      />
      <div
        data-scope="table"
        data-part="root"
        role="region"
        aria-label={label()}
        tabIndex={0}
      >
        <table data-scope="table" data-part="table" aria-label={label()}>
          <thead>
            <tr>
              <th scope="col">
                <label data-part="selection">
                  <input
                    ref={pageInput}
                    type="checkbox"
                    aria-label={labels().selectPage}
                    aria-checked={
                      pageSelection().mixed ? "mixed" : pageSelection().checked
                    }
                    checked={pageSelection().checked}
                    disabled={!pageIds().length}
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
              <For each={props.columns}>
                {(c) => (
                  <th
                    scope="col"
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
                        onClick={() =>
                          setSort(nextDataSort(view().sort, c.key))
                        }
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
                    <label data-part="selection">
                      <input
                        type="checkbox"
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
                  <For each={props.columns}>
                    {(c) => <td>{String(row[c.key] ?? "")}</td>}
                  </For>
                </tr>
              )}
            </For>
            <Show when={!view().rows.length}>
              <tr>
                <td colSpan={props.columns.length + 1} data-part="empty">
                  {labels().empty}
                </td>
              </tr>
            </Show>
          </tbody>
        </table>
      </div>
      <footer>
        <span aria-live="polite">
          {labels().summary({
            total: view().total,
            selected: selected().length,
            page: view().page,
            pageCount: view().pageCount,
          })}
        </span>
        <button
          type="button"
          disabled={view().page <= 1}
          onClick={() => setPage(view().page - 1)}
        >
          {labels().previous}
        </button>
        <button
          type="button"
          disabled={view().page >= view().pageCount}
          onClick={() => setPage(view().page + 1)}
        >
          {labels().next}
        </button>
      </footer>
    </section>
  );
};
