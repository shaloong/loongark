import { defineComponent, h, ref } from "vue";
import * as L from "@loongark/vue";
const rows = [
  { id: "overview", name: "组件概览" },
  { id: "api", name: "API 参考" },
  { id: "release", name: "发布说明" },
];
export const CommandExample = defineComponent({
  setup() {
    const query = ref("");
    return () => {
      const items = L.filterCommandItems(
        rows,
        query.value,
        (item) => item.name,
      );
      const collection = L.createCommandCollection({
        items,
        itemToString: (item) => item.name,
        itemToValue: (item) => item.id,
      });
      return h(
        L.LoongArkCommand.Root<(typeof rows)[number]>,
        {
          collection,
          open: true,
          inputValue: query.value,
          onInputValueChange: (details: { inputValue: string }) =>
            (query.value = details.inputValue),
        },
        () => [
          h(L.LoongArkCommand.Label, {}, () => "搜索命令"),
          h(L.LoongArkCommand.Control, {}, () =>
            h(L.LoongArkCommand.Input, {
              placeholder: "搜索组件、API 或发布说明",
            }),
          ),
          h(L.LoongArkCommand.Content, {}, () =>
            items.map((item) =>
              h(L.LoongArkCommand.Item, { item, key: item.id }, () =>
                h(L.LoongArkCommand.ItemText, {}, () => item.name),
              ),
            ),
          ),
        ],
      );
    };
  },
});
