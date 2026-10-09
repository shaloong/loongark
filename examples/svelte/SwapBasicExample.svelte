<script lang="ts">
  import {
    LoongArkButton,
    LoongArkSwapRoot,
    LoongArkSwapIndicator,
  } from "@loongark/svelte";
  let expanded = $state(false);
</script>

<LoongArkButton aria-expanded={expanded} onclick={() => (expanded = !expanded)}>
  <LoongArkSwapRoot swap={expanded}>
    <LoongArkSwapIndicator type="off">展开</LoongArkSwapIndicator>
    <LoongArkSwapIndicator type="on">收起</LoongArkSwapIndicator>
  </LoongArkSwapRoot>
</LoongArkButton>
