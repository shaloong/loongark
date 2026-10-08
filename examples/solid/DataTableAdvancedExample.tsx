/** @jsxImportSource solid-js */
import { createSignal, onCleanup } from "solid-js";
import * as L from "@loongark/solid";
import {
  remoteColumns,
  initialRemoteState,
  remoteSnapshot,
  createProjectSource,
  type RemoteSnapshot,
} from "../shared/dataTableAdvancedDemo";
export function DataTableAdvancedExample() {
  const [state, setState] = createSignal<L.DataTableState>(initialRemoteState),
    [snapshot, setSnapshot] = createSignal<RemoteSnapshot>(
      remoteSnapshot(initialRemoteState),
    ),
    [ids, setIds] = createSignal<string[]>([]),
    [owner, setOwner] = createSignal(true),
    [reversed, setReversed] = createSignal(false),
    [locked, setLocked] = createSignal(false);
  const source = createProjectSource(setSnapshot);
  onCleanup(() => source.dispose());
  const keys = () =>
    (reversed()
      ? ["amount", "name", "owner"]
      : ["name", "owner", "amount"]
    ).filter((key) => owner() || key !== "owner");
  return (
    <L.LoongArkStack gap="lg" style={{ width: "100%", "max-width": "800px" }}>
      <L.LoongArkStack gap="sm">
        <L.LoongArkTypography as="h2">
          Projects across teams
        </L.LoongArkTypography>
        <L.LoongArkTypography variant="muted">
          Choose columns and keep selected projects across pages.
        </L.LoongArkTypography>
      </L.LoongArkStack>
      <L.LoongArkStack orientation="horizontal" gap="sm">
        <L.LoongArkButton
          variant="outline"
          onClick={() => setLocked(!locked())}
        >
          {locked() ? "Allow table updates" : "Lock table updates"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={() => setOwner(!owner())}>
          {owner() ? "Hide owner" : "Show owner"}
        </L.LoongArkButton>
        <L.LoongArkButton
          variant="outline"
          onClick={() => setReversed(!reversed())}
        >
          {reversed() ? "Restore column order" : "Move revenue first"}
        </L.LoongArkButton>
        <L.LoongArkButton
          variant="outline"
          disabled={snapshot().loading}
          onClick={() => source?.request(state())}
        >
          Refresh rows
        </L.LoongArkButton>
        <L.LoongArkButton
          variant="outline"
          disabled={snapshot().loading}
          onClick={() => source?.request(state(), true)}
        >
          Refresh with error
        </L.LoongArkButton>
        <L.LoongArkButton
          variant="ghost"
          onClick={() => {
            const next = { query: "Gamma", page: 1 };
            setState(next);
            source?.request(next, false, 900);
          }}
        >
          Find Gamma slowly
        </L.LoongArkButton>
        <L.LoongArkButton
          variant="ghost"
          onClick={() => {
            const next = { query: "Beta", page: 1 };
            setState(next);
            source?.request(next);
          }}
        >
          Find Beta
        </L.LoongArkButton>
      </L.LoongArkStack>
      <L.LoongArkDataTable
        label="Remote projects"
        mode="server"
        data={snapshot().data}
        columns={remoteColumns}
        totalRows={snapshot().totalRows}
        pageSize={2}
        state={state()}
        onStateChange={(next) => {
          if (!locked()) {
            setState(next);
            source?.request(next);
          }
        }}
        selectedIds={ids()}
        onSelectionChange={setIds}
        columnKeys={keys()}
        loading={snapshot().loading}
        error={snapshot().error}
        onRetry={() => source?.request(state())}
      />
      <output aria-label="Selected remote projects">
        {ids().length ? ids().join(", ") : "No projects selected"}
      </output>
    </L.LoongArkStack>
  );
}
