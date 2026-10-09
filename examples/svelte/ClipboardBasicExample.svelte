<script lang="ts">
  import {
    LoongArkClipboardRoot,
    LoongArkClipboardLabel,
    LoongArkClipboardControl,
    LoongArkClipboardInput,
    LoongArkClipboardTrigger,
    LoongArkClipboardIndicator,
  } from "@loongark/svelte";
</script>

<LoongArkClipboardRoot value="https://example.com">
  <LoongArkClipboardLabel>分享链接</LoongArkClipboardLabel>
  <LoongArkClipboardControl>
    <LoongArkClipboardInput />
    <LoongArkClipboardTrigger>复制</LoongArkClipboardTrigger>
  </LoongArkClipboardControl>
  <LoongArkClipboardIndicator>已复制</LoongArkClipboardIndicator>
</LoongArkClipboardRoot>
