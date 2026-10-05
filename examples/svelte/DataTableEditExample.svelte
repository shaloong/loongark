<script lang="ts">
  import {
    LoongArkDataTable,
    LoongArkButton,
    LoongArkTypography,
  } from "@loongark/svelte";
  import { createDataTableEditDemo } from "../shared/dataTableEditDemo";
  export let complex = false;
  export let batch = false;
  const demo = createDataTableEditDemo(() => {
    state = demo.state;
  }, complex);
  let state = demo.state;
</script>

<div style="max-width:960px;display:grid;gap:var(--lk-space-component-md)">
  <LoongArkTypography as="h2">Edit project details</LoongArkTypography>
  <LoongArkTypography variant="muted"
    >{batch
      ? "Edit selected rows together. Undo and redo accepted batches; Ctrl/Command+Enter saves and Escape cancels."
      : complex
        ? "Choose an owner, or enter multiple lines. Ctrl/Command+Enter saves; Escape cancels."
        : "Enter to save, Escape to cancel. Changes stay in the draft until accepted."}</LoongArkTypography
  >
  <div style="display:flex;flex-wrap:wrap;gap:var(--lk-space-component-sm)">
    <LoongArkButton variant="outline" type="button" onclick={demo.failNext}
      >Fail next save</LoongArkButton
    >
    <LoongArkButton variant="outline" type="button" onclick={demo.removeFirst}
      >Remove first row</LoongArkButton
    >
    <LoongArkButton variant="outline" type="button" onclick={demo.toggleRevenue}
      >{state.hidden ? "Show revenue" : "Hide revenue"}</LoongArkButton
    >
    <LoongArkButton variant="outline" type="button" onclick={demo.toggleRtl}
      >{state.rtl ? "Use LTR" : "Use RTL"}</LoongArkButton
    >
    <LoongArkButton variant="outline" type="button" onclick={demo.toggleLoading}
      >{state.loading ? "Stop loading" : "Set loading"}</LoongArkButton
    >
    <LoongArkButton variant="outline" type="button" onclick={demo.toggleShown}
      >{state.shown ? "Hide table" : "Show table"}</LoongArkButton
    >
  </div>
  <div dir={state.rtl ? "rtl" : "ltr"}>
    {#if state.shown}<LoongArkDataTable
        label="Editable projects"
        data={state.rows}
        columns={demo.columns}
        columnKeys={state.hidden ? ["name", "owner"] : undefined}
        pinnedColumns={{ start: ["name"] }}
        loading={state.loading}
        onCellCommit={batch ? undefined : demo.onCellCommit}
        onBatchCommit={batch ? demo.onBatchCommit : undefined}
        defaultSelectedIds={batch ? ["alpha", "beta"] : []}
      />{/if}
  </div>
  <LoongArkTypography variant="muted"
    >Cancelled saves: {state.canceled}</LoongArkTypography
  >
  <output>{state.saved}</output>
</div>
