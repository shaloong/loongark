import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AvatarExample } from "../examples/react/AvatarExample";

const DEMO_AVATAR_SRC =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'><rect width='80' height='80' fill='%23D6E4FF'/><circle cx='40' cy='30' r='18' fill='%233A5BCC'/><rect x='16' y='52' width='48' height='18' rx='9' fill='%233A5BCC'/></svg>";

const meta: Meta<typeof AvatarExample> = {
  title: "Components/Avatar",
  component: AvatarExample,
  argTypes: {
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "inline-radio" },
    },
    name: { control: "text" },
    src: { control: "text" },
  },
  args: {
    size: "md",
    name: "Loong Ark",
    src: DEMO_AVATAR_SRC,
  },
  parameters: {
    docs: {
      description: {
        component:
          "LoongArkAvatar wraps Ark UI Avatar with token-driven sizing and fallback styling.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AvatarExample>;

export const Playground: Story = {
  render: (args) => <AvatarExample {...args} />,
};

export const FallbackOnly: Story = {
  args: {
    src: "",
    name: "Loong Ark",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <AvatarExample size="sm" name="Small" src={DEMO_AVATAR_SRC} />
      <AvatarExample size="md" name="Medium" src={DEMO_AVATAR_SRC} />
      <AvatarExample size="lg" name="Large" src={DEMO_AVATAR_SRC} />
    </div>
  ),
};
