<script lang="ts">
  import { FileUpload } from "@ark-ui/svelte/file-upload";
</script>

<FileUpload.Label data-scope="file-upload" data-part="label" {...$$restProps}>
  <slot />
</FileUpload.Label>
