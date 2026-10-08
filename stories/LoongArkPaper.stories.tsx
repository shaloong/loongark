import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as L from "@loongark/react";
function Demo() {
  return (
    <L.LoongArkStack>
      <L.LoongArkPaper>默认内容面板</L.LoongArkPaper>
      <L.LoongArkPaper variant="muted">次级内容面板</L.LoongArkPaper>
    </L.LoongArkStack>
  );
}
const meta = {
  title: "Components/Paper",
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
