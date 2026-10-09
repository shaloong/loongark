import {
  defineComponent,
  h,
  createVNode,
  resolveDynamicComponent,
  type VNodeProps,
} from "vue";
import {
  createListCollection,
  LoongArkListboxRoot,
  LoongArkListboxLabel,
  LoongArkListboxList,
  LoongArkListboxItem,
  LoongArkListboxItemText,
  LoongArkListboxItemIndicator,
} from "@loongark/vue";
import type { ListboxRootProps } from "@ark-ui/vue/listbox";
import type { ListboxItemProps } from "@ark-ui/vue/listbox";
export const ListboxBasicExample = defineComponent({
  setup() {
    const collection = createListCollection({
      items: [
        { value: "beijing", label: "北京" },
        { value: "shanghai", label: "上海" },
      ],
    });
    return () => {
      return createVNode(
        resolveDynamicComponent(LoongArkListboxRoot),
        {
          ...({
            collection: collection,
            defaultValue: ["beijing"],
          } satisfies ListboxRootProps<(typeof collection.items)[number]> &
            VNodeProps),
        },
        {
          default: () => [
            h(LoongArkListboxLabel, {}, { default: () => ["城市"] }),
            h(
              LoongArkListboxList,
              {},
              {
                default: () => [
                  collection.items.map((item) =>
                    createVNode(
                      resolveDynamicComponent(LoongArkListboxItem),
                      {
                        ...({
                          key: item.value,
                          item: item,
                        } satisfies ListboxItemProps & VNodeProps),
                      },
                      {
                        default: () => [
                          h(
                            LoongArkListboxItemText,
                            {},
                            { default: () => [item.label] },
                          ),
                          h(LoongArkListboxItemIndicator, {}),
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
