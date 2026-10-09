import { defineComponent, h } from "vue";
import { LoongArkMarquee, LoongArkBadge } from "@loongark/vue";
export const MarqueeBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkMarquee.Root,
        {},
        {
          default: () => [
            h(
              LoongArkMarquee.Viewport,
              {},
              {
                default: () => [
                  h(
                    LoongArkMarquee.Content,
                    {},
                    {
                      default: () => [
                        h(
                          LoongArkMarquee.Item,
                          {},
                          {
                            default: () => [
                              h(
                                LoongArkBadge,
                                { variant: "outline" },
                                { default: () => ["React"] },
                              ),
                            ],
                          },
                        ),
                        h(
                          LoongArkMarquee.Item,
                          {},
                          {
                            default: () => [
                              h(
                                LoongArkBadge,
                                { variant: "outline" },
                                { default: () => ["Vue"] },
                              ),
                            ],
                          },
                        ),
                        h(
                          LoongArkMarquee.Item,
                          {},
                          {
                            default: () => [
                              h(
                                LoongArkBadge,
                                { variant: "outline" },
                                { default: () => ["Solid / Svelte"] },
                              ),
                            ],
                          },
                        ),
                      ],
                    },
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
