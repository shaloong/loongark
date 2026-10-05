import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "./icon";
import { useRef, type HTMLAttributes } from "react";
import {
  withConversationActionFocus,
  normalizeConversationActions,
  attachmentView,
  messageStatus,
  type AttachmentOptions,
  type BubbleOptions,
  type MessageOptions,
  type ConversationActionHandler,
} from "@loongark/kit";
import { useConversationActions } from "./conversation-actions";
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
  onPreview,
  onCancel,
  previewLabel,
  cancelLabel,
  actionLabels,
  actionKey,
  ...attrs
}: LoongArkAttachmentProps) {
  const root = useRef<HTMLDivElement>(null),
    operations = useConversationActions(actionKey);
  const blocked = disabled || !!operations.state.pendingId;
  const run = (id: string, label: string, handler: ConversationActionHandler) =>
    operations.run(
      {
        id,
        label,
        disabled,
        onAction: withConversationActionFocus(
          root.current ?? undefined,
          handler,
        ),
      },
      actionLabels,
    );
  const view = attachmentView({
    name,
    size,
    href,
    status,
    progress,
    disabled: blocked,
    errorLabel,
    removeLabel,
    retryLabel,
    onRemove,
    onRetry,
  });
  return (
    <div
      ref={root}
      role="group"
      aria-label={"Attachment " + name}
      tabIndex={-1}
      aria-busy={operations.state.pendingId ? true : undefined}
      data-scope="attachment"
      data-part="root"
      data-status={view.status}
      data-disabled={disabled ? "true" : undefined}
      {...attrs}
    >
      <span data-scope="attachment" data-part="icon" aria-hidden="true">
        <LoongArkIcon icon={controlIcons.file} size="lg" />
      </span>
      <div data-scope="attachment" data-part="content">
        {view.link ? (
          <a
            data-scope="attachment"
            data-part="name"
            href={view.link}
            download={name}
          >
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
            disabled={blocked}
            aria-label={view.retry}
            data-action-id="retry"
            onClick={() => run("retry", view.retry, onRetry)}
          >
            {retryLabel ?? "Retry"}
          </button>
        )}
        {view.status === "ready" && onPreview && (
          <button
            data-scope="attachment"
            data-part="action"
            type="button"
            disabled={blocked}
            aria-label={previewLabel ?? "Preview " + name}
            data-action-id="preview"
            onClick={() =>
              run("preview", previewLabel ?? "Preview " + name, onPreview)
            }
          >
            {previewLabel ?? "Preview"}
          </button>
        )}
        {view.status === "uploading" && onCancel && (
          <button
            data-scope="attachment"
            data-part="action"
            type="button"
            disabled={blocked}
            aria-label={cancelLabel ?? "Cancel upload " + name}
            data-action-id="cancel"
            onClick={() =>
              run("cancel", cancelLabel ?? "Cancel upload " + name, onCancel)
            }
          >
            {cancelLabel ?? "Cancel"}
          </button>
        )}
        {onRemove && (
          <button
            data-scope="attachment"
            data-part="action"
            type="button"
            disabled={blocked}
            aria-label={view.remove}
            data-action-id="remove"
            onClick={() => run("remove", view.remove, onRemove)}
          >
            {removeLabel ?? "Remove"}
          </button>
        )}
      </div>
      {operations.state.message && (
        <span
          data-scope="attachment"
          data-part="action-feedback"
          data-outcome={operations.state.outcome}
          role={operations.state.outcome === "error" ? "alert" : "status"}
        >
          {operations.state.message}
        </span>
      )}
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
  actions,
  disabled,
  actionLabels,
  actionKey,
  children,
  ...attrs
}: LoongArkMessageProps) {
  const root = useRef<HTMLElement>(null),
    operations = useConversationActions(actionKey);
  const available = normalizeConversationActions(actions);
  const blocked = disabled || !!operations.state.pendingId;
  const run = (
    id: string,
    label: string,
    handler: ConversationActionHandler,
    successLabel?: string,
    actionDisabled?: boolean,
  ) =>
    operations.run(
      {
        id,
        label,
        disabled: disabled || actionDisabled,
        onAction: withConversationActionFocus(
          root.current ?? undefined,
          handler,
        ),
        successLabel,
      },
      actionLabels,
    );
  return (
    <article
      ref={root}
      tabIndex={-1}
      aria-busy={operations.state.pendingId ? true : undefined}
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
            disabled={blocked}
            data-action-id="retry"
            onClick={() => run("retry", retryLabel ?? "Retry message", onRetry)}
          >
            {retryLabel ?? "Retry message"}
          </button>
        )}
      </footer>
      {!!available.length && (
        <div
          data-scope="message"
          data-part="actions"
          role="group"
          aria-label={actionLabels?.group ?? "Message actions"}
        >
          {available.map((action) => (
            <button
              key={action.id}
              data-scope="message"
              data-part="action"
              type="button"
              disabled={blocked || action.disabled}
              data-action-id={action.id}
              onClick={() =>
                run(
                  action.id,
                  action.label,
                  action.onAction,
                  action.successLabel,
                  action.disabled,
                )
              }
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
      {operations.state.message && (
        <span
          data-scope="message"
          data-part="action-feedback"
          data-outcome={operations.state.outcome}
          role={operations.state.outcome === "error" ? "alert" : "status"}
        >
          {operations.state.message}
        </span>
      )}
    </article>
  );
}
