import { defineComponent, h } from "vue";
import {
  LoongArkTable,
  LoongArkTableCaption,
  LoongArkTableHeader,
  LoongArkTableRow,
  LoongArkTableHead,
  LoongArkTableBody,
  LoongArkTableCell,
} from "@loongark/vue";
export const TableBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkTable,
        {},
        {
          default: () => [
            h(LoongArkTableCaption, {}, { default: () => ["发布组件"] }),
            h(
              LoongArkTableHeader,
              {},
              {
                default: () => [
                  h(
                    LoongArkTableRow,
                    {},
                    {
                      default: () => [
                        h(LoongArkTableHead, {}, { default: () => ["框架"] }),
                        h(LoongArkTableHead, {}, { default: () => ["状态"] }),
                      ],
                    },
                  ),
                ],
              },
            ),
            h(
              LoongArkTableBody,
              {},
              {
                default: () => [
                  h(
                    LoongArkTableRow,
                    {},
                    {
                      default: () => [
                        h(
                          LoongArkTableCell,
                          {},
                          { default: () => ["React / Vue / Solid / Svelte"] },
                        ),
                        h(LoongArkTableCell, {}, { default: () => ["支持"] }),
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
