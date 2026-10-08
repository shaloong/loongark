/** @jsxImportSource solid-js */
import { createSignal } from "solid-js";
import * as L from "@loongark/solid";
import {
  chartRows,
  chartSeries,
  gapRows,
  gapSeries,
} from "../shared/chartDemo";
export function ChartExample() {
  const [type, setType] = createSignal<"bar" | "line">("bar");
  const [rows, setRows] = createSignal(chartRows);
  return (
    <L.LoongArkStack gap="lg" style={{ width: "100%", "max-width": "800px" }}>
      <L.LoongArkStack gap="sm">
        <L.LoongArkTypography
          as="h1"
          style={{ "font-size": "var(--lk-typography-fontsize-xl)" }}
        >
          Regional performance
        </L.LoongArkTypography>
        <L.LoongArkTypography variant="muted">
          Compare regional revenue, operating costs and contribution margin.
        </L.LoongArkTypography>
      </L.LoongArkStack>
      <L.LoongArkStack orientation="horizontal" gap="sm">
        <L.LoongArkButton
          variant="outline"
          onClick={() => setType(type() === "bar" ? "line" : "bar")}
        >
          {type() === "bar" ? "Show lines" : "Show bars"}
        </L.LoongArkButton>
        <L.LoongArkButton
          variant="outline"
          disabled={!rows().length}
          onClick={() => setRows([])}
        >
          Clear data
        </L.LoongArkButton>
        <L.LoongArkButton variant="ghost" onClick={() => setRows(chartRows)}>
          Restore data
        </L.LoongArkButton>
      </L.LoongArkStack>
      <L.LoongArkChart
        data={rows()}
        series={chartSeries}
        labelKey="name"
        title="Regional revenue"
        type={type()}
      />
      <L.LoongArkStack gap="sm">
        <L.LoongArkTypography
          as="h2"
          style={{ "font-size": "var(--lk-typography-fontsize-lg)" }}
        >
          Weekly availability
        </L.LoongArkTypography>
        <L.LoongArkTypography variant="muted">
          Missing Wednesday data leaves a gap in the line.
        </L.LoongArkTypography>
        <L.LoongArkChart
          data={gapRows}
          series={gapSeries}
          labelKey="name"
          title="Completed runs"
        />
      </L.LoongArkStack>
    </L.LoongArkStack>
  );
}
