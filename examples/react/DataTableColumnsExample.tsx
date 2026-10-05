import { useState } from "react";
import * as L from "@loongark/react";
import {
  columnLayoutRows,
  columnLayoutDefaultWidths,
  createColumnLayoutDemo,
} from "../shared/dataTableColumnsDemo";
export function DataTableColumnsExample() {
  const [, redraw] = useState(0),
    [demo] = useState(() => createColumnLayoutDemo(() => redraw((v) => v + 1)));
  const snapshot = demo.snapshot;
  return (
    <L.LoongArkStack gap="md" style={{ width: "100%", maxWidth: 720 }}>
      <L.LoongArkTypography as="h2">Arrange your columns</L.LoongArkTypography>
      <L.LoongArkTypography variant="muted">
        Drag a handle or use arrow keys to move a column. Drag an edge to
        resize. Smaller screens scroll within the table.
      </L.LoongArkTypography>
      <L.LoongArkStack orientation="horizontal" gap="sm">
        <L.LoongArkButton variant="outline" onClick={demo.toggleControlled}>
          {snapshot.controlled
            ? "Use uncontrolled columns"
            : "Use controlled columns"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={demo.toggleReject}>
          {snapshot.reject ? "Accept column updates" : "Reject column updates"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={demo.togglePinned}>
          {snapshot.pinned ? "Unfreeze columns" : "Freeze outer columns"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={demo.toggleRtl}>
          {snapshot.rtl ? "Use LTR" : "Use RTL"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={demo.toggleRevenue}>
          {snapshot.hiddenRevenue ? "Show revenue" : "Hide revenue"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={demo.toggleExtra}>
          {snapshot.extra ? "Remove notes column" : "Add notes column"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={demo.toggleLoading}>
          {snapshot.loading ? "Finish loading" : "Start loading"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={demo.toggleShown}>
          {snapshot.shown ? "Hide table" : "Show table"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="ghost" onClick={demo.reset}>
          {"Reset columns"}
        </L.LoongArkButton>
      </L.LoongArkStack>
      <div dir={snapshot.rtl ? "rtl" : "ltr"}>
        {snapshot.shown && (
          <L.LoongArkDataTable
            label="Arrangeable projects"
            data={columnLayoutRows}
            columns={snapshot.columns}
            columnReorderable
            columnResizable
            columnKeys={snapshot.controlled ? snapshot.keys : undefined}
            columnWidths={snapshot.controlled ? snapshot.widths : undefined}
            defaultColumnWidths={columnLayoutDefaultWidths}
            pinnedColumns={
              snapshot.pinned
                ? { start: ["name"], end: ["revenue"] }
                : undefined
            }
            loading={snapshot.loading}
            onColumnKeysChange={demo.order}
            onColumnWidthsChange={demo.resize}
          />
        )}
      </div>
      <output aria-label="Column updates" style={{ overflowWrap: "anywhere" }}>
        {snapshot.notice} · {snapshot.count} callbacks
      </output>
      <output
        aria-label="Configured widths"
        style={{ overflowWrap: "anywhere" }}
      >
        {JSON.stringify(snapshot.widths)}
      </output>
    </L.LoongArkStack>
  );
}
