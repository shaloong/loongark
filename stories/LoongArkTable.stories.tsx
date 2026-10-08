import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as L from "@loongark/react";
const rows = [
  { id: "a", name: "Alpha", amount: 20 },
  { id: "b", name: "Beta", amount: 10 },
  { id: "c", name: "Gamma", amount: 35 },
];
const meta = {
  title: "Components/Table",
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
export const Basic: StoryObj = {
  render: () => (
    <div style={{ width: "min(100%, 560px)" }}>
      <L.LoongArkTableRoot>
        <L.LoongArkTable>
          <L.LoongArkTableCaption>Recent projects</L.LoongArkTableCaption>
          <L.LoongArkTableHeader>
            <L.LoongArkTableRow>
              <L.LoongArkTableHead>Name</L.LoongArkTableHead>
              <L.LoongArkTableHead>Revenue</L.LoongArkTableHead>
            </L.LoongArkTableRow>
          </L.LoongArkTableHeader>
          <L.LoongArkTableBody>
            {rows.map((row) => (
              <L.LoongArkTableRow key={row.id}>
                <L.LoongArkTableCell>{row.name}</L.LoongArkTableCell>
                <L.LoongArkTableCell>{row.amount}</L.LoongArkTableCell>
              </L.LoongArkTableRow>
            ))}
          </L.LoongArkTableBody>
        </L.LoongArkTable>
      </L.LoongArkTableRoot>
    </div>
  ),
};
