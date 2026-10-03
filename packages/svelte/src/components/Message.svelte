<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { messageStatus, type MessageOptions } from "@loongark/kit";
  let {
    side = "incoming",
    author,
    dateTime,
    timeLabel,
    status = "sent",
    statusLabel,
    retryLabel,
    onRetry,
    children,
    ...attrs
  }: MessageOptions &
    HTMLAttributes<HTMLElement> & { children?: Snippet } = $props();
</script>

<article
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
        onclick={onRetry}>{retryLabel ?? "Retry message"}</button
      >{/if}
  </footer>
</article>
