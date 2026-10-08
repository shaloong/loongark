<script lang="ts">
  import * as L from "@loongark/svelte";
  import { createTableColumnWindowDemo } from "../shared/tableColumnWindowDemo";
  import {
    groupsDisclosureCSS,
    groupsDisclosureIcon,
  } from "../shared/questionnaireGroupsDemo";
  let revision = $state(0);
  const demo = createTableColumnWindowDemo(() => revision++);
  const snapshot = $derived.by(() => {
    revision;
    return demo.state;
  });
</script>

{#snippet button(label: string, action: () => void)}<L.LoongArkButton
    type="button"
    variant="outline"
    onclick={action}>{label}</L.LoongArkButton
  >{/snippet}
<L.LoongArkStack gap="md" style="max-width:960px;width:100%">
  <svelte:element this={"style"}>{groupsDisclosureCSS}</svelte:element>
  <L.LoongArkTypography as="h2">80 columns, 120 rows</L.LoongArkTypography>
  <L.LoongArkTypography variant="muted"
    >Scroll in either direction. Frozen columns and the active cell stay
    available while the rest of the table is windowed.</L.LoongArkTypography
  >
  <div style="display:flex;flex-wrap:wrap;gap:var(--lk-space-component-sm)">
    {@render button("Go to first column", demo.jumpFirst)}{@render button(
      "Go to column 41",
      demo.jumpMiddle,
    )}
  </div>
  <details data-groups-demo-controls>
    <summary
      ><L.LoongArkIcon
        icon={groupsDisclosureIcon}
        size="sm"
        aria-hidden="true"
      />More controls</summary
    >
    <div style="display:flex;flex-wrap:wrap;gap:var(--lk-space-component-sm)">
      {@render button(snapshot.rtl ? "Use LTR" : "Use RTL", demo.toggleRtl)}
      {@render button(
        snapshot.pinned ? "Unfreeze columns" : "Freeze columns",
        demo.togglePins,
      )}
      {@render button(
        snapshot.virtual ? "Render all columns" : "Use column windows",
        demo.toggleVirtual,
      )}
      {@render button(
        snapshot.shown ? "Hide table" : "Show table",
        demo.toggleShown,
      )}
      {@render button(
        snapshot.reject ? "Accept updates" : "Reject updates",
        demo.toggleReject,
      )}
      {@render button(
        snapshot.held ? "Release held requests" : "Hold new requests",
        demo.toggleHold,
      )}
      {@render button("Remove column 41", demo.removeMiddle)}
    </div>
  </details>
  <div dir={snapshot.rtl ? "rtl" : "ltr"}>
    {#if snapshot.shown}<L.LoongArkDataTable
        label="Windowed projects"
        data={snapshot.data}
        columns={snapshot.columns}
        pageSize={120}
        virtualization={{ height: 360, estimateSize: 64, overscan: 2 }}
        columnVirtualization={snapshot.virtual
          ? { width: 640, overscan: 2, scrollToIndex: snapshot.index }
          : undefined}
        pinnedColumns={snapshot.pinned
          ? { start: ["c0"], end: ["c79"] }
          : undefined}
        cellSelection
        columnReorderable
        columnResizable
        onCellCommit={demo.onCellCommit}
        onBatchCommit={demo.onBatchCommit}
        onColumnKeysChange={demo.onColumnKeysChange}
        onColumnWidthsChange={demo.onColumnWidthsChange}
      />{/if}
  </div>
  <output style="overflow-wrap:anywhere">{snapshot.status}</output>
</L.LoongArkStack>
