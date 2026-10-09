import {
  defineComponent,
  h,
  createVNode,
  resolveDynamicComponent,
  type VNodeProps,
} from "vue";
import {
  createListCollection,
  LoongArkSelectRoot,
  LoongArkSelectLabel,
  LoongArkSelectControl,
  LoongArkSelectTrigger,
  LoongArkSelectValueText,
  LoongArkSelectIndicator,
  LoongArkSelectPositioner,
  LoongArkSelectContent,
  LoongArkSelectList,
  LoongArkSelectItem,
  LoongArkSelectItemText,
  LoongArkSelectItemIndicator,
  LoongArkSelectHiddenSelect,
} from "@loongark/vue";
import type { SelectRootProps } from "@ark-ui/vue/select";
import type { SelectItemProps } from "@ark-ui/vue/select";
import type { SelectHiddenSelectProps } from "@ark-ui/vue/select";
export const SelectBasicExample = defineComponent({
  setup() {
    const collection = createListCollection({
      items: [
        { value: "beijing", label: "北京" },
        { value: "shanghai", label: "上海" },
      ],
    });
    return () => {
      return createVNode(
        resolveDynamicComponent(LoongArkSelectRoot),
        {
          ...({
            collection: collection,
            name: "city",
          } satisfies SelectRootProps<(typeof collection.items)[number]> &
            VNodeProps),
        },
        {
          default: () => [
            h(LoongArkSelectLabel, {}, { default: () => ["城市"] }),
            h(
              LoongArkSelectControl,
              {},
              {
                default: () => [
                  h(
                    LoongArkSelectTrigger,
                    {},
                    {
                      default: () => [
                        h(LoongArkSelectValueText, { placeholder: "选择城市" }),
                        h(LoongArkSelectIndicator, {}),
                      ],
                    },
                  ),
                ],
              },
            ),
            h(
              LoongArkSelectPositioner,
              {},
              {
                default: () => [
                  h(
                    LoongArkSelectContent,
                    {},
                    {
                      default: () => [
                        h(
                          LoongArkSelectList,
                          {},
                          {
                            default: () => [
                              collection.items.map((item) =>
                                createVNode(
                                  resolveDynamicComponent(LoongArkSelectItem),
                                  {
                                    ...({
                                      key: item.value,
                                      item: item,
                                    } satisfies SelectItemProps & VNodeProps),
                                  },
                                  {
                                    default: () => [
                                      h(
                                        LoongArkSelectItemText,
                                        {},
                                        { default: () => [item.label] },
                                      ),
                                      h(LoongArkSelectItemIndicator, {}),
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
            createVNode(resolveDynamicComponent(LoongArkSelectHiddenSelect), {
              ...({} satisfies SelectHiddenSelectProps & VNodeProps),
            }),
          ],
        },
      );
    };
  },
});
