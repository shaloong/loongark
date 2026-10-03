import { defineComponent, h, type PropType } from "vue";
import {
  attachmentIconPath,
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
    onRemove: Function as PropType<() => void>,
    onRetry: Function as PropType<() => void>,
  },
  setup(p, { attrs }) {
    return () => {
      const v = attachmentView(p);
      return h(
        "div",
        {
          ...attrs,
          ...part("attachment", "root"),
          "data-status": v.status,
          "data-disabled": p.disabled ? "true" : undefined,
        },
        [
          h("span", { ...part("attachment", "icon"), "aria-hidden": "true" }, [
            h(
              "svg",
              {
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": 1.5,
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                focusable: "false",
              },
              [h("path", { d: attachmentIconPath })],
            ),
          ]),
          h("div", part("attachment", "content"), [
            h(
              v.link ? "a" : "span",
              {
                ...part("attachment", "name"),
                href: v.link,
                download: v.link ? "" : undefined,
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
                  disabled: p.disabled,
                  "aria-label": v.retry,
                  onClick: p.onRetry,
                },
                "Retry",
              ),
            p.onRemove &&
              h(
                "button",
                {
                  ...part("attachment", "action"),
                  type: "button",
                  disabled: p.disabled,
                  "aria-label": v.remove,
                  onClick: p.onRemove,
                },
                "Remove",
              ),
          ]),
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
    onRetry: Function as PropType<() => void>,
  },
  setup(p, { attrs, slots }) {
    return () =>
      h(
        "article",
        {
          ...attrs,
          ...part("message", "root"),
          "data-side": p.side ?? "incoming",
          "data-status": p.status ?? "sent",
          "aria-label": "Message from " + p.author,
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
                  onClick: p.onRetry,
                },
                p.retryLabel ?? "Retry message",
              ),
          ]),
        ],
      );
  },
});
