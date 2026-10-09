import { defineComponent, h } from "vue";
import {
  LoongArkBottomNavigation,
  LoongArkBottomNavigationItem,
  LoongArkBottomNavigationLabel,
} from "@loongark/vue";
export const BottomNavigationBasicExample = defineComponent({
  setup() {
    return () => {
      return h(
        LoongArkBottomNavigation,
        { "aria-label": "主导航" },
        {
          default: () => [
            h(
              LoongArkBottomNavigationItem,
              { href: "#home", active: true },
              {
                default: () => [
                  h(
                    LoongArkBottomNavigationLabel,
                    {},
                    { default: () => ["首页"] },
                  ),
                ],
              },
            ),
            h(
              LoongArkBottomNavigationItem,
              { href: "#settings" },
              {
                default: () => [
                  h(
                    LoongArkBottomNavigationLabel,
                    {},
                    { default: () => ["设置"] },
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
