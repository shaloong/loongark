import { defineComponent, h } from "vue";
import { LoongArkClientOnly } from "@loongark/vue";
export const ClientOnlyBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkClientOnly,
        {},
        { default: () => [h("p", {}, ["仅在客户端显示的内容。"])] },
      );
    };
  },
});
