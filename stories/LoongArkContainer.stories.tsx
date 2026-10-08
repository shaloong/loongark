import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as L from "@loongark/react";
function Demo() {
  return (
    <L.LoongArkContainer padding="md">
      <L.LoongArkPaper>居中内容容器，最大宽度 1200px。</L.LoongArkPaper>
    </L.LoongArkContainer>
  );
}
const meta = {
  title: "Components/Container",
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
