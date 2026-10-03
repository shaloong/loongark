import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as L from "@loongark/react";
function Demo() {
  const [selected, setSelected] = React.useState("首页");
  return (
    <L.LoongArkBottomNavigation aria-label="主导航">
      {["首页", "搜索", "设置"].map((name) => (
        <L.LoongArkBottomNavigationItem
          key={name}
          href={"#" + name}
          active={selected === name}
          onClick={(e) => {
            e.preventDefault();
            setSelected(name);
          }}
        >
          <L.LoongArkBottomNavigationIcon>○</L.LoongArkBottomNavigationIcon>
          <L.LoongArkBottomNavigationLabel>
            {name}
          </L.LoongArkBottomNavigationLabel>
        </L.LoongArkBottomNavigationItem>
      ))}
    </L.LoongArkBottomNavigation>
  );
}
const meta = {
  title: "Components/BottomNavigation",
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
