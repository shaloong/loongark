import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  LoongArkRatingGroupRoot,
  LoongArkRatingGroupLabel,
  LoongArkRatingGroupControl,
  LoongArkRatingGroupItem,
  LoongArkRatingGroupHiddenInput,
} from "@loongark/react";

const meta: Meta = {
  title: "Components/RatingGroup",
  parameters: {
    docs: {
      description: {
        component: "LoongArkRatingGroup shows interactive star-style ratings.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

interface RatingGroupDemoProps {
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  max?: number;
}

const RatingGroupDemo = ({
  size = "md",
  disabled = false,
  max = 5,
}: RatingGroupDemoProps) => {
  const [value, setValue] = React.useState(3);
  const items = Array.from({ length: max }, (_, index) => index + 1);

  return (
    <LoongArkRatingGroupRoot
      size={size}
      disabled={disabled}
      value={value}
      onValueChange={(details: { value: number }) => setValue(details.value)}
    >
      <LoongArkRatingGroupLabel>Rating</LoongArkRatingGroupLabel>
      <LoongArkRatingGroupControl>
        {items.map((item) => (
          <LoongArkRatingGroupItem key={item} value={item}>
            {item <= value ? "*" : "-"}
          </LoongArkRatingGroupItem>
        ))}
      </LoongArkRatingGroupControl>
      <LoongArkRatingGroupHiddenInput />
    </LoongArkRatingGroupRoot>
  );
};

export const Basic: Story = {
  render: () => <RatingGroupDemo />,
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <RatingGroupDemo max={5} />
      <RatingGroupDemo max={3} />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <RatingGroupDemo disabled={false} />
      <RatingGroupDemo disabled />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <RatingGroupDemo size="sm" />
      <RatingGroupDemo size="md" />
      <RatingGroupDemo size="lg" />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => <RatingGroupDemo />,
};
