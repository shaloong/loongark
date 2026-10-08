import { defineComponent, h, onBeforeUnmount, ref } from "vue";
import * as L from "@loongark/vue";
import {
  createMessageScrollerDemo,
  messageScrollerInitialState,
  messagePreview,
} from "../shared/messageScrollerDemo";
export const MessageScrollerAdvancedExample = defineComponent({
  setup() {
    const view = ref(messageScrollerInitialState()),
      visible = ref(true),
      following = ref(true),
      host = ref<HTMLDivElement>();
    const source = createMessageScrollerDemo((next) => {
      view.value = next;
    });
    onBeforeUnmount(() => source.dispose());
    const readEarlier = () => {
      const viewport = host.value?.querySelector<HTMLElement>(
          '[data-part="viewport"]',
        ),
        row = host.value?.querySelector<HTMLElement>(
          '[data-message-id="reply-4"]',
        );
      if (!viewport || !row) return;
      viewport.scrollTop +=
        row.getBoundingClientRect().top -
        viewport.getBoundingClientRect().top -
        viewport.clientTop;
      viewport.focus({ preventScroll: true });
    };
    const button = (
      text: string,
      onClick: () => void,
      variant: "ghost" | "outline",
      props = {},
    ) => h(L.LoongArkButton, { variant, onClick, ...props }, () => text);
    return () =>
      h(
        L.LoongArkStack,
        { gap: "md", style: { width: "100%", maxWidth: "640px" } },
        () => [
          h(
            L.LoongArkTypography,
            { as: "h2" },
            () => "Keep the discussion in view",
          ),
          h(
            L.LoongArkTypography,
            { variant: "muted" },
            () =>
              "Read earlier replies while a shared preview loads and new notes arrive.",
          ),
          h(L.LoongArkStack, { orientation: "horizontal", gap: "sm" }, () => [
            button("Read earlier replies", readEarlier, "outline", {
              disabled: !visible.value,
            }),
            button(
              view.value.preview === "loaded"
                ? "Hide shared preview"
                : view.value.preview === "loading"
                  ? "Cancel preview load"
                  : "Load shared preview",
              () =>
                view.value.preview === "idle"
                  ? source.loadPreview()
                  : source.hidePreview(),
              "outline",
              {
                disabled: !visible.value,
                "aria-busy":
                  view.value.preview === "loading" ? true : undefined,
              },
            ),
            button(
              "Insert history and reply",
              () => source.insertHistoryAndReply(),
              "ghost",
            ),
            button("Add reply", () => source.addReply(), "ghost"),
            button(
              "Reset thread",
              () => {
                source.reset();
                following.value = true;
              },
              "ghost",
            ),
            button(
              visible.value ? "Hide conversation" : "Show conversation",
              () => {
                source.cancelPreview();
                visible.value = !visible.value;
                following.value = true;
              },
              "ghost",
            ),
          ]),
          h(
            "output",
            { "aria-label": "Reading mode" },
            !visible.value
              ? "Conversation hidden"
              : following.value
                ? "Following latest replies"
                : "Reading earlier replies",
          ),
          h(
            "div",
            { ref: host },
            visible.value
              ? h(
                  L.LoongArkMessageScroller,
                  {
                    key: view.value.generation,
                    label: "Workspace discussion",
                    onAtBottomChange: (d: { atBottom: boolean }) => {
                      following.value = d.atBottom;
                    },
                  },
                  () =>
                    view.value.rows.map((row) =>
                      h(
                        L.LoongArkMessage,
                        {
                          key: row.id,
                          "data-message-id": row.id,
                          author: row.author,
                          side: row.side,
                          timeLabel: "09:30",
                          dateTime: "2026-10-03T09:30:00+08:00",
                        },
                        () =>
                          h(
                            L.LoongArkBubble,
                            { side: row.side, style: { whiteSpace: "normal" } },
                            () => [
                              row.id === "reply-0" &&
                              view.value.preview === "loaded"
                                ? h("img", {
                                    src: messagePreview.src,
                                    alt: messagePreview.alt,
                                    style: {
                                      display: "block",
                                      width: "100%",
                                      maxWidth: "320px",
                                      height: "auto",
                                      borderRadius: "var(--lk-radius-md)",
                                      marginBottom:
                                        "var(--lk-space-component-sm)",
                                    },
                                  })
                                : null,
                              h(
                                L.LoongArkTypography,
                                { as: "p", style: { margin: 0 } },
                                () => row.body,
                              ),
                            ],
                          ),
                      ),
                    ),
                )
              : h(
                  L.LoongArkTypography,
                  { variant: "muted", role: "status" },
                  () => "Show the conversation to continue reading.",
                ),
          ),
        ],
      );
  },
});
