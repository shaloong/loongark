<script lang="ts">
  import {
    LoongArkFileUploadRoot,
    LoongArkFileUploadLabel,
    LoongArkFileUploadDropzone,
    LoongArkFileUploadTrigger,
    LoongArkFileUploadHiddenInput,
    LoongArkFileUploadItemGroup,
    LoongArkFileUploadItem,
    LoongArkFileUploadItemPreview,
    LoongArkFileUploadItemPreviewImage,
    LoongArkFileUploadItemName,
    LoongArkFileUploadItemSizeText,
    LoongArkFileUploadItemDeleteTrigger,
    LoongArkFileUploadClearTrigger,
  } from "@loongark/svelte";
  import type { FileUploadSize } from "@loongark/primitives";

  export let size: FileUploadSize = "md";
  export let disabled = false;

  let files: File[] = [];

  const handleFileChange = (details: any) => {
    files = details?.acceptedFiles ?? [];
  };
</script>

<LoongArkFileUploadRoot
  {size}
  {disabled}
  accept={{ "image/*": [] }}
  maxFiles={3}
  onFileChange={handleFileChange}
>
  <LoongArkFileUploadLabel>Upload files</LoongArkFileUploadLabel>
  <LoongArkFileUploadDropzone>
    <p style="margin: 0;">Drag files here</p>
    <LoongArkFileUploadTrigger>Browse</LoongArkFileUploadTrigger>
  </LoongArkFileUploadDropzone>
  <LoongArkFileUploadHiddenInput />
  <LoongArkFileUploadItemGroup>
    {#each files as file (file.name)}
      <LoongArkFileUploadItem {file}>
        <LoongArkFileUploadItemPreview>
          <LoongArkFileUploadItemPreviewImage />
        </LoongArkFileUploadItemPreview>
        <div>
          <LoongArkFileUploadItemName />
          <LoongArkFileUploadItemSizeText />
        </div>
        <LoongArkFileUploadItemDeleteTrigger>
          Remove
        </LoongArkFileUploadItemDeleteTrigger>
      </LoongArkFileUploadItem>
    {/each}
  </LoongArkFileUploadItemGroup>
  {#if files.length > 0}
    <LoongArkFileUploadClearTrigger>Clear all</LoongArkFileUploadClearTrigger>
  {/if}
</LoongArkFileUploadRoot>
