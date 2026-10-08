import { useState } from "react";
import * as L from "@loongark/react";
import {
  insightSeries,
  insightRows,
  insightKeys,
} from "../shared/chartAdvancedDemo";
export function ChartAdvancedExample() {
  const [keys, setKeys] = useState(insightKeys),
    [locked, setLocked] = useState(false),
    [fixed, setFixed] = useState(false),
    [updated, setUpdated] = useState(false),
    [shown, setShown] = useState(true);
  const rows = updated
    ? insightRows.map((row, index) =>
        index === 3 ? { ...row, revenue: 72 } : row,
      )
    : insightRows;
  return (
    <L.LoongArkStack gap="lg" style={{ width: "100%", maxWidth: 640 }}>
      <L.LoongArkStack gap="sm">
        <L.LoongArkTypography as="h2">
          Quarterly performance
        </L.LoongArkTypography>
        <L.LoongArkTypography variant="muted">
          Compare series, focus on a value range and read the original numbers.
        </L.LoongArkTypography>
      </L.LoongArkStack>
      <L.LoongArkStack orientation="horizontal" gap="sm">
        <L.LoongArkButton variant="outline" onClick={() => setLocked(!locked)}>
          {locked ? "Allow series updates" : "Lock series updates"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={() => setFixed(!fixed)}>
          {fixed ? "Use automatic range" : "Use 0–50 range"}
        </L.LoongArkButton>
        <L.LoongArkButton
          variant="outline"
          onClick={() => setUpdated(!updated)}
        >
          {updated ? "Restore Q4" : "Update Q4"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="ghost" onClick={() => setShown(!shown)}>
          {shown ? "Hide chart" : "Show chart"}
        </L.LoongArkButton>
      </L.LoongArkStack>
      {shown && (
        <L.LoongArkChart
          title="Quarterly metrics"
          data={rows}
          series={insightSeries}
          labelKey="quarter"
          interactive
          seriesKeys={keys}
          onSeriesKeysChange={(next) => {
            if (!locked) setKeys(next);
          }}
          domain={fixed ? [0, 50] : undefined}
          showDataTable
        />
      )}
      <output aria-label="Visible chart series">
        {keys.length ? keys.join(", ") : "No series selected"}
      </output>
    </L.LoongArkStack>
  );
}
