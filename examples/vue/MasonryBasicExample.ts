import { defineComponent, h } from "vue";
import { LoongArkMasonry } from "@loongark/vue";
export const MasonryBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkMasonry,
        { columns: 2 },
        {
          default: () => [
            h("div", {}, ["第一项"]),
            h("div", {}, ["第二项", h("br", {}), "更多内容"]),
            h("div", {}, ["第三项"]),
          ],
        },
      );
    };
  },
});
