import { defineComponent, h } from "vue";
import { LoongArkHighlight } from "@loongark/vue";
export const HighlightBasicExample = defineComponent({
  setup() {
    return () => {
      return h(LoongArkHighlight, { text: "搜索组件使用说明", query: "组件" });
    };
  },
});
