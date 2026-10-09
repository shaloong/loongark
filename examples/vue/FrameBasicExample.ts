import { defineComponent, h } from "vue";
import { LoongArkFrame } from "@loongark/vue";
export const FrameBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkFrame,
        { title: "独立预览" },
        { default: () => [h("p", {}, ["iframe 中的内容。"])] },
      );
    };
  },
});
