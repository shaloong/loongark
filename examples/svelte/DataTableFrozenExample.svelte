<script lang="ts">
  import * as L from "@loongark/svelte";
  import {
    frozenRows,
    frozenColumns,
    frozenTitle,
    frozenDescription,
    frozenKeys,
    frozenPins,
  } from "../shared/dataTableFrozenDemo";
  let enabled = $state(true);
  let extra = $state(false);
  let owner = $state(true);
  let reversed = $state(false);
  let rtl = $state(false);
  let visible = $state(true);
  let ids = $state<string[]>([]);
</script>

<L.LoongArkStack gap="lg" style="width:100%;max-width:800px"
  ><L.LoongArkStack gap="sm"
    ><L.LoongArkTypography as="h2">{frozenTitle}</L.LoongArkTypography
    ><L.LoongArkTypography variant="muted"
      >{frozenDescription}</L.LoongArkTypography
    ></L.LoongArkStack
  ><L.LoongArkStack orientation="horizontal" gap="sm"
    ><L.LoongArkButton variant="outline" onclick={() => (enabled = !enabled)}
      >{enabled ? "Unfreeze columns" : "Freeze columns"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" onclick={() => (extra = !extra)}
      >{extra ? "Unfreeze owner" : "Freeze owner"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" onclick={() => (owner = !owner)}
      >{owner ? "Hide owner" : "Show owner"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" onclick={() => (reversed = !reversed)}
      >{reversed
        ? "Restore column order"
        : "Move notes first"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" onclick={() => (rtl = !rtl)}
      >{rtl ? "Use LTR" : "Use RTL"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" onclick={() => (visible = !visible)}
      >{visible ? "Hide table" : "Show table"}</L.LoongArkButton
    >
  </L.LoongArkStack>
  <div dir={rtl ? "rtl" : "ltr"}>
    {#if visible}<L.LoongArkDataTable
        label="Release projects"
        data={frozenRows}
        columns={frozenColumns}
        columnKeys={frozenKeys(owner, reversed)}
        pinnedColumns={frozenPins(enabled, extra)}
        pageSize={3}
        selectedIds={ids}
        onSelectionChange={(next) => (ids = next)}
      />{:else}<p>Table hidden</p>{/if}
  </div>
  <output aria-label="Selected release projects"
    >{ids.length ? ids.join(", ") : "No projects selected"}</output
  ></L.LoongArkStack
>
