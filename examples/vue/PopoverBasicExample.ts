import { defineComponent, h } from "vue";
import {
  LoongArkPopoverRoot,
  LoongArkPopoverTrigger,
  LoongArkPopoverPositioner,
  LoongArkPopoverContent,
  LoongArkPopoverTitle,
  LoongArkPopoverDescription,
  LoongArkPopoverCloseTrigger,
} from "@loongark/vue";
export const PopoverBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkPopoverRoot,
        {},
        {
          default: () => [
            h(LoongArkPopoverTrigger, {}, { default: () => ["打开详情"] }),
            h(
              LoongArkPopoverPositioner,
              {},
              {
                default: () => [
                  h(
                    LoongArkPopoverContent,
                    {},
                    {
                      default: () => [
                        h(
                          LoongArkPopoverTitle,
                          {},
                          { default: () => ["详情"] },
                        ),
                        h(
                          LoongArkPopoverDescription,
                          {},
                          { default: () => ["浮层继承当前主题。"] },
                        ),
                        h(
                          LoongArkPopoverCloseTrigger,
                          {},
                          { default: () => ["关闭"] },
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
