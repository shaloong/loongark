import { defineComponent, h } from "vue";
import { LoongArkStack, LoongArkSpinner } from "@loongark/vue";
export const SpinnerBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkStack,
        { orientation: "horizontal" },
        {
          default: () => [
            h(LoongArkSpinner, { "aria-label": "加载中" }),
            h("span", {}, ["正在载入组件"]),
          ],
        },
      );
    };
  },
});
