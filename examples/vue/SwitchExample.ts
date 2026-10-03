import { defineComponent, h, ref, type PropType } from "vue";
import {
  LoongArkSwitchHiddenInput,
  LoongArkSwitchRoot,
  LoongArkSwitchControl,
  LoongArkSwitchThumb,
  LoongArkSwitchLabel,
} from "@loongark/vue";

export const SwitchExample = defineComponent({
  name: "SwitchExample",
  props: {
    size: {
      type: String as PropType<"sm" | "md" | "lg">,
      default: "md",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "通知提醒",
    },
  },
  setup(props) {
    const checked = ref(false);
    return () =>
      h(
        LoongArkSwitchRoot,
        {
          size: props.size,
          disabled: props.disabled,
          checked: checked.value,
          "onUpdate:checked": (val: boolean) => (checked.value = val),
        },
        {
          default: () => [
            h(
              LoongArkSwitchControl,
              {
                size: props.size,
                disabled: props.disabled,
              },
              { default: () => h(LoongArkSwitchThumb, { size: props.size }) },
            ),
            h(
              LoongArkSwitchLabel,
              { disabled: props.disabled },
              { default: () => props.label },
            ),
            h(LoongArkSwitchHiddenInput, { name: "notifications" }),
          ],
        },
      );
  },
});
