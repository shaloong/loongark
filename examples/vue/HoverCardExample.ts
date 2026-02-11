import { defineComponent, h, type PropType } from "vue";
import {
  LoongArkHoverCardRoot,
  LoongArkHoverCardTrigger,
  LoongArkHoverCardPositioner,
  LoongArkHoverCardContent,
  LoongArkHoverCardArrow,
  LoongArkHoverCardArrowTip,
} from "@loongark/vue";
import type { HoverCardSize } from "@loongark/primitives";

export const HoverCardExample = defineComponent({
  name: "HoverCardExample",
  props: {
    size: {
      type: String as PropType<HoverCardSize>,
      default: "md",
    },
  },
  setup(props) {
    return () =>
      h(
        LoongArkHoverCardRoot,
        { size: props.size, openDelay: 200 },
        {
          default: () => [
            h(LoongArkHoverCardTrigger, null, {
              default: () => "Hover details",
            }),
            h(LoongArkHoverCardPositioner, null, {
              default: () =>
                h(LoongArkHoverCardContent, null, {
                  default: () => [
                    h(
                      "div",
                      { style: { display: "grid", gap: "6px" } },
                      [
                        h("strong", null, "@loongark"),
                        h(
                          "span",
                          { style: { opacity: 0.7 } },
                          "Design-ready UI primitives."
                        ),
                      ]
                    ),
                    h(LoongArkHoverCardArrow, null, {
                      default: () => h(LoongArkHoverCardArrowTip),
                    }),
                  ],
                }),
            }),
          ],
        }
      );
  },
});
