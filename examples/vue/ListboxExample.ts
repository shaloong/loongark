import { defineComponent, h, ref, type PropType } from "vue";
import { createListCollection } from "@ark-ui/vue";
import {
  LoongArkListboxRoot,
  LoongArkListboxLabel,
  LoongArkListboxList,
  LoongArkListboxItem,
  LoongArkListboxItemText,
  LoongArkListboxItemIndicator,
} from "@loongark/vue";
import type { ListboxOrientation, ListboxSize } from "@loongark/primitives";

const options = [
  { label: "Beijing", value: "beijing" },
  { label: "Shanghai", value: "shanghai" },
  { label: "Guangzhou", value: "guangzhou" },
  { label: "Shenzhen", value: "shenzhen" },
  { label: "Hangzhou", value: "hangzhou" },
];

export const ListboxExample = defineComponent({
  name: "ListboxExample",
  props: {
    size: {
      type: String as PropType<ListboxSize>,
      default: "md",
    },
    orientation: {
      type: String as PropType<ListboxOrientation>,
      default: "vertical",
    },
  },
  setup(props) {
    const value = ref<string[]>(["beijing"]);
    const collection = createListCollection({ items: options });

    return () =>
      h(
        LoongArkListboxRoot,
        {
          collection,
          value: value.value,
          onValueChange: (details: { value: string[] }) => {
            value.value = details.value;
          },
          size: props.size,
          orientation: props.orientation,
        },
        {
          default: () => [
            h(LoongArkListboxLabel, {}, { default: () => "City" }),
            h(
              LoongArkListboxList,
              {},
              {
                default: () =>
                  options.map((option) =>
                    h(
                      LoongArkListboxItem,
                      { key: option.value, item: option },
                      {
                        default: () => [
                          h(
                            LoongArkListboxItemText,
                            {},
                            { default: () => option.label }
                          ),
                          h(
                            LoongArkListboxItemIndicator,
                            {},
                            { default: () => "Check" }
                          ),
                        ],
                      }
                    )
                  ),
              }
            ),
          ],
        }
      );
  },
});
