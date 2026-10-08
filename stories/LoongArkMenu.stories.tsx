import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  LoongArkMenuRoot,
  LoongArkMenuTrigger,
  LoongArkMenuPositioner,
  LoongArkMenuContent,
  LoongArkMenuItem,
  LoongArkMenuItemText,
  LoongArkMenuSeparator,
  LoongArkMenuCheckboxItem,
  LoongArkMenuRadioItem,
  LoongArkMenuRadioItemGroup,
  LoongArkMenuItemIndicator,
  LoongArkMenuItemGroupLabel,
  LoongArkMenuItemGroup,
} from "@loongark/react";
import { LoongArkButton } from "@loongark/react";

const meta: Meta = {
  title: "Components/Menu",
  parameters: {
    docs: {
      description: {
        component:
          "LoongArkMenu wraps Ark UI Menu with size variants and shared menu styling.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

interface MenuDemoProps {
  size?: "sm" | "md" | "lg";
}

const MenuDemo = ({ size = "md" }: MenuDemoProps) => (
  <LoongArkMenuRoot size={size}>
    <LoongArkMenuTrigger asChild>
      <LoongArkButton variant="outline">Open menu</LoongArkButton>
    </LoongArkMenuTrigger>
    <LoongArkMenuPositioner>
      <LoongArkMenuContent>
        <LoongArkMenuItem value="profile">
          <LoongArkMenuItemText>Profile</LoongArkMenuItemText>
        </LoongArkMenuItem>
        <LoongArkMenuItem value="settings">
          <LoongArkMenuItemText>Settings</LoongArkMenuItemText>
        </LoongArkMenuItem>
        <LoongArkMenuSeparator />
        <LoongArkMenuItem value="logout">
          <LoongArkMenuItemText>Sign out</LoongArkMenuItemText>
        </LoongArkMenuItem>
      </LoongArkMenuContent>
    </LoongArkMenuPositioner>
  </LoongArkMenuRoot>
);

export const Basic: Story = {
  render: () => <MenuDemo />,
};

export const Options: Story = {
  render: () => {
    const [notifications, setNotifications] = React.useState(true);
    const [compact, setCompact] = React.useState(false);
    const [density, setDensity] = React.useState("comfortable");

    return (
      <LoongArkMenuRoot>
        <LoongArkMenuTrigger asChild>
          <LoongArkButton variant="outline">Preferences</LoongArkButton>
        </LoongArkMenuTrigger>
        <LoongArkMenuPositioner>
          <LoongArkMenuContent>
            <LoongArkMenuCheckboxItem
              value="notifications"
              checked={notifications}
              onCheckedChange={setNotifications}
            >
              <LoongArkMenuItemText>Notifications</LoongArkMenuItemText>
              <LoongArkMenuItemIndicator>x</LoongArkMenuItemIndicator>
            </LoongArkMenuCheckboxItem>
            <LoongArkMenuCheckboxItem
              value="compact"
              checked={compact}
              onCheckedChange={setCompact}
            >
              <LoongArkMenuItemText>Compact mode</LoongArkMenuItemText>
              <LoongArkMenuItemIndicator>x</LoongArkMenuItemIndicator>
            </LoongArkMenuCheckboxItem>
            <LoongArkMenuSeparator />
            <LoongArkMenuItemGroup>
              <LoongArkMenuItemGroupLabel>Density</LoongArkMenuItemGroupLabel>
              <LoongArkMenuRadioItemGroup
                id="density"
                value={density}
                onValueChange={(details) => setDensity(details.value)}
              >
                <LoongArkMenuRadioItem value="comfortable">
                  <LoongArkMenuItemText>Comfortable</LoongArkMenuItemText>
                  <LoongArkMenuItemIndicator>x</LoongArkMenuItemIndicator>
                </LoongArkMenuRadioItem>
                <LoongArkMenuRadioItem value="compact">
                  <LoongArkMenuItemText>Compact</LoongArkMenuItemText>
                  <LoongArkMenuItemIndicator>x</LoongArkMenuItemIndicator>
                </LoongArkMenuRadioItem>
              </LoongArkMenuRadioItemGroup>
            </LoongArkMenuItemGroup>
          </LoongArkMenuContent>
        </LoongArkMenuPositioner>
      </LoongArkMenuRoot>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      <MenuDemo size="sm" />
      <MenuDemo size="md" />
      <MenuDemo size="lg" />
    </div>
  ),
};
