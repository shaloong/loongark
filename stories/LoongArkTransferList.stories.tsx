import type { Meta, StoryObj } from "@storybook/react-vite";
import * as L from "@loongark/react";
const items = [
  { value: "design", label: "Design" },
  { value: "docs", label: "Documentation" },
  { value: "dev", label: "Development" },
  { value: "support", label: "Support", disabled: true },
];
const meta = {
  title: "Components/TransferList",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%,800px)" }}>
      <L.LoongArkTransferList items={items} defaultValue={["dev"]} />
    </div>
  ),
};
export const Disabled: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%,800px)" }}>
      <L.LoongArkTransferList items={items} defaultValue={["dev"]} disabled />
    </div>
  ),
};
export const Empty: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%,800px)" }}>
      <L.LoongArkTransferList items={[]} />
    </div>
  ),
};
