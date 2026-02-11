<script lang="ts">
  import { FileUpload } from "@ark-ui/svelte/file-upload";
</script>

<FileUpload.Dropzone
  data-scope="file-upload"
  data-part="dropzone"
  {...$$restProps}
>
  <slot />
</FileUpload.Dropzone>
