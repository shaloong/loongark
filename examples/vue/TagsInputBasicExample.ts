import { defineComponent, h, ref } from "vue";
import {
  LoongArkTagsInputRoot,
  LoongArkTagsInputLabel,
  LoongArkTagsInputControl,
  LoongArkTagsInputItem,
  LoongArkTagsInputItemPreview,
  LoongArkTagsInputItemText,
  LoongArkTagsInputItemDeleteTrigger,
  LoongArkIcon,
  LoongArkTagsInputInput,
  LoongArkTagsInputHiddenInput,
} from "@loongark/vue";
import { controlIcons } from "@loongark/kit";
export const TagsInputBasicExample = defineComponent({
  setup() {
    const tags = ref(["React", "Vue"]);
    return () => {
      return h(
        LoongArkTagsInputRoot,
        {
          name: "frameworks",
          value: tags.value,
          onValueChange: (details: { value: string[] }) =>
            (tags.value = details.value),
        },
        {
          default: () => [
            h(LoongArkTagsInputLabel, {}, { default: () => ["框架"] }),
            h(
              LoongArkTagsInputControl,
              {},
              {
                default: () => [
                  tags.value.map((tag, index) =>
                    h(
                      LoongArkTagsInputItem,
                      { key: tag, value: tag, index: index },
                      {
                        default: () => [
                          h(
                            LoongArkTagsInputItemPreview,
                            {},
                            {
                              default: () => [
                                h(
                                  LoongArkTagsInputItemText,
                                  {},
                                  { default: () => [tag] },
                                ),
                                h(
                                  LoongArkTagsInputItemDeleteTrigger,
                                  { "aria-label": "移除 " + tag },
                                  {
                                    default: () => [
                                      h(LoongArkIcon, {
                                        icon: controlIcons.close,
                                        size: "sm",
                                      }),
                                    ],
                                  },
                                ),
                              ],
                            },
                          ),
                        ],
                      },
                    ),
                  ),
                  h(LoongArkTagsInputInput, { placeholder: "输入后按 Enter" }),
                ],
              },
            ),
            h(LoongArkTagsInputHiddenInput, {}),
          ],
        },
      );
    };
  },
});
