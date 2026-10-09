import {
  defineComponent,
  h,
  createVNode,
  resolveDynamicComponent,
  ref,
  type VNodeProps,
} from "vue";
import { createCommandCollection, LoongArkCommand } from "@loongark/vue";
import type { ComboboxInputProps } from "@ark-ui/vue/combobox";
export const CommandBasicExample = defineComponent({
  setup() {
    const query = ref("");
    const options = [
      { value: "beijing", label: "北京" },
      { value: "shanghai", label: "上海" },
    ];
    return () => {
      const items = options.filter((item) => item.label.includes(query.value));
      const collection = createCommandCollection({ items });
      return h(
        LoongArkCommand.Root<(typeof collection.items)[number]>,
        {
          collection: collection,
          open: true,
          inputValue: query.value,
          onInputValueChange: (details: { inputValue: string }) =>
            (query.value = details.inputValue),
        },
        {
          default: () => [
            h(LoongArkCommand.Label, {}, { default: () => ["搜索城市"] }),
            h(
              LoongArkCommand.Control,
              {},
              {
                default: () => [
                  createVNode(resolveDynamicComponent(LoongArkCommand.Input), {
                    ...({
                      placeholder: "输入城市名称",
                    } satisfies ComboboxInputProps & VNodeProps),
                  }),
                ],
              },
            ),
            h(
              LoongArkCommand.Content,
              {},
              {
                default: () => [
                  items.map((item) =>
                    h(
                      LoongArkCommand.Item,
                      { key: item.value, item: item },
                      {
                        default: () => [
                          h(
                            LoongArkCommand.ItemText,
                            {},
                            { default: () => [item.label] },
                          ),
                        ],
                      },
                    ),
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
