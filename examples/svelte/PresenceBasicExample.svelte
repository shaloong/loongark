<script lang="ts">
  import { LoongArkButton, LoongArkPresence } from "@loongark/svelte";
  let visible = $state(false);
</script>

<div>
  <LoongArkButton aria-expanded={visible} onclick={() => (visible = !visible)}>
    显示 / 隐藏
  </LoongArkButton>
  <LoongArkPresence present={visible} lazyMount unmountOnExit>
    <p>按需挂载的内容。</p>
  </LoongArkPresence>
</div>
