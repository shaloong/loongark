import { defineComponent, h, ref } from "vue";
import {
  LoongArkButton,
  LoongArkSwapRoot,
  LoongArkSwapIndicator,
} from "@loongark/vue";
export const SwapBasicExample = defineComponent({
  setup() {
    const expanded = ref(false);
    return () => {
      return h(
        LoongArkButton,
        {
          "aria-expanded": expanded.value,
          onClick: () => (expanded.value = !expanded.value),
        },
        {
          default: () => [
            h(
              LoongArkSwapRoot,
              { swap: expanded.value },
              {
                default: () => [
                  h(
                    LoongArkSwapIndicator,
                    { type: "off" },
                    { default: () => ["展开"] },
                  ),
                  h(
                    LoongArkSwapIndicator,
                    { type: "on" },
                    { default: () => ["收起"] },
                  ),
                ],
              },
            ),
          ],
        },
      );
    };
  },
});
