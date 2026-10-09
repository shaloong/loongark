import React, { useState } from "react";
import {
  createListCollection,
  LoongArkComboboxRoot,
  LoongArkComboboxLabel,
  LoongArkComboboxControl,
  LoongArkComboboxInput,
  LoongArkComboboxTrigger,
  LoongArkComboboxPositioner,
  LoongArkComboboxContent,
  LoongArkComboboxList,
  LoongArkComboboxItem,
  LoongArkComboboxItemText,
} from "@loongark/react";
export function ComboboxBasicExample() {
  const [query, setQuery] = useState("");
  const options = [
    { value: "beijing", label: "北京" },
    { value: "shanghai", label: "上海" },
  ];
  const items = options.filter((item) => item.label.includes(query));
  const collection = createListCollection({ items });
  return (
    <LoongArkComboboxRoot
      collection={collection}
      inputValue={query}
      onInputValueChange={(details: { inputValue: string }) =>
        setQuery(details.inputValue)
      }
    >
      <LoongArkComboboxLabel>搜索城市</LoongArkComboboxLabel>
      <LoongArkComboboxControl>
        <LoongArkComboboxInput placeholder="输入城市名称" />
        <LoongArkComboboxTrigger aria-label="展开选项" />
      </LoongArkComboboxControl>
      <LoongArkComboboxPositioner>
        <LoongArkComboboxContent>
          <LoongArkComboboxList>
            {items.map((item) => (
              <LoongArkComboboxItem key={item.value} item={item}>
                <LoongArkComboboxItemText>
                  {item.label}
                </LoongArkComboboxItemText>
              </LoongArkComboboxItem>
            ))}
          </LoongArkComboboxList>
        </LoongArkComboboxContent>
      </LoongArkComboboxPositioner>
    </LoongArkComboboxRoot>
  );
}
