/** @jsxImportSource solid-js */
import { createSignal } from "solid-js";
import * as L from "@loongark/solid";
import {
  projectRows,
  projectColumns,
  queueRows,
  queueColumns,
} from "../shared/dataTableDemo";
export function DataTableExample() {
  const [locked, setLocked] = createSignal(false);
  const [rows, setRows] = createSignal(projectRows),
    [ids, setIds] = createSignal<string[]>([]),
    [revenue, setRevenue] = createSignal(true);
  const [queue, setQueue] = createSignal(queueRows),
    [changes, setChanges] = createSignal(0);
  return (
    <L.LoongArkStack gap="lg" style={{ width: "100%", "max-width": "800px" }}>
      <L.LoongArkStack gap="sm">
        <L.LoongArkTypography
          as="h1"
          style={{ "font-size": "var(--lk-typography-fontsize-xl)" }}
        >
          Project access
        </L.LoongArkTypography>
        <L.LoongArkTypography variant="muted">
          Review workspaces, select a page and keep your choices while
          filtering.
        </L.LoongArkTypography>
      </L.LoongArkStack>
      <L.LoongArkStack gap="md">
        <L.LoongArkStack orientation="horizontal" gap="sm">
          <L.LoongArkButton
            variant="outline"
            disabled={!ids().length}
            onClick={() => setIds([])}
          >
            Clear selection
          </L.LoongArkButton>
          <L.LoongArkButton
            variant="outline"
            disabled={!ids().length}
            onClick={() => {
              setRows(rows().filter((r) => !ids().includes(String(r.id))));
              setIds([]);
            }}
          >
            Remove selected rows
          </L.LoongArkButton>
          <L.LoongArkButton
            variant="ghost"
            onClick={() => {
              setRows(projectRows);
              setIds([]);
            }}
          >
            Restore projects
          </L.LoongArkButton>
          <L.LoongArkButton
            variant="ghost"
            onClick={() => setRevenue(!revenue())}
          >
            {revenue() ? "Hide revenue" : "Show revenue"}
          </L.LoongArkButton>
          <L.LoongArkButton
            variant="ghost"
            onClick={() => setLocked(!locked())}
          >
            {locked() ? "Unlock selection" : "Lock selection"}
          </L.LoongArkButton>
        </L.LoongArkStack>
        <L.LoongArkDataTable
          label="Workspace projects"
          data={rows()}
          columns={
            revenue()
              ? projectColumns
              : projectColumns.filter((c) => c.key !== "amount")
          }
          pageSize={2}
          selectedIds={ids()}
          onSelectionChange={(next) => {
            if (!locked()) setIds(next);
          }}
        />
      </L.LoongArkStack>
      <L.LoongArkStack gap="md">
        <L.LoongArkTypography
          as="h2"
          style={{ "font-size": "var(--lk-typography-fontsize-lg)" }}
        >
          Live queue
        </L.LoongArkTypography>
        <L.LoongArkStack orientation="horizontal" gap="sm">
          <L.LoongArkButton
            variant="outline"
            onClick={() => setQueue(queueRows.filter((r) => r.id !== "a"))}
          >
            Remove queued Alpha
          </L.LoongArkButton>
          <L.LoongArkButton variant="ghost" onClick={() => setQueue(queueRows)}>
            Restore queue
          </L.LoongArkButton>
        </L.LoongArkStack>
        <L.LoongArkDataTable
          label="Live queue"
          data={queue()}
          columns={queueColumns}
          pageSize={2}
          defaultSelectedIds={["a"]}
          onSelectionChange={() => setChanges((n) => n + 1)}
        />
        <L.LoongArkTypography variant="muted">
          <output data-testid="queue-changes">
            {changes()} selection changes
          </output>
        </L.LoongArkTypography>
      </L.LoongArkStack>
    </L.LoongArkStack>
  );
}
