<script lang="ts">
  import {
    LoongArkAccordionRoot,
    LoongArkAccordionItem,
    LoongArkAccordionItemTrigger,
    LoongArkAccordionItemIndicator,
    LoongArkAccordionItemContent,
  } from "@shaloong/loongark-svelte";
</script>

<LoongArkAccordionRoot collapsible>
  <LoongArkAccordionItem value="one">
    <LoongArkAccordionItemTrigger>
      部署设置
      <LoongArkAccordionItemIndicator />
    </LoongArkAccordionItemTrigger>
    <LoongArkAccordionItemContent>
      这里是展开后的详细设置。
    </LoongArkAccordionItemContent>
  </LoongArkAccordionItem>
</LoongArkAccordionRoot>
