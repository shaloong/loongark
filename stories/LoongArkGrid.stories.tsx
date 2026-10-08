import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as L from "@loongark/react";
function Demo() {
  return (
    <L.LoongArkGrid columns={3} gap="md">
      {["设计", "开发", "发布"].map((t) => (
        <L.LoongArkPaper key={t}>{t}</L.LoongArkPaper>
      ))}
    </L.LoongArkGrid>
  );
}
const meta = {
  title: "Components/Grid",
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
export const FourColumns: StoryObj = {
  render: () => (
    <L.LoongArkGrid columns={4} gap="sm">
      {["一", "二", "三", "四"].map((t) => (
        <L.LoongArkPaper key={t}>{t}</L.LoongArkPaper>
      ))}
    </L.LoongArkGrid>
  ),
};
