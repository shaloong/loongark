import { defineComponent, h } from "vue";
import {
  LoongArkSliderRoot,
  LoongArkSliderLabel,
  LoongArkSliderControl,
  LoongArkSliderTrack,
  LoongArkSliderRange,
  LoongArkSliderThumb,
  LoongArkSliderValueText,
} from "@loongark/vue";
export const SliderBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkSliderRoot,
        { defaultValue: [50] },
        {
          default: () => [
            h(LoongArkSliderLabel, {}, { default: () => ["音量"] }),
            h(
              LoongArkSliderControl,
              {},
              {
                default: () => [
                  h(
                    LoongArkSliderTrack,
                    {},
                    { default: () => [h(LoongArkSliderRange, {})] },
                  ),
                  h(LoongArkSliderThumb, { index: 0 }),
                ],
              },
            ),
            h(LoongArkSliderValueText, {}),
          ],
        },
      );
    };
  },
});
