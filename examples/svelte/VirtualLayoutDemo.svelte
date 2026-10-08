<script lang="ts">
  import * as L from "@loongark/svelte";
  import type {
    VirtualGridCellDetails,
    VirtualMasonryEntry,
  } from "@loongark/kit";
  import { createVirtualLayoutDemo } from "../shared/virtualLayoutDemo";
  import {
    groupsDisclosureCSS,
    groupsDisclosureIcon,
  } from "../shared/questionnaireGroupsDemo";
  let { kind }: { kind: "grid" | "masonry" } = $props();
  let revision = $state(0);
  const demo = createVirtualLayoutDemo(() => revision++);
  const snapshot = $derived.by(() => {
    revision;
    return demo.state;
  });
  function note(details: VirtualGridCellDetails) {
    revision;
    return demo.note(details);
  }
  function body(entry: VirtualMasonryEntry) {
    revision;
    return demo.body(entry);
  }
  function expanded(key: string) {
    revision;
    return demo.isExpanded(key);
  }
</script>

{#snippet button(label: string, action: () => void)}<L.LoongArkButton
    type="button"
    variant="outline"
    onclick={action}>{label}</L.LoongArkButton
  >{/snippet}
<L.LoongArkStack gap="md" style="width:100%;max-width:960px">
  <svelte:element this={"style"}>{groupsDisclosureCSS}</svelte:element>
  <L.LoongArkTypography as="h2"
    >{kind === "grid"
      ? "10,000 rows, 80 columns"
      : "10,000 items, measured heights"}</L.LoongArkTypography
  >
  <L.LoongArkTypography variant="muted"
    >{kind === "grid"
      ? "Arrow keys navigate. Enter/F2 edits; Escape returns. Home/End and Page Up/Down jump."
      : "Scroll, resize and expand a card. Stable keys preserve the reading position."}</L.LoongArkTypography
  >
  <div style="display:flex;flex-wrap:wrap;gap:var(--lk-space-component-sm)">
    {@render button("Go to first item", demo.jumpFirst)}{@render button(
      "Go to item 5001",
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
      {@render button(
        snapshot.rtl ? "Use LTR" : "Use RTL",
        demo.toggleRtl,
      )}{@render button(
        snapshot.narrow ? "Use full width" : "Use narrow width",
        demo.toggleNarrow,
      )}{@render button(
        snapshot.shown ? "Hide layout" : "Show layout",
        demo.toggleShown,
      )}{@render button(
        snapshot.empty ? "Restore data" : "Clear data",
        demo.toggleData,
      )}{@render button("Prepend item", demo.prepend)}{@render button(
        "Remove first item",
        demo.removeFirst,
      )}{@render button("Remove last item", demo.removeLast)}
    </div>
  </details>
  <div style:width={snapshot.narrow ? "320px" : "100%"} style:max-width="100%">
    {#if snapshot.shown}
      {#if kind === "grid"}
        <L.LoongArkVirtualGrid
          rowKeys={snapshot.rows}
          columnKeys={snapshot.columns}
          rowSize={demo.rowSize}
          height={360}
          scrollToRow={snapshot.index}
          dir={snapshot.rtl ? "rtl" : "ltr"}
          label="Windowed cells"
        >
          {#snippet renderCell(details)}
            {#if details.columnIndex === 1}<L.LoongArkInputRoot
                ><L.LoongArkInputInput
                  aria-label="Note for {details.rowKey}"
                  value={note(details)}
                  oninput={(event) =>
                    demo.updateNote(details, event.currentTarget.value)}
                /></L.LoongArkInputRoot
              >{:else}<span
                >R{details.rowIndex + 1} · C{details.columnIndex + 1}</span
              >{/if}
          {/snippet}
        </L.LoongArkVirtualGrid>
      {:else}
        <L.LoongArkVirtualMasonry
          keys={snapshot.items}
          height={480}
          minColumnWidth={220}
          scrollToIndex={snapshot.index}
          dir={snapshot.rtl ? "rtl" : "ltr"}
          label="Windowed collection"
        >
          {#snippet renderItem(entry)}<L.LoongArkCard
              ><L.LoongArkCardContent
                ><L.LoongArkStack gap="sm"
                  ><L.LoongArkCardTitle>{demo.title(entry)}</L.LoongArkCardTitle
                  ><L.LoongArkTypography variant="muted"
                    >{body(entry)}</L.LoongArkTypography
                  ><L.LoongArkButton
                    type="button"
                    variant="outline"
                    aria-expanded={expanded(entry.key)}
                    onclick={() => demo.toggleItem(entry.key)}
                    >{expanded(entry.key) ? "Collapse" : "Expand"}
                    {entry.key}</L.LoongArkButton
                  ></L.LoongArkStack
                ></L.LoongArkCardContent
              ></L.LoongArkCard
            >{/snippet}
        </L.LoongArkVirtualMasonry>
      {/if}
    {/if}
  </div>
</L.LoongArkStack>
