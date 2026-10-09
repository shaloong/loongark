import { defineComponent, h } from "vue";
import {
  LoongArkRatingGroupRoot,
  LoongArkRatingGroupLabel,
  LoongArkRatingGroupControl,
  LoongArkRatingGroupItem,
  LoongArkRatingGroupHiddenInput,
} from "@loongark/vue";
export const RatingGroupBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkRatingGroupRoot,
        { count: 5, defaultValue: 3 },
        {
          default: () => [
            h(LoongArkRatingGroupLabel, {}, { default: () => ["评分"] }),
            h(
              LoongArkRatingGroupControl,
              {},
              {
                default: () => [
                  h(LoongArkRatingGroupItem, { index: 1 }),
                  h(LoongArkRatingGroupItem, { index: 2 }),
                  h(LoongArkRatingGroupItem, { index: 3 }),
                  h(LoongArkRatingGroupItem, { index: 4 }),
                  h(LoongArkRatingGroupItem, { index: 5 }),
                ],
              },
            ),
            h(LoongArkRatingGroupHiddenInput, { name: "rating" }),
          ],
        },
      );
    };
  },
});
