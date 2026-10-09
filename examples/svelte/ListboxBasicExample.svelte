<script lang="ts">
  import {
    createListCollection,
    LoongArkListboxRoot,
    LoongArkListboxLabel,
    LoongArkListboxList,
    LoongArkListboxItem,
    LoongArkListboxItemText,
    LoongArkListboxItemIndicator,
  } from "@loongark/svelte";
  const collection = createListCollection({
    items: [
      { value: "beijing", label: "北京" },
      { value: "shanghai", label: "上海" },
    ],
  });
</script>

<LoongArkListboxRoot {collection} defaultValue={["beijing"]}>
  <LoongArkListboxLabel>城市</LoongArkListboxLabel>
  <LoongArkListboxList>
    {#each collection.items as item}<LoongArkListboxItem {item}>
        <LoongArkListboxItemText>
          {item.label}
        </LoongArkListboxItemText>
        <LoongArkListboxItemIndicator />
      </LoongArkListboxItem>{/each}
  </LoongArkListboxList>
</LoongArkListboxRoot>
