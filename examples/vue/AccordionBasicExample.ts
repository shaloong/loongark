import { defineComponent, h } from "vue";
import {
  LoongArkAccordionRoot,
  LoongArkAccordionItem,
  LoongArkAccordionItemTrigger,
  LoongArkAccordionItemIndicator,
  LoongArkAccordionItemContent,
} from "@loongark/vue";
export const AccordionBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkAccordionRoot,
        { collapsible: true },
        {
          default: () => [
            h(
              LoongArkAccordionItem,
              { value: "one" },
              {
                default: () => [
                  h(
                    LoongArkAccordionItemTrigger,
                    {},
                    {
                      default: () => [
                        "部署设置",
                        h(LoongArkAccordionItemIndicator, {}),
                      ],
                    },
                  ),
                  h(
                    LoongArkAccordionItemContent,
                    {},
                    { default: () => ["这里是展开后的详细设置。"] },
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
