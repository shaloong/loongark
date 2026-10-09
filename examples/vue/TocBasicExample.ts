import { defineComponent, h } from "vue";
import {
  LoongArkTocRoot,
  LoongArkTocNav,
  LoongArkTocTitle,
  LoongArkTocList,
  LoongArkTocItem,
  LoongArkTocLink,
} from "@loongark/vue";
export const TocBasicExample = defineComponent({
  setup() {
    return () => {
      return h("div", {}, [
        h(
          LoongArkTocRoot,
          {
            items: [
              { value: "intro", depth: 2 },
              { value: "usage", depth: 2 },
            ],
          },
          {
            default: () => [
              h(
                LoongArkTocNav,
                {},
                {
                  default: () => [
                    h(LoongArkTocTitle, {}, { default: () => ["本页目录"] }),
                    h(
                      LoongArkTocList,
                      {},
                      {
                        default: () => [
                          h(
                            LoongArkTocItem,
                            { item: { value: "intro", depth: 2 } },
                            {
                              default: () => [
                                h(
                                  LoongArkTocLink,
                                  { href: "#intro" },
                                  { default: () => ["介绍"] },
                                ),
                              ],
                            },
                          ),
                          h(
                            LoongArkTocItem,
                            { item: { value: "usage", depth: 2 } },
                            {
                              default: () => [
                                h(
                                  LoongArkTocLink,
                                  { href: "#usage" },
                                  { default: () => ["用法"] },
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
        ),
        h("article", {}, [
          h("h2", { id: "intro" }, ["介绍"]),
          h("p", {}, ["组件介绍。"]),
          h("h2", { id: "usage" }, ["用法"]),
          h("p", {}, ["组件用法。"]),
        ]),
      ]);
    };
  },
});
