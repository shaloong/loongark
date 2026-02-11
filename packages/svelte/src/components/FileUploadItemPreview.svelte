<script lang="ts">
  import { FileUpload } from "@ark-ui/svelte/file-upload";
</script>

<FileUpload.ItemPreview
  data-scope="file-upload"
  data-part="item-preview"
  {...$$restProps}
>
  <slot />
</FileUpload.ItemPreview>
