<script lang="ts">
  import { FileUpload } from "@ark-ui/svelte/file-upload";
</script>

<FileUpload.ItemSizeText
  data-scope="file-upload"
  data-part="item-size-text"
  {...$$restProps}
>
  <slot />
</FileUpload.ItemSizeText>
