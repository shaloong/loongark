import { useState } from "react";
import * as L from "@loongark/react";
import { createStructureDemo } from "../shared/dataTableStructureDemo";
export function DataTableStructureExample() {
  const [, redraw] = useState(0);
  const [demo] = useState(() =>
    createStructureDemo(() => redraw((v) => v + 1)),
  );
  const snapshot = demo.snapshot;
  return (
    <L.LoongArkStack
      gap="md"
      style={{ width: "100%", maxWidth: 850 }}
      dir={snapshot.rtl ? "rtl" : "ltr"}
    >
      <L.LoongArkTypography as="h2">
        Explore teams and project hierarchy
      </L.LoongArkTypography>
      <L.LoongArkTypography variant="muted">
        Group budgets by team or expand parent projects. Filters keep matching
        descendants in context.
      </L.LoongArkTypography>
      <L.LoongArkStack orientation="horizontal" gap="sm">
        <L.LoongArkButton variant="outline" onClick={demo.toggleKind}>
          {snapshot.kind === "group" ? "Show tree rows" : "Show grouped rows"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={demo.toggleReject}>
          {snapshot.reject ? "Allow expansion" : "Reject expansion"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={demo.toggleControlled}>
          {snapshot.controlled
            ? "Use internal expansion"
            : "Use controlled expansion"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={demo.toggleLoading}>
          {snapshot.loading ? "Finish loading" : "Start loading"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={demo.toggleVirtual}>
          {snapshot.virtual
            ? "Disable virtualization"
            : "Enable virtualization"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={demo.toggleRtl}>
          {snapshot.rtl ? "Use LTR" : "Use RTL"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={demo.toggleShown}>
          {snapshot.shown ? "Hide table" : "Show table"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={demo.collapseAll}>
          {"Collapse all"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={demo.expandAll}>
          {"Expand all"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={demo.removeChild}>
          {"Remove token row"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={demo.reset}>
          {"Reset data"}
        </L.LoongArkButton>
      </L.LoongArkStack>
      {snapshot.shown && <L.LoongArkDataTable {...demo.tableProps(snapshot)} />}
      <output aria-label="Expansion state">
        Expanded rows: {snapshot.expanded.length} · Changes: {snapshot.changes}
      </output>
      <output aria-label="Selected rows">
        Selected: {snapshot.selected.join(", ") || "none"}
      </output>
    </L.LoongArkStack>
  );
}
