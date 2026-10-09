import { defineComponent, h } from "vue";
import { LoongArkToggleRoot } from "@loongark/vue";
export const ToggleBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkToggleRoot,
        { "aria-label": "加粗" },
        { default: () => ["加粗"] },
      );
    };
  },
});
