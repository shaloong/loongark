<script lang="ts">
  import { FileUpload } from "@ark-ui/svelte/file-upload";
</script>

<FileUpload.ItemDeleteTrigger
  data-scope="file-upload"
  data-part="item-delete-trigger"
  {...$$restProps}
>
  <slot />
</FileUpload.ItemDeleteTrigger>
