import { defineComponent, h, type PropType } from "vue";
import {
  LoongArkSplitterRoot,
  LoongArkSplitterPanel,
  LoongArkSplitterResizeTrigger,
  LoongArkSplitterResizeTriggerIndicator,
} from "@loongark/vue";
import type { SplitterSize } from "@loongark/primitives";

export const SplitterExample = defineComponent({
  name: "SplitterExample",
  props: {
    size: {
      type: String as PropType<SplitterSize>,
      default: "md",
    },
    orientation: {
      type: String as PropType<"horizontal" | "vertical">,
      default: "horizontal",
    },
  },
  setup(props) {
    const height = props.orientation === "vertical" ? "240px" : "160px";

    return () =>
      h(
        LoongArkSplitterRoot,
        {
          size: props.size,
          orientation: props.orientation,
          panels: [
            { id: "notes", minSize: 20 },
            { id: "preview", minSize: 20 },
          ],
          style: { height },
        },
        {
          default: () => [
            h(
              LoongArkSplitterPanel,
              { id: "notes" },
              {
                default: () =>
                  h("div", { style: { padding: "12px" } }, "Notes"),
              },
            ),
            h(
              LoongArkSplitterResizeTrigger,
              { id: "notes:preview" },
              {
                default: () => h(LoongArkSplitterResizeTriggerIndicator),
              },
            ),
            h(
              LoongArkSplitterPanel,
              { id: "preview" },
              {
                default: () =>
                  h("div", { style: { padding: "12px" } }, "Preview"),
              },
            ),
          ],
        },
      );
  },
});
