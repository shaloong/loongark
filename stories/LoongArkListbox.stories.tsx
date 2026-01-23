import React, { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { createListCollection } from "@ark-ui/react";
import {
  LoongArkListboxRoot,
  LoongArkListboxLabel,
  LoongArkListboxList,
  LoongArkListboxItem,
  LoongArkListboxItemText,
  LoongArkListboxItemIndicator,
  LoongArkListboxItemGroup,
  LoongArkListboxItemGroupLabel,
} from "@loongark/react";

const meta: Meta = {
  title: "Components/Listbox",
  parameters: {
    docs: {
      description: {
        component:
          "LoongArkListbox provides a token-driven listbox surface with selection states.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

interface ListboxDemoProps {
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
}

const listOptions = [
  { label: "Beijing", value: "beijing", group: "China" },
  { label: "Shanghai", value: "shanghai", group: "China" },
  { label: "Guangzhou", value: "guangzhou", group: "China" },
  { label: "Tokyo", value: "tokyo", group: "Japan" },
  { label: "Osaka", value: "osaka", group: "Japan" },
];

const ListboxDemo = ({ size = "md", orientation = "vertical" }: ListboxDemoProps) => {
  const [value, setValue] = useState<string[]>(["beijing"]);
  const collection = useMemo(
    () => createListCollection({ items: listOptions }),
    []
  );
  const groups = Array.from(
    new Set(listOptions.map((option) => option.group))
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
        {groups.map((group) => (
          <LoongArkListboxItemGroup key={group}>
            <LoongArkListboxItemGroupLabel>{group}</LoongArkListboxItemGroupLabel>
            {listOptions
              .filter((option) => option.group === group)
              .map((option) => (
                <LoongArkListboxItem key={option.value} item={option}>
                  <LoongArkListboxItemText>{option.label}</LoongArkListboxItemText>
                  <LoongArkListboxItemIndicator>Check</LoongArkListboxItemIndicator>
                </LoongArkListboxItem>
              ))}
          </LoongArkListboxItemGroup>
        ))}
      </LoongArkListboxList>
    </LoongArkListboxRoot>
  );
};

export const Basic: Story = {
  render: () => <ListboxDemo />,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <ListboxDemo size="sm" />
      <ListboxDemo size="md" />
      <ListboxDemo size="lg" />
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => <ListboxDemo orientation="horizontal" />,
};
