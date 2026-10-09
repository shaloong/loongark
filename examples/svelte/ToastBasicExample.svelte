<script lang="ts">
  import * as L from "@loongark/svelte";
  const toaster = L.createToaster({ placement: "bottom-end" });
</script>

<L.LoongArkButton
  onclick={() => toaster.create({ title: "已保存", closable: true })}
  >显示通知</L.LoongArkButton
>
<L.LoongArkToaster {toaster}>
  {#snippet children(toast)}
    <L.LoongArkToastRoot
      ><L.LoongArkToastTitle>{toast().title}</L.LoongArkToastTitle
      ><L.LoongArkToastCloseTrigger aria-label="关闭">关闭</L.LoongArkToastCloseTrigger
      ></L.LoongArkToastRoot
    >
  {/snippet}
</L.LoongArkToaster>
