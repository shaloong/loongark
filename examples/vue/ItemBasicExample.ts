import { defineComponent, h } from "vue";
import {
  LoongArkItem,
  LoongArkItemContent,
  LoongArkItemTitle,
  LoongArkItemDescription,
  LoongArkItemActions,
  LoongArkButton,
} from "@loongark/vue";
export const ItemBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkItem,
        {},
        {
          default: () => [
            h(
              LoongArkItemContent,
              {},
              {
                default: () => [
                  h(LoongArkItemTitle, {}, { default: () => ["组件说明"] }),
                  h(
                    LoongArkItemDescription,
                    {},
                    { default: () => ["用于列表中的标题、描述和操作组合。"] },
                  ),
                ],
              },
            ),
            h(
              LoongArkItemActions,
              {},
              {
                default: () => [
                  h(
                    LoongArkButton,
                    { variant: "outline" },
                    { default: () => ["查看"] },
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
