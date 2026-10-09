import { defineComponent, h } from "vue";
import {
  LoongArkSwitchRoot,
  LoongArkSwitchLabel,
  LoongArkSwitchControl,
  LoongArkSwitchThumb,
  LoongArkSwitchHiddenInput,
} from "@loongark/vue";
export const SwitchBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkSwitchRoot,
        { name: "notifications" },
        {
          default: () => [
            h(LoongArkSwitchLabel, {}, { default: () => ["接收通知"] }),
            h(
              LoongArkSwitchControl,
              {},
              { default: () => [h(LoongArkSwitchThumb, {})] },
            ),
            h(LoongArkSwitchHiddenInput, {}),
          ],
        },
      );
    };
  },
});
