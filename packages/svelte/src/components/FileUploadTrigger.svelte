<script lang="ts">
  import { FileUpload } from "@ark-ui/svelte/file-upload";
</script>

<FileUpload.Trigger
  data-scope="file-upload"
  data-part="trigger"
  {...$$restProps}
>
  <slot />
</FileUpload.Trigger>
