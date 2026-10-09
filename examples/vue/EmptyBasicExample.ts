import { defineComponent, h } from "vue";
import {
  LoongArkEmpty,
  LoongArkEmptyHeader,
  LoongArkEmptyTitle,
  LoongArkEmptyDescription,
  LoongArkEmptyContent,
  LoongArkButton,
} from "@loongark/vue";
export const EmptyBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkEmpty,
        {},
        {
          default: () => [
            h(
              LoongArkEmptyHeader,
              {},
              {
                default: () => [
                  h(LoongArkEmptyTitle, {}, { default: () => ["暂无文件"] }),
                  h(
                    LoongArkEmptyDescription,
                    {},
                    { default: () => ["添加文件后将在这里显示。"] },
                  ),
                ],
              },
            ),
            h(
              LoongArkEmptyContent,
              {},
              {
                default: () => [
                  h(LoongArkButton, {}, { default: () => ["添加文件"] }),
                ],
              },
            ),
          ],
        },
      );
    };
  },
});
