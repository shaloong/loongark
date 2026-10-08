<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { onDestroy, type Snippet } from "svelte";
  import {
    createConversationActionController,
    normalizeConversationActions,
    withConversationActionFocus,
    type ConversationActionState,
    type ConversationActionHandler,
    messageStatus,
    type MessageOptions,
  } from "@loongark/kit";
  let {
    side = "incoming",
    author,
    dateTime,
    timeLabel,
    status = "sent",
    statusLabel,
    retryLabel,
    onRetry,
    actions,
    disabled,
    actionLabels,
    actionKey,
    children,
    ...attrs
  }: MessageOptions &
    HTMLAttributes<HTMLElement> & { children?: Snippet } = $props();
  let root = $state<HTMLElement>(),
    actionState = $state<ConversationActionState>({});
  const controller = createConversationActionController((next) => {
    actionState = next;
  });
  onDestroy(() => controller.dispose());
  $effect.pre(() => {
    actionKey;
    controller.reset();
  });
  const blocked = $derived(disabled || !!actionState.pendingId),
    available = $derived(normalizeConversationActions(actions));
  const run = (
    id: string,
    label: string,
    handler: ConversationActionHandler,
    successLabel?: string,
    actionDisabled?: boolean,
  ) => {
    void controller.run(
      {
        id,
        label,
        disabled: disabled || actionDisabled,
        onAction: withConversationActionFocus(root, handler),
        successLabel,
      },
      actionLabels,
    );
  };
</script>

<article
  bind:this={root}
  tabindex={-1}
  aria-busy={actionState.pendingId ? true : undefined}
  data-scope="message"
  data-part="root"
  data-side={side}
  data-status={status}
  aria-label={"Message from " + author}
  {...attrs}
>
  <header data-scope="message" data-part="meta">
    <span data-scope="message" data-part="author">{author}</span
    >{#if dateTime}<time datetime={dateTime}>{timeLabel ?? dateTime}</time>{/if}
  </header>
  <div data-scope="message" data-part="content">{@render children?.()}</div>
  <footer data-scope="message" data-part="meta">
    <span
      data-scope="message"
      data-part="status"
      role={status === "error" || status === "sending" ? "status" : undefined}
      >{messageStatus({ author, status, statusLabel })}</span
    >
    {#if status === "error" && onRetry}<button
        data-scope="message"
        data-part="action"
        type="button"
        disabled={blocked}
        data-action-id="retry"
        onclick={() => run("retry", retryLabel ?? "Retry message", onRetry)}
        >{retryLabel ?? "Retry message"}</button
      >{/if}
  </footer>
  {#if available.length}<div
      data-scope="message"
      data-part="actions"
      role="group"
      aria-label={actionLabels?.group ?? "Message actions"}
    >
      {#each available as action (action.id)}<button
          data-scope="message"
          data-part="action"
          type="button"
          disabled={blocked || action.disabled}
          data-action-id={action.id}
          onclick={() =>
            run(
              action.id,
              action.label,
              action.onAction,
              action.successLabel,
              action.disabled,
            )}>{action.label}</button
        >{/each}
    </div>{/if}
  {#if actionState.message}<span
      data-scope="message"
      data-part="action-feedback"
      data-outcome={actionState.outcome}
      role={actionState.outcome === "error" ? "alert" : "status"}
      >{actionState.message}</span
    >{/if}
</article>
