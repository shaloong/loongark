<script lang="ts">
  import {
    LoongArkPopoverRoot,
    LoongArkPopoverTrigger,
    LoongArkPopoverPositioner,
    LoongArkPopoverContent,
    LoongArkPopoverTitle,
    LoongArkPopoverDescription,
    LoongArkPopoverCloseTrigger,
  } from "@loongark/svelte";
</script>

<LoongArkPopoverRoot>
  <LoongArkPopoverTrigger>打开详情</LoongArkPopoverTrigger>
  <LoongArkPopoverPositioner>
    <LoongArkPopoverContent>
      <LoongArkPopoverTitle>详情</LoongArkPopoverTitle>
      <LoongArkPopoverDescription>
        浮层继承当前主题。
      </LoongArkPopoverDescription>
      <LoongArkPopoverCloseTrigger>关闭</LoongArkPopoverCloseTrigger>
    </LoongArkPopoverContent>
  </LoongArkPopoverPositioner>
</LoongArkPopoverRoot>
