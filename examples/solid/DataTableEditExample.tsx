/** @jsxImportSource solid-js */
import { createSignal } from "solid-js";
import {
  LoongArkDataTable,
  LoongArkButton,
  LoongArkTypography,
} from "@loongark/solid";
import {
  createDataTableEditDemo,
  editableColumns,
} from "../shared/dataTableEditDemo";
export const DataTableEditExample = () => {
  const [version, setVersion] = createSignal(0);
  const demo = createDataTableEditDemo(() => setVersion((n) => n + 1));
  const state = () => {
    version();
    return demo.state;
  };
  return (
    <div
      style={{
        "max-width": "960px",
        display: "grid",
        gap: "var(--lk-space-component-md)",
      }}
    >
      <LoongArkTypography as="h2">Edit project details</LoongArkTypography>
      <LoongArkTypography variant="muted">
        Enter to save, Escape to cancel. Changes stay in the draft until
        accepted.
      </LoongArkTypography>
      <div
        style={{
          display: "flex",
          "flex-wrap": "wrap",
          gap: "var(--lk-space-component-sm)",
        }}
      >
        <LoongArkButton variant="outline" type="button" onClick={demo.failNext}>
          Fail next save
        </LoongArkButton>
        <LoongArkButton
          variant="outline"
          type="button"
          onClick={demo.removeFirst}
        >
          Remove first row
        </LoongArkButton>
        <LoongArkButton
          variant="outline"
          type="button"
          onClick={demo.toggleRevenue}
        >
          {state().hidden ? "Show revenue" : "Hide revenue"}
        </LoongArkButton>
        <LoongArkButton
          variant="outline"
          type="button"
          onClick={demo.toggleRtl}
        >
          {state().rtl ? "Use LTR" : "Use RTL"}
        </LoongArkButton>
        <LoongArkButton
          variant="outline"
          type="button"
          onClick={demo.toggleLoading}
        >
          {state().loading ? "Stop loading" : "Set loading"}
        </LoongArkButton>
        <LoongArkButton
          variant="outline"
          type="button"
          onClick={demo.toggleShown}
        >
          {state().shown ? "Hide table" : "Show table"}
        </LoongArkButton>
      </div>
      <div dir={state().rtl ? "rtl" : "ltr"}>
        {state().shown && (
          <LoongArkDataTable
            label="Editable projects"
            data={state().rows}
            columns={editableColumns}
            columnKeys={state().hidden ? ["name", "owner"] : undefined}
            pinnedColumns={{ start: ["name"] }}
            loading={state().loading}
            onCellCommit={demo.onCellCommit}
          />
        )}
      </div>
      <LoongArkTypography variant="muted">
        Cancelled saves: {state().canceled}
      </LoongArkTypography>
      <output>{state().saved}</output>
    </div>
  );
};
