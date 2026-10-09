import { defineComponent, h } from "vue";
import {
  LoongArkMenuRoot,
  LoongArkMenuTrigger,
  LoongArkMenuPositioner,
  LoongArkMenuContent,
  LoongArkMenuItem,
} from "@loongark/vue";
export const MenuBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkMenuRoot,
        {},
        {
          default: () => [
            h(
              LoongArkMenuTrigger,
              {},
              { default: () => [h("button", { type: "button" }, ["操作"])] },
            ),
            h(
              LoongArkMenuPositioner,
              {},
              {
                default: () => [
                  h(
                    LoongArkMenuContent,
                    {},
                    {
                      default: () => [
                        h(
                          LoongArkMenuItem,
                          { value: "copy" },
                          { default: () => ["复制"] },
                        ),
                        h(
                          LoongArkMenuItem,
                          { value: "archive" },
                          { default: () => ["归档"] },
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
