import type { ChartOptions, DataRow } from "@loongark/kit";
export const chartTypeModes = [
  { value: "area", label: "Area" },
  { value: "stacked-area", label: "Stacked area" },
  { value: "stacked-bars", label: "Stacked bars" },
  { value: "pie", label: "Pie" },
  { value: "donut", label: "Donut" },
  { value: "scatter", label: "Scatter" },
  { value: "time", label: "Time axis" },
  { value: "log", label: "Logarithmic axis" },
] as const;
export type ChartTypeMode = (typeof chartTypeModes)[number]["value"];
const samples: readonly DataRow[] = [
  {
    id: "alpha",
    label: "Alpha",
    primary: 24,
    secondary: 12,
    x: 2,
    at: "2026-09-01T00:00:00Z",
  },
  {
    id: "beta",
    label: "Beta",
    primary: 40,
    secondary: 18,
    x: 5,
    at: "2026-09-03T00:00:00Z",
  },
  {
    id: "gamma",
    label: "Gamma",
    primary: null,
    secondary: 24,
    x: 9,
    at: "2026-09-04T00:00:00Z",
  },
  {
    id: "delta",
    label: "Delta",
    primary: -12,
    secondary: -8,
    x: 15,
    at: "2026-09-10T00:00:00Z",
  },
  {
    id: "epsilon",
    label: "Epsilon",
    primary: 18,
    secondary: 16,
    x: 18,
    at: "2026-09-11T00:00:00Z",
  },
  {
    id: "zeta",
    label: "Zeta",
    primary: 32,
    secondary: 22,
    x: 30,
    at: "2026-09-19T00:00:00Z",
  },
];
export function chartTypeOptions(mode: ChartTypeMode): ChartOptions {
  const pie = mode === "pie" || mode === "donut";
  return {
    data:
      mode === "log"
        ? samples.map((row, index) => ({
            ...row,
            primary: 10 ** index,
            secondary: index === 2 ? 0 : index === 3 ? -2 : 2 * 10 ** index,
          }))
        : samples,
    series: pie
      ? [{ key: "primary", label: "Share" }]
      : [
          { key: "primary", label: "Primary" },
          { key: "secondary", label: "Secondary" },
        ],
    labelKey: "label",
    title: chartTypeModes.find((item) => item.value === mode)!.label,
    type:
      mode === "stacked-bars"
        ? "bar"
        : mode === "stacked-area"
          ? "area"
          : mode === "time" || mode === "log"
            ? "line"
            : mode,
    stacked: mode === "stacked-area" || mode === "stacked-bars",
    xAxis:
      mode === "scatter"
        ? { type: "linear", key: "x" }
        : mode === "time"
          ? { type: "time", key: "at", locale: "en-GB", timeZone: "UTC" }
          : undefined,
    yAxis: mode === "log" ? { type: "log", domain: [1, 200000] } : undefined,
    sliceKey: "id",
    interactive: true,
    zoomable: true,
    tooltip: true,
    showDataTable: true,
  };
}
export function createChartTypesDemo(changed: () => void) {
  let mode: ChartTypeMode = "stacked-area",
    reject = false,
    controlled = true,
    disabled = false,
    shown = true,
    empty = false,
    rtl = false,
    sliceKeys = samples.map((row) => String(row.id)),
    status = "Explore chart types";
  return {
    get state() {
      return { mode, reject, controlled, disabled, shown, empty, rtl, status };
    },
    get options(): ChartOptions {
      const options = chartTypeOptions(mode);
      return {
        ...options,
        data: empty ? [] : options.data,
        disabled,
        sliceKeys: controlled ? sliceKeys : undefined,
        onSliceKeysChange: this.onSlices,
      };
    },
    choose(value: string) {
      const selected=chartTypeModes.find(item=>item.value===value);
      if (!selected) return;
      mode=selected.value;
      changed();
    },
    onSlices(next: string[]) {
      status = reject ? "Slice change rejected" : "Slice change accepted";
      if (!reject) sliceKeys = [...next];
      changed();
    },
    toggleReject() {
      reject = !reject;
      changed();
    },
    toggleControlled() {
      controlled = !controlled;
      changed();
    },
    toggleDisabled() {
      disabled = !disabled;
      changed();
    },
    toggleShown() {
      shown = !shown;
      changed();
    },
    toggleEmpty() {
      empty = !empty;
      changed();
    },
    toggleDirection() {
      rtl = !rtl;
      changed();
    },
  };
}
