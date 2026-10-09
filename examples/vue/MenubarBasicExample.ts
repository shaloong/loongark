import { defineComponent, h } from "vue";
import {
  LoongArkMenubar,
  LoongArkMenuRoot,
  LoongArkMenuTrigger,
  LoongArkMenuPositioner,
  LoongArkMenuContent,
  LoongArkMenuItem,
} from "@loongark/vue";
export const MenubarBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkMenubar,
        {},
        {
          default: () => [
            h(
              LoongArkMenuRoot,
              {},
              {
                default: () => [
                  h(
                    LoongArkMenuTrigger,
                    {},
                    {
                      default: () => [
                        h("button", { type: "button" }, ["文件"]),
                      ],
                    },
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
                                { value: "new" },
                                { default: () => ["新建"] },
                              ),
                              h(
                                LoongArkMenuItem,
                                { value: "save" },
                                { default: () => ["保存"] },
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
