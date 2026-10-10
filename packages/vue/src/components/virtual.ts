import {
  defineComponent,
  h,
  ref,
  onMounted,
  onBeforeUnmount,
  watchEffect,
  type PropType,
  type VNodeChild,
} from "vue";
import {
  createVirtualGrid,
  createVirtualMasonry,
  mountVirtualGrid,
  mountVirtualMasonry,
  type VirtualGridOptions,
  type VirtualGridCellDetails,
  type VirtualMasonryOptions,
  type VirtualMasonryEntry,
} from "@loongark/kit";
export interface VirtualGridProps extends VirtualGridOptions {
  renderCell(details: VirtualGridCellDetails): VNodeChild;
}
export interface VirtualMasonryProps extends VirtualMasonryOptions {
  renderItem(details: VirtualMasonryEntry): VNodeChild;
}
const common = {
  height: Number,
  width: Number,
  overscan: Number,
  label: String,
  dir: String as PropType<"ltr" | "rtl">,
};
export const LoongArkVirtualGrid = defineComponent({
  name: "LoongArkVirtualGrid",
  props: {
    ...common,
    rowKeys: { type: Array as PropType<readonly string[]>, required: true },
    columnKeys: { type: Array as PropType<readonly string[]>, required: true },
    rowSize: [Number, Function] as PropType<VirtualGridOptions["rowSize"]>,
    columnSize: [Number, Function] as PropType<
      VirtualGridOptions["columnSize"]
    >,
    scrollToRow: Number,
    scrollToColumn: Number,
    renderCell: {
      type: Function as PropType<
        (details: VirtualGridCellDetails) => VNodeChild
      >,
      required: true,
    },
  },
  setup(props) {
    let revisionNumber = 0;
    const root = ref<HTMLDivElement>(),
      revision = ref(0),
      model = createVirtualGrid(props, () => {
        revision.value = ++revisionNumber;
      });
    let stop: (() => void) | undefined;
    watchEffect(() => model.sync({ ...props }), { flush: "pre" });
    onMounted(() => {
      stop = mountVirtualGrid(root.value!, model);
    });
    onBeforeUnmount(() => stop?.());
    return () => {
      revision.value;
      const rows = model.rows.state,
        columns = model.columns.state;
      return h(
        "div",
        {
          ref: root,
          "data-scope": "virtual-grid",
          role: "grid",
          "aria-label": props.label ?? "Data grid",
          "aria-rowcount": props.rowKeys.length,
          "aria-colcount": props.columnKeys.length,
          dir: props.dir,
          tabindex: rows.count && columns.count ? -1 : 0,
          style: { height: `${props.height ?? 320}px` },
        },
        [
          h(
            "div",
            {
              "data-part": "canvas",
              style: { height: `${rows.total}px`, width: `${columns.total}px` },
            },
            rows.entries.map((row) =>
              h(
                "div",
                {
                  key: row.key,
                  role: "row",
                  "aria-rowindex": row.index + 1,
                  "data-part": "row",
                  style: {
                    top: `${row.offset}px`,
                    height: `${row.size}px`,
                    width: `${columns.total}px`,
                  },
                },
                columns.entries.map((column) =>
                  h(
                    "div",
                    {
                      key: column.key,
                      role: "gridcell",
                      "data-part": "cell",
                      "data-row-key": row.key,
                      "data-column-key": column.key,
                      "aria-colindex": column.index + 1,
                      tabindex:
                        row.key === model.cursor.rowKey && column.key === model.cursor.columnKey
                          ? 0
                          : -1,
                      style: {
                        insetInlineStart: `${column.offset}px`,
                        width: `${column.size}px`,
                        height: `${row.size}px`,
                      },
                    },
                    [
                      props.renderCell({
                        rowKey: row.key,
                        columnKey: column.key,
                        rowIndex: row.index,
                        columnIndex: column.index,
                      }),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      );
    };
  },
});
export const LoongArkVirtualMasonry = defineComponent({
  name: "LoongArkVirtualMasonry",
  props: {
    ...common,
    keys: { type: Array as PropType<readonly string[]>, required: true },
    minColumnWidth: Number,
    maxColumns: Number,
    gap: Number,
    estimateSize: [Number, Function] as PropType<
      VirtualMasonryOptions["estimateSize"]
    >,
    scrollToIndex: Number,
    renderItem: {
      type: Function as PropType<(details: VirtualMasonryEntry) => VNodeChild>,
      required: true,
    },
  },
  setup(props) {
    let revisionNumber = 0;
    const root = ref<HTMLDivElement>(),
      revision = ref(0),
      model = createVirtualMasonry(props, () => {
        revision.value = ++revisionNumber;
      });
    let stop: (() => void) | undefined;
    watchEffect(() => model.setOptions({ ...props }));
    onMounted(() => {
      stop = mountVirtualMasonry(root.value!, model);
    });
    onBeforeUnmount(() => stop?.());
    return () => {
      revision.value;
      const state = model.state;
      return h(
        "div",
        {
          ref: root,
          "data-scope": "virtual-masonry",
          role: "list",
          "aria-label": props.label ?? "Collection",
          dir: props.dir,
          style: { height: `${props.height ?? 320}px` },
        },
        [
          h(
            "div",
            { "data-part": "canvas", style: { height: `${state.total}px` } },
            state.entries.map((entry) =>
              h(
                "div",
                {
                  key: entry.key,
                  "data-part": "item",
                  "data-virtual-key": entry.key,
                  role: "listitem",
                  "aria-posinset": entry.index + 1,
                  "aria-setsize": state.count,
                  style: {
                    top: `${entry.top}px`,
                    insetInlineStart: `${entry.inlineStart}px`,
                    width: `${entry.width}px`,
                  },
                },
                [props.renderItem(entry)],
              ),
            ),
          ),
        ],
      );
    };
  },
});
