import { defineComponent, h } from "vue";
import { LoongArkDirection, LoongArkNativeSelect } from "@loongark/vue";
export const DirectionBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkDirection,
        { dir: "rtl" },
        {
          default: () => [
            h(
              LoongArkNativeSelect,
              { "aria-label": "从右向左的选项" },
              {
                default: () => [
                  h("option", { value: "one" }, ["方向与箭头留白"]),
                  h("option", { value: "two" }, ["第二项"]),
                ],
              },
            ),
          ],
        },
      );
    };
  },
});
