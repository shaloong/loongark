import { defineComponent, h, type PropType } from "vue";
import {
  LoongArkCarouselRoot,
  LoongArkCarouselItemGroup,
  LoongArkCarouselItem,
  LoongArkCarouselControl,
  LoongArkCarouselPrevTrigger,
  LoongArkCarouselNextTrigger,
  LoongArkCarouselIndicatorGroup,
  LoongArkCarouselIndicator,
} from "@loongark/vue";
import type { CarouselSize } from "@loongark/primitives";

const slides = [
  { title: "Aurora", description: "Soft gradients in motion." },
  { title: "Nebula", description: "Deep space color fields." },
  { title: "Orbit", description: "Precision alignment for teams." },
];

export const CarouselExample = defineComponent({
  name: "CarouselExample",
  props: {
    size: {
      type: String as PropType<CarouselSize>,
      default: "md",
    },
  },
  setup(props) {
    return () =>
      h(
        LoongArkCarouselRoot,
        {
          size: props.size,
          style: { maxWidth: "420px" },
        },
        {
          default: () => [
            h(LoongArkCarouselItemGroup, null, {
              default: () =>
                slides.map((slide, index) =>
                  h(
                    LoongArkCarouselItem,
                    { index, key: slide.title },
                    {
                      default: () =>
                        h(
                          "div",
                          { style: { display: "grid", gap: "4px" } },
                          [
                            h("strong", null, slide.title),
                            h(
                              "span",
                              { style: { opacity: 0.7 } },
                              slide.description
                            ),
                          ]
                        ),
                    }
                  )
                ),
            }),
            h(LoongArkCarouselControl, null, {
              default: () => [
                h(LoongArkCarouselPrevTrigger, null, {
                  default: () => "Prev",
                }),
                h(LoongArkCarouselIndicatorGroup, null, {
                  default: () =>
                    slides.map((_, index) =>
                      h(LoongArkCarouselIndicator, { index, key: index })
                    ),
                }),
                h(LoongArkCarouselNextTrigger, null, {
                  default: () => "Next",
                }),
              ],
            }),
          ],
        }
      );
  },
});
