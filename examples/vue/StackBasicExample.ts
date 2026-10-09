import { defineComponent, h } from "vue";
import { LoongArkStack } from "@loongark/vue";
export const StackBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkStack,
        { orientation: "horizontal", gap: "md" },
        {
          default: () => [h("span", {}, ["第一项"]), h("span", {}, ["第二项"])],
        },
      );
    };
  },
});
