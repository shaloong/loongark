<script lang="ts">
  import { LoongArkButton, LoongArkFocusTrap } from "@loongark/svelte";
  let active = $state(false);
</script>

<div>
  <LoongArkButton onclick={() => (active = true)}>开始编辑</LoongArkButton>
  {#if active}<LoongArkFocusTrap returnFocusOnDeactivate>
      <div>
        <label for="task-name"> 任务名 </label>
        <input id="task-name" />
        <LoongArkButton onclick={() => (active = false)}>完成</LoongArkButton>
      </div>
    </LoongArkFocusTrap>{/if}
</div>
