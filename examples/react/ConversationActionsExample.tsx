import { useState, useRef, useEffect, useLayoutEffect } from "react";
import * as L from "@loongark/react";
import type { ConversationActionContext, MessageOptions } from "@loongark/kit";
import {
  conversationNote,
  waitForConversationAction,
  createDemoUpload,
  type DemoUploadState,
} from "../shared/conversationActionsDemo";
export function ConversationActionsExample() {
  const [shown, setShown] = useState(true),
    [version, setVersion] = useState(0),
    [fail, setFail] = useState(false),
    [disabled, setDisabled] = useState(false),
    [status, setStatus] = useState<MessageOptions["status"]>("sent"),
    [saves, setSaves] = useState(0),
    [removed, setRemoved] = useState(false),
    [preview, setPreview] = useState(false);
  const [upload, setUpload] = useState<DemoUploadState>({
      status: "ready",
      progress: 0,
    }),
    uploadSource = useRef<ReturnType<typeof createDemoUpload> | undefined>(
      undefined,
    );
  useEffect(() => {
    const source = createDemoUpload(setUpload);
    uploadSource.current = source;
    return () => {
      source.dispose();
      if (uploadSource.current === source) uploadSource.current = undefined;
    };
  }, []);
  const note =
    version % 2
      ? "The updated launch checklist is ready for a second review."
      : conversationNote;
  const [focusTarget, setFocusTarget] = useState<string>();
  const restoreFocus = (name: string) => setFocusTarget(name);
  // 等待实际提交后的替代按钮；单个 RAF 可能先于 React 的并发提交执行。
  useLayoutEffect(() => {
    if (!focusTarget) return;
    const button = document.querySelector<HTMLButtonElement>(
      `[data-restore-${focusTarget}]`,
    );
    if (button) {
      button.focus();
      setFocusTarget(undefined);
    }
  }, [focusTarget, shown, removed, upload.status]);
  const save = async (ctx: ConversationActionContext) => {
    const failing = fail;
    await waitForConversationAction(ctx, 700);
    if (failing) throw Error("Mock save failed");
    setSaves((value) => value + 1);
  };
  return (
    <L.LoongArkStack gap="lg" style={{ width: "100%", maxWidth: 640 }}>
      <L.LoongArkStack gap="sm">
        <L.LoongArkTypography as="h2">
          A project conversation
        </L.LoongArkTypography>
        <L.LoongArkTypography variant="muted">
          Copy a note, save a draft and review its attachment.
        </L.LoongArkTypography>
      </L.LoongArkStack>
      <L.LoongArkStack orientation="horizontal" gap="sm">
        <L.LoongArkButton
          variant="outline"
          onClick={() => setDisabled(!disabled)}
        >
          {disabled ? "Enable actions" : "Disable actions"}
        </L.LoongArkButton>
        <L.LoongArkButton variant="outline" onClick={() => setFail(!fail)}>
          {fail ? "Use successful save" : "Use failing save"}
        </L.LoongArkButton>
        <L.LoongArkButton
          variant="ghost"
          disabled={!shown}
          onClick={() => setVersion((value) => value + 1)}
        >
          Replace message
        </L.LoongArkButton>
        <L.LoongArkButton
          variant="ghost"
          disabled={!shown}
          onClick={() => setStatus("error")}
        >
          Mark message failed
        </L.LoongArkButton>
      </L.LoongArkStack>
      {shown ? (
        <L.LoongArkMessage
          author="Lin"
          dateTime="2026-10-03T09:30:00Z"
          timeLabel="09:30"
          status={status}
          disabled={disabled}
          actionKey={version}
          onRetry={async (ctx) => {
            await waitForConversationAction(ctx);
            setStatus("sent");
          }}
          actions={[
            {
              id: "copy",
              label: "Copy note",
              onAction: async () => {
                await navigator.clipboard.writeText(note);
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
              onAction: async (ctx) => {
                await waitForConversationAction(ctx, 200);
                setShown(false);
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
          ]}
        >
          <L.LoongArkBubble>{note}</L.LoongArkBubble>
        </L.LoongArkMessage>
      ) : (
        <L.LoongArkButton
          data-restore-message
          onClick={() => {
            setShown(true);
            setStatus("sent");
          }}
        >
          Restore message
        </L.LoongArkButton>
      )}
      <output aria-label="Saved drafts">Saved drafts: {saves}</output>
      <L.LoongArkStack gap="sm">
        <L.LoongArkButton
          variant="outline"
          data-restore-upload
          disabled={upload.status === "uploading" || disabled}
          onClick={() => uploadSource.current?.start()}
        >
          {upload.status === "uploading" ? "Upload running…" : "Start upload"}
        </L.LoongArkButton>
        {upload.status === "cancelled" ? (
          <L.LoongArkTypography variant="muted">
            Upload cancelled.
          </L.LoongArkTypography>
        ) : (
          <L.LoongArkAttachment
            name="Review-screenshots.zip"
            size={8388608}
            status={upload.status}
            progress={upload.progress}
            disabled={disabled}
            onCancel={async (ctx) => {
              await waitForConversationAction(ctx, 200);
              uploadSource.current?.cancel();
              restoreFocus("upload");
            }}
          />
        )}
        {removed ? (
          <L.LoongArkButton data-restore-file onClick={() => setRemoved(false)}>
            Restore file
          </L.LoongArkButton>
        ) : (
          <L.LoongArkAttachment
            name="launch-notes.txt"
            size={conversationNote.length}
            href={
              "data:text/plain;charset=utf-8," +
              encodeURIComponent(conversationNote)
            }
            disabled={disabled}
            onPreview={() => setPreview(true)}
            onRemove={async (ctx) => {
              await waitForConversationAction(ctx, 200);
              setRemoved(true);
              restoreFocus("file");
            }}
          />
        )}
      </L.LoongArkStack>
      <L.LoongArkDialogRoot
        finalFocusEl={() =>
          document.querySelector<HTMLButtonElement>(
            'button[aria-label="Preview launch-notes.txt"]',
          )
        }
        open={preview}
        onOpenChange={(details) => setPreview(details.open)}
      >
        <L.LoongArkDialogPortal>
          <L.LoongArkDialogOverlay />
          <L.LoongArkDialogPositioner>
            <L.LoongArkDialogContent>
              <L.LoongArkDialogTitle>launch-notes.txt</L.LoongArkDialogTitle>
              <L.LoongArkDialogDescription>
                Plain text preview
              </L.LoongArkDialogDescription>
              <L.LoongArkTypography style={{ whiteSpace: "pre-wrap" }}>
                {conversationNote}
              </L.LoongArkTypography>
              <L.LoongArkDialogCloseTrigger aria-label="Close file preview" />
            </L.LoongArkDialogContent>
          </L.LoongArkDialogPositioner>
        </L.LoongArkDialogPortal>
      </L.LoongArkDialogRoot>
    </L.LoongArkStack>
  );
}
