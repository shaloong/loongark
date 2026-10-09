import { defineComponent, h } from "vue";
import {
  LoongArkList,
  LoongArkListItem,
  LoongArkListItemText,
} from "@loongark/vue";
export const ListBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkList,
        {},
        {
          default: () => [
            h(
              LoongArkListItem,
              {},
              {
                default: () => [
                  h(LoongArkListItemText, {}, { default: () => ["项目一"] }),
                ],
              },
            ),
            h(
              LoongArkListItem,
              {},
              {
                default: () => [
                  h(LoongArkListItemText, {}, { default: () => ["项目二"] }),
                ],
              },
            ),
          ],
        },
      );
    };
  },
});
