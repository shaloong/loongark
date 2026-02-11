import { defineComponent, h, ref, type PropType } from "vue";
import {
  LoongArkColorPickerRoot,
  LoongArkColorPickerLabel,
  LoongArkColorPickerControl,
  LoongArkColorPickerTrigger,
  LoongArkColorPickerPositioner,
  LoongArkColorPickerContent,
  LoongArkColorPickerView,
  LoongArkColorPickerArea,
  LoongArkColorPickerAreaBackground,
  LoongArkColorPickerAreaThumb,
  LoongArkColorPickerChannelSlider,
  LoongArkColorPickerChannelSliderTrack,
  LoongArkColorPickerChannelSliderThumb,
  LoongArkColorPickerChannelInput,
  LoongArkColorPickerSwatchGroup,
  LoongArkColorPickerSwatchTrigger,
  LoongArkColorPickerSwatchIndicator,
  LoongArkColorPickerSwatch,
  LoongArkColorPickerValueText,
  LoongArkColorPickerValueSwatch,
} from "@loongark/vue";
import type { ColorPickerSize } from "@loongark/primitives";

const swatches = ["#0EA5E9", "#8B5CF6", "#F97316", "#10B981"];

export const ColorPickerExample = defineComponent({
  name: "ColorPickerExample",
  props: {
    size: {
      type: String as PropType<ColorPickerSize>,
      default: "md",
    },
  },
  setup(props) {
    const value = ref("#6366F1");

    return () =>
      h(
        LoongArkColorPickerRoot,
        {
          size: props.size,
          value: value.value,
          onValueChange: (details: { value: string }) => {
            value.value = details.value;
          },
        },
        {
          default: () => [
            h(LoongArkColorPickerLabel, null, {
              default: () => "Brand color",
            }),
            h(LoongArkColorPickerControl, null, {
              default: () =>
                h(LoongArkColorPickerTrigger, null, {
                  default: () => [
                    h(LoongArkColorPickerValueSwatch),
                    h(LoongArkColorPickerValueText),
                  ],
                }),
            }),
            h(LoongArkColorPickerPositioner, null, {
              default: () =>
                h(LoongArkColorPickerContent, null, {
                  default: () =>
                    h(
                      "div",
                      { style: { display: "grid", gap: "12px" } },
                      [
                        h(LoongArkColorPickerView, null, {
                          default: () => [
                            h(LoongArkColorPickerArea, null, {
                              default: () => [
                                h(LoongArkColorPickerAreaBackground),
                                h(LoongArkColorPickerAreaThumb),
                              ],
                            }),
                            h(
                              LoongArkColorPickerChannelSlider,
                              { channel: "h" },
                              {
                                default: () => [
                                  h(LoongArkColorPickerChannelSliderTrack),
                                  h(LoongArkColorPickerChannelSliderThumb),
                                ],
                              }
                            ),
                          ],
                        }),
                        h(LoongArkColorPickerChannelInput, { channel: "hex" }),
                        h(LoongArkColorPickerSwatchGroup, null, {
                          default: () =>
                            swatches.map((swatch) =>
                              h(
                                LoongArkColorPickerSwatchTrigger,
                                { value: swatch, key: swatch },
                                {
                                  default: () => [
                                    h(LoongArkColorPickerSwatch, { value: swatch }),
                                    h(LoongArkColorPickerSwatchIndicator),
                                  ],
                                }
                              )
                            ),
                        }),
                      ]
                    ),
                }),
            }),
          ],
        }
      );
  },
});
