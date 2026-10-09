import { defineComponent, h } from "vue";
import { LoongArkLabel, LoongArkTextarea } from "@loongark/vue";
export const TextareaBasicExample = defineComponent({
  setup() {
    return () => {
      return h("div", {}, [
        h(
          LoongArkLabel,
          { htmlFor: "basic-notes" },
          { default: () => ["备注"] },
        ),
        h(LoongArkTextarea, {
          id: "basic-notes",
          name: "notes",
          autoSize: true,
          minRows: 2,
          maxRows: 5,
          placeholder: "输入备注…",
        }),
      ]);
    };
  },
});
