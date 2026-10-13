<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticFileUploadStyles } from "@loongark/primitives/automatic-styles/file-upload";
  registerAutomaticStyles(lkAutomaticFileUploadStyles);

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
