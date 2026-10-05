<script lang="ts">
  import { controlIcons } from "@loongark/kit";
  import Icon from "./Icon.svelte";
  import { onDestroy } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import {
    createConversationActionController,
    withConversationActionFocus,
    type ConversationActionState,
    type ConversationActionHandler,
    attachmentView,
    type AttachmentOptions,
  } from "@loongark/kit";
  let {
    name,
    size,
    href,
    status,
    progress,
    disabled,
    errorLabel,
    removeLabel,
    retryLabel,
    onRemove,
    onRetry,
    onPreview,
    onCancel,
    previewLabel,
    cancelLabel,
    actionKey,
    actionLabels,
    ...attrs
  }: AttachmentOptions & HTMLAttributes<HTMLDivElement> = $props();
  let root = $state<HTMLDivElement>(),
    actionState = $state<ConversationActionState>({});
  const controller = createConversationActionController((next) => {
    actionState = next;
  });
  onDestroy(() => controller.dispose());
  $effect.pre(() => {
    actionKey;
    controller.reset();
  });
  const blocked = $derived(disabled || !!actionState.pendingId);
  const run = (
    id: string,
    label: string,
    handler: ConversationActionHandler,
  ) => {
    void controller.run(
      {
        id,
        label,
        disabled,
        onAction: withConversationActionFocus(root, handler),
      },
      actionLabels,
    );
  };
  const view = $derived(
    attachmentView({
      name,
      size,
      href,
      status,
      progress,
      disabled: blocked,
      errorLabel,
      removeLabel,
      retryLabel,
    }),
  );
</script>

<div
  bind:this={root}
  role="group"
  aria-label={"Attachment " + name}
  tabindex={-1}
  aria-busy={actionState.pendingId ? true : undefined}
  data-scope="attachment"
  data-part="root"
  data-status={view.status}
  data-disabled={disabled ? "true" : undefined}
  {...attrs}
>
  <span data-scope="attachment" data-part="icon" aria-hidden="true"
    ><Icon icon={controlIcons.file} size="lg" /></span
  >
  <div data-scope="attachment" data-part="content">
    {#if view.link}<a
        data-scope="attachment"
        data-part="name"
        href={view.link}
        download={name}>{name}</a
      >{:else}<span data-scope="attachment" data-part="name">{name}</span>{/if}
    {#if view.size}<span data-scope="attachment" data-part="description"
        >{view.size}</span
      >{/if}
    {#if view.status === "uploading"}<progress
        data-scope="attachment"
        data-part="progress"
        aria-label={"Uploading " + name}
        max={100}
        value={view.progress}
      ></progress>{/if}
    {#if view.status === "error"}<span
        data-scope="attachment"
        data-part="description"
        role="status">{view.error}</span
      >{/if}
  </div>
  <div data-scope="attachment" data-part="actions">
    {#if view.status === "error" && onRetry}<button
        data-scope="attachment"
        data-part="action"
        type="button"
        disabled={blocked}
        aria-label={view.retry}
        data-action-id="retry"
        onclick={() => run("retry", view.retry, onRetry)}
        >{retryLabel ?? "Retry"}</button
      >{/if}
    {#if view.status === "ready" && onPreview}<button
        data-scope="attachment"
        data-part="action"
        type="button"
        disabled={blocked}
        aria-label={previewLabel ?? "Preview " + name}
        data-action-id="preview"
        onclick={() =>
          run("preview", previewLabel ?? "Preview " + name, onPreview)}
        >{previewLabel ?? "Preview"}</button
      >{/if}
    {#if view.status === "uploading" && onCancel}<button
        data-scope="attachment"
        data-part="action"
        type="button"
        disabled={blocked}
        aria-label={cancelLabel ?? "Cancel upload " + name}
        data-action-id="cancel"
        onclick={() =>
          run("cancel", cancelLabel ?? "Cancel upload " + name, onCancel)}
        >{cancelLabel ?? "Cancel"}</button
      >{/if}
    {#if onRemove}<button
        data-scope="attachment"
        data-part="action"
        type="button"
        disabled={blocked}
        aria-label={view.remove}
        data-action-id="remove"
        onclick={() => run("remove", view.remove, onRemove)}
        >{removeLabel ?? "Remove"}</button
      >{/if}
  </div>
  {#if actionState.message}<span
      data-scope="attachment"
      data-part="action-feedback"
      data-outcome={actionState.outcome}
      role={actionState.outcome === "error" ? "alert" : "status"}
      >{actionState.message}</span
    >{/if}
</div>
