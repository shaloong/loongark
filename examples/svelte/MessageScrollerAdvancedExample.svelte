<script lang="ts">
  import { onDestroy } from "svelte";
  import * as L from "@loongark/svelte";
  import {
    createMessageScrollerDemo,
    messageScrollerInitialState,
    messagePreview,
  } from "../shared/messageScrollerDemo";
  let view = $state(messageScrollerInitialState()),
    visible = $state(true),
    following = $state(true),
    host: HTMLDivElement;
  const source = createMessageScrollerDemo((next) => {
    view = next;
  });
  onDestroy(() => source.dispose());
  const readEarlier = () => {
    const viewport = host?.querySelector<HTMLElement>('[data-part="viewport"]'),
      row = host?.querySelector<HTMLElement>('[data-message-id="reply-4"]');
    if (!viewport || !row) return;
    viewport.scrollTop +=
      row.getBoundingClientRect().top -
      viewport.getBoundingClientRect().top -
      viewport.clientTop;
    viewport.focus({ preventScroll: true });
  };
</script>

<L.LoongArkStack gap="md" style="width:100%;max-width:640px">
  <L.LoongArkTypography as="h2"
    >Keep the discussion in view</L.LoongArkTypography
  >
  <L.LoongArkTypography variant="muted"
    >Read earlier replies while a shared preview loads and new notes arrive.</L.LoongArkTypography
  >
  <L.LoongArkStack orientation="horizontal" gap="sm">
    <L.LoongArkButton
      variant="outline"
      disabled={!visible}
      onclick={readEarlier}>Read earlier replies</L.LoongArkButton
    >
    <L.LoongArkButton
      variant="outline"
      disabled={!visible}
      aria-busy={view.preview === "loading" ? true : undefined}
      onclick={() =>
        view.preview === "idle" ? source.loadPreview() : source.hidePreview()}
      >{view.preview === "loaded"
        ? "Hide shared preview"
        : view.preview === "loading"
          ? "Cancel preview load"
          : "Load shared preview"}</L.LoongArkButton
    >
    <L.LoongArkButton
      variant="ghost"
      onclick={() => source.insertHistoryAndReply()}
      >Insert history and reply</L.LoongArkButton
    >
    <L.LoongArkButton variant="ghost" onclick={() => source.addReply()}
      >Add reply</L.LoongArkButton
    >
    <L.LoongArkButton
      variant="ghost"
      onclick={() => {
        source.reset();
        following = true;
      }}>Reset thread</L.LoongArkButton
    >
    <L.LoongArkButton
      variant="ghost"
      onclick={() => {
        source.cancelPreview();
        visible = !visible;
        following = true;
      }}>{visible ? "Hide conversation" : "Show conversation"}</L.LoongArkButton
    >
  </L.LoongArkStack>
  <output aria-label="Reading mode"
    >{!visible
      ? "Conversation hidden"
      : following
        ? "Following latest replies"
        : "Reading earlier replies"}</output
  >
  <div bind:this={host}>
    {#if visible}{#key view.generation}
        <L.LoongArkMessageScroller
          label="Workspace discussion"
          onAtBottomChange={(d) => {
            following = d.atBottom;
          }}
        >
          {#each view.rows as row (row.id)}
            <L.LoongArkMessage
              data-message-id={row.id}
              author={row.author}
              side={row.side}
              timeLabel="09:30"
              dateTime="2026-10-03T09:30:00+08:00"
            >
              <L.LoongArkBubble side={row.side} style="white-space:normal">
                {#if row.id === "reply-0" && view.preview === "loaded"}<img
                    src={messagePreview.src}
                    alt={messagePreview.alt}
                    style="display:block;width:100%;max-width:320px;height:auto;border-radius:var(--lk-radius-md);margin-bottom:var(--lk-space-component-sm)"
                  />{/if}
                <L.LoongArkTypography as="p" style="margin:0"
                  >{row.body}</L.LoongArkTypography
                >
              </L.LoongArkBubble>
            </L.LoongArkMessage>
          {/each}
        </L.LoongArkMessageScroller>
      {/key}{:else}<L.LoongArkTypography variant="muted" role="status"
        >Show the conversation to continue reading.</L.LoongArkTypography
      >{/if}
  </div>
</L.LoongArkStack>
