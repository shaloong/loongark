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

import { ChartAdvancedExample } from "../examples/react/ChartAdvancedExample";
import { withArkExamplePage } from "./arkStory";
export const Interactive = {
  parameters: {
    docs: {
      description: {
        story:
          "交互包含键盘数据浏览、受控拒绝、数据变化后的焦点修复与数据表替代。中文组合取消键不关闭提示；正常 Escape 仍关闭提示。",
      },
    },
  },
  decorators: [withArkExamplePage],
  render: () => <ChartAdvancedExample />,
};
export const DisabledControls = {
  decorators: [withArkExamplePage],
  render: () => (
    <L.LoongArkChart
      data={rows}
      series={[{ key: "amount", label: "Revenue" }]}
      labelKey="name"
      title="Disabled chart controls"
      interactive
      disabled
      showDataTable
    />
  ),
};

import { ChartInteractionExample } from "../examples/react/ChartInteractionExample";
export const ZoomAndBrush: StoryObj = {
  render: () => <ChartInteractionExample />,
};

import { ChartTypesExample } from "../examples/react/ChartTypesExample";
import { chartTypeOptions } from "../examples/shared/chartTypesDemo";
export const TypesAndAxes: StoryObj = {
  decorators: [withArkExamplePage],
  parameters: { pageWidth: 760, heading: "Chart types and axes" },
  render: () => <ChartTypesExample />,
};
const typePreview = (mode: Parameters<typeof chartTypeOptions>[0]) => (
  <div style={{ width: "min(100%,720px)" }}>
    <L.LoongArkChart
      {...chartTypeOptions(mode)}
      tooltip={false}
      zoomable={false}
    />
  </div>
);
export const StackedArea: StoryObj = {
  decorators: [withArkExamplePage],
  parameters: { pageWidth: 720, heading: "Stacked area" },
  render: () => typePreview("stacked-area"),
};
export const Donut: StoryObj = {
  decorators: [withArkExamplePage],
  parameters: { pageWidth: 720, heading: "Category distribution" },
  render: () => typePreview("donut"),
};
export const Scatter: StoryObj = {
  decorators: [withArkExamplePage],
  parameters: { pageWidth: 720, heading: "Independent coordinates" },
  render: () => typePreview("scatter"),
};
export const TimeAxis: StoryObj = {
  decorators: [withArkExamplePage],
  parameters: { pageWidth: 720, heading: "Irregular time intervals" },
  render: () => typePreview("time"),
};
export const LogAxis: StoryObj = {
  decorators: [withArkExamplePage],
  parameters: { pageWidth: 720, heading: "Logarithmic growth" },
  render: () => typePreview("log"),
};
