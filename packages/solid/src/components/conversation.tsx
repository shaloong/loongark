import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "./icon";
import {
  splitProps,
  createSignal,
  createEffect,
  onCleanup,
  type JSX,
} from "solid-js";
import {
  createConversationActionController,
  normalizeConversationActions,
  withConversationActionFocus,
  type ConversationActionState,
  type ConversationActionHandler,
  attachmentView,
  messageStatus,
  type AttachmentOptions,
  type BubbleOptions,
  type MessageOptions,
} from "@loongark/kit";
export type LoongArkAttachmentProps = Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  "onCancel"
> &
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
    "onPreview",
    "onCancel",
    "previewLabel",
    "cancelLabel",
    "actionLabels",
    "actionKey",
  ]);
  let root: HTMLDivElement | undefined;
  const [state, setState] = createSignal<ConversationActionState>({}),
    controller = createConversationActionController(setState);
  onCleanup(() => controller.dispose());
  createEffect(() => {
    local.actionKey;
    controller.reset();
  });
  const blocked = () => local.disabled || !!state().pendingId;
  const run = (
    id: string,
    label: string,
    handler: ConversationActionHandler,
  ) => {
    void controller.run(
      {
        id,
        label,
        disabled: local.disabled,
        onAction: withConversationActionFocus(root, handler),
      },
      local.actionLabels,
    );
  };
  const view = () => attachmentView({ ...local, disabled: blocked() });
  return (
    <div
      ref={root}
      role="group"
      aria-label={"Attachment " + local.name}
      tabIndex={-1}
      aria-busy={state().pendingId ? true : undefined}
      data-scope="attachment"
      data-part="root"
      data-status={view().status}
      data-disabled={local.disabled ? "true" : undefined}
      {...attrs}
    >
      <span data-scope="attachment" data-part="icon" aria-hidden="true">
        <LoongArkIcon icon={controlIcons.file} size="lg" />
      </span>
      <div data-scope="attachment" data-part="content">
        {view().link ? (
          <a
            data-scope="attachment"
            data-part="name"
            href={view().link}
            download={local.name}
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
            disabled={blocked()}
            aria-label={view().retry}
            data-action-id="retry"
            onClick={() => run("retry", view().retry, local.onRetry!)}
          >
            {local.retryLabel ?? "Retry"}
          </button>
        )}
        {view().status === "ready" && local.onPreview && (
          <button
            data-scope="attachment"
            data-part="action"
            type="button"
            disabled={blocked()}
            aria-label={local.previewLabel ?? "Preview " + local.name}
            data-action-id="preview"
            onClick={() =>
              run(
                "preview",
                local.previewLabel ?? "Preview " + local.name,
                local.onPreview!,
              )
            }
          >
            {local.previewLabel ?? "Preview"}
          </button>
        )}
        {view().status === "uploading" && local.onCancel && (
          <button
            data-scope="attachment"
            data-part="action"
            type="button"
            disabled={blocked()}
            aria-label={local.cancelLabel ?? "Cancel upload " + local.name}
            data-action-id="cancel"
            onClick={() =>
              run(
                "cancel",
                local.cancelLabel ?? "Cancel upload " + local.name,
                local.onCancel!,
              )
            }
          >
            {local.cancelLabel ?? "Cancel"}
          </button>
        )}
        {local.onRemove && (
          <button
            data-scope="attachment"
            data-part="action"
            type="button"
            disabled={blocked()}
            aria-label={view().remove}
            data-action-id="remove"
            onClick={() => run("remove", view().remove, local.onRemove!)}
          >
            {local.removeLabel ?? "Remove"}
          </button>
        )}
      </div>
      {state().message && (
        <span
          data-scope="attachment"
          data-part="action-feedback"
          data-outcome={state().outcome}
          role={state().outcome === "error" ? "alert" : "status"}
        >
          {state().message}
        </span>
      )}
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
    "actions",
    "disabled",
    "actionLabels",
    "actionKey",
    "children",
  ]);
  let root: HTMLElement | undefined;
  const [state, setState] = createSignal<ConversationActionState>({}),
    controller = createConversationActionController(setState);
  onCleanup(() => controller.dispose());
  createEffect(() => {
    local.actionKey;
    controller.reset();
  });
  const available = () => normalizeConversationActions(local.actions),
    blocked = () => local.disabled || !!state().pendingId;
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
        disabled: local.disabled || actionDisabled,
        onAction: withConversationActionFocus(root, handler),
        successLabel,
      },
      local.actionLabels,
    );
  };
  return (
    <article
      ref={root}
      tabIndex={-1}
      aria-busy={state().pendingId ? true : undefined}
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
            disabled={blocked()}
            data-action-id="retry"
            onClick={() =>
              run("retry", local.retryLabel ?? "Retry message", local.onRetry!)
            }
          >
            {local.retryLabel ?? "Retry message"}
          </button>
        )}
      </footer>
      {!!available().length && (
        <div
          data-scope="message"
          data-part="actions"
          role="group"
          aria-label={local.actionLabels?.group ?? "Message actions"}
        >
          {available().map((action) => (
            <button
              data-scope="message"
              data-part="action"
              type="button"
              disabled={blocked() || action.disabled}
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
      {state().message && (
        <span
          data-scope="message"
          data-part="action-feedback"
          data-outcome={state().outcome}
          role={state().outcome === "error" ? "alert" : "status"}
        >
          {state().message}
        </span>
      )}
    </article>
  );
}
