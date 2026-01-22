<script lang="ts">
  import {
    LoongArkButton,
    LoongArkToaster,
    LoongArkToastRoot,
    LoongArkToastTitle,
    LoongArkToastDescription,
    LoongArkToastActionTrigger,
    LoongArkToastCloseTrigger,
    createToaster,
    createThemeStore,
  } from "@loongark/svelte";

  type ToastVariant = "info" | "success" | "warning" | "error";

  createThemeStore({ mode: "light" });

  const toaster = createToaster({ placement: "bottom-end" });

  const createToast = (type: ToastVariant, title: string) => {
    const actionLabel = type === "success" ? "Undo" : "Details";
    toaster[type]({
      title,
      description: "Updates are synchronized with your workspace.",
      action: {
        label: actionLabel,
        onClick: () => undefined,
      },
      closable: true,
    });
  };
</script>

<div style="display: flex; flex-direction: column; gap: 12px;">
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <LoongArkButton on:click={() => createToast("info", "Toast created")}>
      Create toast
    </LoongArkButton>
    <LoongArkButton on:click={() => createToast("success", "Saved successfully")}>
      Success
    </LoongArkButton>
  </div>

  <LoongArkToaster {toaster}>
    <svelte:fragment let:toast>
      <LoongArkToastRoot>
        {#if toast.title}
          <LoongArkToastTitle>{toast.title}</LoongArkToastTitle>
        {/if}
        {#if toast.description}
          <LoongArkToastDescription>{toast.description}</LoongArkToastDescription>
        {/if}
        {#if toast.action}
          <LoongArkToastActionTrigger>{toast.action.label}</LoongArkToastActionTrigger>
        {/if}
        {#if toast.closable}
          <LoongArkToastCloseTrigger>Close</LoongArkToastCloseTrigger>
        {/if}
      </LoongArkToastRoot>
    </svelte:fragment>
  </LoongArkToaster>
</div>
