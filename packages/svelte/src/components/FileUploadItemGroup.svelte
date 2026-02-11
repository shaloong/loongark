<script lang="ts">
  import { FileUpload } from "@ark-ui/svelte/file-upload";
</script>

<FileUpload.ItemGroup
  data-scope="file-upload"
  data-part="item-group"
  {...$$restProps}
>
  <slot />
</FileUpload.ItemGroup>
