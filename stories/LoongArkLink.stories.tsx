import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as L from "@loongark/react";
function Demo() {
  return (
    <L.LoongArkStack orientation="horizontal">
      <L.LoongArkLink href="#documentation">查看文档</L.LoongArkLink>
      <L.LoongArkLink
        href="https://example.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        外部链接 ↗
      </L.LoongArkLink>
    </L.LoongArkStack>
  );
}
const meta = {
  title: "Components/Link",
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
