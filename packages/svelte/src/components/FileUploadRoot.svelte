<script lang="ts">
  import { FileUpload } from "@ark-ui/svelte/file-upload";
  import type { FileUploadRootProps } from "@ark-ui/svelte/file-upload";
  import type { FileUploadSize } from "@loongark/primitives";

  export let size: FileUploadSize = "md";
  export let accept: FileUploadRootProps["accept"] = undefined;
  export let acceptedFiles: FileUploadRootProps["acceptedFiles"] = undefined;
  export let defaultAcceptedFiles: FileUploadRootProps["defaultAcceptedFiles"] =
    undefined;
  export let allowDrop: FileUploadRootProps["allowDrop"] = undefined;
  export let directory: FileUploadRootProps["directory"] = undefined;
  export let disabled: FileUploadRootProps["disabled"] = undefined;
  export let maxFiles: FileUploadRootProps["maxFiles"] = undefined;
  export let maxFileSize: FileUploadRootProps["maxFileSize"] = undefined;
  export let minFileSize: FileUploadRootProps["minFileSize"] = undefined;
  export let name: FileUploadRootProps["name"] = undefined;
  export let id: FileUploadRootProps["id"] = undefined;
  export let ids: FileUploadRootProps["ids"] = undefined;
  export let required: FileUploadRootProps["required"] = undefined;
  export let onFileAccept: FileUploadRootProps["onFileAccept"] = undefined;
  export let onFileChange: FileUploadRootProps["onFileChange"] = undefined;
  export let onFileReject: FileUploadRootProps["onFileReject"] = undefined;
  export let onFileValidate: FileUploadRootProps["onFileValidate"] = undefined;
</script>

<FileUpload.Root
  {accept}
  {acceptedFiles}
  {defaultAcceptedFiles}
  {allowDrop}
  {directory}
  {disabled}
  {maxFiles}
  {maxFileSize}
  {minFileSize}
  {name}
  {id}
  {ids}
  {required}
  {onFileAccept}
  {onFileChange}
  {onFileReject}
  {onFileValidate}
  data-scope="file-upload"
  data-part="root"
  data-size={size}
  data-disabled={disabled ? "true" : undefined}
  {...$$restProps}
>
  <slot />
</FileUpload.Root>
