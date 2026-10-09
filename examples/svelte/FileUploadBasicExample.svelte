<script lang="ts">
  import {
    LoongArkFileUploadRoot,
    LoongArkFileUploadLabel,
    LoongArkFileUploadDropzone,
    LoongArkFileUploadTrigger,
    LoongArkFileUploadHiddenInput,
  } from "@loongark/svelte";
</script>

<LoongArkFileUploadRoot maxFiles={1}>
  <LoongArkFileUploadLabel>上传文件</LoongArkFileUploadLabel>
  <LoongArkFileUploadDropzone>
    将文件拖到这里
    <LoongArkFileUploadTrigger>选择文件</LoongArkFileUploadTrigger>
  </LoongArkFileUploadDropzone>
  <LoongArkFileUploadHiddenInput />
</LoongArkFileUploadRoot>
