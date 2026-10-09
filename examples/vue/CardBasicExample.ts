import { defineComponent, h } from "vue";
import {
  LoongArkCard,
  LoongArkCardHeader,
  LoongArkCardTitle,
  LoongArkCardDescription,
  LoongArkCardContent,
} from "@loongark/vue";
export const CardBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkCard,
        {},
        {
          default: () => [
            h(
              LoongArkCardHeader,
              {},
              {
                default: () => [
                  h(LoongArkCardTitle, {}, { default: () => ["项目说明"] }),
                  h(
                    LoongArkCardDescription,
                    {},
                    { default: () => ["用于展示相关内容。"] },
                  ),
                ],
              },
            ),
            h(LoongArkCardContent, {}, { default: () => ["这里是卡片内容。"] }),
          ],
        },
      );
    };
  },
});
