import type { Meta, StoryObj } from "@storybook/react";
import { ComboboxExample } from "../examples/react/ComboboxExample";

/**
 * Combobox component.
 *
 * Searchable select input based on Ark UI Combobox.
 */
const meta: Meta<typeof ComboboxExample> = {
  title: "Components/Combobox",
  component: ComboboxExample,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "inline-radio" },
      options: ["sm", "md", "lg"],
      description: "Combobox size",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable input",
    },
    label: {
      control: { type: "text" },
      description: "Label text",
    },
    placeholder: {
      control: { type: "text" },
      description: "Input placeholder",
    },
  },
  args: {
    size: "md",
    disabled: false,
    label: "City",
    placeholder: "Search...",
  },
};

export default meta;
type Story = StoryObj<typeof ComboboxExample>;

export const Playground: Story = {};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
