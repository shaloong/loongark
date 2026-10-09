import {
  defineComponent,
  h,
  createVNode,
  resolveDynamicComponent,
  ref,
  type VNodeProps,
} from "vue";
import {
  createListCollection,
  LoongArkComboboxRoot,
  LoongArkComboboxLabel,
  LoongArkComboboxControl,
  LoongArkComboboxInput,
  LoongArkComboboxTrigger,
  LoongArkComboboxPositioner,
  LoongArkComboboxContent,
  LoongArkComboboxList,
  LoongArkComboboxItem,
  LoongArkComboboxItemText,
} from "@loongark/vue";
import type { ComboboxRootProps } from "@ark-ui/vue/combobox";
import type { ComboboxItemProps } from "@ark-ui/vue/combobox";
export const ComboboxBasicExample = defineComponent({
  setup() {
    const query = ref("");
    const options = [
      { value: "beijing", label: "北京" },
      { value: "shanghai", label: "上海" },
    ];
    return () => {
      const items = options.filter((item) => item.label.includes(query.value));
      const collection = createListCollection({ items });
      return createVNode(
        resolveDynamicComponent(LoongArkComboboxRoot),
        {
          ...({
            collection: collection,
            inputValue: query.value,
          } satisfies ComboboxRootProps<(typeof collection.items)[number]> &
            VNodeProps),
          onInputValueChange: (details: { inputValue: string }) =>
            (query.value = details.inputValue),
        },
        {
          default: () => [
            h(LoongArkComboboxLabel, {}, { default: () => ["搜索城市"] }),
            h(
              LoongArkComboboxControl,
              {},
              {
                default: () => [
                  h(LoongArkComboboxInput, { placeholder: "输入城市名称" }),
                  h(LoongArkComboboxTrigger, { "aria-label": "展开选项" }),
                ],
              },
            ),
            h(
              LoongArkComboboxPositioner,
              {},
              {
                default: () => [
                  h(
                    LoongArkComboboxContent,
                    {},
                    {
                      default: () => [
                        h(
                          LoongArkComboboxList,
                          {},
                          {
                            default: () => [
                              items.map((item) =>
                                createVNode(
                                  resolveDynamicComponent(LoongArkComboboxItem),
                                  {
                                    ...({
                                      key: item.value,
                                      item: item,
                                    } satisfies ComboboxItemProps & VNodeProps),
                                  },
                                  {
                                    default: () => [
                                      h(
                                        LoongArkComboboxItemText,
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
