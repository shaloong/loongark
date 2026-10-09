import { defineComponent, h } from "vue";
import {
  LoongArkCarouselRoot,
  LoongArkCarouselItemGroup,
  LoongArkCarouselItem,
  LoongArkCarouselControl,
  LoongArkCarouselPrevTrigger,
  LoongArkCarouselNextTrigger,
} from "@loongark/vue";
export const CarouselBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkCarouselRoot,
        { slideCount: 2 },
        {
          default: () => [
            h(
              LoongArkCarouselItemGroup,
              {},
              {
                default: () => [
                  h(
                    LoongArkCarouselItem,
                    { index: 0 },
                    { default: () => ["第一页"] },
                  ),
                  h(
                    LoongArkCarouselItem,
                    { index: 1 },
                    { default: () => ["第二页"] },
                  ),
                ],
              },
            ),
            h(
              LoongArkCarouselControl,
              {},
              {
                default: () => [
                  h(
                    LoongArkCarouselPrevTrigger,
                    {},
                    { default: () => ["上一页"] },
                  ),
                  h(
                    LoongArkCarouselNextTrigger,
                    {},
                    { default: () => ["下一页"] },
                  ),
                ],
              },
            ),
          ],
        },
      );
    };
  },
});
