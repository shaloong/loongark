import { defineComponent, h } from "vue";
import { LoongArkVirtualGrid } from "@loongark/vue";
export const VirtualGridBasicExample = defineComponent({
  setup() {
    return () => {
      return h(LoongArkVirtualGrid, {
        label: "数据网格",
        rowKeys: ["a", "b", "c"],
        columnKeys: ["name", "amount"],
        rowSize: 48,
        columnSize: 160,
        height: 200,
        renderCell: ({ rowKey, columnKey }) => rowKey + " / " + columnKey,
      });
    };
  },
});
