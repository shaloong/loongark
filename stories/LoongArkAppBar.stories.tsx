import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as L from "@loongark/react";
function Demo() {
  return (
    <L.LoongArkAppBar>
      <L.LoongArkToolbar>
        <strong>LoongArk</strong>
        <nav aria-label="项目导航">
          <L.LoongArkStack orientation="horizontal" gap="md">
            <L.LoongArkLink href="#projects">项目</L.LoongArkLink>
            <L.LoongArkLink href="#members">成员</L.LoongArkLink>
          </L.LoongArkStack>
        </nav>
        <L.LoongArkButton variant="outline" size="sm">
          新建项目
        </L.LoongArkButton>
      </L.LoongArkToolbar>
    </L.LoongArkAppBar>
  );
}
const meta = {
  title: "Components/AppBar",
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
