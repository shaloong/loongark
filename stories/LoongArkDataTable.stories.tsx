import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const rows = [
  { id: "a", name: "Alpha", amount: 20 },
  { id: "b", name: "Beta", amount: 10 },
  { id: "c", name: "Gamma", amount: 35 },
];
const columns = [
  { key: "name", label: "Name" },
  { key: "amount", label: "Revenue" },
];
const meta = {
  title: "Components/DataTable",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkDataTable data={rows} columns={columns} pageSize={2} />
    </div>
  ),
};
