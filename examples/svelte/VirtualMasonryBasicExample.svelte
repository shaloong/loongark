<script lang="ts">
  import { LoongArkVirtualMasonry } from "@loongark/svelte";
</script>

<LoongArkVirtualMasonry
  label="虚拟瀑布流"
  keys={["a", "b", "c", "d"]}
  maxColumns={2}
  height={240}
  estimateSize={120}
>
  {#snippet renderItem({ key })}{key}{/snippet}
</LoongArkVirtualMasonry>
