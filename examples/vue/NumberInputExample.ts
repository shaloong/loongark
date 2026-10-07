import { defineComponent, h, ref, type PropType } from "vue";
import {
  LoongArkNumberInputRoot,
  LoongArkNumberInputLabel,
  LoongArkNumberInputControl,
  LoongArkNumberInputInput,
  LoongArkNumberInputIncrementTrigger,
  LoongArkNumberInputDecrementTrigger,
  LoongArkNumberInputValueText,
  LoongArkNumberInputScrubber,
} from "@loongark/vue";
import type { NumberInputSize, NumberInputState } from "@loongark/primitives";

export const NumberInputExample = defineComponent({
  name: "NumberInputExample",
  props: {
    size: {
      type: String as PropType<NumberInputSize>,
      default: "md",
    },
    state: {
      type: String as PropType<NumberInputState>,
      default: "default",
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const value = ref("24");

    return () =>
      h(
        LoongArkNumberInputRoot,
        {
          modelValue: value.value,
          min: 0,
          max: 100,
          step: 1,
          size: props.size,
          state: props.state,
          disabled: props.disabled,
          "onUpdate:modelValue": (next: string) => {
            value.value = next;
          },
        },
        {
          default: () => [
            h(LoongArkNumberInputLabel, null, { default: () => "Amount" }),
            h(
              LoongArkNumberInputControl,
              {
                size: props.size,
                state: props.state,
                disabled: props.disabled,
              },
              {
                default: () => [
                  h(LoongArkNumberInputInput, {
                    size: props.size,
                    state: props.state,
                    disabled: props.disabled,
                  }),
                  h(
                    LoongArkNumberInputIncrementTrigger,
                    {
                      size: props.size,
                      state: props.state,
                      disabled: props.disabled,
                    },
                    {},
                  ),
                  h(
                    LoongArkNumberInputDecrementTrigger,
                    {
                      size: props.size,
                      state: props.state,
                      disabled: props.disabled,
                    },
                    {},
                  ),
                ],
              },
            ),
            h(LoongArkNumberInputScrubber, null, {
              default: () => "Drag to adjust",
            }),
            h(
              LoongArkNumberInputValueText,
              { size: props.size },
              { default: () => `Value: ${value.value || "0"}` },
            ),
          ],
        },
      );
  },
});
