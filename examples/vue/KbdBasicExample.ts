import { defineComponent, h } from "vue";
import { LoongArkKbdGroup, LoongArkKbd } from "@loongark/vue";
export const KbdBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkKbdGroup,
        {},
        {
          default: () => [
            h(LoongArkKbd, {}, { default: () => ["Ctrl"] }),
            h("span", {}, ["+"]),
            h(LoongArkKbd, {}, { default: () => ["K"] }),
          ],
        },
      );
    };
  },
});
