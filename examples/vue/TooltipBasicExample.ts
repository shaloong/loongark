import { defineComponent, h } from "vue";
import {
  LoongArkTooltipRoot,
  LoongArkTooltipTrigger,
  LoongArkTooltipPositioner,
  LoongArkTooltipContent,
} from "@loongark/vue";
export const TooltipBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkTooltipRoot,
        {},
        {
          default: () => [
            h(LoongArkTooltipTrigger, {}, { default: () => ["查看提示"] }),
            h(
              LoongArkTooltipPositioner,
              {},
              {
                default: () => [
                  h(
                    LoongArkTooltipContent,
                    {},
                    { default: () => ["支持键盘聚焦和鼠标悬停。"] },
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
