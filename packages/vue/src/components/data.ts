import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "./icon";
import {
  dataTableView,
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
  nextDataSort,
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
  type DataTableLabels,
  type ChartOptions,
} from "@loongark/kit";
import {
  defineComponent,
  useId,
  ref,
  computed,
  watchEffect,
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
    seriesKeysChange: (keys: string[]) => Array.isArray(keys),
    "update:seriesKeys": (keys: string[]) => Array.isArray(keys),
  },
  setup(props, { emit }) {
    const element = ref<HTMLElement>(),
      measuredWidth = ref(0),
      internal = ref<readonly string[] | undefined>(
        props.defaultSeriesKeys ? [...props.defaultSeriesKeys] : undefined,
      );
    const options = () => ({
      ...props,
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
    labels: Object as PropType<Partial<DataTableLabels>>,
    selectedIds: Array as PropType<readonly string[]>,
    defaultSelectedIds: Array as PropType<readonly string[]>,
    state: Object as PropType<DataTableState>,
    defaultState: Object as PropType<Partial<DataTableState>>,
    mode: String as PropType<"client" | "server">,
    totalRows: Number,
    columnKeys: Array as PropType<readonly string[]>,
    pinnedColumns: Object as PropType<DataTableProps["pinnedColumns"]>,
    loading: Boolean,
    error: String,
    onRetry: Function as PropType<() => void>,
    onCellCommit: Function as PropType<DataTableProps["onCellCommit"]>,
    onBatchCommit: Function as PropType<DataTableProps["onBatchCommit"]>,
  },
  emits: {
    stateChange: (state: DataTableState) => !!state,
    "update:state": (state: DataTableState) => !!state,
    selectionChange: (ids: string[]) => Array.isArray(ids),
    "update:selectedIds": (ids: string[]) => Array.isArray(ids),
  },
  setup(props, { emit }) {
    const region = ref<HTMLDivElement>();
    const batchHost = ref<HTMLDivElement>();
    const batchEditor = createDataTableBatchEditor((value) => {
      batch.value = value;
    });
    const batch = ref(batchEditor.state);
    let stopBatch: (() => void) | undefined;
    onMounted(() => {
      if (batchHost.value)
        stopBatch = mountDataTableBatch(
          batchHost.value,
          batchEditor,
          () => props,
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
      page = ref(props.defaultState?.page ?? 1),
      internal = ref<string[]>([...(props.defaultSelectedIds ?? [])]),
      pageInput = ref<HTMLInputElement>();
    const current = () =>
      props.state ?? { query: query.value, sort: sort.value, page: page.value };
    const changeState = (patch: Partial<DataTableState>) => {
      if (props.loading) return;
      const next = { ...current(), sort: view.value.sort, ...patch };
      if (props.state === undefined) {
        query.value = next.query;
        sort.value = next.sort;
        page.value = next.page;
      }
      emit("stateChange", next);
      emit("update:state", next);
    };
    const view = computed(() => dataTableView(props, current()));
    // 共享模型不持有框架响应状态；草稿激活后重新订阅 loading 与校验器。
    watchEffect(() => {
      void edit.value;
      void props.loading;
      editor.sync(props, view.value);
    });
    const selected = () =>
      dataTableSelection(
        props.selectedIds ?? internal.value,
        view.value.allIds,
        props.mode,
      );
    watchEffect(() => {
      void batch.value;
      void props.loading;
      batchEditor.sync(props, selected());
    });
    const pageIds = () => view.value.rows.map(({ id }) => id),
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
        if (sort.value && !view.value.sort) sort.value = undefined;
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
      const labels = dataTableLabels(props.labels),
        model = view.value,
        ids = selected(),
        state = pageSelection();
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
              props,
              ids,
              batch.value,
              editId,
            ),
          }),
          h(
            "div",
            {
              "data-scope": "table",
              "data-part": "root",
              ref: region,
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
                  "aria-label": props.label,
                },
                [
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
                          c.sortable === false
                            ? c.label
                            : h(
                                "button",
                                {
                                  type: "button",
                                  disabled: props.loading,
                                  "aria-label": c.label,
                                  onClick: () =>
                                    changeState({
                                      sort: nextDataSort(model.sort, c.key),
                                      page: 1,
                                    }),
                                },
                                [
                                  c.label,
                                  model.sort?.key === c.key
                                    ? h(LoongArkIcon, {
                                        icon:
                                          model.sort.direction === "asc"
                                            ? controlIcons.arrowUp
                                            : controlIcons.arrowDown,
                                        size: "sm",
                                      })
                                    : null,
                                ],
                              ),
                        ),
                      ),
                    ]),
                  ]),
                  h(
                    "tbody",
                    model.rows.length
                      ? model.rows.map(({ row, id }) =>
                          h(
                            "tr",
                            {
                              key: id,
                              "data-selected": ids.includes(id) || undefined,
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
                                  h("label", { "data-part": "selection" }, [
                                    h("input", {
                                      type: "checkbox",
                                      disabled: props.loading,
                                      "aria-label": labels.selectRow(id),
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
                                  ]),
                                ],
                              ),
                              ...model.columns.map((c) =>
                                h(
                                  "td",
                                  {
                                    key: c.key,
                                    "data-pinned": model.pins.get(c.key),
                                    "data-align": c.align,
                                  },
                                  edit.value?.rowId === id &&
                                    edit.value?.columnKey === c.key
                                    ? h(
                                        "div",
                                        {
                                          "data-part": "cell-editor",
                                          "aria-busy":
                                            edit.value.pending || undefined,
                                        },
                                        [
                                          h(
                                            c.editor?.type === "select"
                                              ? "select"
                                              : c.editor?.type === "textarea"
                                                ? "textarea"
                                                : "input",
                                            {
                                              "data-part": "cell-input",
                                              dir:
                                                c.editor?.type === "number"
                                                  ? "ltr"
                                                  : undefined,
                                              type:
                                                c.editor?.type === "number"
                                                  ? "number"
                                                  : "text",
                                              rows: c.editor?.rows ?? 3,
                                              step: "any",
                                              value: edit.value.draft,
                                              "aria-label": labels.editCell(
                                                c.label,
                                                id,
                                              ),
                                              "aria-invalid":
                                                !!edit.value.error || undefined,
                                              "aria-describedby": edit.value
                                                .error
                                                ? editId
                                                : undefined,
                                              disabled: edit.value.pending,
                                            },
                                            c.editor?.type === "select"
                                              ? [
                                                  ...((
                                                    c.editor.options ?? []
                                                  ).some(
                                                    (option) =>
                                                      option.value ===
                                                      edit.value?.draft,
                                                  )
                                                    ? []
                                                    : [
                                                        h(
                                                          "option",
                                                          {
                                                            value:
                                                              edit.value.draft,
                                                            disabled: true,
                                                          },
                                                          edit.value.draft ||
                                                            labels.emptyCell,
                                                        ),
                                                      ]),
                                                  ...(
                                                    c.editor.options ?? []
                                                  ).map((option) =>
                                                    h(
                                                      "option",
                                                      {
                                                        value: option.value,
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
                                            { "data-part": "cell-actions" },
                                            [
                                              h(
                                                "button",
                                                {
                                                  "data-part": "cell-save",
                                                  type: "button",
                                                  disabled: edit.value.pending,
                                                },
                                                labels.save,
                                              ),
                                              h(
                                                "button",
                                                {
                                                  "data-part": "cell-cancel",
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
                                                  "data-part": "cell-status",
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
                                                  "data-part": "cell-error",
                                                  role: "alert",
                                                },
                                                edit.value.error,
                                              )
                                            : null,
                                        ],
                                      )
                                    : editor.canEdit(props, c)
                                      ? h(
                                          "button",
                                          {
                                            "data-part": "cell-trigger",
                                            "data-row-id": id,
                                            "data-column-key": c.key,
                                            type: "button",
                                            "aria-label": `${labels.editCell(c.label, id)}: ${dataTableCellText(row, c) || labels.emptyCell}`,
                                            disabled: !!edit.value?.pending,
                                          },
                                          [
                                            dataTableCellText(row, c) ||
                                              labels.emptyCell,
                                            h(LoongArkIcon, {
                                              icon: controlIcons.pencil,
                                              size: "sm",
                                            }),
                                          ],
                                        )
                                      : dataTableCellText(row, c),
                                ),
                              ),
                            ],
                          ),
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
                  ),
                ],
              ),
            ],
          ),
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
