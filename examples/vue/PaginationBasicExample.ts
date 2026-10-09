import { defineComponent, h } from "vue";
import {
  LoongArkPaginationRoot,
  LoongArkPaginationPrevTrigger,
  LoongArkPaginationItem,
  LoongArkPaginationNextTrigger,
} from "@loongark/vue";
export const PaginationBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkPaginationRoot,
        { count: 50, pageSize: 10 },
        {
          default: () => [
            h(LoongArkPaginationPrevTrigger, {}, { default: () => ["上一页"] }),
            h(
              LoongArkPaginationItem,
              { type: "page", value: 1 },
              { default: () => ["1"] },
            ),
            h(
              LoongArkPaginationItem,
              { type: "page", value: 2 },
              { default: () => ["2"] },
            ),
            h(LoongArkPaginationNextTrigger, {}, { default: () => ["下一页"] }),
          ],
        },
      );
    };
  },
});
