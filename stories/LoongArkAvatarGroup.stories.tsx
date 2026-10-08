import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as L from "@loongark/react";
function Demo() {
  return (
    <L.LoongArkAvatarGroup role="group" aria-label="项目成员">
      {["LA", "JL", "MK"].map((name) => (
        <L.LoongArkAvatarRoot key={name}>
          <L.LoongArkAvatarFallback>{name}</L.LoongArkAvatarFallback>
        </L.LoongArkAvatarRoot>
      ))}
      <L.LoongArkAvatarGroupOverflow aria-label="另有 3 位成员">
        +3
      </L.LoongArkAvatarGroupOverflow>
    </L.LoongArkAvatarGroup>
  );
}
const meta = {
  title: "Components/AvatarGroup",
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
