import { splitProps, type JSX } from "solid-js";
import {
  attachmentIconPath,
  attachmentView,
  messageStatus,
  type AttachmentOptions,
  type BubbleOptions,
  type MessageOptions,
} from "@loongark/kit";
export type LoongArkAttachmentProps = JSX.HTMLAttributes<HTMLDivElement> &
  AttachmentOptions;
export type LoongArkBubbleProps = JSX.HTMLAttributes<HTMLDivElement> &
  BubbleOptions;
export type LoongArkMessageProps = JSX.HTMLAttributes<HTMLElement> &
  MessageOptions;
export function LoongArkAttachment(props: LoongArkAttachmentProps) {
  const [local, attrs] = splitProps(props, [
    "name",
    "size",
    "href",
    "status",
    "progress",
    "disabled",
    "errorLabel",
    "removeLabel",
    "retryLabel",
    "onRemove",
    "onRetry",
  ]);
  const view = () => attachmentView(local);
  return (
    <div
      data-scope="attachment"
      data-part="root"
      data-status={view().status}
      data-disabled={local.disabled ? "true" : undefined}
      {...attrs}
    >
      <span data-scope="attachment" data-part="icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width={1.5}
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d={attachmentIconPath} />
        </svg>
      </span>
      <div data-scope="attachment" data-part="content">
        {view().link ? (
          <a
            data-scope="attachment"
            data-part="name"
            href={view().link}
            download=""
          >
            {local.name}
          </a>
        ) : (
          <span data-scope="attachment" data-part="name">
            {local.name}
          </span>
        )}
        {view().size && (
          <span data-scope="attachment" data-part="description">
            {view().size}
          </span>
        )}
        {view().status === "uploading" && (
          <progress
            data-scope="attachment"
            data-part="progress"
            aria-label={"Uploading " + local.name}
            max={100}
            value={view().progress}
          />
        )}
        {view().status === "error" && (
          <span data-scope="attachment" data-part="description" role="status">
            {view().error}
          </span>
        )}
      </div>
      <div data-scope="attachment" data-part="actions">
        {view().status === "error" && local.onRetry && (
          <button
            data-scope="attachment"
            data-part="action"
            type="button"
            disabled={local.disabled}
            aria-label={view().retry}
            onClick={local.onRetry}
          >
            Retry
          </button>
        )}
        {local.onRemove && (
          <button
            data-scope="attachment"
            data-part="action"
            type="button"
            disabled={local.disabled}
            aria-label={view().remove}
            onClick={local.onRemove}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
export function LoongArkBubble(props: LoongArkBubbleProps) {
  const [local, attrs] = splitProps(props, ["side", "children"]);
  return (
    <div
      data-scope="bubble"
      data-part="root"
      data-side={local.side ?? "incoming"}
      {...attrs}
    >
      {local.children}
    </div>
  );
}
export function LoongArkMessage(props: LoongArkMessageProps) {
  const [local, attrs] = splitProps(props, [
    "side",
    "author",
    "dateTime",
    "timeLabel",
    "status",
    "statusLabel",
    "retryLabel",
    "onRetry",
    "children",
  ]);
  return (
    <article
      data-scope="message"
      data-part="root"
      data-side={local.side ?? "incoming"}
      data-status={local.status ?? "sent"}
      aria-label={"Message from " + local.author}
      {...attrs}
    >
      <header data-scope="message" data-part="meta">
        <span data-scope="message" data-part="author">
          {local.author}
        </span>
        {local.dateTime && (
          <time dateTime={local.dateTime}>
            {local.timeLabel ?? local.dateTime}
          </time>
        )}
      </header>
      <div data-scope="message" data-part="content">
        {local.children}
      </div>
      <footer data-scope="message" data-part="meta">
        <span
          data-scope="message"
          data-part="status"
          role={
            local.status === "sending" || local.status === "error"
              ? "status"
              : undefined
          }
        >
          {messageStatus(local)}
        </span>
        {local.status === "error" && local.onRetry && (
          <button
            data-scope="message"
            data-part="action"
            type="button"
            onClick={local.onRetry}
          >
            {local.retryLabel ?? "Retry message"}
          </button>
        )}
      </footer>
    </article>
  );
}
