import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  LoongArkAccordionRoot,
  LoongArkAccordionItem,
  LoongArkAccordionItemTrigger,
  LoongArkAccordionItemContent,
  LoongArkAccordionItemIndicator,
} from "@loongark/react";

const meta: Meta = {
  title: "Components/Accordion",
  parameters: {
    docs: {
      description: {
        component:
          "LoongArkAccordion wraps Ark UI Accordion and keeps size/orientation consistent with primitives.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

interface AccordionDemoProps {
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
}

const panelStyle = { color: "var(--lk-color-semantic-foreground)" };

const AccordionDemo = ({
  size = "md",
  orientation = "vertical",
}: AccordionDemoProps) => (
  <LoongArkAccordionRoot
    defaultValue={["item-1"]}
    size={size}
    orientation={orientation}
    collapsible
  >
    <LoongArkAccordionItem value="item-1">
      <LoongArkAccordionItemTrigger>
        <span>Account settings</span>
        <LoongArkAccordionItemIndicator>&gt;</LoongArkAccordionItemIndicator>
      </LoongArkAccordionItemTrigger>
      <LoongArkAccordionItemContent>
        <div style={panelStyle}>
          Update your profile, email, and security settings.
        </div>
      </LoongArkAccordionItemContent>
    </LoongArkAccordionItem>
    <LoongArkAccordionItem value="item-2">
      <LoongArkAccordionItemTrigger>
        <span>Billing</span>
        <LoongArkAccordionItemIndicator>&gt;</LoongArkAccordionItemIndicator>
      </LoongArkAccordionItemTrigger>
      <LoongArkAccordionItemContent>
        <div style={panelStyle}>
          Manage plans, invoices, and payment methods.
        </div>
      </LoongArkAccordionItemContent>
    </LoongArkAccordionItem>
    <LoongArkAccordionItem value="item-3">
      <LoongArkAccordionItemTrigger>
        <span>Integrations</span>
        <LoongArkAccordionItemIndicator>&gt;</LoongArkAccordionItemIndicator>
      </LoongArkAccordionItemTrigger>
      <LoongArkAccordionItemContent>
        <div style={panelStyle}>
          Connect third-party services and manage tokens.
        </div>
      </LoongArkAccordionItemContent>
    </LoongArkAccordionItem>
  </LoongArkAccordionRoot>
);

export const Basic: Story = {
  render: () => <AccordionDemo />,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <AccordionDemo size="sm" />
      <AccordionDemo size="md" />
      <AccordionDemo size="lg" />
    </div>
  ),
};
