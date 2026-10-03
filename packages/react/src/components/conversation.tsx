import { type HTMLAttributes } from "react";
import {
  attachmentIconPath,
  attachmentView,
  messageStatus,
  type AttachmentOptions,
  type BubbleOptions,
  type MessageOptions,
} from "@loongark/kit";
export type LoongArkAttachmentProps = HTMLAttributes<HTMLDivElement> &
  AttachmentOptions;
export type LoongArkBubbleProps = HTMLAttributes<HTMLDivElement> &
  BubbleOptions;
export type LoongArkMessageProps = HTMLAttributes<HTMLElement> & MessageOptions;
export function LoongArkAttachment({
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
}: LoongArkAttachmentProps) {
  const view = attachmentView({
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
  });
  return (
    <div
      data-scope="attachment"
      data-part="root"
      data-status={view.status}
      data-disabled={disabled ? "true" : undefined}
      {...attrs}
    >
      <span data-scope="attachment" data-part="icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          focusable="false"
        >
          <path d={attachmentIconPath} />
        </svg>
      </span>
      <div data-scope="attachment" data-part="content">
        {view.link ? (
          <a data-scope="attachment" data-part="name" href={view.link} download>
            {name}
          </a>
        ) : (
          <span data-scope="attachment" data-part="name">
            {name}
          </span>
        )}
        {view.size && (
          <span data-scope="attachment" data-part="description">
            {view.size}
          </span>
        )}
        {view.status === "uploading" && (
          <progress
            data-scope="attachment"
            data-part="progress"
            aria-label={"Uploading " + name}
            max={100}
            value={view.progress}
          />
        )}
        {view.status === "error" && (
          <span data-scope="attachment" data-part="description" role="status">
            {view.error}
          </span>
        )}
      </div>
      <div data-scope="attachment" data-part="actions">
        {view.status === "error" && onRetry && (
          <button
            data-scope="attachment"
            data-part="action"
            type="button"
            disabled={disabled}
            aria-label={view.retry}
            onClick={onRetry}
          >
            Retry
          </button>
        )}
        {onRemove && (
          <button
            data-scope="attachment"
            data-part="action"
            type="button"
            disabled={disabled}
            aria-label={view.remove}
            onClick={onRemove}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
export function LoongArkBubble({
  side,
  children,
  ...attrs
}: LoongArkBubbleProps) {
  return (
    <div
      data-scope="bubble"
      data-part="root"
      data-side={side ?? "incoming"}
      {...attrs}
    >
      {children}
    </div>
  );
}
export function LoongArkMessage({
  side,
  author,
  dateTime,
  timeLabel,
  status,
  statusLabel,
  retryLabel,
  onRetry,
  children,
  ...attrs
}: LoongArkMessageProps) {
  return (
    <article
      data-scope="message"
      data-part="root"
      data-side={side ?? "incoming"}
      data-status={status ?? "sent"}
      aria-label={"Message from " + author}
      {...attrs}
    >
      <header data-scope="message" data-part="meta">
        <span data-scope="message" data-part="author">
          {author}
        </span>
        {dateTime && <time dateTime={dateTime}>{timeLabel ?? dateTime}</time>}
      </header>
      <div data-scope="message" data-part="content">
        {children}
      </div>
      <footer data-scope="message" data-part="meta">
        <span
          data-scope="message"
          data-part="status"
          role={
            status === "sending" || status === "error" ? "status" : undefined
          }
        >
          {messageStatus({ author, status, statusLabel })}
        </span>
        {status === "error" && onRetry && (
          <button
            data-scope="message"
            data-part="action"
            type="button"
            onClick={onRetry}
          >
            {retryLabel ?? "Retry message"}
          </button>
        )}
      </footer>
    </article>
  );
}
