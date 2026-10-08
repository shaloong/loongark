import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "./icon";
import {
  defineComponent,
  h,
  ref,
  watch,
  onBeforeUnmount,
  type PropType,
} from "vue";
import {
  createConversationActionController,
  normalizeConversationActions,
  withConversationActionFocus,
  type ConversationActionState,
  type ConversationAction,
  type ConversationActionHandler,
  attachmentView,
  messageStatus,
  type AttachmentOptions,
  type MessageOptions,
  type BubbleOptions,
} from "@loongark/kit";
const part = (scope: string, name: string) => ({
  "data-scope": scope,
  "data-part": name,
});
function useConversationActions(
  p: Pick<AttachmentOptions, "actionKey" | "actionLabels" | "disabled">,
) {
  const state = ref<ConversationActionState>({}),
    root = ref<HTMLElement>();
  const controller = createConversationActionController((next) => {
    state.value = next;
  });
  watch(
    () => p.actionKey,
    () => controller.reset(),
    { flush: "sync" },
  );
  onBeforeUnmount(() => controller.dispose());
  return {
    state,
    root,
    blocked: () => p.disabled || !!state.value.pendingId,
    run: (action: ConversationAction) => {
      void controller.run(
        {
          ...action,
          disabled: p.disabled || action.disabled,
          onAction: withConversationActionFocus(root.value, action.onAction),
        },
        p.actionLabels,
      );
    },
  };
}
export const LoongArkAttachment = defineComponent({
  name: "LoongArkAttachment",
  inheritAttrs: false,
  props: {
    name: { type: String, required: true },
    size: Number,
    href: String,
    status: String as PropType<AttachmentOptions["status"]>,
    progress: Number,
    disabled: Boolean,
    errorLabel: String,
    removeLabel: String,
    retryLabel: String,
    onRemove: Function as PropType<ConversationActionHandler>,
    onRetry: Function as PropType<ConversationActionHandler>,
    onPreview: Function as PropType<ConversationActionHandler>,
    onCancel: Function as PropType<ConversationActionHandler>,
    previewLabel: String,
    cancelLabel: String,
    actionKey: [String, Number],
    actionLabels: Object as PropType<AttachmentOptions["actionLabels"]>,
  },
  setup(p, { attrs }) {
    const operations = useConversationActions(p);
    return () => {
      const v = attachmentView({ ...p, disabled: operations.blocked() });
      return h(
        "div",
        {
          ...attrs,
          ...part("attachment", "root"),
          ref: operations.root,
          role: "group",
          tabindex: -1,
          "aria-label": attrs["aria-label"] ?? "Attachment " + p.name,
          "aria-busy": operations.state.value.pendingId ? true : undefined,
          "data-status": v.status,
          "data-disabled": p.disabled ? "true" : undefined,
        },
        [
          h("span", { ...part("attachment", "icon"), "aria-hidden": "true" }, [
            h(LoongArkIcon, { icon: controlIcons.file, size: "lg" }),
          ]),
          h("div", part("attachment", "content"), [
            h(
              v.link ? "a" : "span",
              {
                ...part("attachment", "name"),
                href: v.link,
                download: v.link ? p.name : undefined,
              },
              p.name,
            ),
            v.size && h("span", part("attachment", "description"), v.size),
            v.status === "uploading" &&
              h("progress", {
                ...part("attachment", "progress"),
                "aria-label": "Uploading " + p.name,
                max: 100,
                value: v.progress,
              }),
            v.status === "error" &&
              h(
                "span",
                { ...part("attachment", "description"), role: "status" },
                v.error,
              ),
          ]),
          h("div", part("attachment", "actions"), [
            v.status === "error" &&
              p.onRetry &&
              h(
                "button",
                {
                  ...part("attachment", "action"),
                  type: "button",
                  disabled: operations.blocked(),
                  "aria-label": v.retry,
                  "data-action-id": "retry",
                  onClick: () =>
                    operations.run({
                      id: "retry",
                      label: v.retry,
                      onAction: p.onRetry!,
                    }),
                },
                p.retryLabel ?? "Retry",
              ),
            v.status === "ready" &&
              p.onPreview &&
              h(
                "button",
                {
                  ...part("attachment", "action"),
                  type: "button",
                  disabled: operations.blocked(),
                  "aria-label": p.previewLabel ?? "Preview " + p.name,
                  "data-action-id": "preview",
                  onClick: () =>
                    operations.run({
                      id: "preview",
                      label: p.previewLabel ?? "Preview " + p.name,
                      onAction: p.onPreview!,
                    }),
                },
                p.previewLabel ?? "Preview",
              ),
            v.status === "uploading" &&
              p.onCancel &&
              h(
                "button",
                {
                  ...part("attachment", "action"),
                  type: "button",
                  disabled: operations.blocked(),
                  "aria-label": p.cancelLabel ?? "Cancel upload " + p.name,
                  "data-action-id": "cancel",
                  onClick: () =>
                    operations.run({
                      id: "cancel",
                      label: p.cancelLabel ?? "Cancel upload " + p.name,
                      onAction: p.onCancel!,
                    }),
                },
                p.cancelLabel ?? "Cancel",
              ),
            p.onRemove &&
              h(
                "button",
                {
                  ...part("attachment", "action"),
                  type: "button",
                  disabled: operations.blocked(),
                  "aria-label": v.remove,
                  "data-action-id": "remove",
                  onClick: () =>
                    operations.run({
                      id: "remove",
                      label: v.remove,
                      onAction: p.onRemove!,
                    }),
                },
                p.removeLabel ?? "Remove",
              ),
          ]),
          operations.state.value.message &&
            h(
              "span",
              {
                ...part("attachment", "action-feedback"),
                "data-outcome": operations.state.value.outcome,
                role:
                  operations.state.value.outcome === "error"
                    ? "alert"
                    : "status",
              },
              operations.state.value.message,
            ),
        ],
      );
    };
  },
});
export const LoongArkBubble = defineComponent({
  name: "LoongArkBubble",
  inheritAttrs: false,
  props: { side: String as PropType<BubbleOptions["side"]> },
  setup(p, { attrs, slots }) {
    return () =>
      h(
        "div",
        {
          ...attrs,
          ...part("bubble", "root"),
          "data-side": p.side ?? "incoming",
        },
        slots.default?.(),
      );
  },
});
export const LoongArkMessage = defineComponent({
  name: "LoongArkMessage",
  inheritAttrs: false,
  props: {
    author: { type: String, required: true },
    side: String as PropType<MessageOptions["side"]>,
    dateTime: String,
    timeLabel: String,
    status: String as PropType<MessageOptions["status"]>,
    statusLabel: String,
    retryLabel: String,
    onRetry: Function as PropType<ConversationActionHandler>,
    actions: Array as PropType<readonly ConversationAction[]>,
    disabled: Boolean,
    actionKey: [String, Number],
    actionLabels: Object as PropType<MessageOptions["actionLabels"]>,
  },
  setup(p, { attrs, slots }) {
    const operations = useConversationActions(p);
    return () =>
      h(
        "article",
        {
          ...attrs,
          ...part("message", "root"),
          ref: operations.root,
          tabindex: -1,
          "aria-busy": operations.state.value.pendingId ? true : undefined,
          "data-side": p.side ?? "incoming",
          "data-status": p.status ?? "sent",
          "aria-label": attrs["aria-label"] ?? "Message from " + p.author,
        },
        [
          h("header", part("message", "meta"), [
            h("span", part("message", "author"), p.author),
            p.dateTime &&
              h("time", { datetime: p.dateTime }, p.timeLabel ?? p.dateTime),
          ]),
          h("div", part("message", "content"), slots.default?.()),
          h("footer", part("message", "meta"), [
            h(
              "span",
              {
                ...part("message", "status"),
                role:
                  p.status === "error" || p.status === "sending"
                    ? "status"
                    : undefined,
              },
              messageStatus(p),
            ),
            p.status === "error" &&
              p.onRetry &&
              h(
                "button",
                {
                  ...part("message", "action"),
                  type: "button",
                  disabled: operations.blocked(),
                  "data-action-id": "retry",
                  onClick: () =>
                    operations.run({
                      id: "retry",
                      label: p.retryLabel ?? "Retry message",
                      onAction: p.onRetry!,
                    }),
                },
                p.retryLabel ?? "Retry message",
              ),
          ]),
          normalizeConversationActions(p.actions).length
            ? h(
                "div",
                {
                  ...part("message", "actions"),
                  role: "group",
                  "aria-label": p.actionLabels?.group ?? "Message actions",
                },
                normalizeConversationActions(p.actions).map((action) =>
                  h(
                    "button",
                    {
                      ...part("message", "action"),
                      key: action.id,
                      type: "button",
                      disabled: operations.blocked() || action.disabled,
                      "data-action-id": action.id,
                      onClick: () => operations.run(action),
                    },
                    action.label,
                  ),
                ),
              )
            : null,
          operations.state.value.message &&
            h(
              "span",
              {
                ...part("message", "action-feedback"),
                "data-outcome": operations.state.value.outcome,
                role:
                  operations.state.value.outcome === "error"
                    ? "alert"
                    : "status",
              },
              operations.state.value.message,
            ),
        ],
      );
  },
});
