import { defineComponent, h, type PropType } from "vue";
import {
  LoongArkPasswordInputRoot,
  LoongArkPasswordInputLabel,
  LoongArkPasswordInputControl,
  LoongArkPasswordInputInput,
  LoongArkPasswordInputIndicator,
  LoongArkPasswordInputVisibilityTrigger,
} from "@loongark/vue";
import type { PasswordInputSize, PasswordInputState } from "@loongark/primitives";

export const PasswordInputExample = defineComponent({
  name: "PasswordInputExample",
  props: {
    size: {
      type: String as PropType<PasswordInputSize>,
      default: "md",
    },
    state: {
      type: String as PropType<PasswordInputState>,
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
    return () =>
      h(
        LoongArkPasswordInputRoot,
        {
          size: props.size,
          state: props.state,
          disabled: props.disabled,
          readOnly: props.readOnly,
        },
        {
          default: () => [
            h(LoongArkPasswordInputLabel, null, {
              default: () => "Password",
            }),
            h(
              LoongArkPasswordInputControl,
              {
                size: props.size,
                state: props.state,
                disabled: props.disabled,
              },
              {
                default: () => [
                  h(LoongArkPasswordInputInput, {
                    size: props.size,
                    state: props.state,
                    disabled: props.disabled,
                    readOnly: props.readOnly,
                    placeholder: "Enter your password",
                  }),
                  h(LoongArkPasswordInputIndicator, null, {
                    default: () => "●●●",
                  }),
                  h(
                    LoongArkPasswordInputVisibilityTrigger,
                    { disabled: props.disabled },
                    { default: () => "Show" }
                  ),
                ],
              }
            ),
          ],
        }
      );
  },
});
