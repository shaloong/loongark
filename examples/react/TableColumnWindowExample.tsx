import React, { useState } from "react";
import * as L from "@loongark/react";
import { createTableColumnWindowDemo } from "../shared/tableColumnWindowDemo";
import {
  groupsDisclosureCSS,
  groupsDisclosureIcon,
} from "../shared/questionnaireGroupsDemo";
export function TableColumnWindowExample() {
  const [, redraw] = useState(0),
    [demo] = useState(() =>
      createTableColumnWindowDemo(() => redraw((value) => value + 1)),
    );
  const state = demo.state;
  const button = (label: string, action: () => void) => (
    <L.LoongArkButton type="button" variant="outline" onClick={action}>
      {label}
    </L.LoongArkButton>
  );
  return (
    <L.LoongArkStack gap="md" style={{ maxWidth: "960px", width: "100%" }}>
      <style>{groupsDisclosureCSS}</style>
      <L.LoongArkTypography as="h2">80 columns, 120 rows</L.LoongArkTypography>
      <L.LoongArkTypography variant="muted">
        Scroll in either direction. Frozen columns and the active cell stay
        available while the rest of the table is windowed.
      </L.LoongArkTypography>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--lk-space-component-sm)",
        }}
      >
        {button("Go to first column", demo.jumpFirst)}
        {button("Go to column 41", demo.jumpMiddle)}
      </div>
      <details data-groups-demo-controls>
        <summary>
          <L.LoongArkIcon
            icon={groupsDisclosureIcon}
            size="sm"
            aria-hidden="true"
          />
          More controls
        </summary>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--lk-space-component-sm)",
          }}
        >
          {button(state.rtl ? "Use LTR" : "Use RTL", demo.toggleRtl)}
          {button(
            state.pinned ? "Unfreeze columns" : "Freeze columns",
            demo.togglePins,
          )}
          {button(
            state.virtual ? "Render all columns" : "Use column windows",
            demo.toggleVirtual,
          )}
          {button(state.shown ? "Hide table" : "Show table", demo.toggleShown)}
          {button(
            state.reject ? "Accept updates" : "Reject updates",
            demo.toggleReject,
          )}
          {button(
            state.held ? "Release held requests" : "Hold new requests",
            demo.toggleHold,
          )}
          {button("Remove column 41", demo.removeMiddle)}
        </div>
      </details>
      <div dir={state.rtl ? "rtl" : "ltr"}>
        {state.shown && (
          <L.LoongArkDataTable
            label="Windowed projects"
            data={state.data}
            columns={state.columns}
            pageSize={120}
            virtualization={{ height: 360, estimateSize: 64, overscan: 2 }}
            columnVirtualization={
              state.virtual
                ? { width: 640, overscan: 2, scrollToIndex: state.index }
                : undefined
            }
            pinnedColumns={
              state.pinned ? { start: ["c0"], end: ["c79"] } : undefined
            }
            cellSelection
            columnReorderable
            columnResizable
            onCellCommit={demo.onCellCommit}
            onBatchCommit={demo.onBatchCommit}
            onColumnKeysChange={demo.onColumnKeysChange}
            onColumnWidthsChange={demo.onColumnWidthsChange}
          />
        )}
      </div>
      <output style={{ overflowWrap: "anywhere" }}>{state.status}</output>
    </L.LoongArkStack>
  );
}
