<script lang="ts">
  import {
    LoongArkDataTable,
    LoongArkMessageScroller,
    LoongArkMessage,
    LoongArkBubble,
    LoongArkButton,
    LoongArkTypography,
  } from "@loongark/svelte";
  import { createVirtualizationDemo } from "../shared/virtualizationDemo";
  let { mode = "both" }: { mode?: "table" | "messages" | "both" } = $props();
  let version = $state(0);
  const demo = createVirtualizationDemo(() => {
    version++;
  });
  let snapshot = $derived.by(() => {
    version;
    return demo.state;
  });
</script>

<div style="max-width:960px;display:grid;gap:var(--lk-space-component-md)">
  <LoongArkTypography as="h2">Measured windows</LoongArkTypography>
  <LoongArkTypography variant="muted"
    >Only the visible items and focused item stay mounted. Long content is
    measured as it changes.</LoongArkTypography
  >
  <div style="display:flex;flex-wrap:wrap;gap:var(--lk-space-component-sm)">
    <LoongArkButton type="button" variant="outline" onclick={demo.toggleShown}
      >{snapshot.shown ? "Hide windows" : "Show windows"}</LoongArkButton
    >
  </div>
  {#if mode !== "messages"}<LoongArkTypography as="h3"
      >1,000 editable rows</LoongArkTypography
    >
    <div style="display:flex;flex-wrap:wrap;gap:var(--lk-space-component-sm)">
      <LoongArkButton type="button" variant="outline" onclick={demo.firstRow}
        >Scroll to first row</LoongArkButton
      ><LoongArkButton type="button" variant="outline" onclick={demo.middleRow}
        >Scroll to row 501</LoongArkButton
      >
    </div>
    {#if snapshot.shown}<LoongArkDataTable
        label="Virtual projects"
        data={snapshot.rows}
        columns={demo.columns}
        pageSize={1000}
        virtualization={{
          height: 360,
          estimateSize: 56,
          overscan: 3,
          scrollToIndex: snapshot.rowIndex,
        }}
        defaultSelectedIds={["row-0", "row-1"]}
        onCellCommit={demo.onCellCommit}
        onBatchCommit={demo.onBatchCommit}
        pinnedColumns={{ start: ["name"] }}
      />{/if}<output>{snapshot.status}</output>{/if}
  {#if mode !== "table"}<LoongArkTypography as="h3"
      >500 variable height messages</LoongArkTypography
    >
    <div style="display:flex;flex-wrap:wrap;gap:var(--lk-space-component-sm)">
      <LoongArkButton
        type="button"
        variant="outline"
        onclick={demo.middleMessages}>Read middle messages</LoongArkButton
      ><LoongArkButton type="button" variant="outline" onclick={demo.prepend}
        >Add earlier message</LoongArkButton
      ><LoongArkButton type="button" variant="outline" onclick={demo.append}
        >Append message</LoongArkButton
      ><LoongArkButton type="button" variant="outline" onclick={demo.expand}
        >Expand message 251</LoongArkButton
      ><LoongArkButton
        type="button"
        variant="outline"
        onclick={demo.removeMessage}>Remove message 251</LoongArkButton
      >
    </div>
    {#if snapshot.shown}<LoongArkMessageScroller
        label="Virtual messages"
        virtualization={{
          keys: snapshot.messages.map((message) => message.key),
          height: 360,
          estimateSize: 96,
          overscan: 3,
          scrollToIndex: snapshot.messageIndex,
        }}
        onAtBottomChange={demo.onAtBottomChange}
      >
        {#snippet item({ key })}<LoongArkMessage
            author={snapshot.messageMap.get(key)!.author}
            ><LoongArkBubble style="white-space:normal"
              ><p>{snapshot.messageMap.get(key)!.text}</p>
              <LoongArkButton
                type="button"
                variant="ghost"
                aria-label={`Inspect ${key}`}>Inspect</LoongArkButton
              ></LoongArkBubble
            ></LoongArkMessage
          >{/snippet}
      </LoongArkMessageScroller>{/if}<output
      >{snapshot.atBottom
        ? "Following latest"
        : "Reading earlier messages"}</output
    >{/if}
</div>
