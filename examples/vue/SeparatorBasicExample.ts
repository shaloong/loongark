import { defineComponent, h } from "vue";
import { LoongArkStack, LoongArkSeparator } from "@loongark/vue";
export const SeparatorBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkStack,
        {},
        {
          default: () => [
            h("span", {}, ["基本设置"]),
            h(LoongArkSeparator, {}),
            h("span", {}, ["高级设置"]),
          ],
        },
      );
    };
  },
});
