<script lang="ts">
  import { FileUpload } from "@ark-ui/svelte/file-upload";
</script>

<FileUpload.HiddenInput
  data-scope="file-upload"
  data-part="hidden-input"
  {...$$restProps}
/>
