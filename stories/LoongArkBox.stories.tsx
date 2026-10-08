import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as L from "@loongark/react";
function Demo() {
  return (
    <L.LoongArkBox
      padding="lg"
      style={{ border: "1px dashed var(--lk-color-semantic-border)" }}
    >
      由共享间距 Token 控制的内容区
    </L.LoongArkBox>
  );
}
const meta = {
  title: "Components/Box",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%,720px)" }}>
      <Demo />
    </div>
  ),
};
