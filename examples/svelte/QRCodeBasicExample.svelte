<script lang="ts">
  import { LoongArkQrCode } from "@loongark/svelte";
</script>

<LoongArkQrCode.Root value="https://shaloong.github.io/loongark/">
  <LoongArkQrCode.Frame>
    <LoongArkQrCode.Pattern />
  </LoongArkQrCode.Frame>
  <LoongArkQrCode.DownloadTrigger mimeType="image/png" fileName="loongark.png">
    下载二维码
  </LoongArkQrCode.DownloadTrigger>
</LoongArkQrCode.Root>
