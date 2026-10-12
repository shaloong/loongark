<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticFileUploadStyles } from "@loongark/primitives/automatic-styles/file-upload";
  registerAutomaticStyles(lkAutomaticFileUploadStyles);

  import { FileUpload } from "@ark-ui/svelte/file-upload";
</script>

<FileUpload.ItemName
  data-scope="file-upload"
  data-part="item-name"
  {...$$restProps}
>
  <slot />
</FileUpload.ItemName>
