import { defineComponent, h, ref, onBeforeUnmount } from "vue";
import * as L from "@loongark/vue";
import type { ConversationActionContext, MessageOptions } from "@loongark/kit";
import {
  conversationNote,
  waitForConversationAction,
  createDemoUpload,
  type DemoUploadState,
} from "../shared/conversationActionsDemo";
export const ConversationActionsExample = defineComponent({
  setup() {
    const shown = ref(true),
      version = ref(0),
      fail = ref(false),
      disabled = ref(false),
      status = ref<MessageOptions["status"]>("sent"),
      saves = ref(0),
      removed = ref(false),
      preview = ref(false),
      upload = ref<DemoUploadState>({ status: "ready", progress: 0 });
    const source = createDemoUpload((next) => (upload.value = next));
    onBeforeUnmount(() => source.dispose());
    const note = () =>
      version.value % 2
        ? "The updated launch checklist is ready for a second review."
        : conversationNote;
    const restoreFocus = (name: string) =>
      requestAnimationFrame(() =>
        document
          .querySelector<HTMLButtonElement>(`[data-restore-${name}]`)
          ?.focus(),
      );
    const save = async (ctx: ConversationActionContext) => {
      const failing = fail.value;
      await waitForConversationAction(ctx, 700);
      if (failing) throw Error("Mock save failed");
      saves.value++;
    };
    const button = (
      label: string,
      onClick: () => void,
      variant: "outline" | "ghost" = "outline",
      attrs: Record<string, unknown> = {},
    ) => h(L.LoongArkButton, { variant, onClick, ...attrs }, () => label);
    return () =>
      h(
        L.LoongArkStack,
        { gap: "lg", style: { width: "100%", maxWidth: "640px" } },
        () => [
          h(L.LoongArkStack, { gap: "sm" }, () => [
            h(
              L.LoongArkTypography,
              { as: "h2" },
              () => "A project conversation",
            ),
            h(
              L.LoongArkTypography,
              { variant: "muted" },
              () => "Copy a note, save a draft and review its attachment.",
            ),
          ]),
          h(L.LoongArkStack, { orientation: "horizontal", gap: "sm" }, () => [
            button(
              disabled.value ? "Enable actions" : "Disable actions",
              () => (disabled.value = !disabled.value),
            ),
            button(
              fail.value ? "Use successful save" : "Use failing save",
              () => (fail.value = !fail.value),
            ),
            button("Replace message", () => version.value++, "ghost", {
              disabled: !shown.value,
            }),
            button(
              "Mark message failed",
              () => (status.value = "error"),
              "ghost",
              { disabled: !shown.value },
            ),
          ]),
          shown.value
            ? h(
                L.LoongArkMessage,
                {
                  author: "Lin",
                  dateTime: "2026-10-03T09:30:00Z",
                  timeLabel: "09:30",
                  status: status.value,
                  disabled: disabled.value,
                  actionKey: version.value,
                  onRetry: async (ctx: ConversationActionContext) => {
                    await waitForConversationAction(ctx);
                    status.value = "sent";
                  },
                  actions: [
                    {
                      id: "copy",
                      label: "Copy note",
                      onAction: async () => {
                        await navigator.clipboard.writeText(note());
                      },
                      successLabel: "Note copied",
                    },
                    {
                      id: "save",
                      label: "Save draft",
                      onAction: save,
                      successLabel: "Draft saved",
                    },
                    {
                      id: "delete",
                      label: "Delete message",
                      onAction: async (ctx: ConversationActionContext) => {
                        await waitForConversationAction(ctx, 200);
                        shown.value = false;
                        restoreFocus("message");
                      },
                    },
                    {
                      id: "archive",
                      label: "Archive message",
                      disabled: true,
                      onAction: () => {
                        throw Error("Disabled action must not run");
                      },
                    },
                  ],
                },
                () => h(L.LoongArkBubble, {}, () => note()),
              )
            : button(
                "Restore message",
                () => {
                  shown.value = true;
                  status.value = "sent";
                },
                "outline",
                { "data-restore-message": "" },
              ),
          h(
            "output",
            { "aria-label": "Saved drafts" },
            "Saved drafts: " + saves.value,
          ),
          h(L.LoongArkStack, { gap: "sm" }, () => [
            button(
              upload.value.status === "uploading"
                ? "Upload running…"
                : "Start upload",
              () => source.start(),
              "outline",
              {
                "data-restore-upload": "",
                disabled: upload.value.status === "uploading" || disabled.value,
              },
            ),
            upload.value.status === "cancelled"
              ? h(
                  L.LoongArkTypography,
                  { variant: "muted" },
                  () => "Upload cancelled.",
                )
              : h(L.LoongArkAttachment, {
                  name: "Review-screenshots.zip",
                  size: 8388608,
                  status: upload.value.status,
                  progress: upload.value.progress,
                  disabled: disabled.value,
                  onCancel: async (ctx: ConversationActionContext) => {
                    await waitForConversationAction(ctx, 200);
                    source.cancel();
                    restoreFocus("upload");
                  },
                }),
            removed.value
              ? button(
                  "Restore file",
                  () => (removed.value = false),
                  "outline",
                  { "data-restore-file": "" },
                )
              : h(L.LoongArkAttachment, {
                  name: "launch-notes.txt",
                  size: conversationNote.length,
                  href:
                    "data:text/plain;charset=utf-8," +
                    encodeURIComponent(conversationNote),
                  disabled: disabled.value,
                  onPreview: () => (preview.value = true),
                  onRemove: async (ctx: ConversationActionContext) => {
                    await waitForConversationAction(ctx, 200);
                    removed.value = true;
                    restoreFocus("file");
                  },
                }),
          ]),
          h(
            L.LoongArkDialogRoot,
            {
              finalFocusEl: () =>
                document.querySelector<HTMLButtonElement>(
                  'button[aria-label="Preview launch-notes.txt"]',
                ),
              open: preview.value,
              onOpenChange: (details: { open: boolean }) =>
                (preview.value = details.open),
            },
            () =>
              h(L.LoongArkDialogPortal, {}, () => [
                h(L.LoongArkDialogOverlay),
                h(L.LoongArkDialogPositioner, {}, () =>
                  h(L.LoongArkDialogContent, {}, () => [
                    h(L.LoongArkDialogTitle, {}, () => "launch-notes.txt"),
                    h(
                      L.LoongArkDialogDescription,
                      {},
                      () => "Plain text preview",
                    ),
                    h(
                      L.LoongArkTypography,
                      { style: { whiteSpace: "pre-wrap" } },
                      () => conversationNote,
                    ),
                    h(L.LoongArkDialogCloseTrigger, {
                      "aria-label": "Close file preview",
                    }),
                  ]),
                ),
              ]),
          ),
        ],
      );
  },
});
