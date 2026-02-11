<script lang="ts">
  import { FileUpload } from "@ark-ui/svelte/file-upload";
</script>

<FileUpload.ItemPreviewImage
  data-scope="file-upload"
  data-part="item-preview-image"
  {...$$restProps}
/>
