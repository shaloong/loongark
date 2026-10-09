import React from "react";
import { LoongArkChart } from "@loongark/react";
export function ChartBasicExample() {
  return (
    <LoongArkChart
      title="每月收入"
      type="bar"
      labelKey="month"
      data={[
        { month: "一月", amount: 20 },
        { month: "二月", amount: 35 },
      ]}
      series={[{ key: "amount", label: "收入" }]}
    />
  );
}
