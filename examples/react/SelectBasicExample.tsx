import React from "react";
import {
  createListCollection,
  LoongArkSelectRoot,
  LoongArkSelectLabel,
  LoongArkSelectControl,
  LoongArkSelectTrigger,
  LoongArkSelectValueText,
  LoongArkSelectIndicator,
  LoongArkSelectPositioner,
  LoongArkSelectContent,
  LoongArkSelectList,
  LoongArkSelectItem,
  LoongArkSelectItemText,
  LoongArkSelectItemIndicator,
  LoongArkSelectHiddenSelect,
} from "@loongark/react";
export function SelectBasicExample() {
  const collection = createListCollection({
    items: [
      { value: "beijing", label: "北京" },
      { value: "shanghai", label: "上海" },
    ],
  });
  return (
    <LoongArkSelectRoot collection={collection} name="city">
      <LoongArkSelectLabel>城市</LoongArkSelectLabel>
      <LoongArkSelectControl>
        <LoongArkSelectTrigger>
          <LoongArkSelectValueText placeholder="选择城市" />
          <LoongArkSelectIndicator />
        </LoongArkSelectTrigger>
      </LoongArkSelectControl>
      <LoongArkSelectPositioner>
        <LoongArkSelectContent>
          <LoongArkSelectList>
            {collection.items.map((item) => (
              <LoongArkSelectItem key={item.value} item={item}>
                <LoongArkSelectItemText>{item.label}</LoongArkSelectItemText>
                <LoongArkSelectItemIndicator />
              </LoongArkSelectItem>
            ))}
          </LoongArkSelectList>
        </LoongArkSelectContent>
      </LoongArkSelectPositioner>
      <LoongArkSelectHiddenSelect />
    </LoongArkSelectRoot>
  );
}
