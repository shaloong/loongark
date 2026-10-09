import { defineComponent, h } from "vue";
import {
  LoongArkNavigationMenu,
  LoongArkNavigationMenuList,
  LoongArkNavigationMenuItem,
  LoongArkNavigationMenuLink,
} from "@loongark/vue";
export const NavigationMenuBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkNavigationMenu,
        {},
        {
          default: () => [
            h(
              LoongArkNavigationMenuList,
              {},
              {
                default: () => [
                  h(
                    LoongArkNavigationMenuItem,
                    {},
                    {
                      default: () => [
                        h(
                          LoongArkNavigationMenuLink,
                          { href: "#overview" },
                          { default: () => ["概览"] },
                        ),
                      ],
                    },
                  ),
                  h(
                    LoongArkNavigationMenuItem,
                    {},
                    {
                      default: () => [
                        h(
                          LoongArkNavigationMenuLink,
                          { href: "#reference" },
                          { default: () => ["API"] },
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
