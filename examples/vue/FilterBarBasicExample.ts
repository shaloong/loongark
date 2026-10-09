import { defineComponent, h } from "vue";
import {
  LoongArkFilterBar,
  LoongArkFilterBarSearch,
  LoongArkInputRoot,
  LoongArkInputLabel,
  LoongArkInputControl,
  LoongArkFilterBarActions,
  LoongArkButton,
} from "@loongark/vue";
export const FilterBarBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkFilterBar,
        {},
        {
          default: () => [
            h(
              LoongArkFilterBarSearch,
              {},
              {
                default: () => [
                  h(
                    LoongArkInputRoot,
                    {},
                    {
                      default: () => [
                        h(LoongArkInputLabel, {}, { default: () => ["搜索"] }),
                        h(LoongArkInputControl, { placeholder: "搜索组件" }),
                      ],
                    },
                  ),
                ],
              },
            ),
            h(
              LoongArkFilterBarActions,
              {},
              {
                default: () => [
                  h(
                    LoongArkButton,
                    { variant: "outline" },
                    { default: () => ["重置"] },
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
