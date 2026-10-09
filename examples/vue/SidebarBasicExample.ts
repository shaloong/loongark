import { defineComponent, h } from "vue";
import {
  LoongArkSidebar,
  LoongArkSidebarHeader,
  LoongArkSidebarContent,
  LoongArkSidebarMenu,
  LoongArkSidebarMenuItem,
  LoongArkSidebarMenuButton,
} from "@loongark/vue";
export const SidebarBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkSidebar,
        {},
        {
          default: () => [
            h(LoongArkSidebarHeader, {}, { default: () => ["工作区"] }),
            h(
              LoongArkSidebarContent,
              {},
              {
                default: () => [
                  h(
                    LoongArkSidebarMenu,
                    {},
                    {
                      default: () => [
                        h(
                          LoongArkSidebarMenuItem,
                          {},
                          {
                            default: () => [
                              h(
                                LoongArkSidebarMenuButton,
                                {},
                                { default: () => ["概览"] },
                              ),
                            ],
                          },
                        ),
                        h(
                          LoongArkSidebarMenuItem,
                          {},
                          {
                            default: () => [
                              h(
                                LoongArkSidebarMenuButton,
                                {},
                                { default: () => ["设置"] },
                              ),
                            ],
                          },
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
