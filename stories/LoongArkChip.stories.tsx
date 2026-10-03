import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as L from "@loongark/react";
function Demo() {
  const [shown, setShown] = React.useState(true);
  const [submits, setSubmits] = React.useState(0);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmits((v) => v + 1);
      }}
    >
      <L.LoongArkStack orientation="horizontal">
        {shown ? (
          <L.LoongArkChip>
            <L.LoongArkChipLabel>设计规范</L.LoongArkChipLabel>
            <L.LoongArkChipRemoveTrigger
              aria-label="移除设计规范"
              onClick={() => setShown(false)}
            >
              ×
            </L.LoongArkChipRemoveTrigger>
          </L.LoongArkChip>
        ) : (
          <L.LoongArkButton variant="outline" onClick={() => setShown(true)}>
            恢复标签
          </L.LoongArkButton>
        )}
        <span data-testid="form-submits">提交次数：{submits}</span>
      </L.LoongArkStack>
    </form>
  );
}
const meta = {
  title: "Components/Chip",
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
export const Variants: StoryObj = {
  render: () => (
    <L.LoongArkStack orientation="horizontal">
      {(["default", "outline", "destructive"] as const).map((variant) => (
        <L.LoongArkChip key={variant} variant={variant}>
          <L.LoongArkChipLabel>{variant}</L.LoongArkChipLabel>
          <L.LoongArkChipRemoveTrigger disabled aria-label={"移除 " + variant}>
            ×
          </L.LoongArkChipRemoveTrigger>
        </L.LoongArkChip>
      ))}
    </L.LoongArkStack>
  ),
};
