import {
  defineComponent,
  h,
  createVNode,
  resolveDynamicComponent,
  type VNodeProps,
} from "vue";
import { LoongArkAngleSlider } from "@loongark/vue";
import type { AngleSliderHiddenInputProps } from "@ark-ui/vue/angle-slider";
export const AngleSliderBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkAngleSlider.Root,
        { defaultValue: 45 },
        {
          default: () => [
            h(LoongArkAngleSlider.Label, {}, { default: () => ["旋转角度"] }),
            h(
              LoongArkAngleSlider.Control,
              {},
              { default: () => [h(LoongArkAngleSlider.Thumb, {})] },
            ),
            h(LoongArkAngleSlider.ValueText, {}),
            createVNode(
              resolveDynamicComponent(LoongArkAngleSlider.HiddenInput),
              {
                ...({ name: "rotation" } satisfies AngleSliderHiddenInputProps &
                  VNodeProps),
              },
            ),
          ],
        },
      );
    };
  },
});
