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
  parseColor,
} from "@loongark/vue";
import type { ColorPickerSize } from "@loongark/primitives";

const swatches = ["#006EFF", "#0A3565", "#5AC8FA", "#F58220"];

export const ColorPickerExample = defineComponent({
  name: "ColorPickerExample",
  props: {
    size: {
      type: String as PropType<ColorPickerSize>,
      default: "md",
    },
  },
  setup(props) {
    const value = ref(parseColor("#006EFF"));

    return () =>
      h(
        LoongArkColorPickerRoot,
        {
          size: props.size,
          defaultFormat: "hsla",
          modelValue: value.value,
          onValueChange: (details: {
            value: ReturnType<typeof parseColor>;
          }) => {
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
                h(
                  LoongArkColorPickerContent,
                  { "aria-label": "Choose brand color" },
                  {
                    default: () =>
                      h("div", { style: { display: "grid", gap: "12px" } }, [
                        h(
                          LoongArkColorPickerView,
                          { format: "hsla" },
                          {
                            default: () => [
                              h(LoongArkColorPickerArea, null, {
                                default: () => [
                                  h(LoongArkColorPickerAreaBackground),
                                  h(LoongArkColorPickerAreaThumb),
                                ],
                              }),
                              h(
                                LoongArkColorPickerChannelSlider,
                                { channel: "hue" },
                                {
                                  default: () => [
                                    h(LoongArkColorPickerChannelSliderTrack),
                                    h(LoongArkColorPickerChannelSliderThumb),
                                  ],
                                },
                              ),
                            ],
                          },
                        ),
                        h(LoongArkColorPickerChannelInput, { channel: "hex" }),
                        h(LoongArkColorPickerSwatchGroup, null, {
                          default: () =>
                            swatches.map((swatch) =>
                              h(
                                LoongArkColorPickerSwatchTrigger,
                                { value: swatch, key: swatch },
                                {
                                  default: () => [
                                    h(
                                      LoongArkColorPickerSwatch,
                                      { value: swatch },
                                      {
                                        default: () =>
                                          h(LoongArkColorPickerSwatchIndicator),
                                      },
                                    ),
                                  ],
                                },
                              ),
                            ),
                        }),
                      ]),
                  },
                ),
            }),
          ],
        },
      );
  },
});
