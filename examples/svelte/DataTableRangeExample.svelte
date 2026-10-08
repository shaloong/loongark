<script lang="ts">
  import {
    groupsDisclosureCSS,
    groupsDisclosureIcon,
  } from "../shared/questionnaireGroupsDemo";
  import * as L from "@loongark/svelte";
  import { createRangeDemo } from "../shared/dataTableRangeDemo";
  let version = $state(0);
  // 卸载中的 Abort 回调先结束本轮销毁，再通知父示例刷新计数。
  const demo = createRangeDemo(() => queueMicrotask(() => version++));
  const snapshot = $derived.by(() => {
    version;
    return demo.snapshot();
  });
  const actions = $derived.by(() => {
    snapshot;
    return demo.actions.map((action) => ({
      run: action.run,
      label: action.label(),
    }));
  });
</script>

<L.LoongArkStack gap="md" style="width:100%;max-width:850px">
  <svelte:element this="style">{groupsDisclosureCSS}</svelte:element>
  <L.LoongArkTypography as="h2">Edit a range of cells</L.LoongArkTypography>
  <L.LoongArkTypography variant="muted"
    >Select with the pointer or Shift + arrows. Copy a range, then paste
    tab-separated values. Each accepted paste is one undoable transaction.</L.LoongArkTypography
  >
  <L.LoongArkStack orientation="horizontal" gap="sm"
    >{#each actions.slice(0, 3) as action}<L.LoongArkButton
        variant="outline"
        on:click={action.run}>{action.label}</L.LoongArkButton
      >{/each}</L.LoongArkStack
  >
  <details data-groups-demo-controls="">
    <summary
      ><L.LoongArkIcon icon={groupsDisclosureIcon} size="sm" />More test
      controls</summary
    ><L.LoongArkStack orientation="horizontal" gap="sm"
      >{#each actions.slice(3) as action}<L.LoongArkButton
          variant="outline"
          on:click={action.run}>{action.label}</L.LoongArkButton
        >{/each}</L.LoongArkStack
    >
  </details>
  <div dir={snapshot.rtl ? "rtl" : "ltr"}>
    {#if snapshot.shown}<L.LoongArkDataTable
        {...demo.tableProps(snapshot)}
      />{/if}
  </div>
  <output aria-label="Batch result"
    >{snapshot.notice} · {snapshot.count} batches · {snapshot.canceled} canceled</output
  >
  <output aria-label="Cell selection" style="overflow-wrap:anywhere"
    >{snapshot.range
      ? `${snapshot.range.anchor.rowId}/${snapshot.range.anchor.columnKey} → ${snapshot.range.focus.rowId}/${snapshot.range.focus.columnKey}`
      : "No selection"}</output
  >
</L.LoongArkStack>
