import { defineComponent, h } from "vue";
import {
  LoongArkHoverCardRoot,
  LoongArkHoverCardTrigger,
  LoongArkHoverCardPositioner,
  LoongArkHoverCardContent,
} from "@loongark/vue";
export const HoverCardBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkHoverCardRoot,
        {},
        {
          default: () => [
            h(
              LoongArkHoverCardTrigger,
              {},
              { default: () => ["查看个人资料"] },
            ),
            h(
              LoongArkHoverCardPositioner,
              {},
              {
                default: () => [
                  h(
                    LoongArkHoverCardContent,
                    {},
                    { default: () => ["项目维护者"] },
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
