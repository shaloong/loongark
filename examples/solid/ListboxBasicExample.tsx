/** @jsxImportSource solid-js */

import {
  createListCollection,
  LoongArkListboxRoot,
  LoongArkListboxLabel,
  LoongArkListboxList,
  LoongArkListboxItem,
  LoongArkListboxItemText,
  LoongArkListboxItemIndicator,
} from "@loongark/solid";
export function ListboxBasicExample() {
  const collection = createListCollection({
    items: [
      { value: "beijing", label: "北京" },
      { value: "shanghai", label: "上海" },
    ],
  });
  return (
    <LoongArkListboxRoot collection={collection} defaultValue={["beijing"]}>
      <LoongArkListboxLabel>城市</LoongArkListboxLabel>
      <LoongArkListboxList>
        {collection.items.map((item) => (
          <LoongArkListboxItem item={item}>
            <LoongArkListboxItemText>{item.label}</LoongArkListboxItemText>
            <LoongArkListboxItemIndicator />
          </LoongArkListboxItem>
        ))}
      </LoongArkListboxList>
    </LoongArkListboxRoot>
  );
}
