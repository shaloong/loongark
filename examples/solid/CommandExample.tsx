/** @jsxImportSource solid-js */
import { createSignal, createMemo } from "solid-js";
import * as L from "@loongark/solid";
const rows = [
  { id: "overview", name: "组件概览" },
  { id: "api", name: "API 参考" },
  { id: "release", name: "发布说明" },
];
export function CommandExample() {
  const [query, setQuery] = createSignal("");
  const data = createMemo(() => {
    const items = L.filterCommandItems(rows, query(), (item) => item.name);
    const collection = L.createCommandCollection({
      items,
      itemToString: (item) => item.name,
      itemToValue: (item) => item.id,
    });
    return { items, collection };
  });
  return (
    <L.LoongArkCommand.Root
      collection={data().collection}
      open
      inputValue={query()}
      onInputValueChange={(details) => setQuery(details.inputValue)}
    >
      <L.LoongArkCommand.Label>搜索命令</L.LoongArkCommand.Label>
      <L.LoongArkCommand.Control>
        <L.LoongArkCommand.Input placeholder="搜索组件、API 或发布说明" />
      </L.LoongArkCommand.Control>
      <L.LoongArkCommand.Content>
        {data().items.map((item) => (
          <L.LoongArkCommand.Item item={item}>
            <L.LoongArkCommand.ItemText>{item.name}</L.LoongArkCommand.ItemText>
          </L.LoongArkCommand.Item>
        ))}
      </L.LoongArkCommand.Content>
    </L.LoongArkCommand.Root>
  );
}
