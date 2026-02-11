import { defineComponent, h, type PropType } from "vue";
import {
  LoongArkScrollAreaRoot,
  LoongArkScrollAreaViewport,
  LoongArkScrollAreaContent,
  LoongArkScrollAreaScrollbar,
  LoongArkScrollAreaThumb,
  LoongArkScrollAreaCorner,
} from "@loongark/vue";
import type { ScrollAreaSize } from "@loongark/primitives";

const items = Array.from({ length: 12 }, (_, index) =>
  `Release note ${index + 1}`
);

export const ScrollAreaExample = defineComponent({
  name: "ScrollAreaExample",
  props: {
    size: {
      type: String as PropType<ScrollAreaSize>,
      default: "md",
    },
  },
  setup(props) {
    return () =>
      h(
        LoongArkScrollAreaRoot,
        { size: props.size, style: { width: "320px", height: "200px" } },
        {
          default: () => [
            h(LoongArkScrollAreaViewport, null, {
              default: () =>
                h(LoongArkScrollAreaContent, null, {
                  default: () =>
                    h(
                      "div",
                      { style: { display: "grid", gap: "8px", padding: "12px" } },
                      items.map((item) => h("div", { key: item }, item))
                    ),
                }),
            }),
            h(LoongArkScrollAreaScrollbar, { orientation: "vertical" }, {
              default: () => h(LoongArkScrollAreaThumb),
            }),
            h(LoongArkScrollAreaScrollbar, { orientation: "horizontal" }, {
              default: () => h(LoongArkScrollAreaThumb),
            }),
            h(LoongArkScrollAreaCorner),
          ],
        }
      );
  },
});
