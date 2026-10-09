import { defineComponent, h } from "vue";
import { LoongArkVirtualMasonry } from "@loongark/vue";
export const VirtualMasonryBasicExample = defineComponent({
  setup() {
    return () => {
      return h(LoongArkVirtualMasonry, {
        label: "虚拟瀑布流",
        keys: ["a", "b", "c", "d"],
        maxColumns: 2,
        height: 240,
        estimateSize: 120,
        renderItem: ({ key }) => key,
      });
    };
  },
});
