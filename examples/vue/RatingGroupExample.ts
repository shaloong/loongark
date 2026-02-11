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
                    { value: item, key: item },
                    { default: () => (item <= value.value ? "*" : "-") }
                  )
                ),
            }),
            h(LoongArkRatingGroupHiddenInput),
          ],
        }
      );
  },
});
