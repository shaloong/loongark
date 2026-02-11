import { defineComponent, h, ref, type PropType } from "vue";
import {
  LoongArkEditableRoot,
  LoongArkEditableLabel,
  LoongArkEditableArea,
  LoongArkEditableControl,
  LoongArkEditableInput,
  LoongArkEditablePreview,
  LoongArkEditableEditTrigger,
  LoongArkEditableSubmitTrigger,
  LoongArkEditableCancelTrigger,
} from "@loongark/vue";
import type { EditableSize, EditableState } from "@loongark/primitives";

export const EditableExample = defineComponent({
  name: "EditableExample",
  props: {
    size: {
      type: String as PropType<EditableSize>,
      default: "md",
    },
    state: {
      type: String as PropType<EditableState>,
      default: "default",
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const value = ref("LoongArk Design System");

    return () =>
      h(
        LoongArkEditableRoot,
        {
          size: props.size,
          state: props.state,
          disabled: props.disabled,
          modelValue: value.value,
          onValueChange: (details: { value: string }) => {
            value.value = details.value;
          },
        },
        {
          default: () => [
            h(LoongArkEditableLabel, null, {
              default: () => "Project name",
            }),
            h(LoongArkEditableArea, null, {
              default: () => [
                h(LoongArkEditablePreview),
                h(LoongArkEditableInput, { state: props.state }),
              ],
            }),
            h(
              LoongArkEditableControl,
              { state: props.state, style: { display: "flex", gap: "8px" } },
              {
                default: () => [
                  h(LoongArkEditableEditTrigger, null, { default: () => "Edit" }),
                  h(LoongArkEditableSubmitTrigger, null, { default: () => "Save" }),
                  h(LoongArkEditableCancelTrigger, null, { default: () => "Cancel" }),
                ],
              }
            ),
          ],
        }
      );
  },
});
