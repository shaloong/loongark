<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticFileUploadStyles } from "@shaloong/loongark-primitives/automatic-styles/file-upload";
  registerAutomaticStyles(lkAutomaticFileUploadStyles);

  import { FileUpload } from "@ark-ui/svelte/file-upload";
</script>

<FileUpload.ItemPreviewImage
  data-scope="file-upload"
  data-part="item-preview-image"
  {...$$restProps}
/>
