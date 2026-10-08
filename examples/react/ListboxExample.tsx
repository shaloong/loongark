import React, { useMemo, useState } from "react";
import { createListCollection } from "@ark-ui/react";
import {
  LoongArkListboxRoot,
  LoongArkListboxLabel,
  LoongArkListboxList,
  LoongArkListboxItem,
  LoongArkListboxItemText,
  LoongArkListboxItemIndicator,
} from "@loongark/react";
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

export const ListboxExample: React.FC<ListboxExampleProps> = ({
  size = "md",
  orientation = "vertical",
}) => {
  const [value, setValue] = useState<string[]>(["beijing"]);
  const collection = useMemo(
    () => createListCollection({ items: options }),
    [],
  );

  return (
    <LoongArkListboxRoot
      collection={collection}
      value={value}
      onValueChange={(details: { value: string[] }) => setValue(details.value)}
      size={size}
      orientation={orientation}
    >
      <LoongArkListboxLabel>City</LoongArkListboxLabel>
      <LoongArkListboxList>
        {options.map((option) => (
          <LoongArkListboxItem key={option.value} item={option}>
            <LoongArkListboxItemText>{option.label}</LoongArkListboxItemText>
            <LoongArkListboxItemIndicator>Check</LoongArkListboxItemIndicator>
          </LoongArkListboxItem>
        ))}
      </LoongArkListboxList>
    </LoongArkListboxRoot>
  );
};
