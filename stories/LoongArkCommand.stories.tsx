import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const rows = [
  { id: "a", name: "Alpha", amount: 20 },
  { id: "b", name: "Beta", amount: 10 },
  { id: "c", name: "Gamma", amount: 35 },
];
function CommandDemo() {
  const [query, setQuery] = React.useState("");
  const items = L.filterCommandItems(rows, query, (item) => item.name);
  const collection = L.createCommandCollection({
    items,
    itemToString: (item) => item.name,
    itemToValue: (item) => item.id,
  });
  return (
    <L.LoongArkCommand.Root
      collection={collection}
      open
      inputValue={query}
      onInputValueChange={(d) => setQuery(d.inputValue)}
    >
      <L.LoongArkCommand.Label>Search projects</L.LoongArkCommand.Label>
      <L.LoongArkCommand.Control>
        <L.LoongArkCommand.Input placeholder="Type a command…" />
      </L.LoongArkCommand.Control>
      <L.LoongArkCommand.Content>
        {items.map((item) => (
          <L.LoongArkCommand.Item key={item.id} item={item}>
            <L.LoongArkCommand.ItemText>{item.name}</L.LoongArkCommand.ItemText>
          </L.LoongArkCommand.Item>
        ))}
      </L.LoongArkCommand.Content>
    </L.LoongArkCommand.Root>
  );
}
const meta = {
  title: "Components/Command",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <CommandDemo />
    </div>
  ),
};
