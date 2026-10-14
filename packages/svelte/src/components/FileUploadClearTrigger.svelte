<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticFileUploadStyles } from "@shaloong/loongark-primitives/automatic-styles/file-upload";
  registerAutomaticStyles(lkAutomaticFileUploadStyles);

  import { FileUpload } from "@ark-ui/svelte/file-upload";
</script>

<FileUpload.ClearTrigger
  data-scope="file-upload"
  data-part="clear-trigger"
  {...$$restProps}
>
  <slot />
</FileUpload.ClearTrigger>
