import { defineComponent, h, ref, type PropType } from "vue";
import {
  LoongArkTagsInputRoot,
  LoongArkTagsInputLabel,
  LoongArkTagsInputControl,
  LoongArkTagsInputInput,
  LoongArkTagsInputItem,
  LoongArkTagsInputItemPreview,
  LoongArkTagsInputItemText,
  LoongArkTagsInputItemDeleteTrigger,
  LoongArkTagsInputClearTrigger,
  LoongArkTagsInputHiddenInput,
} from "@loongark/vue";
import type { TagsInputSize, TagsInputState } from "@loongark/primitives";

export const TagsInputExample = defineComponent({
  name: "TagsInputExample",
  props: {
    size: {
      type: String as PropType<TagsInputSize>,
      default: "md",
    },
    state: {
      type: String as PropType<TagsInputState>,
      default: "default",
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    readOnly: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const value = ref(["React", "Vue", "Solid"]);

    return () =>
      h(
        LoongArkTagsInputRoot,
        {
          size: props.size,
          state: props.state,
          disabled: props.disabled,
          readOnly: props.readOnly,
          modelValue: value.value,
          onValueChange: (details: { value: string[] }) => {
            value.value = details.value;
          },
        },
        {
          default: () => [
            h(LoongArkTagsInputLabel, null, {
              default: () => "Frameworks",
            }),
            h(
              LoongArkTagsInputControl,
              {
                size: props.size,
                state: props.state,
                disabled: props.disabled,
              },
              {
                default: () => [
                  ...value.value.map((tag, index) =>
                    h(
                      LoongArkTagsInputItem,
                      { value: tag, index, key: tag },
                      {
                        default: () =>
                          h(LoongArkTagsInputItemPreview, null, {
                            default: () => [
                              h(LoongArkTagsInputItemText, null, {
                                default: () => tag,
                              }),
                              h(LoongArkTagsInputItemDeleteTrigger, null, {
                                default: () => "×",
                              }),
                            ],
                          }),
                      }
                    )
                  ),
                  h(LoongArkTagsInputInput, {
                    size: props.size,
                    state: props.state,
                    disabled: props.disabled,
                    readOnly: props.readOnly,
                    placeholder: "Add tag",
                  }),
                  h(LoongArkTagsInputClearTrigger, null, {
                    default: () => "Clear",
                  }),
                ],
              }
            ),
            h(LoongArkTagsInputHiddenInput),
          ],
        }
      );
  },
});
