<script lang="ts">
  import {
    LoongArkMenubar,
    LoongArkMenuRoot,
    LoongArkMenuTrigger,
    LoongArkMenuPositioner,
    LoongArkMenuContent,
    LoongArkMenuItem,
  } from "@loongark/svelte";
</script>

<LoongArkMenubar>
  <LoongArkMenuRoot>
    <LoongArkMenuTrigger>文件</LoongArkMenuTrigger>
    <LoongArkMenuPositioner>
      <LoongArkMenuContent>
        <LoongArkMenuItem value="new">新建</LoongArkMenuItem>
        <LoongArkMenuItem value="save">保存</LoongArkMenuItem>
      </LoongArkMenuContent>
    </LoongArkMenuPositioner>
  </LoongArkMenuRoot>
</LoongArkMenubar>
