import type { ChartSeries, DataRow } from "@loongark/kit";
export const insightSeries: readonly ChartSeries[] = [
  { key: "revenue", label: "Revenue" },
  { key: "costs", label: "Operating costs" },
  { key: "margin", label: "Margin" },
];
export const insightRows: readonly DataRow[] = [
  { quarter: "Q1", revenue: 40, costs: 24, margin: 16 },
  { quarter: "Q2", revenue: 48, costs: 26, margin: 22 },
  { quarter: "Q3", revenue: 64, costs: null, margin: 32 },
  { quarter: "Q4", revenue: 58, costs: 36, margin: 22 },
];
export const insightKeys = insightSeries.map((series) => series.key);
