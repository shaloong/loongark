import { defineComponent, h } from "vue";
import {
  LoongArkToggleGroupRoot,
  LoongArkToggleGroupItem,
} from "@shaloong/loongark-vue";
export const ToggleGroupBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkToggleGroupRoot,
        {},
        {
          default: () => [
            h(
              LoongArkToggleGroupItem,
              { value: "bold" },
              { default: () => ["加粗"] },
            ),
            h(
              LoongArkToggleGroupItem,
              { value: "italic" },
              { default: () => ["斜体"] },
            ),
          ],
        },
      );
    };
  },
});
