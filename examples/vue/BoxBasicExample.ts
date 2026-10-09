import { defineComponent, h } from "vue";
import { LoongArkBox } from "@loongark/vue";
export const BoxBasicExample = defineComponent({
  setup() {
    return () => {
      return h(LoongArkBox, { padding: "md" }, { default: () => ["内容区域"] });
    };
  },
});
