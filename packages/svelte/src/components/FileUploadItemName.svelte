<script lang="ts">
  import { FileUpload } from "@ark-ui/svelte/file-upload";
</script>

<FileUpload.ItemName
  data-scope="file-upload"
  data-part="item-name"
  {...$$restProps}
>
  <slot />
</FileUpload.ItemName>
