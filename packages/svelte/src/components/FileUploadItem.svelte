<script lang="ts">
  import { FileUpload } from "@ark-ui/svelte/file-upload";
  import type { FileUploadItemProps } from "@ark-ui/svelte/file-upload";

  export let file: FileUploadItemProps["file"];
</script>

<FileUpload.Item
  {file}
  data-scope="file-upload"
  data-part="item"
  {...$$restProps}
>
  <slot />
</FileUpload.Item>
