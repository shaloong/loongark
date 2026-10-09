import { defineComponent, h } from "vue";
import { LoongArkChip, LoongArkChipLabel } from "@loongark/vue";
export const ChipBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkChip,
        {},
        {
          default: () => [
            h(LoongArkChipLabel, {}, { default: () => ["设计"] }),
          ],
        },
      );
    };
  },
});
