import { defineComponent, h } from "vue";
import { LoongArkPaper } from "@loongark/vue";
export const PaperBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkPaper,
        { padding: "md" },
        { default: () => ["带背景与边框的内容区域"] },
      );
    };
  },
});
