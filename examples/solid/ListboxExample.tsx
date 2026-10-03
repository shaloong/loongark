/** @jsxImportSource solid-js */
import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import { createListCollection } from "@loongark/solid";
import {
  LoongArkListboxRoot,
  LoongArkListboxLabel,
  LoongArkListboxList,
  LoongArkListboxItem,
  LoongArkListboxItemText,
  LoongArkListboxItemIndicator,
} from "@loongark/solid";
import type { ListboxOrientation, ListboxSize } from "@loongark/primitives";

export interface ListboxExampleProps {
  size?: ListboxSize;
  orientation?: ListboxOrientation;
}

const options = [
  { label: "Beijing", value: "beijing" },
  { label: "Shanghai", value: "shanghai" },
  { label: "Guangzhou", value: "guangzhou" },
  { label: "Shenzhen", value: "shenzhen" },
  { label: "Hangzhou", value: "hangzhou" },
];

export const ListboxExample: Component<ListboxExampleProps> = (props) => {
  const size = () => props.size ?? "md";
  const orientation = () => props.orientation ?? "vertical";
  const [value, setValue] = createSignal<string[]>(["beijing"]);
  const collection = createListCollection({ items: options });

  return (
    <LoongArkListboxRoot
      collection={collection}
      value={value()}
      onValueChange={(details: { value: string[] }) => setValue(details.value)}
      size={size()}
      orientation={orientation()}
    >
      <LoongArkListboxLabel>City</LoongArkListboxLabel>
      <LoongArkListboxList>
        {options.map((option) => (
          <LoongArkListboxItem item={option}>
            <LoongArkListboxItemText>{option.label}</LoongArkListboxItemText>
            <LoongArkListboxItemIndicator>Check</LoongArkListboxItemIndicator>
          </LoongArkListboxItem>
        ))}
      </LoongArkListboxList>
    </LoongArkListboxRoot>
  );
};
