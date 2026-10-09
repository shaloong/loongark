import { defineComponent, h } from "vue";
import { LoongArkAspectRatio, LoongArkPaper } from "@loongark/vue";
export const AspectRatioBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkAspectRatio,
        { ratio: 16 / 9 },
        {
          default: () => [
            h(
              LoongArkPaper,
              { padding: "md" },
              { default: () => ["16:9 内容区域"] },
            ),
          ],
        },
      );
    };
  },
});
