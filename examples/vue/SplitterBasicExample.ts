import { defineComponent, h } from "vue";
import {
  LoongArkSplitterRoot,
  LoongArkSplitterPanel,
  LoongArkSplitterResizeTrigger,
  LoongArkSplitterResizeTriggerIndicator,
} from "@loongark/vue";
export const SplitterBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkSplitterRoot,
        {
          panels: [
            { id: "left", minSize: 20 },
            { id: "right", minSize: 20 },
          ],
          defaultSize: [50, 50],
        },
        {
          default: () => [
            h(
              LoongArkSplitterPanel,
              { id: "left" },
              { default: () => ["内容"] },
            ),
            h(
              LoongArkSplitterResizeTrigger,
              { id: "left:right" },
              {
                default: () => [h(LoongArkSplitterResizeTriggerIndicator, {})],
              },
            ),
            h(
              LoongArkSplitterPanel,
              { id: "right" },
              { default: () => ["预览"] },
            ),
          ],
        },
      );
    };
  },
});
