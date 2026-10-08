import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as L from "@loongark/react";
function Demo() {
  return (
    <L.LoongArkStack gap="sm">
      {["第一项", "第二项", "第三项"].map((t) => (
        <L.LoongArkPaper key={t}>{t}</L.LoongArkPaper>
      ))}
    </L.LoongArkStack>
  );
}
const meta = {
  title: "Components/Stack",
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
export const Horizontal: StoryObj = {
  render: () => (
    <L.LoongArkStack orientation="horizontal" gap="sm">
      {["第一项", "第二项", "第三项"].map((t) => (
        <L.LoongArkPaper key={t}>{t}</L.LoongArkPaper>
      ))}
    </L.LoongArkStack>
  ),
};
