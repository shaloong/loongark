import { defineComponent, h } from "vue";
import { LoongArkGrid } from "@loongark/vue";
export const GridBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkGrid,
        { columns: 2, gap: "md" },
        { default: () => [h("div", {}, ["第一列"]), h("div", {}, ["第二列"])] },
      );
    };
  },
});
