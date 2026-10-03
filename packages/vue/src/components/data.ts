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
  defineComponent,
  ref,
  computed,
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
        innerHTML: renderChartSVG({
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
  },
  emits: ["selectionChange"],
  setup(props, { emit }) {
    const query = ref(""),
      sort = ref<DataSort>(),
      page = ref(1),
      selected = ref<string[]>([]);
    const view = computed(() =>
      createDataTableView(props.data, props.columns, {
        query: query.value,
        sort: sort.value,
        page: page.value,
        pageSize: props.pageSize,
        rowKey: props.rowKey,
      }),
    );
    const select = (id: string) => {
      selected.value = selected.value.includes(id)
        ? selected.value.filter((x) => x !== id)
        : [...selected.value, id];
      emit("selectionChange", selected.value);
    };
    return () =>
      h("section", { "data-scope": "data-table" }, [
        h("input", {
          "aria-label": "Filter rows",
          placeholder: "Filter rows…",
          value: query.value,
          onInput: (e: Event) => {
            if (e.currentTarget instanceof HTMLInputElement) {
              query.value = e.currentTarget.value;
              page.value = 1;
            }
          },
        }),
        h("div", { "data-scope": "table", "data-part": "root" }, [
          h("table", { "data-scope": "table", "data-part": "table" }, [
            h("thead", [
              h("tr", [
                h("th", { scope: "col" }, "Select"),
                ...props.columns.map((c) =>
                  h(
                    "th",
                    {
                      scope: "col",
                      "aria-sort":
                        sort.value?.key === c.key
                          ? sort.value.direction === "asc"
                            ? "ascending"
                            : "descending"
                          : "none",
                    },
                    c.sortable === false
                      ? c.label
                      : h(
                          "button",
                          {
                            type: "button",
                            onClick: () =>
                              (sort.value = nextDataSort(sort.value, c.key)),
                          },
                          c.label,
                        ),
                  ),
                ),
              ]),
            ]),
            h(
              "tbody",
              view.value.rows.length
                ? view.value.rows.map(({ row, id }) =>
                    h(
                      "tr",
                      {
                        "data-selected":
                          selected.value.includes(id) || undefined,
                      },
                      [
                        h("td", [
                          h("input", {
                            type: "checkbox",
                            "aria-label": "Select " + id,
                            checked: selected.value.includes(id),
                            onChange: () => select(id),
                          }),
                        ]),
                        ...props.columns.map((c) =>
                          h("td", String(row[c.key] ?? "")),
                        ),
                      ],
                    ),
                  )
                : [
                    h("tr", [
                      h(
                        "td",
                        { colspan: props.columns.length + 1 },
                        "No results",
                      ),
                    ]),
                  ],
            ),
          ]),
        ]),
        h("footer", [
          h(
            "span",
            { "aria-live": "polite" },
            view.value.total +
              " rows · " +
              selected.value.length +
              " selected · " +
              view.value.page +
              " / " +
              view.value.pageCount,
          ),
          h(
            "button",
            {
              type: "button",
              disabled: view.value.page <= 1,
              onClick: () => (page.value = view.value.page - 1),
            },
            "Previous",
          ),
          h(
            "button",
            {
              type: "button",
              disabled: view.value.page >= view.value.pageCount,
              onClick: () => (page.value = view.value.page + 1),
            },
            "Next",
          ),
        ]),
      ]);
  },
});
