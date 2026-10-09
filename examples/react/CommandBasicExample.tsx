import React, { useState } from "react";
import { createCommandCollection, LoongArkCommand } from "@loongark/react";
export function CommandBasicExample() {
  const [query, setQuery] = useState("");
  const options = [
    { value: "beijing", label: "北京" },
    { value: "shanghai", label: "上海" },
  ];
  const items = options.filter((item) => item.label.includes(query));
  const collection = createCommandCollection({ items });
  return (
    <LoongArkCommand.Root
      collection={collection}
      open
      inputValue={query}
      onInputValueChange={(details: { inputValue: string }) =>
        setQuery(details.inputValue)
      }
    >
      <LoongArkCommand.Label>搜索城市</LoongArkCommand.Label>
      <LoongArkCommand.Control>
        <LoongArkCommand.Input placeholder="输入城市名称" />
      </LoongArkCommand.Control>
      <LoongArkCommand.Content>
        {items.map((item) => (
          <LoongArkCommand.Item key={item.value} item={item}>
            <LoongArkCommand.ItemText>{item.label}</LoongArkCommand.ItemText>
          </LoongArkCommand.Item>
        ))}
      </LoongArkCommand.Content>
    </LoongArkCommand.Root>
  );
}
