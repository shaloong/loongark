<script lang="ts">
  import { FileUpload } from "@ark-ui/svelte/file-upload";
</script>

<FileUpload.ClearTrigger
  data-scope="file-upload"
  data-part="clear-trigger"
  {...$$restProps}
>
  <slot />
</FileUpload.ClearTrigger>
