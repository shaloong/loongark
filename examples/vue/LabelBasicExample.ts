import { defineComponent, h } from "vue";
import { LoongArkLabel } from "@loongark/vue";
export const LabelBasicExample = defineComponent({
  setup() {
    return () => {
      return h("div", {}, [
        h(
          LoongArkLabel,
          { htmlFor: "basic-name" },
          { default: () => ["姓名"] },
        ),
        h("input", { id: "basic-name", name: "name" }),
      ]);
    };
  },
});
