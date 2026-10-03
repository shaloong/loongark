<script lang="ts">
  import { onDestroy } from "svelte";
  import * as L from "@loongark/svelte";
  import type {
    ConversationActionContext,
    MessageOptions,
  } from "@loongark/kit";
  import {
    conversationNote,
    waitForConversationAction,
    createDemoUpload,
    type DemoUploadState,
  } from "../shared/conversationActionsDemo";
  let shown = $state(true),
    version = $state(0),
    fail = $state(false),
    disabled = $state(false),
    status = $state<MessageOptions["status"]>("sent"),
    saves = $state(0),
    removed = $state(false),
    preview = $state(false),
    upload = $state<DemoUploadState>({ status: "ready", progress: 0 });
  const source = createDemoUpload((next) => {
    upload = next;
  });
  onDestroy(() => source.dispose());
  const note = $derived(
    version % 2
      ? "The updated launch checklist is ready for a second review."
      : conversationNote,
  );
  const restoreFocus = (name: string) =>
    requestAnimationFrame(() =>
      document
        .querySelector<HTMLButtonElement>(`[data-restore-${name}]`)
        ?.focus(),
    );
  const save = async (ctx: ConversationActionContext) => {
    const failing = fail;
    await waitForConversationAction(ctx, 700);
    if (failing) throw Error("Mock save failed");
    saves++;
  };
</script>

<L.LoongArkStack gap="lg" style="width:100%;max-width:640px">
  <L.LoongArkStack gap="sm"
    ><L.LoongArkTypography as="h2">A project conversation</L.LoongArkTypography
    ><L.LoongArkTypography variant="muted"
      >Copy a note, save a draft and review its attachment.</L.LoongArkTypography
    ></L.LoongArkStack
  >
  <L.LoongArkStack orientation="horizontal" gap="sm">
    <L.LoongArkButton variant="outline" onclick={() => (disabled = !disabled)}
      >{disabled ? "Enable actions" : "Disable actions"}</L.LoongArkButton
    >
    <L.LoongArkButton variant="outline" onclick={() => (fail = !fail)}
      >{fail ? "Use successful save" : "Use failing save"}</L.LoongArkButton
    >
    <L.LoongArkButton
      variant="ghost"
      disabled={!shown}
      onclick={() => version++}>Replace message</L.LoongArkButton
    >
    <L.LoongArkButton
      variant="ghost"
      disabled={!shown}
      onclick={() => (status = "error")}>Mark message failed</L.LoongArkButton
    >
  </L.LoongArkStack>
  {#if shown}<L.LoongArkMessage
      author="Lin"
      dateTime="2026-10-03T09:30:00Z"
      timeLabel="09:30"
      {status}
      {disabled}
      actionKey={version}
      onRetry={async (ctx) => {
        await waitForConversationAction(ctx);
        status = "sent";
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
            shown = false;
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
      ]}><L.LoongArkBubble>{note}</L.LoongArkBubble></L.LoongArkMessage
    >{:else}<L.LoongArkButton
      data-restore-message
      onclick={() => {
        shown = true;
        status = "sent";
      }}>Restore message</L.LoongArkButton
    >{/if}
  <output aria-label="Saved drafts">Saved drafts: {saves}</output>
  <L.LoongArkStack gap="sm">
    <L.LoongArkButton
      variant="outline"
      data-restore-upload
      disabled={upload.status === "uploading" || disabled}
      onclick={() => source.start()}
      >{upload.status === "uploading"
        ? "Upload running…"
        : "Start upload"}</L.LoongArkButton
    >
    {#if upload.status === "cancelled"}<L.LoongArkTypography variant="muted"
        >Upload cancelled.</L.LoongArkTypography
      >{:else}<L.LoongArkAttachment
        name="Review-screenshots.zip"
        size={8388608}
        status={upload.status}
        progress={upload.progress}
        {disabled}
        onCancel={async (ctx) => {
          await waitForConversationAction(ctx, 200);
          source.cancel();
          restoreFocus("upload");
        }}
      />{/if}
    {#if removed}<L.LoongArkButton
        data-restore-file
        onclick={() => (removed = false)}>Restore file</L.LoongArkButton
      >{:else}<L.LoongArkAttachment
        name="launch-notes.txt"
        size={conversationNote.length}
        href={"data:text/plain;charset=utf-8," +
          encodeURIComponent(conversationNote)}
        {disabled}
        onPreview={() => (preview = true)}
        onRemove={async (ctx) => {
          await waitForConversationAction(ctx, 200);
          removed = true;
          restoreFocus("file");
        }}
      />{/if}
  </L.LoongArkStack>
  <L.LoongArkDialogRoot
    finalFocusEl={() =>
      document.querySelector<HTMLButtonElement>(
        'button[aria-label="Preview launch-notes.txt"]',
      )}
    open={preview}
    onOpenChange={(details) => (preview = details.open)}
  >
    <L.LoongArkDialogPortal
      ><L.LoongArkDialogOverlay /><L.LoongArkDialogPositioner
        ><L.LoongArkDialogContent>
          <L.LoongArkDialogTitle>launch-notes.txt</L.LoongArkDialogTitle
          ><L.LoongArkDialogDescription
            >Plain text preview</L.LoongArkDialogDescription
          >
          <L.LoongArkTypography style="white-space:pre-wrap"
            >{conversationNote}</L.LoongArkTypography
          >
          <L.LoongArkDialogCloseTrigger aria-label="Close file preview" />
        </L.LoongArkDialogContent></L.LoongArkDialogPositioner
      ></L.LoongArkDialogPortal
    >
  </L.LoongArkDialogRoot>
</L.LoongArkStack>
