<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import {
    attachmentIconPath,
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
    ...attrs
  }: AttachmentOptions & HTMLAttributes<HTMLDivElement> = $props();
  const view = $derived(
    attachmentView({
      name,
      size,
      href,
      status,
      progress,
      disabled,
      errorLabel,
      removeLabel,
      retryLabel,
    }),
  );
</script>

<div
  data-scope="attachment"
  data-part="root"
  data-status={view.status}
  data-disabled={disabled ? "true" : undefined}
  {...attrs}
>
  <span data-scope="attachment" data-part="icon" aria-hidden="true"
    ><svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      focusable="false"><path d={attachmentIconPath} /></svg
    ></span
  >
  <div data-scope="attachment" data-part="content">
    {#if view.link}<a
        data-scope="attachment"
        data-part="name"
        href={view.link}
        download>{name}</a
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
        {disabled}
        aria-label={view.retry}
        onclick={onRetry}>Retry</button
      >{/if}
    {#if onRemove}<button
        data-scope="attachment"
        data-part="action"
        type="button"
        {disabled}
        aria-label={view.remove}
        onclick={onRemove}>Remove</button
      >{/if}
  </div>
</div>
