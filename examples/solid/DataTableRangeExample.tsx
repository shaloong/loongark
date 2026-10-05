/** @jsxImportSource solid-js */
import { createSignal } from "solid-js";
import * as L from "@loongark/solid";
import { createRangeDemo } from "../shared/dataTableRangeDemo";
export function DataTableRangeExample() {
  const [version, redraw] = createSignal(0),
    demo = createRangeDemo(() => redraw((v) => v + 1));
  const snapshot = () => {
    version();
    return demo.snapshot();
  };
  return (
    <L.LoongArkStack gap="md" style={{ width: "100%", "max-width": "850px" }}>
      <L.LoongArkTypography as="h2">Edit a range of cells</L.LoongArkTypography>
      <L.LoongArkTypography variant="muted">
        Select with the pointer or Shift + arrows. Copy a range, then paste
        tab-separated values. Each accepted paste is one undoable transaction.
      </L.LoongArkTypography>
      <L.LoongArkStack orientation="horizontal" gap="sm">
        {demo.actions.slice(0, 3).map((action) => (
          <L.LoongArkButton variant="outline" onClick={action.run}>
            {(snapshot(), action.label())}
          </L.LoongArkButton>
        ))}
      </L.LoongArkStack>
      <details>
        <summary>More test controls</summary>
        <L.LoongArkStack orientation="horizontal" gap="sm">
          {demo.actions.slice(3).map((action) => (
            <L.LoongArkButton variant="outline" onClick={action.run}>
              {(snapshot(), action.label())}
            </L.LoongArkButton>
          ))}
        </L.LoongArkStack>
      </details>
      <div dir={snapshot().rtl ? "rtl" : "ltr"}>
        {snapshot().shown && (
          <L.LoongArkDataTable {...demo.tableProps(snapshot())} />
        )}
      </div>
      <output aria-label="Batch result">
        {snapshot().notice} · {snapshot().count} batches · {snapshot().canceled}{" "}
        canceled
      </output>
      <output
        aria-label="Cell selection"
        style={{ "overflow-wrap": "anywhere" }}
      >
        {snapshot().range
          ? `${snapshot().range!.anchor.rowId}/${snapshot().range!.anchor.columnKey} → ${snapshot().range!.focus.rowId}/${snapshot().range!.focus.columnKey}`
          : "No selection"}
      </output>
    </L.LoongArkStack>
  );
}
