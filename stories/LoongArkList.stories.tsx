import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as L from "@loongark/react";
function Demo() {
  const [selected, setSelected] = React.useState("项目");
  return (
    <L.LoongArkList>
      {["项目", "成员", "设置"].map((name) => (
        <L.LoongArkListItem key={name}>
          <L.LoongArkListItemButton
            aria-pressed={selected === name}
            onClick={() => setSelected(name)}
          >
            <L.LoongArkListItemIcon>○</L.LoongArkListItemIcon>
            <L.LoongArkListItemText>
              {name}
              <L.LoongArkListItemDescription>
                管理{name}信息
              </L.LoongArkListItemDescription>
            </L.LoongArkListItemText>
          </L.LoongArkListItemButton>
        </L.LoongArkListItem>
      ))}
    </L.LoongArkList>
  );
}
const meta = {
  title: "Components/List",
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
