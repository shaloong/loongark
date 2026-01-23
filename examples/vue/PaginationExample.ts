import { defineComponent, h, ref, type PropType } from "vue";
import {
  LoongArkPaginationRoot,
  LoongArkPaginationList,
  LoongArkPaginationItem,
  LoongArkPaginationPrevTrigger,
  LoongArkPaginationNextTrigger,
} from "@loongark/vue";
import type {
  PaginationOrientation,
  PaginationSize,
} from "@loongark/primitives";

export const PaginationExample = defineComponent({
  name: "PaginationExample",
  props: {
    size: {
      type: String as PropType<PaginationSize>,
      default: "md",
    },
    orientation: {
      type: String as PropType<PaginationOrientation>,
      default: "horizontal",
    },
  },
  setup(props) {
    const page = ref(1);
    const totalPages = 6;
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    const selectPage = (value: number) => {
      page.value = value;
    };

    return () =>
      h(
        LoongArkPaginationRoot,
        { size: props.size, orientation: props.orientation },
        {
          default: () => [
            h(
              LoongArkPaginationPrevTrigger,
              {
                disabled: page.value === 1,
                onClick: () => selectPage(Math.max(1, page.value - 1)),
              },
              { default: () => "Prev" }
            ),
            h(
              LoongArkPaginationList,
              {},
              {
                default: () =>
                  pages.map((value) =>
                    h(
                      LoongArkPaginationItem,
                      {
                        key: value,
                        "aria-current": page.value === value ? "page" : undefined,
                        "data-selected": page.value === value ? "true" : undefined,
                        onClick: () => selectPage(value),
                      },
                      { default: () => value }
                    )
                  ),
              }
            ),
            h(
              LoongArkPaginationNextTrigger,
              {
                disabled: page.value === totalPages,
                onClick: () => selectPage(Math.min(totalPages, page.value + 1)),
              },
              { default: () => "Next" }
            ),
          ],
        }
      );
  },
});
