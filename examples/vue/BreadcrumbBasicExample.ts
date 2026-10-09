import { defineComponent, h } from "vue";
import {
  LoongArkBreadcrumb,
  LoongArkBreadcrumbList,
  LoongArkBreadcrumbItem,
  LoongArkBreadcrumbLink,
  LoongArkBreadcrumbSeparator,
  LoongArkBreadcrumbPage,
} from "@loongark/vue";
export const BreadcrumbBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkBreadcrumb,
        {},
        {
          default: () => [
            h(
              LoongArkBreadcrumbList,
              {},
              {
                default: () => [
                  h(
                    LoongArkBreadcrumbItem,
                    {},
                    {
                      default: () => [
                        h(
                          LoongArkBreadcrumbLink,
                          { href: "#overview" },
                          { default: () => ["概览"] },
                        ),
                      ],
                    },
                  ),
                  h(LoongArkBreadcrumbSeparator, {}),
                  h(
                    LoongArkBreadcrumbItem,
                    {},
                    {
                      default: () => [
                        h(
                          LoongArkBreadcrumbPage,
                          {},
                          { default: () => ["组件"] },
                        ),
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
