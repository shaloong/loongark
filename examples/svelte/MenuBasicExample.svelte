<script lang="ts">
  import {
    LoongArkMenuRoot,
    LoongArkMenuTrigger,
    LoongArkMenuPositioner,
    LoongArkMenuContent,
    LoongArkMenuItem,
  } from "@loongark/svelte";
</script>

<LoongArkMenuRoot>
  <LoongArkMenuTrigger>操作</LoongArkMenuTrigger>
  <LoongArkMenuPositioner>
    <LoongArkMenuContent>
      <LoongArkMenuItem value="copy">复制</LoongArkMenuItem>
      <LoongArkMenuItem value="archive">归档</LoongArkMenuItem>
    </LoongArkMenuContent>
  </LoongArkMenuPositioner>
</LoongArkMenuRoot>
