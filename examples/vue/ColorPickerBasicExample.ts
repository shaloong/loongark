import { defineComponent, h } from "vue";
import {
  LoongArkColorPickerRoot,
  parseColor,
  LoongArkColorPickerLabel,
  LoongArkColorPickerControl,
  LoongArkColorPickerTrigger,
  LoongArkColorPickerValueSwatch,
  LoongArkColorPickerPositioner,
  LoongArkColorPickerContent,
  LoongArkColorPickerArea,
  LoongArkColorPickerAreaBackground,
  LoongArkColorPickerAreaThumb,
  LoongArkColorPickerChannelInput,
} from "@loongark/vue";
export const ColorPickerBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkColorPickerRoot,
        { defaultValue: parseColor("#006EFF") },
        {
          default: () => [
            h(LoongArkColorPickerLabel, {}, { default: () => ["颜色"] }),
            h(
              LoongArkColorPickerControl,
              {},
              {
                default: () => [
                  h(
                    LoongArkColorPickerTrigger,
                    {},
                    { default: () => [h(LoongArkColorPickerValueSwatch, {})] },
                  ),
                ],
              },
            ),
            h(
              LoongArkColorPickerPositioner,
              {},
              {
                default: () => [
                  h(
                    LoongArkColorPickerContent,
                    {},
                    {
                      default: () => [
                        h(
                          LoongArkColorPickerArea,
                          {},
                          {
                            default: () => [
                              h(LoongArkColorPickerAreaBackground, {}),
                              h(LoongArkColorPickerAreaThumb, {}),
                            ],
                          },
                        ),
                        h(LoongArkColorPickerChannelInput, { channel: "hex" }),
                      ],
                    },
                  ),
                ],
              },
            ),
          ],
        },
      );
    };
  },
});
