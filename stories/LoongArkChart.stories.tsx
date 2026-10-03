import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const rows = [
  { id: "a", name: "Alpha", amount: 20 },
  { id: "b", name: "Beta", amount: 10 },
  { id: "c", name: "Gamma", amount: 35 },
];
const meta = {
  title: "Components/Chart",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkChart
        data={rows}
        series={[{ key: "amount", label: "Revenue" }]}
        labelKey="name"
        title="Revenue by project"
        type="bar"
      />
    </div>
  ),
};
export const Empty: StoryObj = {
  render: () => (
    <L.LoongArkChart
      data={[]}
      series={[{ key: "amount", label: "Revenue" }]}
      labelKey="name"
      title="Revenue"
      labels={{ empty: "暂无数据", series: "数据系列" }}
    />
  ),
};
export const MissingValues: StoryObj = {
  render: () => (
    <L.LoongArkChart
      data={[
        { name: "Monday", amount: 10 },
        { name: "Tuesday", amount: null },
        { name: "Wednesday", amount: 5 },
      ]}
      series={[{ key: "amount", label: "Completed runs" }]}
      labelKey="name"
      title="Availability"
    />
  ),
};
export const ExtremeValues: StoryObj = {
  render: () => (
    <L.LoongArkChart
      data={[
        { name: "Loss", amount: -1e308 },
        { name: "Neutral", amount: 0 },
        { name: "Gain", amount: 1e308 },
      ]}
      series={[{ key: "amount", label: "Balance" }]}
      labelKey="name"
      title="Extreme balance"
    />
  ),
};
