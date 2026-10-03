import { defineComponent, h, ref, type PropType } from "vue";
import {
  LoongArkRatingGroupRoot,
  LoongArkRatingGroupLabel,
  LoongArkRatingGroupControl,
  LoongArkRatingGroupItem,
  LoongArkRatingGroupHiddenInput,
} from "@loongark/vue";
import type { RatingGroupSize } from "@loongark/primitives";

export const RatingGroupExample = defineComponent({
  name: "RatingGroupExample",
  props: {
    size: {
      type: String as PropType<RatingGroupSize>,
      default: "md",
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const value = ref(3);

    return () =>
      h(
        LoongArkRatingGroupRoot,
        {
          size: props.size,
          disabled: props.disabled,
          modelValue: value.value,
          onValueChange: (details: { value: number }) => {
            value.value = details.value;
          },
        },
        {
          default: () => [
            h(LoongArkRatingGroupLabel, null, { default: () => "Rating" }),
            h(LoongArkRatingGroupControl, null, {
              default: () =>
                [1, 2, 3, 4, 5].map((item) =>
                  h(
                    LoongArkRatingGroupItem,
                    { index: item, key: item },
                    {
                      default: () =>
                        h(
                          "svg",
                          { viewBox: "0 0 24 24", "aria-hidden": "true" },
                          [
                            h("path", {
                              d: "m12 3 2.8 5.7 6.3.9-4.5 4.4 1.1 6.3-5.7-3-5.7 3 1.1-6.3-4.5-4.4 6.3-.9Z",
                            }),
                          ],
                        ),
                    },
                  ),
                ),
            }),
            h(LoongArkRatingGroupHiddenInput),
          ],
        },
      );
  },
});
