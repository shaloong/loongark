import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  LoongArkFilterBar,
  LoongArkFilterBarSearch,
  LoongArkFilterBarFilters,
  LoongArkFilterBarActions,
  LoongArkFilterDivider,
  LoongArkFilterChip,
  LoongArkInputLabel,
  LoongArkInputRoot,
  LoongArkInputControl,
  LoongArkInputHelperText,
  LoongArkButton,
} from "@loongark/react";

const meta: Meta = {
  title: "Components/Filter Bar",
  parameters: {
    docs: {
      description: {
        component:
          "LoongArkFilterBar composes search, filters, and actions into a unified toolbar layout.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

type FilterChipConfig = {
  id: string;
  label: string;
  badge?: number;
};

const chips: FilterChipConfig[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active", badge: 12 },
  { id: "pending", label: "Pending", badge: 3 },
  { id: "closed", label: "Closed" },
];

interface FilterBarDemoProps {
  dense?: boolean;
  align?: "start" | "center";
}

const FilterBarDemo = ({
  dense = false,
  align = "start",
}: FilterBarDemoProps) => {
  const [query, setQuery] = useState("");
  const [activeChip, setActiveChip] = useState("all");

  const handleReset = () => {
    setQuery("");
    setActiveChip("all");
  };

  return (
    <LoongArkFilterBar dense={dense} align={align}>
      <LoongArkFilterBarSearch>
        <LoongArkInputLabel>Search</LoongArkInputLabel>
        <LoongArkInputRoot>
          <LoongArkInputControl
            value={query}
            placeholder="Search items"
            onChange={(event: { currentTarget: HTMLInputElement }) =>
              setQuery(event.currentTarget.value)
            }
          />
        </LoongArkInputRoot>
        <LoongArkInputHelperText>
          Try filtering by status
        </LoongArkInputHelperText>
      </LoongArkFilterBarSearch>

      <LoongArkFilterDivider />

      <LoongArkFilterBarFilters>
        {chips.map((chip) => (
          <LoongArkFilterChip
            key={chip.id}
            active={chip.id === activeChip}
            onClick={() => setActiveChip(chip.id)}
          >
            {chip.label}
            {typeof chip.badge === "number" ? (
              <span data-part="chip-badge">{chip.badge}</span>
            ) : null}
          </LoongArkFilterChip>
        ))}
      </LoongArkFilterBarFilters>

      <LoongArkFilterBarActions>
        <LoongArkButton variant="ghost" onClick={handleReset}>
          Reset
        </LoongArkButton>
        <LoongArkButton>Apply</LoongArkButton>
      </LoongArkFilterBarActions>
    </LoongArkFilterBar>
  );
};

export const Basic: Story = {
  render: () => <FilterBarDemo />,
};

export const Dense: Story = {
  render: () => <FilterBarDemo dense />,
};

export const Centered: Story = {
  render: () => <FilterBarDemo align="center" />,
};
