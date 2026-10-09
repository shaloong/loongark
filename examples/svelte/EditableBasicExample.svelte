<script lang="ts">
  import {
    LoongArkEditableRoot,
    LoongArkEditableLabel,
    LoongArkEditableArea,
    LoongArkEditablePreview,
    LoongArkEditableInput,
    LoongArkEditableControl,
    LoongArkEditableEditTrigger,
    LoongArkEditableSubmitTrigger,
    LoongArkEditableCancelTrigger,
  } from "@loongark/svelte";
</script>

<LoongArkEditableRoot defaultValue="项目名称">
  <LoongArkEditableLabel>名称</LoongArkEditableLabel>
  <LoongArkEditableArea>
    <LoongArkEditablePreview />
    <LoongArkEditableInput />
  </LoongArkEditableArea>
  <LoongArkEditableControl>
    <LoongArkEditableEditTrigger>编辑</LoongArkEditableEditTrigger>
    <LoongArkEditableSubmitTrigger>保存</LoongArkEditableSubmitTrigger>
    <LoongArkEditableCancelTrigger>取消</LoongArkEditableCancelTrigger>
  </LoongArkEditableControl>
</LoongArkEditableRoot>
