import { useState } from "react";
import * as L from "@loongark/react";
import {
  queryColumns,
  queryRows,
  createDataTableQueryDemo,
} from "../shared/dataTableQueryDemo";
export function DataTableQueryExample() {
  const [, redraw] = useState(0),
    [demo] = useState(() =>
      createDataTableQueryDemo(() => redraw((v) => v + 1)),
    );
  const snapshot = demo.snapshot;
  return (
    <L.LoongArkStack gap="md" style={{ width: "100%", maxWidth: 800 }}>
      <L.LoongArkTypography as="h2">
        Find and compare projects
      </L.LoongArkTypography>
      <L.LoongArkTypography variant="muted">
        Combine column filters. Hold Shift when sorting another column to add a
        priority.
      </L.LoongArkTypography>
      <L.LoongArkStack orientation="horizontal" gap="sm">
        <L.LoongArkButton variant="outline" onClick={demo.toggleLocked}>
          {snapshot.locked ? "Allow query updates" : "Reject query updates"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={demo.toggleLoading}>
          {snapshot.loading ? "Finish loading" : "Start loading"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={demo.toggleShown}>
          {snapshot.shown ? "Hide table" : "Show table"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="ghost" onClick={demo.reset}>
          Reset query
        </L.LoongArkButton>
      </L.LoongArkStack>
      {snapshot.shown && (
        <L.LoongArkDataTable
          label="Queryable projects"
          data={queryRows}
          columns={queryColumns}
          pageSize={3}
          state={snapshot.state}
          loading={snapshot.loading}
          onStateChange={demo.change}
        />
      )}
      <output aria-label="Query state" style={{ overflowWrap: "anywhere" }}>
        {JSON.stringify(snapshot.state)}
      </output>
    </L.LoongArkStack>
  );
}
