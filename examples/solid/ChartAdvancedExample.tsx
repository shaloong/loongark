/** @jsxImportSource solid-js */
import { createSignal, Show } from "solid-js";
import * as L from "@loongark/solid";
import {
  insightSeries,
  insightRows,
  insightKeys,
} from "../shared/chartAdvancedDemo";
export function ChartAdvancedExample() {
  const [keys, setKeys] = createSignal(insightKeys),
    [locked, setLocked] = createSignal(false),
    [fixed, setFixed] = createSignal(false),
    [updated, setUpdated] = createSignal(false),
    [shown, setShown] = createSignal(true);
  const rows = () =>
    updated()
      ? insightRows.map((row, index) =>
          index === 3 ? { ...row, revenue: 72 } : row,
        )
      : insightRows;
  return (
    <L.LoongArkStack gap="lg" style={{ width: "100%", "max-width": "640px" }}>
      <L.LoongArkStack gap="sm">
        <L.LoongArkTypography as="h2">
          Quarterly performance
        </L.LoongArkTypography>
        <L.LoongArkTypography variant="muted">
          Compare series, focus on a value range and read the original numbers.
        </L.LoongArkTypography>
      </L.LoongArkStack>
      <L.LoongArkStack orientation="horizontal" gap="sm">
        <L.LoongArkButton
          variant="outline"
          onClick={() => setLocked(!locked())}
        >
          {locked() ? "Allow series updates" : "Lock series updates"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={() => setFixed(!fixed())}>
          {fixed() ? "Use automatic range" : "Use 0–50 range"}
        </L.LoongArkButton>
        <L.LoongArkButton
          variant="outline"
          onClick={() => setUpdated(!updated())}
        >
          {updated() ? "Restore Q4" : "Update Q4"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="ghost" onClick={() => setShown(!shown())}>
          {shown() ? "Hide chart" : "Show chart"}
        </L.LoongArkButton>
      </L.LoongArkStack>
      <Show when={shown()}>
        <L.LoongArkChart
          title="Quarterly metrics"
          data={rows()}
          series={insightSeries}
          labelKey="quarter"
          interactive
          seriesKeys={keys()}
          onSeriesKeysChange={(next) => {
            if (!locked()) setKeys(next);
          }}
          domain={fixed() ? [0, 50] : undefined}
          showDataTable
        />
      </Show>
      <output aria-label="Visible chart series">
        {keys().length ? keys().join(", ") : "No series selected"}
      </output>
    </L.LoongArkStack>
  );
}
