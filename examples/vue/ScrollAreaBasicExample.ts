import { defineComponent, h } from "vue";
import {
  LoongArkScrollAreaRoot,
  LoongArkScrollAreaViewport,
  LoongArkScrollAreaContent,
  LoongArkScrollAreaScrollbar,
  LoongArkScrollAreaThumb,
} from "@loongark/vue";
export const ScrollAreaBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkScrollAreaRoot,
        {},
        {
          default: () => [
            h(
              LoongArkScrollAreaViewport,
              {},
              {
                default: () => [
                  h(
                    LoongArkScrollAreaContent,
                    {},
                    {
                      default: () => [
                        h("p", {}, ["第一段内容"]),
                        h("p", {}, ["第二段内容"]),
                        h("p", {}, ["第三段内容"]),
                      ],
                    },
                  ),
                ],
              },
            ),
            h(
              LoongArkScrollAreaScrollbar,
              {},
              { default: () => [h(LoongArkScrollAreaThumb, {})] },
            ),
          ],
        },
      );
    };
  },
});
