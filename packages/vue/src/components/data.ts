import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "./icon";
import {
  dataTableView,
  copyDataTableCellRange,
  dataTableCellSelectionView,
  renderDataTableRangeCell,
  mountDataTableCellSelection,
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
  type DataSort,
  type DataRow,
  type DataColumn,
  renderChartMarkup,
  mountChartControls,
  observeChartWidth,
  dataTableLabels,
  dataTableSelection,
  dataSelectionState,
  toggleDataSelection,
  setDataSelectionMixed,
  restoreDataSelection,
  type ChartOptions,
} from "@loongark/kit";
import {
  defineComponent,
  Fragment,
  useId,
  ref,
  computed,
  watchEffect,
  watch,
  h,
  onMounted,
  nextTick,
  onBeforeUnmount,
  type PropType,
} from "vue";
export const LoongArkChart = defineComponent({
  props: {
    data: { type: Array as PropType<ChartOptions["data"]>, required: true },
    series: { type: Array as PropType<ChartOptions["series"]>, required: true },
    labelKey: { type: String, required: true },
    type: { type: String as PropType<ChartOptions["type"]>, default: "line" },
    title: String,
    width: Number,
    height: Number,
    labels: Object as PropType<ChartOptions["labels"]>,
    interactive: Boolean,
    zoomable: Boolean,
    tooltip: Boolean,
    range: Object as PropType<ChartOptions["range"]>,
    defaultRange: Object as PropType<ChartOptions["defaultRange"]>,
    seriesKeys: Array as PropType<readonly string[]>,
    defaultSeriesKeys: Array as PropType<readonly string[]>,
    disabled: Boolean,
    domain: {
      type: Object as PropType<readonly [number, number]>,
      validator: (value: readonly [number, number]) =>
        Array.isArray(value) && value.length === 2,
    },
    showDataTable: Boolean,
  },
  emits: {
    rangeChange: (range: NonNullable<ChartOptions["range"]>) =>
      Array.isArray(range),
    "update:range": (range: NonNullable<ChartOptions["range"]>) =>
      Array.isArray(range),
    seriesKeysChange: (keys: string[]) => Array.isArray(keys),
    "update:seriesKeys": (keys: string[]) => Array.isArray(keys),
  },
  setup(props, { emit }) {
    const element = ref<HTMLElement>(),
      measuredWidth = ref(0),
      internal = ref<readonly string[] | undefined>(
        props.defaultSeriesKeys ? [...props.defaultSeriesKeys] : undefined,
      );
    const internalRange = ref<ChartOptions["range"]>(props.defaultRange);
    const options = () => ({
      ...props,
      range: props.range ?? internalRange.value,
      defaultRange: undefined,
      seriesKeys: props.seriesKeys ?? internal.value,
      defaultSeriesKeys: undefined,
      width: props.width ?? (measuredWidth.value || undefined),
    });
    let stop: (() => void) | undefined;
    onMounted(() => {
      if (!element.value) return;
      const widthStop = observeChartWidth(
        element.value,
        (value) => (measuredWidth.value = value),
      );
      const controlsStop = mountChartControls(
        element.value,
        options,
        (keys) => {
          if (props.seriesKeys === undefined) internal.value = keys;
          emit("seriesKeysChange", keys);
          emit("update:seriesKeys", keys);
        },
        (range) => {
          if (props.range === undefined) internalRange.value = range;
          emit("rangeChange", range);
          emit("update:range", range);
        },
      );
      stop = () => {
        widthStop();
        controlsStop();
      };
    });
    onBeforeUnmount(() => stop?.());
    return () =>
      h("div", {
        ref: element,
        "data-scope": "chart",
        innerHTML: renderChartMarkup(options()),
      });
  },
});
export const LoongArkDataTable = defineComponent({
  props: {
    data: { type: Array as PropType<readonly DataRow[]>, required: true },
    columns: { type: Array as PropType<readonly DataColumn[]>, required: true },
    pageSize: { type: Number, default: 10 },
    rowKey: { type: String, default: "id" },
    label: { type: String, default: "Data table" },
    labels: Object as PropType<DataTableProps["labels"]>,
    selectedIds: Array as PropType<readonly string[]>,
    defaultSelectedIds: Array as PropType<readonly string[]>,
    state: Object as PropType<DataTableState>,
    defaultState: Object as PropType<Partial<DataTableState>>,
    mode: String as PropType<"client" | "server">,
    totalRows: Number,
    virtualization: Object as PropType<DataTableProps["virtualization"]>,
    cellSelection: Boolean,
    cellRange: Object as PropType<DataTableProps["cellRange"]>,
    defaultCellRange: Object as PropType<DataTableProps["defaultCellRange"]>,
    groupBy: Array as PropType<readonly string[]>,
    aggregations: Object as PropType<DataTableProps["aggregations"]>,
    tree: Object as PropType<DataTableProps["tree"]>,
    expandedRowIds: Array as PropType<readonly string[]>,
    defaultExpandedRowIds: Array as PropType<readonly string[]>,
    columnKeys: Array as PropType<readonly string[]>,
    columnWidths: Object as PropType<DataTableProps["columnWidths"]>,
    defaultColumnWidths: Object as PropType<
      DataTableProps["defaultColumnWidths"]
    >,
    columnReorderable: Boolean,
    columnResizable: Boolean,
    pinnedColumns: Object as PropType<DataTableProps["pinnedColumns"]>,
    loading: Boolean,
    error: String,
    onRetry: Function as PropType<() => void>,
    onCellCommit: Function as PropType<DataTableProps["onCellCommit"]>,
    onBatchCommit: Function as PropType<DataTableProps["onBatchCommit"]>,
    historyLimit: Number,
  },
  emits: {
    cellRangeChange: (range: Exclude<DataTableProps["cellRange"], undefined>) =>
      range === null || !!range?.anchor,
    "update:cellRange": (
      range: Exclude<DataTableProps["cellRange"], undefined>,
    ) => range === null || !!range?.anchor,
    expandedRowIdsChange: (ids: string[]) => Array.isArray(ids),
    "update:expandedRowIds": (ids: string[]) => Array.isArray(ids),
    columnKeysChange: (keys: string[]) => Array.isArray(keys),
    "update:columnKeys": (keys: string[]) => Array.isArray(keys),
    columnWidthsChange: (widths: Record<string, number>) => !!widths,
    "update:columnWidths": (widths: Record<string, number>) => !!widths,
    stateChange: (state: DataTableState) => !!state,
    "update:state": (state: DataTableState) => !!state,
    selectionChange: (ids: string[]) => Array.isArray(ids),
    "update:selectedIds": (ids: string[]) => Array.isArray(ids),
  },
  setup(props, { emit }) {
    const region = ref<HTMLDivElement>();
    const internalCellRange = ref<DataTableProps["cellRange"]>(
      copyDataTableCellRange(props.defaultCellRange) ?? null,
    );
    const internalExpanded = ref<readonly string[] | undefined>(
      props.defaultExpandedRowIds === undefined
        ? undefined
        : [...props.defaultExpandedRowIds],
    );
    const internalColumnKeys = ref<readonly string[]>(),
      internalColumnWidths = ref<DataTableProps["columnWidths"]>(
        props.defaultColumnWidths === undefined
          ? undefined
          : { ...props.defaultColumnWidths },
      );
    const columnProps = () => ({
      ...props,
      cellRange:
        props.cellRange === undefined
          ? internalCellRange.value
          : props.cellRange,
      defaultCellRange: undefined,
      expandedRowIds: props.expandedRowIds ?? internalExpanded.value,
      defaultExpandedRowIds: undefined,
      columnKeys: props.columnKeys ?? internalColumnKeys.value,
      columnWidths: props.columnWidths ?? internalColumnWidths.value,
    });
    watchEffect(() => {
      if (props.columnKeys === undefined)
        internalColumnKeys.value = reconcileDataColumnOrder(
          internalColumnKeys.value,
          props.columns,
        );
      if (props.columnWidths === undefined)
        internalColumnWidths.value = reconcileDataColumnWidths(
          internalColumnWidths.value,
          props.columns,
        );
    });
    const columnsMounted = ref(false);
    onMounted(() => {
      columnsMounted.value = true;
    });
    watchEffect((cleanup) => {
      const enabled = props.columnReorderable || props.columnResizable;
      if (!columnsMounted.value || !region.value || !enabled) return;
      cleanup(
        mountDataColumnControls(
          region.value,
          columnProps,
          (keys) => {
            if (props.columnKeys === undefined)
              internalColumnKeys.value = [...keys];
            emit("columnKeysChange", [...keys]);
            emit("update:columnKeys", [...keys]);
          },
          (widths) => {
            if (props.columnWidths === undefined)
              internalColumnWidths.value = { ...widths };
            emit("columnWidthsChange", { ...widths });
            emit("update:columnWidths", { ...widths });
          },
        ),
      );
    });

    const batchHost = ref<HTMLDivElement>();
    const batchEditor = createDataTableBatchEditor(
      (value) => {
        batch.value = value;
      },
      () => editor.cancel(),
    );
    const batch = ref(batchEditor.state);
    let stopBatch: (() => void) | undefined;
    onMounted(() => {
      if (batchHost.value)
        stopBatch = mountDataTableBatch(
          batchHost.value,
          batchEditor,
          columnProps,
          selected,
        );
    });
    onBeforeUnmount(() => stopBatch?.());
    const editId = useId(),
      edit = ref<DataTableEditState>();
    const editor = createDataTableEditor((value) => {
      edit.value = value;
    });
    let stopEditor: (() => void) | undefined;
    onMounted(() => {
      if (region.value)
        stopEditor = mountDataTableEditor(
          region.value,
          editor,
          () => props,
          () => view.value,
          () => batchEditor.state.active || batchEditor.state.pending,
        );
    });
    onBeforeUnmount(() => stopEditor?.());
    let stopPins: (() => void) | undefined;
    onMounted(() => {
      if (region.value) stopPins = mountDataTablePins(region.value);
    });
    onBeforeUnmount(() => stopPins?.());
    const query = ref(props.defaultState?.query ?? ""),
      sort = ref<DataSort | undefined>(props.defaultState?.sort),
      sorts = ref<DataTableState["sorts"]>(props.defaultState?.sorts),
      filters = ref<DataTableState["filters"]>(props.defaultState?.filters),
      page = ref(props.defaultState?.page ?? 1),
      internal = ref<string[]>([...(props.defaultSelectedIds ?? [])]),
      pageInput = ref<HTMLInputElement>();
    const current = () =>
      props.state ?? {
        query: query.value,
        sort: sort.value,
        sorts: sorts.value,
        filters: filters.value,
        page: page.value,
      };
    const changeState = (patch: Partial<DataTableState>) => {
      if (props.loading) return;
      const next = { ...current(), sort: view.value.sort, ...patch };
      if (props.state === undefined) {
        query.value = next.query;
        sort.value = next.sort;
        sorts.value = next.sorts;
        filters.value = next.filters;
        page.value = next.page;
      }
      emit("stateChange", next);
      emit("update:state", next);
    };
    const view = computed(() => dataTableView(columnProps(), current()));
    watch(
      [() => props.cellSelection, () => columnsMounted.value],
      ([enabled, mounted], _previous, cleanup) => {
        if (!enabled || !mounted || !region.value) return;
        cleanup(
          mountDataTableCellSelection(
            region.value,
            () => ({
              props: { ...columnProps(), state: current() },
              view: view.value,
            }),
            (range) => {
              if (props.cellRange === undefined)
                internalCellRange.value = copyDataTableCellRange(range) ?? null;
              emit("cellRangeChange", copyDataTableCellRange(range) ?? null);
              emit("update:cellRange", copyDataTableCellRange(range) ?? null);
            },
            editor,
            batchEditor,
            virtualizer,
          ),
        );
      },
    );
    let stopStructure: (() => void) | undefined;
    onMounted(() => {
      if (region.value)
        stopStructure = mountDataTableStructure(
          region.value,
          () => ({ props: columnProps(), view: view.value }),
          (ids) => {
            if (props.expandedRowIds === undefined)
              internalExpanded.value = [...ids];
            emit("expandedRowIdsChange", [...ids]);
            emit("update:expandedRowIds", [...ids]);
          },
        );
    });
    onBeforeUnmount(() => stopStructure?.());
    // 共享模型不持有框架响应状态；草稿激活后重新订阅 loading 与校验器。
    watchEffect(() => {
      void edit.value;
      void props.loading;
      editor.sync(props, view.value);
    });
    const virtualizer = createVirtualWindow(
      dataTableVirtualOptions(props, view.value),
      (value) => {
        virtualState.value = value;
      },
    );
    const virtualState = ref(virtualizer.state);
    watchEffect(() =>
      virtualizer.setOptions(dataTableVirtualOptions(props, view.value)),
    );
    let stopVirtual: (() => void) | undefined;
    const virtualMounted = ref(false);
    onMounted(() => {
      virtualMounted.value = true;
    });
    watchEffect(() => {
      if (!virtualMounted.value || !region.value) return;
      const viewport = region.value;
      if (props.virtualization && !stopVirtual)
        stopVirtual = mountVirtualWindow(
          viewport,
          virtualizer,
          () => viewport.querySelector("tbody"),
          () => dataTableVirtualInset(viewport),
        );
      else if (!props.virtualization && stopVirtual) {
        stopVirtual();
        stopVirtual = undefined;
      }
    });
    onBeforeUnmount(() => stopVirtual?.());
    const spacer = (size: number, key: string) =>
      h(
        "tr",
        {
          key,
          "data-part": "virtual-spacer",
          "aria-hidden": "true",
          style: { height: `${size}px` },
        },
        [h("td", { colspan: view.value.columns.length + 1 })],
      );
    const selected = () =>
      dataTableSelection(
        props.selectedIds ?? internal.value,
        view.value.allIds,
        props.mode,
      );
    watchEffect(() => {
      void batch.value;
      void props.loading;
      batchEditor.sync(columnProps(), selected());
    });
    const pageIds = () =>
        view.value.rows
          .filter((entry) => entry.structure?.kind !== "group")
          .map(({ id }) => id),
      pageSelection = () => dataSelectionState(selected(), pageIds());
    watchEffect(() =>
      setDataSelectionMixed(pageInput.value, pageSelection().mixed),
    );
    const mounted = ref(false);
    onMounted(() => {
      mounted.value = true;
    });
    watchEffect(() => {
      if (!mounted.value) return;
      if (props.state === undefined) {
        if (page.value !== view.value.page) page.value = view.value.page;
        const previous = current(),
          reconciled = reconcileDataTableQuery(previous, view.value);
        if (reconciled !== previous) {
          sort.value = reconciled.sort;
          sorts.value = reconciled.sorts;
          filters.value = reconciled.filters;
        }
      }
      if (
        props.selectedIds === undefined &&
        selected().length !== internal.value.length
      ) {
        const next = selected();
        internal.value = next;
        emit("selectionChange", next);
        emit("update:selectedIds", next);
      }
    });
    const change = (ids: string[], input: HTMLInputElement, rowId?: string) => {
      if (props.loading) return;
      if (props.selectedIds === undefined) internal.value = ids;
      emit("selectionChange", ids);
      emit("update:selectedIds", ids);
      if (props.selectedIds !== undefined)
        restoreDataSelection(input, selected(), pageIds(), rowId);
    };
    return () => {
      const cellSelection = dataTableCellSelectionView(
        columnProps(),
        view.value,
      );
      const labels = dataTableLabels(props.labels),
        model = view.value,
        ids = selected(),
        state = pageSelection();
      const columnHeading = (c: DataColumn) =>
        c.sortable === false
          ? h("span", { "data-part": "column-label", title: c.label }, c.label)
          : h(
              "button",
              {
                "data-part": "column-sort",
                type: "button",
                disabled: props.loading,
                "aria-label": c.label,
                "aria-description": labels.sortDescription(
                  model.sorts.find((sort) => sort.key === c.key)?.direction,
                  model.sorts.findIndex((sort) => sort.key === c.key) + 1,
                ),
                onKeydown: (event: KeyboardEvent) => {
                  if (
                    event.shiftKey &&
                    (event.key === "Enter" || event.key === " ")
                  ) {
                    event.preventDefault();
                    if (!event.repeat)
                      changeState(nextDataTableSort(model.sorts, c.key, true));
                  }
                },
                onClick: (event: MouseEvent) =>
                  changeState(
                    nextDataTableSort(model.sorts, c.key, event.shiftKey),
                  ),
              },
              [
                h(
                  "span",
                  { "data-part": "column-label", title: c.label },
                  c.label,
                ),
                model.sorts.length > 1 &&
                model.sorts.some((sort) => sort.key === c.key)
                  ? h(
                      "span",
                      {
                        "data-part": "sort-priority",
                        "aria-hidden": "true",
                      },
                      model.sorts.findIndex((sort) => sort.key === c.key) + 1,
                    )
                  : null,
                model.sorts.some((sort) => sort.key === c.key)
                  ? h(LoongArkIcon, {
                      icon:
                        model.sorts.find((sort) => sort.key === c.key)
                          ?.direction === "asc"
                          ? controlIcons.arrowUp
                          : controlIcons.arrowDown,
                      size: "sm",
                    })
                  : null,
              ],
            );
      return h(
        "section",
        {
          "data-scope": "data-table",
          "data-part": "root",
          "aria-busy": props.loading || undefined,
        },
        [
          h("input", {
            "aria-label": labels.filter,
            placeholder: labels.filterPlaceholder,
            value: current().query,
            disabled: props.loading,
            onInput: (e: Event) => {
              if (e.currentTarget instanceof HTMLInputElement) {
                const input = e.currentTarget;
                changeState({ query: input.value, page: 1 });
                if (props.state !== undefined)
                  nextTick(() => {
                    if (input.isConnected) input.value = current().query;
                  });
              }
            },
          }),
          model.columns.some((column) => column.filter)
            ? h(
                "div",
                { "data-part": "column-filters" },
                model.columns
                  .filter((column) => column.filter)
                  .map((column, index) => {
                    const control = dataFilterControl(
                        column,
                        current().filters,
                      ),
                      error = dataFilterError(
                        model.filterErrors.get(column.key),
                        labels,
                      ),
                      errorId = `${editId}-filter-${index}`;
                    const common = {
                      "aria-label": labels.filterColumn(column.label),
                      disabled: props.loading,
                      "aria-invalid": !!error || undefined,
                      "aria-describedby": error ? errorId : undefined,
                    };
                    return h(
                      "div",
                      { key: column.key, "data-part": "column-filter" },
                      [
                        h("label", [
                          column.label,
                          h(
                            "select",
                            {
                              "aria-label": labels.filterOperator(column.label),
                              disabled: props.loading,
                              value: control.operator,
                              onChange: (event: Event) => {
                                if (
                                  !(
                                    event.currentTarget instanceof
                                    HTMLSelectElement
                                  )
                                )
                                  return;
                                const target = event.currentTarget;
                                changeState(
                                  changeDataFilter(current(), column, {
                                    operator:
                                      dataFilterOperators(column).find(
                                        (operator) => operator === target.value,
                                      ) ?? control.operator,
                                  }),
                                );
                                if (props.state !== undefined)
                                  nextTick(() => {
                                    if (target.isConnected)
                                      target.value = dataFilterControl(
                                        column,
                                        current().filters,
                                      ).operator;
                                  });
                              },
                            },
                            dataFilterOperators(column).map((operator) =>
                              h(
                                "option",
                                {
                                  value: operator,
                                  selected: control.operator === operator,
                                },
                                labels.filterOperators[operator],
                              ),
                            ),
                          ),
                        ]),
                        ["empty", "not-empty"].includes(control.operator)
                          ? null
                          : column.filter?.type === "select"
                            ? h(
                                "select",
                                {
                                  ...common,
                                  value: dataFilterSelectValue(
                                    column,
                                    current().filters,
                                  ),
                                  onChange: (event: Event) => {
                                    if (
                                      !(
                                        event.currentTarget instanceof
                                        HTMLSelectElement
                                      )
                                    )
                                      return;
                                    const target = event.currentTarget,
                                      index = Number(target.value);
                                    changeState(
                                      changeDataFilter(current(), column, {
                                        value:
                                          index < 0
                                            ? undefined
                                            : column.filter?.options?.[index]
                                                ?.value,
                                      }),
                                    );
                                    if (props.state !== undefined)
                                      nextTick(() => {
                                        if (target.isConnected)
                                          target.value = dataFilterSelectValue(
                                            column,
                                            current().filters,
                                          );
                                      });
                                  },
                                },
                                [
                                  h(
                                    "option",
                                    {
                                      value: "-1",
                                      selected:
                                        dataFilterSelectValue(
                                          column,
                                          current().filters,
                                        ) === "-1",
                                    },
                                    labels.allOptions,
                                  ),
                                  ...(column.filter.options?.map(
                                    (option, index) =>
                                      h(
                                        "option",
                                        {
                                          value: String(index),
                                          selected:
                                            dataFilterSelectValue(
                                              column,
                                              current().filters,
                                            ) === String(index),
                                          disabled: option.disabled,
                                        },
                                        option.label,
                                      ),
                                  ) ?? []),
                                ],
                              )
                            : h("input", {
                                ...common,
                                type: "text",
                                inputmode:
                                  column.filter?.type === "number"
                                    ? "decimal"
                                    : undefined,
                                value: String(control.value),
                                onInput: (event: Event) => {
                                  if (
                                    !(
                                      event.currentTarget instanceof
                                      HTMLInputElement
                                    )
                                  )
                                    return;
                                  const target = event.currentTarget;
                                  changeState(
                                    changeDataFilter(current(), column, {
                                      value: target.value,
                                    }),
                                  );
                                  if (props.state !== undefined)
                                    nextTick(() => {
                                      if (target.isConnected)
                                        target.value = String(
                                          dataFilterControl(
                                            column,
                                            current().filters,
                                          ).value,
                                        );
                                    });
                                },
                              }),
                        error
                          ? h("p", { id: errorId, role: "alert" }, error)
                          : null,
                      ],
                    );
                  }),
              )
            : null,
          props.loading
            ? h("p", { role: "status", "data-part": "loading" }, labels.loading)
            : null,
          props.error
            ? h("div", { role: "alert", "data-part": "error" }, [
                h("span", props.error),
                props.onRetry
                  ? h(
                      "button",
                      {
                        type: "button",
                        disabled: props.loading,
                        onClick: (e: Event) => {
                          if (e.currentTarget instanceof HTMLElement)
                            retryDataTable(e.currentTarget, props.onRetry);
                        },
                      },
                      labels.retry,
                    )
                  : null,
              ])
            : null,
          h("div", {
            ref: batchHost,
            "data-part": "batch-editor",
            hidden: !props.onBatchCommit,
            innerHTML: renderDataTableBatchMarkup(
              columnProps(),
              ids,
              batch.value,
              editId,
            ),
          }),
          props.columnReorderable || props.columnResizable
            ? h("p", {
                "data-part": "column-status",
                role: "status",
                "aria-live": "polite",
              })
            : null,
          h(
            "div",
            {
              "data-scope": "table",
              "data-part": "root",
              ref: region,
              "data-virtualized": props.virtualization ? "true" : undefined,
              style: dataTableVirtualStyle(columnProps(), view.value),
              role: "region",
              "aria-label": props.label,
              tabindex: 0,
            },
            [
              h(
                "table",
                {
                  "data-scope": "table",
                  "data-part": "table",
                  "data-column-layout":
                    props.columnResizable ||
                    columnProps().columnWidths !== undefined
                      ? "true"
                      : undefined,
                  style: dataColumnTableStyle(columnProps()),
                  "aria-label": props.label,
                  role: props.cellSelection ? "grid" : undefined,
                  "aria-multiselectable": props.cellSelection
                    ? true
                    : undefined,
                  "aria-colcount": props.cellSelection
                    ? model.columns.length + 1
                    : undefined,
                  "aria-description": props.cellSelection
                    ? labels.rangeHint
                    : undefined,
                  "aria-disabled":
                    props.cellSelection && props.loading ? true : undefined,
                  "aria-rowcount":
                    props.virtualization && model.total > 0
                      ? (props.tree || props.groupBy?.length
                          ? model.rows.length
                          : model.total) + 1
                      : undefined,
                },
                [
                  props.columnResizable ||
                  columnProps().columnWidths !== undefined
                    ? h("colgroup", [
                        h("col", {
                          style: {
                            width:
                              "calc(var(--lk-control-height-sm) + var(--lk-space-component-sm) * 2)",
                          },
                        }),
                        ...model.columns.map((column) =>
                          h("col", {
                            key: column.key,
                            "data-column-key": column.key,
                            style: {
                              width: `${dataColumnWidth(column, columnProps().columnWidths)}px`,
                            },
                          }),
                        ),
                      ])
                    : null,
                  h("thead", [
                    h("tr", [
                      h(
                        "th",
                        {
                          scope: "col",
                          "data-pinned": model.pinSelection
                            ? "start"
                            : undefined,
                        },
                        [
                          h("label", { "data-part": "selection" }, [
                            h("input", {
                              ref: pageInput,
                              type: "checkbox",
                              "aria-label": labels.selectPage,
                              "aria-checked": state.mixed
                                ? "mixed"
                                : state.checked,
                              checked: state.checked,
                              disabled: props.loading || !pageIds().length,
                              onChange: (e: Event) => {
                                if (e.currentTarget instanceof HTMLInputElement)
                                  change(
                                    toggleDataSelection(
                                      ids,
                                      pageIds(),
                                      e.currentTarget.checked,
                                    ),
                                    e.currentTarget,
                                  );
                              },
                            }),
                          ]),
                        ],
                      ),
                      ...model.columns.map((c) =>
                        h(
                          "th",
                          {
                            key: c.key,
                            "data-column-key": c.key,
                            scope: "col",
                            "data-pinned": model.pins.get(c.key),
                            "data-align": c.align,
                            "aria-sort":
                              model.sort?.key === c.key
                                ? model.sort.direction === "asc"
                                  ? "ascending"
                                  : "descending"
                                : undefined,
                          },
                          props.columnReorderable || props.columnResizable
                            ? h("div", { "data-part": "column-header" }, [
                                columnHeading(c),
                                h("span", {
                                  "data-part": "column-controls",
                                  innerHTML: renderDataColumnControls(
                                    columnProps(),
                                    c,
                                  ),
                                }),
                              ])
                            : columnHeading(c),
                        ),
                      ),
                    ]),
                  ]),
                  h("tbody", [
                    model.rows.length
                      ? dataTableVirtualRows(
                          model,
                          props.virtualization ? virtualState.value : undefined,
                        ).map(({ row, id, virtualIndex, gap, structure }) =>
                          h(Fragment, { key: id }, [
                            gap > 0 ? spacer(gap, `before-${id}`) : null,
                            h(
                              "tr",
                              {
                                key: id,
                                "data-virtual-key": props.virtualization
                                  ? id
                                  : undefined,
                                "aria-rowindex": props.virtualization
                                  ? (props.tree || props.groupBy?.length
                                      ? 0
                                      : (model.page - 1) * model.pageSize) +
                                    virtualIndex +
                                    2
                                  : undefined,
                                "data-row-id": id,
                                "data-row-kind": structure?.kind,
                                "data-selected":
                                  (structure?.kind !== "group" &&
                                    ids.includes(id)) ||
                                  undefined,
                              },
                              [
                                h(
                                  "td",
                                  {
                                    "data-pinned": model.pinSelection
                                      ? "start"
                                      : undefined,
                                  },
                                  [
                                    structure && !model.columns.length
                                      ? h(
                                          "div",
                                          {
                                            "data-part": "cell-layout",
                                            "data-structured": "true",
                                            style: {
                                              "--lk-row-depth": Math.min(
                                                structure.depth,
                                                8,
                                              ),
                                            },
                                          },
                                          [
                                            h("span", {
                                              innerHTML:
                                                renderDataTableRowPrefix(
                                                  {
                                                    row,
                                                    id,
                                                    index: virtualIndex,
                                                    structure,
                                                  },
                                                  columnProps(),
                                                  model,
                                                  labels,
                                                ),
                                            }),
                                            structure.kind === "group"
                                              ? h(
                                                  "div",
                                                  { "data-part": "cell-value" },
                                                  dataTableGroupText(
                                                    {
                                                      row,
                                                      id,
                                                      index: virtualIndex,
                                                      structure,
                                                    },
                                                    { key: "", label: "" },
                                                    true,
                                                    labels,
                                                    columnProps(),
                                                  ),
                                                )
                                              : null,
                                          ],
                                        )
                                      : null,
                                    structure?.kind === "group"
                                      ? null
                                      : h(
                                          "label",
                                          { "data-part": "selection" },
                                          [
                                            h("input", {
                                              type: "checkbox",
                                              disabled: props.loading,
                                              "aria-label":
                                                labels.selectRow(id),
                                              checked: ids.includes(id),
                                              onChange: (e: Event) => {
                                                if (
                                                  e.currentTarget instanceof
                                                  HTMLInputElement
                                                )
                                                  change(
                                                    toggleDataSelection(
                                                      ids,
                                                      [id],
                                                      e.currentTarget.checked,
                                                    ),
                                                    e.currentTarget,
                                                    id,
                                                  );
                                              },
                                            }),
                                          ],
                                        ),
                                  ],
                                ),
                                ...model.columns.map((c, columnIndex) =>
                                  h(
                                    "td",
                                    {
                                      key: c.key,
                                      ...cellSelection?.attributes(id, c.key),
                                      "data-pinned": model.pins.get(c.key),
                                      "data-align": c.align,
                                    },
                                    h(
                                      "div",
                                      {
                                        "data-part": "cell-layout",
                                        "data-structured":
                                          (!!structure && columnIndex === 0) ||
                                          undefined,
                                        style: {
                                          "--lk-row-depth": Math.min(
                                            structure?.depth ?? 0,
                                            8,
                                          ),
                                        },
                                      },
                                      [
                                        structure && columnIndex === 0
                                          ? h("span", {
                                              innerHTML:
                                                renderDataTableRowPrefix(
                                                  {
                                                    row,
                                                    id,
                                                    index: virtualIndex,
                                                    structure,
                                                  },
                                                  columnProps(),
                                                  model,
                                                  labels,
                                                ),
                                            })
                                          : null,
                                        h(
                                          "div",
                                          { "data-part": "cell-value" },
                                          structure?.kind === "group"
                                            ? dataTableGroupText(
                                                {
                                                  row,
                                                  id,
                                                  index: virtualIndex,
                                                  structure,
                                                },
                                                c,
                                                columnIndex === 0,
                                                labels,
                                                columnProps(),
                                              )
                                            : edit.value?.rowId === id &&
                                                edit.value?.columnKey === c.key
                                              ? h(
                                                  "div",
                                                  {
                                                    "data-part": "cell-editor",
                                                    "aria-busy":
                                                      edit.value.pending ||
                                                      undefined,
                                                  },
                                                  [
                                                    h(
                                                      c.editor?.type ===
                                                        "select"
                                                        ? "select"
                                                        : c.editor?.type ===
                                                            "textarea"
                                                          ? "textarea"
                                                          : "input",
                                                      {
                                                        "data-part":
                                                          "cell-input",
                                                        dir:
                                                          c.editor?.type ===
                                                          "number"
                                                            ? "ltr"
                                                            : undefined,
                                                        type:
                                                          c.editor?.type ===
                                                          "number"
                                                            ? "number"
                                                            : "text",
                                                        rows:
                                                          c.editor?.rows ?? 3,
                                                        step: "any",
                                                        value: edit.value.draft,
                                                        "aria-label":
                                                          labels.editCell(
                                                            c.label,
                                                            id,
                                                          ),
                                                        "aria-invalid":
                                                          !!edit.value.error ||
                                                          undefined,
                                                        "aria-describedby": edit
                                                          .value.error
                                                          ? editId
                                                          : undefined,
                                                        disabled:
                                                          edit.value.pending,
                                                      },
                                                      c.editor?.type ===
                                                        "select"
                                                        ? [
                                                            ...((
                                                              c.editor
                                                                .options ?? []
                                                            ).some(
                                                              (option) =>
                                                                option.value ===
                                                                edit.value
                                                                  ?.draft,
                                                            )
                                                              ? []
                                                              : [
                                                                  h(
                                                                    "option",
                                                                    {
                                                                      value:
                                                                        edit
                                                                          .value
                                                                          .draft,
                                                                      disabled: true,
                                                                    },
                                                                    edit.value
                                                                      .draft ||
                                                                      labels.emptyCell,
                                                                  ),
                                                                ]),
                                                            ...(
                                                              c.editor
                                                                .options ?? []
                                                            ).map((option) =>
                                                              h(
                                                                "option",
                                                                {
                                                                  value:
                                                                    option.value,
                                                                  disabled:
                                                                    option.disabled,
                                                                },
                                                                option.label,
                                                              ),
                                                            ),
                                                          ]
                                                        : undefined,
                                                    ),
                                                    h(
                                                      "div",
                                                      {
                                                        "data-part":
                                                          "cell-actions",
                                                      },
                                                      [
                                                        h(
                                                          "button",
                                                          {
                                                            "data-part":
                                                              "cell-save",
                                                            type: "button",
                                                            disabled:
                                                              edit.value
                                                                .pending,
                                                          },
                                                          labels.save,
                                                        ),
                                                        h(
                                                          "button",
                                                          {
                                                            "data-part":
                                                              "cell-cancel",
                                                            type: "button",
                                                          },
                                                          labels.cancel,
                                                        ),
                                                      ],
                                                    ),
                                                    edit.value.pending
                                                      ? h(
                                                          "span",
                                                          {
                                                            "data-part":
                                                              "cell-status",
                                                            role: "status",
                                                          },
                                                          labels.saving,
                                                        )
                                                      : null,
                                                    edit.value.error
                                                      ? h(
                                                          "span",
                                                          {
                                                            id: editId,
                                                            "data-part":
                                                              "cell-error",
                                                            role: "alert",
                                                          },
                                                          edit.value.error,
                                                        )
                                                      : null,
                                                  ],
                                                )
                                              : !batch.value.active &&
                                                  !batch.value.pending &&
                                                  editor.canEdit(props, c)
                                                ? props.cellSelection
                                                  ? h("span", {
                                                      innerHTML:
                                                        renderDataTableRangeCell(
                                                          columnProps(),
                                                          row,
                                                          c,
                                                          id,
                                                          !!edit.value?.pending,
                                                        ),
                                                    })
                                                  : h(
                                                      "button",
                                                      {
                                                        "data-part":
                                                          "cell-trigger",
                                                        "data-row-id": id,
                                                        "data-column-key":
                                                          c.key,
                                                        type: "button",
                                                        "aria-label": `${labels.editCell(c.label, id)}: ${dataTableCellText(row, c) || labels.emptyCell}`,
                                                        disabled:
                                                          !!edit.value?.pending,
                                                      },
                                                      [
                                                        dataTableCellText(
                                                          row,
                                                          c,
                                                        ) || labels.emptyCell,
                                                        h(LoongArkIcon, {
                                                          icon: controlIcons.pencil,
                                                          size: "sm",
                                                        }),
                                                      ],
                                                    )
                                                : dataTableCellText(row, c),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ]),
                        )
                      : [
                          h("tr", [
                            h(
                              "td",
                              {
                                colspan: model.columns.length + 1,
                                "data-part": "empty",
                              },
                              h(
                                "span",
                                props.loading ? labels.loading : labels.empty,
                              ),
                            ),
                          ]),
                        ],
                    props.virtualization && virtualState.value.after > 0
                      ? spacer(virtualState.value.after, "after")
                      : null,
                  ]),
                ],
              ),
            ],
          ),
          props.cellSelection
            ? h(
                "div",
                { "data-part": "range-controls", hidden: !batch.value.pending },
                [
                  h("p", {
                    "data-part": "range-status",
                    role: "status",
                    "aria-live": "polite",
                  }),
                  h(
                    "button",
                    {
                      type: "button",
                      "data-part": "range-cancel",
                      hidden: !batch.value.pending,
                    },
                    labels.cancel,
                  ),
                ],
              )
            : null,
          h("footer", [
            h(
              "span",
              { "aria-live": "polite" },
              h(
                "bdi",
                labels.summary({
                  total: model.total,
                  selected: ids.length,
                  page: model.page,
                  pageCount: model.pageCount,
                }),
              ),
            ),
            h(
              "button",
              {
                type: "button",
                disabled: props.loading || model.page <= 1,
                onClick: () => changeState({ page: model.page - 1 }),
              },
              labels.previous,
            ),
            h(
              "button",
              {
                type: "button",
                disabled: props.loading || model.page >= model.pageCount,
                onClick: () => changeState({ page: model.page + 1 }),
              },
              labels.next,
            ),
          ]),
        ],
      );
    };
  },
});
