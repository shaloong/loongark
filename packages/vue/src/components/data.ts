import {
  createDataTableView,
  nextDataSort,
  type DataSort,
  type DataRow,
  type DataColumn,
  renderChartMarkup,
  observeChartWidth,
  dataTableLabels,
  normalizeDataSelection,
  dataSelectionState,
  toggleDataSelection,
  setDataSelectionMixed,
  restoreDataSelection,
  type DataTableLabels,
  type ChartOptions,
} from "@loongark/kit";
import {
  defineComponent,
  ref,
  computed,
  watchEffect,
  h,
  onMounted,
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
  },
  setup(props) {
    const element = ref<HTMLElement>();
    const measuredWidth = ref(0);
    let stop: (() => void) | undefined;
    onMounted(() => {
      if (element.value)
        stop = observeChartWidth(element.value, (width) => {
          measuredWidth.value = width;
        });
    });
    onBeforeUnmount(() => stop?.());
    return () =>
      h("div", {
        ref: element,
        "data-scope": "chart",
        innerHTML: renderChartMarkup({
          ...props,
          width: props.width ?? (measuredWidth.value || undefined),
        }),
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
  },
  emits: {
    selectionChange: (ids: string[]) => Array.isArray(ids),
    "update:selectedIds": (ids: string[]) => Array.isArray(ids),
  },
  setup(props, { emit }) {
    const query = ref(""),
      sort = ref<DataSort>(),
      page = ref(1),
      internal = ref<string[]>([...(props.defaultSelectedIds ?? [])]),
      pageInput = ref<HTMLInputElement>();
    const view = computed(() =>
      createDataTableView(props.data, props.columns, {
        query: query.value,
        sort: sort.value,
        page: page.value,
        pageSize: props.pageSize,
        rowKey: props.rowKey,
      }),
    );
    const selected = () =>
      normalizeDataSelection(
        props.selectedIds ?? internal.value,
        view.value.allIds,
      );
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
      if (page.value !== view.value.page) page.value = view.value.page;
      if (sort.value && !view.value.sort) sort.value = undefined;
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
      return h("section", { "data-scope": "data-table", "data-part": "root" }, [
        h("input", {
          "aria-label": labels.filter,
          placeholder: labels.filterPlaceholder,
          value: query.value,
          onInput: (e: Event) => {
            if (e.currentTarget instanceof HTMLInputElement) {
              query.value = e.currentTarget.value;
              page.value = 1;
            }
          },
        }),
        h(
          "div",
          {
            "data-scope": "table",
            "data-part": "root",
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
                    h("th", { scope: "col" }, [
                      h("label", { "data-part": "selection" }, [
                        h("input", {
                          ref: pageInput,
                          type: "checkbox",
                          "aria-label": labels.selectPage,
                          "aria-checked": state.mixed ? "mixed" : state.checked,
                          checked: state.checked,
                          disabled: !pageIds().length,
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
                    ]),
                    ...props.columns.map((c) =>
                      h(
                        "th",
                        {
                          key: c.key,
                          scope: "col",
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
                                "aria-label": c.label,
                                onClick: () =>
                                  (sort.value = nextDataSort(
                                    model.sort,
                                    c.key,
                                  )),
                              },
                              c.label,
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
                            h("td", [
                              h("label", { "data-part": "selection" }, [
                                h("input", {
                                  type: "checkbox",
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
                            ]),
                            ...props.columns.map((c) =>
                              h("td", { key: c.key }, String(row[c.key] ?? "")),
                            ),
                          ],
                        ),
                      )
                    : [
                        h("tr", [
                          h(
                            "td",
                            {
                              colspan: props.columns.length + 1,
                              "data-part": "empty",
                            },
                            labels.empty,
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
            labels.summary({
              total: model.total,
              selected: ids.length,
              page: model.page,
              pageCount: model.pageCount,
            }),
          ),
          h(
            "button",
            {
              type: "button",
              disabled: model.page <= 1,
              onClick: () => (page.value = model.page - 1),
            },
            labels.previous,
          ),
          h(
            "button",
            {
              type: "button",
              disabled: model.page >= model.pageCount,
              onClick: () => (page.value = model.page + 1),
            },
            labels.next,
          ),
        ]),
      ]);
    };
  },
});
