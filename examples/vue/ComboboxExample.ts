import { defineComponent, h, ref, computed, type PropType } from "vue";
import { createListCollection } from "@loongark/vue";
import {
  LoongArkComboboxRoot,
  LoongArkComboboxLabel,
  LoongArkComboboxControl,
  LoongArkComboboxInput,
  LoongArkComboboxTrigger,
  LoongArkComboboxClearTrigger,
  LoongArkComboboxPositioner,
  LoongArkComboboxContent,
  LoongArkComboboxList,
  LoongArkComboboxItem,
  LoongArkComboboxItemText,
  LoongArkComboboxItemIndicator,
} from "@loongark/vue";
import type { ComboboxSize } from "@loongark/primitives";

const options: Array<{ label: string; value: string }> = [
  { label: "Beijing", value: "beijing" },
  { label: "Shanghai", value: "shanghai" },
  { label: "Guangzhou", value: "guangzhou" },
  { label: "Shenzhen", value: "shenzhen" },
  { label: "Hangzhou", value: "hangzhou" },
];

export const ComboboxExample = defineComponent({
  name: "ComboboxExample",
  props: {
    size: {
      type: String as PropType<ComboboxSize>,
      default: "md",
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    label: {
      type: String as PropType<string>,
      default: "City",
    },
    placeholder: {
      type: String as PropType<string>,
      default: "Search...",
    },
  },
  setup(props) {
    const value = ref<string[]>([]);
    const inputValue = ref("");

    const filteredOptions = computed(() => {
      const query = inputValue.value.trim().toLowerCase();
      if (!query) return options;
      return options.filter((option) =>
        option.label.toLowerCase().includes(query),
      );
    });

    const collection = computed(() =>
      createListCollection({ items: filteredOptions.value }),
    );

    const handleValueChange = (details: { value: string[] }) => {
      value.value = details.value;
      const nextValue = details.value[0];
      const match = options.find((option) => option.value === nextValue);
      inputValue.value = match?.label ?? "";
    };

    return () =>
      h("div", { style: { padding: "20px", width: "320px" } }, [
        h(
          LoongArkComboboxRoot,
          {
            size: props.size,
            disabled: props.disabled,
            collection: collection.value,
            value: value.value,
            inputValue: inputValue.value,
            onInputValueChange: (details: { inputValue: string }) => {
              inputValue.value = details.inputValue;
            },
            onValueChange: handleValueChange,
          },
          {
            default: () => [
              h(LoongArkComboboxLabel, {}, { default: () => props.label }),
              h(
                LoongArkComboboxControl,
                {},
                {
                  default: () => [
                    h(LoongArkComboboxInput, {
                      placeholder: props.placeholder,
                    }),
                    h(
                      LoongArkComboboxClearTrigger,
                      { "aria-label": "Clear" },
                      { default: () => "x" },
                    ),
                    h(
                      LoongArkComboboxTrigger,
                      { "aria-label": "Toggle" },
                      { default: () => "v" },
                    ),
                  ],
                },
              ),
              h(
                LoongArkComboboxPositioner,
                {},
                {
                  default: () =>
                    h(
                      LoongArkComboboxContent,
                      {},
                      {
                        default: () =>
                          h(
                            LoongArkComboboxList,
                            {},
                            {
                              default: () =>
                                filteredOptions.value.map((option) =>
                                  h(
                                    LoongArkComboboxItem,
                                    { key: option.value, item: option },
                                    {
                                      default: () => [
                                        h(
                                          LoongArkComboboxItemText,
                                          {},
                                          { default: () => option.label },
                                        ),
                                        h(
                                          LoongArkComboboxItemIndicator,
                                          {},
                                          { default: () => "Check" },
                                        ),
                                      ],
                                    },
                                  ),
                                ),
                            },
                          ),
                      },
                    ),
                },
              ),
            ],
          },
        ),
        h(
          "p",
          { style: { "margin-top": "16px", fontSize: "14px", color: "#666" } },
          `Selected: ${value.value.length > 0 ? value.value.join(", ") : "None"}`,
        ),
      ]);
  },
});
